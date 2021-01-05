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
        <vxe-button icon="fa fa-trash-o" @click="removeEvent()">删除</vxe-button>
        <vxe-button icon="fa fa-save" @click="saveEvent()">保存</vxe-button>
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

      keep-source
      :edit-config="{trigger: 'dblclick', mode: 'row', showStatus: true}"
      :edit-rules="validRules"

      :export-config="{modes: ['current', 'selected', 'all']}"
      :menu-config="tableMenu"
      :keyboard-config="{isArrow: true}"

      @menu-click="contextMenuClickEvent"
      >
      <vxe-table-column type="seq" width="50"></vxe-table-column>
      <vxe-table-column field="name" title="姓名" width="20%" sortable
        :edit-render="{name: 'input', attrs: {type: 'text'}}">
      </vxe-table-column>
      <vxe-table-column
        field="sex"
        title="性别"
        width="180"
        :filters="sexList"
        :filter-multiple="false"
        :formatter="formatterSex"
        :edit-render="{name: '$select', options: sexList}">
      </vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        width="180"
        sortable
        :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
        :filter-method="filterAgeMethod"
        :edit-render="{name: '$input', props: {type: 'integer', min: 1, max: 120}}">
      </vxe-table-column>
      <vxe-table-column field="regDate" title="注册时间"  sortable
        :edit-render="{name: '$input', props: {type: 'date'}}">
      </vxe-table-column>
      <vxe-table-column field="address" title="Address"  sortable>
      </vxe-table-column>
    </vxe-table>

  </d2-container>

</div>
</template>

<script>
  import api from '@/api'
  import util from '@/libs/util'
  export default {
    name: 'demo-plugins-vxe-table-rowedit',
    data () {
      const regValid = ({ cellValue }) => {
        console.log(cellValue)
        console.log(this.$XEUtils.toStringDate(cellValue,'yyyy-MM-dd'))
        if (!cellValue || (cellValue && this.$XEUtils.toStringDate(cellValue,'yyyy-MM-dd') =='Invalid Date')) {
          return new Error('注册时间输入格式不正确')
        }
      }
      return {
        loading: false,
        tableData: [],
        validRules: {
          name: [
            { required: true, message: '名称必须填写' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
          ],
          regDate: [
            { validator: regValid }
          ],
          sex: [
            { required: true, message: '性别必须填写' },
            { pattern: /^[0,1]{1}$/, message: '格式不正确' }
          ],
          age: [
            { pattern: '^[0-9]{0,3}$', message: '格式不正确' }
          ]
        },
        condData: {
          name: null,
          sex: null,
          regDate: null,
          regStart: null,
          regEnd: null
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
        sexList: [
          { label: '', value: '' },
          { label: '男', value: '1' },
          { label: '女', value: '0' }
        ]
      }
    },
    mounted () {
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
      }
    },
    methods: {
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
          //  this.tablePage.totalResult = resp.data.count
           this.loading = false
         });
        }, 1500)
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
      async insertEvent (row) {
        let record = {
          sex: '1'
        }
        let { row: newRow } = await this.$refs.xTable.insertAt(record, row)
        await this.$refs.xTable.setActiveRow(newRow)
      },
      insertLikeEvent () {
        let currentRow = this.$refs.xTable.getCurrentRecord();
        if(!currentRow){
          this.$XModal.alert({ message: '请先选择一行数据！', status: 'warning' })
          return
        }
        this.insertEvent(currentRow)
      },
      removeEvent () {
        let currentRow = this.$refs.xTable.getCurrentRecord();
        if(!currentRow){
          this.$XModal.alert({ message: '请先选择一行数据！', status: 'warning' })
          return
        }
        this.$XModal.confirm('您确定要删除该数据?').then(type => {
          if (type === 'confirm') {
            // 后台删除
            //...

            this.$refs.xTable.remove(currentRow)
          }
        })
      },
      async saveEvent () {
        const errMap = await this.$refs.xTable.validate(true).catch(errMap => errMap)
        if (errMap) {return}
        const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
        this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
        // console.log(this.$refs.xTable.getRecordset())
        // console.log(insertRecords)
        // console.log(removeRecords)
        // console.log(updateRecords)
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

    }
  }
</script>
