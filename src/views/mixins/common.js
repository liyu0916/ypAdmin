//管理界面共有属性和方法

export default {
  props: {

  },
  data () {
    return {
      loading: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalResult: 0,

        createRage: "",
        createStart: null,
        createEnd: null
      },
      // 选中数组
      ids: [],
      // 表数据
      tableData: [],

      findValue: "",
      // 非单选禁用
      singleSelect: true,
      // 没选禁用
      noSelect: true,

      //表格右键菜单
      tableMenu: {
        className: 'd2-rclick-menus',
        header: {
          options: [
            [
              { code: 'hideColumn', name: '隐藏列' },
              { code: 'showAllColumn', name: '取消隐藏' }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'insert', name: '新增', prefixIcon: 'fa fa-plus' },
              { code: 'update', name: '编辑', prefixIcon: 'fa fa-edit' },
              { code: 'delete', name: '删除', prefixIcon: 'fa fa-trash-o color-red' },
              { code: 'reload', name: '刷新', prefixIcon: 'fa fa-refresh' },
              {
                code: 'filter',
                name: '筛选',
                children: [
                  { code: 'filterSelect', name: '筛选' },
                  { code: 'clearFilter', name: '取消筛选' }
                ]
              },
              {
                code: 'sort',
                name: '排序',
                prefixIcon: 'fa fa-sort color-blue',
                children: [
                  { code: 'sortAsc', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc color-orange' },
                  { code: 'sortDesc', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc color-orange' },
                  { code: 'clearSort', name: '取消排序' }
                ]
              }
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
          text: '昨日',
          onClick(picker) {
            const end = new Date();
            const start = new Date(end.toLocaleDateString());
            end.setTime(start.getTime());
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
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
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {
    findlist () {//本地查找
      const findValue = this.$XEUtils.toString(this.findValue).trim().toLowerCase()
      if (findValue) {
        const filterRE = new RegExp(findValue, 'gi')
        // const searchProps = ['name', 'age', 'sex', 'address']
        const visibleColumn = this.$refs.xTable.getColumns()
        const searchProps = visibleColumn.map(item => {
          if(item.property && item.type && item.type === 'html'){
            return item.property
          }
        })
        const rest = this.tableData.filter(item => searchProps.some(
          key => this.$XEUtils.toString(item[key]).toLowerCase().indexOf(findValue) > -1))
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
    editHandle(){
      this.$XModal.message({ message: '该功能尚未实现', status: 'warn' })
    },
    deleteHandle(){
      this.$XModal.message({ message: '该功能尚未实现', status: 'warn' })
    },
    insertHandle(row){
      this.$XModal.message({ message: '该功能尚未实现', status: 'warn' })
    },
    saveHandle(){
      this.$XModal.message({ message: '该功能尚未实现', status: 'warn' })
    },
    queryList(){
      this.$XModal.message({ message: '该功能尚未实现', status: 'warn' })
    },

    /**需要时覆写该方法 */
    selectChangeHandle ({ checked, records }) {
      this.ids = records.map(item => item.tableId);

      this.singleSelect = records.length != 1;
      this.noSelect = !records.length;
    },
    /**数据编辑类型为表单弹窗编辑时需要覆写该方法 */
    insertLikeHandle(){
      let currentRow = this.$refs.xTable.getCurrentRecord();
      if(!currentRow){
        this.$XModal.alert({ message: '请先选择一行数据！', status: 'warning' })
        return
      }
      this.insertHandle(currentRow)
    },

    selectAllHandle ({ checked, records }) {
      this.selectChangeHandle({ checked, records });
    },
    cellDBLClickHandle ({ row }) {
      this.editHandle(row)
    },
    contextMenuClickHandle ({ menu, row, column }) {
      let xTable = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          xTable.hideColumn(column)
          break
        case 'showAllColumn':
          xTable.resetColumn()
          break
        case 'insert':
          this.insertLikeHandle()
          break
        case 'reload':
          this.queryList()
          break
        case 'delete':
          this.deleteHandle(row)
          break
        case 'update':
          this.editHandle(row)
          break
        default:
          this.$XModal.message(`${menu.name} 功能尚未实现`)
      }
    },
    handlePageChange ({ pageNum, pageSize }) {
      this.queryParams.pageNum = pageNum
      this.queryParams.pageSize = pageSize
      this.queryList()
    }
  }
}
