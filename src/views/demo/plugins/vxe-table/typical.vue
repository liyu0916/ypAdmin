<template>
<div>
  <d2-container>
    <template slot="header">
    <div>
      <vxe-form :data="condData" @submit="queryData">
        <vxe-form-item title="姓名" field="name">
          <template v-slot>
            <vxe-input v-model="condData.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" :title-suffix="{ message: '帮助信息！！！' }">
          <template v-slot>
            <vxe-select v-model="condData.sex" placeholder="请选择性别" clearable>
              <vxe-option v-for="(item, value) in sexList" :key="value" :value="item.value" :label="item.label"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="注册时间" field="regDate">
          <template v-slot>
             <el-date-picker
              v-model="condData.regDate"
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
      :refresh="{query: findList}">
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button icon="fa fa-plus-square-o" @click="insertLikeEvent()">类似新增</vxe-button>
      </template>
      <template v-slot:tools>
        <vxe-input v-model="filterValue" type="search" placeholder="全表搜索"></vxe-input>
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
      :data="list"

      :export-config="{modes: ['current', 'selected', 'all']}"
      :menu-config="tableMenu"
      :keyboard-config="{isArrow: true}"

      @menu-click="contextMenuClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @custom="toolbarCustomEvent">
      <vxe-table-column type="seq" width="50"></vxe-table-column>
      <vxe-table-column field="id" title="id" :visible="false"></vxe-table-column>
      <vxe-table-column field="name" title="姓名" type="html" width="20%" sortable>
        <template v-slot="{ row }">
          <a class="my-link" :href="row.name">{{ row.name }}</a>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="sex"
        title="性别"
        width="180"
        :filters="sexList"
        :filter-multiple="false"
        :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        width="180"
        sortable
        :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
        :filter-method="filterAgeMethod"></vxe-table-column>
      <vxe-table-column field="regDate" title="注册时间" type="html" sortable :formatter="formatDate"></vxe-table-column>
      <vxe-table-column field="address" title="Address" type="html" sortable></vxe-table-column>
      <vxe-table-column field="createTime" title="createTime"  sortable :visible="false"></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :page-sizes="[10, 20, 50, 100, 1000, {label: '全量数据', value: -1}]"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

    <vxe-modal ref="xModal" v-model="showEdit" :title="setTitle" width="800" resize destroy-on-close transfer @show="modalShowEvent">
      <template v-slot>
        <vxe-form ref="xForm" :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
          <vxe-form-item ref='nameItem' title="姓名" field="name" span="12" :item-render="{ name: 'input',  attrs: {id: 'nameItem',placeholder: '请输入名称'}}"></vxe-form-item>
          <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
          <vxe-form-item title="注册时间" field="regDate" span="12" :item-render="{ name: '$input', props: { type: 'date', placeholder: '请选择日期' } }"></vxe-form-item>
          <vxe-form-item title="Age" field="age" span="12" :item-render="{name: '$input', props: {type: 'integer', placeholder: '请输入年龄', min: 1, max: 120}}"></vxe-form-item>
          <vxe-form-item title="Address" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}"></vxe-form-item>

          <vxe-form-item align="center" span="24">
            <template v-slot>
              <vxe-button type="submit" status="primary">保存</vxe-button>
              <vxe-button @click="saveThenIns()" status="info">保存后新增</vxe-button>
              <vxe-button @click="reset()" status="warning">重置</vxe-button>
              <vxe-button @click="$refs.xModal.close()">取消</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>

    <template slot="footer">基础表格-container-footer</template>
  </d2-container>


</div>
</template>

