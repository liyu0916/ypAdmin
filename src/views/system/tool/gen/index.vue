<template>
<div>
  <d2-container>
    <template slot="header">
      <div>
      <vxe-form ref="queryForm" :data="queryParams" @submit="queryHandle">
        <vxe-form-item title="表名称" field="tableName">
          <template v-slot>
            <vxe-input v-model="queryParams.tableName" placeholder="请输入表名称" @keyup.enter.native="queryHandle"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="表描述" field="tableComment">
          <template v-slot>
            <vxe-input v-model="queryParams.tableComment" placeholder="请输入表描述" @keyup.enter.native="queryHandle"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="创建时间" field="createTime">
          <template v-slot>
             <el-date-picker
              v-model="queryParams.createRage"
              type="daterange"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template v-slot>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset" status="warning">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
      </div>
    </template>

    <vxe-toolbar
      custom
      print
      export
      ref="xToolbar"
      :refresh="{query: queryList}">
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="openImportTable">导入数据表</vxe-button>
        <vxe-button icon="fa newspaper-o" @click="genTableHandle">代码生成</vxe-button>
        <vxe-button icon="fa search-minus" @click="previewHandle">代码预览</vxe-button>
        <vxe-button icon="fa fa-edit" :disabled="singleSelect" @click="editHandle">修改生成配置</vxe-button>
        <vxe-button icon="fa window-restore" :disabled="noSelect" @click="syncHandle">同步</vxe-button>
        <vxe-button icon="fa fa-trash-o" @click="deleteHandle">删除</vxe-button>
      </template>
      <template v-slot:tools>
        <vxe-input v-model="findValue" type="search" placeholder="查找"></vxe-input>
        <vxe-button type="text"></vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      stripe
      resizable
      highlight-hover-row
      highlight-current-row
      show-overflow
      height="100%"
      max-height="100%"
      header-align="center"
      ref="xTable"
      :loading="loading"
      :data="findlist"

      :export-config="{modes: ['current', 'selected', 'all']}"
      :menu-config="tableMenu"
      :keyboard-config="{isArrow: true}"

      @menu-click="contextMenuClickHandle"
      @cell-dblclick="cellDBLClickHandle"

      @checkbox-all="selectAllHandle"
      @checkbox-change="selectChangeHandle">
      <vxe-table-column
        type="checkbox"
        width="50"
      />
      <vxe-table-column
        type="seq"
        width="50"
      />
      <vxe-table-column
        field="tableId"
        title="编号"
        :visible="false"
      />
      <vxe-table-column
        field="tableName"
        title="表名称"
        type="html"
        width="120"
        sortable
      />
      <vxe-table-column
        field="tableComment"
        title="表描述"
        type="html"
        width="120"
        sortable
      />
      <vxe-table-column
        field="className"
        title="实体类"
        type="html"
        width="120"
        sortable
      />
      <vxe-table-column
        field="createTime"
        title="创建时间"
        width="160"
        sortable
      />
      <vxe-table-column
        field="updateTime"
        title="更新时间"
        type="html"
        width="160"
        sortable
      />
      <vxe-table-column
        field="remark"
        title="备注"
      />
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      :total="queryParams.totalResult"
      :page-sizes="[10, 20, 50, 100, 1000, {label: '全量数据', value: -1}]"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

  </d2-container>

  <!-- 预览界面 -->
  <el-dialog :title="preview.title" :visible.sync="preview.open" width="80%" top="5vh" append-to-body>
    <el-tabs v-model="preview.activeName">
      <el-tab-pane
        v-for="(value, key) in preview.data"
        :label="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
        :name="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
        :key="key"
      >
        <pre>{{ value }}</pre>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <!-- 导入数据表界面 -->
  <!-- <import-table ref="import" @ok="handleQuery" /> -->
</div>
</template>

<script>
import common from '@/views/mixins/common'
import { listTable, previewTable, delTable, genCode, synchDb } from "@/api/system/tool/gen";
import importTable from "./importTable"
export default {
  name: 'system-tool-gen',
  components: { importTable },
  mixins: [
    common
  ],
  data () {
    return {
      entityName: '数据表',
      queryParams: {

        tableName: null,
        tableComment: null
      },
      // 选中表名数组
      tableNames: [],
      // 预览参数
      preview: {
        open: false,
        title: "代码预览",
        data: {},
        activeName: "domain.java"
      }
    }
  },
  mounted () {
  },
  methods: {
    queryHandle(){
      this.queryParams.pageNum = 1;

      this.queryParams.createStart = this.$XEUtils.toDateString(this.queryParams.createRage[0],'yyyy-MM-dd HH:mm:ss')
      this.queryParams.createEnd = this.$XEUtils.toDateString(this.queryParams.createRage[1],'yyyy-MM-dd HH:mm:ss')

      this.querylist ()
    },
    querylist () {
        this.loading = true

        listTable(this.queryParams).then(response => {
          this.tableData = response.data;
          this.queryParams.totalResult = response.total;

          this.loading = false;
          }
        );
    },

    selectChangeHandle ({ checked, records }) {
      this.ids = records.map(item => item.tableId);
      this.tableNames = records.map(item => item.tableName);
    },
    /** 打开导入表弹窗 */
    openImportTable() {
      this.$refs.import.show();
    },
    /** 生成代码操作 */
    genTableHandle() {
      const tableNames = this.tableNames;
      if (tableNames == "") {
        this.msgError("请选择要生成的数据");
        return;
      }

      downLoadZip("/tool/gen/batchGenCode?tables=" + tableNames, "ypCode");
    },
    /** 代码预览 */
    previewHandle(){
      const ids = this.ids;
      if (ids == "") {
        this.$XModal.alert({message:"请选择要预览的数据",status:'warning'});
        return;
      }
      if(ids.length>1){
        this.$message.info('多选只能预览第一条数据的代码')
      }
      previewTable(ids[0]).then(response => {
        this.preview.data = response.data;
        this.preview.open = true;
      });
    },
    /**修改代码生成配置 */
    editHandle(){
      const ids = this.ids;
      if (ids == "") {
        this.$XModal.alert({message:"请选择要修改的数据",status:'warning'});
        return;
      }
      if(ids.length>1){
        this.$message.info('多选只能修改第一条数据的代码')
      }
      this.$router.push("/system/tool/gen/edit/" + ids[0]);
    },
    syncHandle(){
      this.$XModal.alert({message:"该功能还未实现",status:'warning'});
    },
    deleteHandle(){
      const tableNames = this.tableNames;
      if (tableNames == "") {
        this.$XModal.alert({message:"请选择要删除的数据",status:'warning'});
        return;
      }
      this.$XModal.confirm(`您确定要删除表名为【${tableNames}】的数据?`).then(type => {
        if (type === 'confirm') {
          delTable(this.ids).then(() => {
            this.queryList();
            this.$XModal.message({ message: '删除成功', status: 'success' })
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
