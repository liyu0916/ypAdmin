<!-- https://blog.csdn.net/abc26296/article/details/111411128 -->
<template>
<div>
  <d2-container>
    <vxe-table
      border
      resizable
      show-overflow
      height="90%"
      max-height="100%"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称"></vxe-table-column>
      <vxe-table-column field="role" title="职务"></vxe-table-column>
      <vxe-table-column field="num3" title="项目进度" width="140" :cell-render="{name: 'bar', props: {bar: {max: 100 },label: {formatter: '{value}%'}}}"></vxe-table-column>
      <vxe-table-column field="num1" title="项目进度" width="100" :cell-render="{name: 'pie', props: {ring: { diameter: '60%' }, tooltip: {formatter: '名称：{row.name}\n进度：{value}%'}}}"></vxe-table-column>
      <vxe-table-column field="num2" title="完成比例" width="140" :cell-render="{name: 'pie', props: {tooltip: {formatter: '比例：{value}'}}}"></vxe-table-column>
    </vxe-table>
  </d2-container>

</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
          { name: 'test1', role: 'Developer', num1: [12, 34, 62], num2: [24, 81, 28], num3: [13, 45, 10] },
          { name: 'test2', role: 'Tester', num1: [41, 12, 33], num2: [86, 9, 16], num3: [13, 45, 96] },
          { name: 'test3', role: 'Developer', num1: [96, 75, 28], num2: [47, 72, 37], num3: [22, 97, 100] },
          { name: 'test4', role: 'Developer', num1: [33, 75, 77], num2: [46, 12, 97], num3: [13, 45, 24] },
          { name: 'test5', role: 'Tester', num1: [96, 75, 24], num2: [8, 72, 37], num3: [13, 45, 96] },
          { name: 'test6', role: 'Developer', num1: [7, 55, 88], num2: [84, 72, 110], num3: [64, 45, 71] },
          { name: 'test7', role: 'Tester', num1: [96, 75, 28], num2: [74, 36, 37], num3: [23, 45, 96] },
          { name: 'test8', role: 'Developer', num1: [41, 11, 66], num2: [64, 24, 99], num3: [53, 4, 96] },
          { name: 'test9', role: 'Tester', num1: [22, 14, 28], num2: [11, 72, 37], num3: [34, 45, 96] },
          { name: 'test10', role: 'Developer', num1: [96, 75, 22], num2: [47, 22, 10], num3: [22, 44, 40] }
      ]
    }
  }
}
</script>
