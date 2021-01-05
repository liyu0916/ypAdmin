import { find, assign } from 'lodash'

const vxeData = {
  list: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 8, regDate: '2020-12-15 14:15:25', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 2300 },
    { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, regDate: '2020-12-16 14:15:25', address: 'Guangzhou',createTime: '2020-12-15 14:15:25',salary: 3300 },
    { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, regDate: '2020-12-15 17:15:25', address: 'Shanghai',createTime: '2020-12-15 14:15:25',salary: 2300 },
    { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, regDate: '2020-18-15 14:15:25', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 5300 },
    { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, regDate: '2020-12-19 14:15:25', address: 'Shanghai',createTime: '2020-12-15 14:15:25',salary: 2800 },
    { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, regDate: '2020-11-15 14:15:25', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 5300 },
    { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, regDate: '2020-12-10 14:15:25', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 2370 },
    { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, regDate: '2020-10-15 14:15:25', address: 'vxe-table 从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 2900 },
    { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, regDate: '2020-10-15 10:00:00', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 4300 },
    { id: 100010, name: 'Test10', role: 'Develop', sex: '0', age: 28, regDate: '2020-10-16 10:00:00', address: 'vxe-table 从入门到放弃',createTime: '2020-12-15 14:15:25',salary: 1300 }
  ],
  count: 10
}

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 列表
   */
  DEMO_VXE_LIST (data = {}) {

    // 模拟数据
      mock
      .onAny('/demo/vxe_1/findList')
      .reply(...tools.responseSuccess(vxeData))
    // 接口请求
    return requestForMock({
      url: '/demo/vxe_1/findList',
      method: 'post',
      data
    })
  }
})
