<template>
<div>
  <d2-container>
    <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基础" name="first">
          <vxe-toolbar :refresh="{query: reload}" export print custom>
            <template v-slot:buttons>
              <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
              <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
              <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
              <vxe-button @click="insertEvent()">新增</vxe-button>
              <vxe-button @click="insertLikeEvent()">类似新增</vxe-button>
              <vxe-button @click="insertChildEvent()">新增下级</vxe-button>
              <vxe-button @click="saveEvent">保存</vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-table
            border
            resizable
            highlight-hover-row
            highlight-current-row
            show-overflow
            keep-source

            header-align="center"
            ref="xTree"

            :loading="loading"
            :tree-config="{reserve: true}"
            :data="tableData"
            :print-config="{}"
            :export-config="{}"
            :menu-config="{header: {options: headerMenus}, body: {options: bodyMenus}, visibleMethod}"
            @toggle-tree-expand="toggleExpandChangeEvent">
            <vxe-table-column field="name" title="name" tree-node :edit-render="{name: 'input'}"></vxe-table-column>
            <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
            <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
            <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
          </vxe-table>
        </el-tab-pane>

        <el-tab-pane label="多选" name="second">
          <vxe-toolbar>
            <template v-slot:buttons>

              <vxe-button @click="$refs.xTree_1.setAllTreeExpand(true)">展开所有</vxe-button>
              <vxe-button @click="$refs.xTree_1.clearTreeExpand()">关闭所有</vxe-button>
            </template>
          </vxe-toolbar>

           <vxe-table
            border
            resizable
            highlight-hover-row
            highlight-current-row
            show-overflow
            row-key

            ref="xTree_1"
            row-id="id"
            :data="tableData"
            :tree-config="{children: 'children'}"
            :keyboard-config="{isArrow: true, isEnter: true}">
            :checkbox-config="{labelField: 'name', highlight: true}"
            @checkbox-change="selectChangeEvent">
            <vxe-table-column type="checkbox" title="Name"  width="280" tree-node></vxe-table-column>
            <vxe-table-column field="size" title="Size"></vxe-table-column>
            <vxe-table-column field="type" title="Type"></vxe-table-column>
            <vxe-table-column field="date" title="Date"></vxe-table-column>
          </vxe-table>
        </el-tab-pane>
      </el-tabs>
    </template>


  </d2-container>
</div>
</template>