<script>
import api from '@/api'
import util from '@/libs/util'
export default {
   name: 'demo-plugins-vxe-table-typical',
   data () {
      return {
        entityName: '用户',
        loading: false,
        tableData: [],
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          totalResult: 0
        },
        filterValue: '',

        tableMenu: {
          className: 'my-menus',
          header: {
            options: [
              [
                { code: 'hideColumn', name: '隐藏列' },
                { code: 'showAllColumn', name: '取消所有隐藏列' }
              ]
            ]
          },
          body: {
            options: [
              [
                { code: 'insertAt', name: '插入', prefixIcon: 'fa fa-plus' },
                { code: 'update', name: '编辑', prefixIcon: 'fa fa-edit' },
                { code: 'remove', name: '删除', prefixIcon: 'fa fa-trash-o color-red' },
                { code: 'reload', name: '刷新', prefixIcon: 'fa fa-refresh' },
                {
                  code: 'filter',
                  name: '筛选',
                  children: [
                    { code: 'filterSelect', name: '按所选单元格的值筛选' },
                    { code: 'clearFilter', name: '清除筛选' }
                  ]
                },
                {
                  code: 'sort',
                  name: '排序',
                  prefixIcon: 'fa fa-sort color-blue',
                  children: [
                    { code: 'sortAsc', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc color-orange' },
                    { code: 'sortDesc', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc color-orange' },
                    { code: 'clearSort', name: '清除排序' }
                  ]
                },
                { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: true }
              ]
            ]
          }
        },

        condData: {
          name: null,
          sex: null,
          regDate: null,
          regStart: null,
          regEnd: null
        },
        formData: {},
        initFormData: {},
        showEdit: false,
        isEdit: false,
        formRules: {
          name: [
            { required: true, message: '请输入名称' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
          ],
          age: [
            { required: true, message: '请输入年龄' }
          ],
          sex: [
            { required: true, message: '请选择性别' }
          ]
        },

        sexList: [
          {
            label: '女',
            value: '0'
          },
          {
            label: '男',
            value: '1'
          }
        ],
        pickerOptions: {
          shortcuts: [{
            text: '当日',
            onClick(picker) {
              const end = new Date();
              const start = new Date(end.toLocaleDateString());
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近两日',
            onClick(picker) {
              const end = new Date();
              const start = new Date(end.toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date();
              const start = new Date(end.toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '当月',
            onClick(picker) {
              const end = new Date();
              var year = end.getFullYear(),
                  month = end.getMonth() + 1; //月份是从0开始 , 所以+1
              const start = new Date(year,month,1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              const start = new Date(end.toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created () {
      // this.$nextTick(() => {
      //   // 手动将表格和工具栏进行关联
      //   this.$refs.xTable.connect(this.$refs.xToolbar)
      // })
      // this.loading = true
      // setTimeout(() => {
      //   this.tableData = [
      //     { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 8, address: 'vxe-table 从入门到放弃' },
      //     { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
      //     { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
      //     { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
      //     { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
      //     { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' },
      //     { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'vxe-table 从入门到放弃' },
      //     { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'vxe-table 从入门到放弃' },
      //     { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' },
      //     { id: 100010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' }
      //   ]
      //   this.loading = false
      // }, 500)
    },
    activated(){
      console.log('activated....')
    },
    mounted () {
      console.log('mounted...')
      this.findList ()
    },
    computed: {
      list () {
        const filterValue = this.$XEUtils.toString(this.filterValue).trim().toLowerCase()
        if (filterValue) {
          const filterRE = new RegExp(filterValue, 'gi')
          // const searchProps = ['name', 'age', 'sex', 'address']
          const visibleColumn = this.$refs.xTable.getColumns()
          const searchProps = visibleColumn.map(item => {
            if(item.property && item.type && item.type === 'html'){
              return item.property
            }
          })
          const rest = this.tableData.filter(item => searchProps.some(
            key => this.$XEUtils.toString(item[key]).toLowerCase().indexOf(filterValue) > -1))
          return rest.map(row => {
            const item = Object.assign({}, row)
            searchProps.forEach(key => {
              item[key] = this.$XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
            })
            return item
          })
        }
        return this.tableData
      },
      setTitle(){
        if(this.isEdit) {
          return `编辑${this.entityName}`
        }else{
          return `新增${this.entityName}`
        }
      }
    },
    methods: {
      objEmptyStr2null(obj){
        for(var key in obj){
          if( obj[key] && !Array.isArray(obj[key]) && obj[key].trim()==""){obj[key]=null}
        }
        return obj;
      },
      truncDate (date) {
        if (date == null) {
          date = new Date()
        }
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        return date
      },
      queryData(){
        this.condData.regStart = this.$XEUtils.toDateString(this.condData.regDate[0],'yyyy-MM-dd HH:mm:ss')
        this.condData.regEnd = this.$XEUtils.toDateString(this.condData.regDate[1],'yyyy-MM-dd HH:mm:ss')
        this.$message.info(JSON.stringify(util.objEmptyStr2null(this.condData)));
        this.findList ()
      },
      findList () {
        this.loading = true

        setTimeout(() => {
         api.DEMO_VXE_LIST(Object.assign({},this.condData)).then(resp => {
           this.tableData = resp.data.list
           this.tablePage.totalResult = resp.data.count
           this.loading = false
         });
        }, 1500)


        // return new Promise(resolve => {
        //   setTimeout(() => {
        //     let resp = api.DEMO_VXE_LIST(this.queryData);
        //     this.tableData = resp.data
        //     this.loading = false
        //     resolve()
        //   }, 1500)
        // })
      },
      handlePageChange ({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.findList()
      },
      formatterSex ({ cellValue }) {
        const item = this.sexList.find(item => item.value === cellValue)
        return item ? item.label : ''
      },
      formatDate ({ cellValue }) {
        return this.$XEUtils.toDateString(cellValue, 'yyyy-dd-MM')
      },
      filterAgeMethod ({ value, row, column }) {
        return row.age >= value
      },
      cellDBLClickEvent ({ row }) {
        this.editEvent(row)
      },
      modalShowEvent () {
        Object.assign(this.initFormData,this.formData)
        document.getElementById('nameItem').focus()
      },
      insertEvent () {
        this.formData = {
          id: null,
          name: '',
          sex: '',
          age: '',
          address: ''
        }

        this.showEdit = true
        this.isEdit = false
      },
      insertLikeEvent () {
        let currentRow = this.$refs.xTable.getCurrentRecord();
        if(!currentRow){
          this.$XModal.alert({ message: '请先选择一行数据！', status: 'warning' })
          return
        }

        // this.formData = {
        //   id: null,
        //   name: '',
        //   sex: currentRow.sex,
        //   age: '',
        //   address: currentRow.address
        // }
        Object.assign(this.formData,currentRow,{
          id: null,
          name: '',
          age: ''
        })

        this.showEdit = true
        this.isEdit = false
      },
      editEvent (row) {
        Object.assign(this.formData,row)

        this.showEdit = true
        this.isEdit = true
      },
      removeEvent (row) {
        this.$XModal.confirm('您确定要删除该数据?').then(type => {
          if (type === 'confirm') {
            // 后台删除
            //...

            this.$refs.xTable.remove(row)
          }
        })
      },
      async submitEvent () {
        //提交后台
        //...

        this.showEdit = false
        if (this.isEdit) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
          Object.assign(this.$refs.xTable.getCurrentRecord(), this.formData)
        } else {
          this.$XModal.message({ message: '新增成功', status: 'success' })
          let { row: newRow } = await this.$refs.xTable.insert(Object.assign({},this.formData))
          let currentRow = newRow
          this.$refs.xTable.setCurrentRow(currentRow)
          this.$refs.xTable.scrollToRow(currentRow)
        }

      },
      async saveThenIns(){
        //提交后台
        //...

        await this.$refs.xForm.validate()

        if (this.isEdit) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
          Object.assign(this.$refs.xTable.getCurrentRecord(), this.formData)
        } else {
          this.$XModal.message({ message: '新增成功', status: 'success' })
          await this.$refs.xTable.insert(Object.assign({},this.formData))
        }
        Object.assign(this.formData,{
          id: null,
          name: '',
          age: ''})

      },
      reset(){
        Object.assign(this.formData,this.initFormData)
        console.log(JSON.stringify(this.formData))
      },
      contextMenuClickEvent ({ menu, row, column }) {
        let xTable = this.$refs.xTable
        switch (menu.code) {
          case 'hideColumn':
            xTable.hideColumn(column)
            break
          case 'showAllColumn':
            xTable.resetColumn()
            break
          case 'reload':
            this.queryData()
            break
          case 'remove':
            this.removeEvent(row)
            break
          case 'update':
            this.editEvent(row)
            break
          case 'save':
            this.$XModal.message({ message: '保存成功', status: 'success' })
            this.queryData()
            break
          default:
            this.$XModal.message(`点击了 ${menu.name} 选项`)
        }
      },
      toolbarCustomEvent (params) {
        console.log(params.type)
        const visibleColumn = this.$refs.xTable.getColumns()
        switch (params.type) {
          case 'btn-ins': {
            this.$XModal.message({ message: `点击了确认，显示为 ${visibleColumn.length} 列`, status: 'info' })
            break
          }
          case 'reset': {
            this.$XModal.message({ message: `点击了重置，显示为 ${visibleColumn.length} 列`, status: 'info' })
            break
          }
          case 'close': {
            this.$XModal.message({ message: `关闭了面板，显示为 ${visibleColumn.length} 列`, status: 'info' })
            break
          }
        }
      }
    }
}
</script>

<style lang="scss" scoped>
    .keyword-lighten {
      color: #000;
      background-color: #FFFF00;
    }

   .my-menus {
      background-color: #F8F8F9;
    }
    .my-menus .vxe-ctxmenu--link {
      width: 200px;
    }
    .my-copy-item {
      font-weight: 700;
      font-style: oblique;
    }
    .color-red {
      color: red;
    }
    .color-blue {
      color: blue;
    }
    .color-orange {
      color: orange;
    }
    .tool-btn {
      font-size: 20px;
      cursor: pointer;
    }
    .tool-btn:hover {
      color: #409eff;
    }
</style>
