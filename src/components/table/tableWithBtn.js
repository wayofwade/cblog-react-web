import React from 'react'
import './table.css'
import {Table, Tag, Divider} from 'antd'

export default class myTable extends React.Component {
  constructor(props) { // 类似于vue的data，存放数据
    super(props)
    this.state = {
      tDate: [],
      selectedRowKeys: []
    }
  }

  componentDidMount() { // 类似vue的mounted
    const data = []

    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `德玛西亚${i}`,
        age: i + 18,
        address: `西湖区湖底公园${i}号`,
        remark: 'http://www.cnblogs.com/',
        operate: '添加'
      })
    }

    this.setState({
      tDate: data
    })
  }

  // checkbox状态--方法是独立于其他的钩子函数的
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() { // 相当于html部分
    const columns = [{
      title: '姓名',
      width: '20%',
      dataIndex: 'name'
    }, {
      title: '年龄',
      width: '20%',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      render: age => (
        <span>
          <Tag color="geekblue" key={age}>{age}</Tag>
        </span>
      ),
    }, {
      title: '住址',
      width: '20%',
      dataIndex: 'address'
    }, {
      title: '备注',
      width: '20%',
      dataIndex: 'remark',
      render(text) {
        return <a href={text} target="_blank">博客园</a>
      }
    }, {
      title: '操作',
      width: '20%',
      dataIndex: 'operate',
      key: 'operate',
      render: operate => (
      <span>
          <a href="javascript:;">{operate}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
    )
    }]

    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    const pagination = {
      total: this.state.tDate.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize)
      },
      onChange(current) {
        console.log('Current: ', current)
      }
    }

    return (
      // react用的是className而不是class
      <div className="myTable">
        <div>
          <h3>
            表格中含有时间以及按钮
          </h3>
        </div>
        <Table scroll={{ y: 550 }} rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
      </div>
    )
  }
}