<script>
 export default {
    data () {
      return {
        loading: false,
        activeName: 'first',
        tableData: [],
        headerMenus: [
          [
            { code: 'hideColumn', name: '隐藏列', disabled: false },
            { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
          ]
        ],
        bodyMenus: [
          [
            { code: 'expand', name: '展开节点', disabled: false },
            { code: 'contract', name: '收缩节点', disabled: false }
          ]
        ],
        defaultExpandKeys: [1005]
      }
    },
    mounted () {
      this.findList()
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);

        //一下两行代码是为了解决树表格放在tab页中列宽度问题
        this.$refs.xTree_1.setAllTreeExpand(true)
        this.$refs.xTree_1.clearTreeExpand()
      },
      toggleExpandChangeEvent ({ row, expanded }) {
        console.log('节点展开事件' + expanded)
      },
      getTreeExpansionEvent () {
        let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
        this.$XModal.alert(treeExpandRecords.length)
      },
      removeRowEvent (row) {
        this.$XModal.confirm('您确定要删除吗？').then(type => {
          if (type === 'confirm') {
            const matchObj = this.$XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
            if (matchObj) {
              // 从树节点中移除
              matchObj.items.splice(matchObj.index, 1)
            }
          }
        })
      },
      selectChangeEvent ({ records }) {
        console.info(`勾选${records.length}个树形节点`, records)
      },
      findList () {
        this.loading = true
        return new Promise(resolve => {
          setTimeout(() => {
            this.tableData = [
                { id: 1000, parentId:0, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 1005, parentId:0, name: 'Test2',type: 'mp4',size: null,date: '2021-04-01'},
                { id: 24300, parentId:1005, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, parentId:1005, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 10053, parentId:1005, name: 'vxe-table 从入门到放弃96',type: 'avi',size: null,date: '2021-04-01'},
                { id: 24330, parentId:10053, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, parentId:10053,  name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, parentId:10053,  name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23666, parentId:0, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, parentId:0, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
                this.tableData = this.$XEUtils.toArrayTree(this.tableData)
                this.loading = false
                resolve(this.tableData)
              }, 300)
          })
      },
      reload () {
        let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
        // // 清除所有状态
        // this.$refs.xTree.clearAll()
        this.findList().then(()=>{
          console.log(treeExpandRecords)
          this.$refs.xTree.setTreeExpand(treeExpandRecords, true)
        })
      },
      visibleMethod  ({ row, type }) {
        let xTree = this.$refs.xTree
        let treeConfig = this.treeConfig
        if (type === 'body') {
          this.bodyMenus.forEach(list => {
            list.forEach(item => {
              if (['expand', 'contract'].includes(item.code)) {
                if (row[treeConfig.children] && row[treeConfig.children].length) {
                  let isExpand = xTree.isTreeExpandByRow(row)
                  item.disabled = ['expand'].includes(item.code) ? isExpand : !isExpand
                } else {
                  item.disabled = true
                }
              }
            })
          })
        }
        return true
      },
      contextMenuClickEvent ({ menu, row, column }) {
        let xTree = this.$refs.xTree
        switch (menu.code) {
          case 'hideColumn':
            xTree.hideColumn(column)
            break
          case 'showAllColumn':
            xTree.resetColumn()
            break
          case 'expandOrFold':
            xTree.toggleTreeExpand(row)
            break
        }
      },
      insertEvent () {
        const xTree = this.$refs.xTree
        const newData = {
          children: [],
          name: '新数据',
          date: this.$XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        let currentRow = xTree.getCurrentRecord();

        if(!currentRow || (currentRow && currentRow.parentId == 0)){
          newData.parentId = 0
          xTree.insert(newData).then(() => xTree.setActiveRow(newData))
        }else{
          let fRow = xTree.data.find(row => row.id == currentRow.parentId)
          console.log(fRow)
          newData.parentId = fRow.parentId
          xTree.data[xTree.getRowIndex(fRow)].children.unshift(newData)
          // xTree.insertAt(newData,fRow)
          console.log(xTree.data)
        }

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
      insertChildEvent () {
        const xTree = this.$refs.xTree
        const newData = {
          children: [],
          name: '新数据',
          date: this.$XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        let currentRow = xTree.getCurrentRecord();
        if(!currentRow){
          this.$XModal.alert({ message: '请先选择一行数据！', status: 'warning' })
          return
        }

        newData.parentId = currentRow.id
        currentRow.children.unshift(newData)
        // if(currentRow.children.length>=1){
        //   if(!xTree.isTreeExpandByRow(currentRow)){
        //     xTree.setTreeExpand(currentRow, true)
        //   }

        //   xTree.data[xTree.getRowIndex(currentRow)].children.unshift(newData)
        // }else{
        //   console.log(22)
        //   xTree.insert(newData).then(() => xTree.setActiveRow(newData))
        // }
console.log(xTree.data)
      },
      saveEvent () {
        let { insertRecords, removeRecords, updateRecords } = this.$refs.xTree.getRecordset()
        console.log(insertRecords)
        console.log(removeRecords)
        console.log(updateRecords)
        // this.$XModal.alert(`insertRecords=${insertRecords.length} updateRecords=${updateRecords.length}`)
        this.$refs.xTree.updateData()
        // this.$refs.xTree.getRemoveRecords()
        let { insertRecord, removeRecord, updateRecord } = this.$refs.xTree.getRecordset()
        console.log(insertRecord)
        console.log(removeRecord)
        console.log(updateRecord)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tree-node-icon {
    width: 24px;
    text-align: center;
  }
</style>
