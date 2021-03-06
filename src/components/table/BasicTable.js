import React from 'react'
import './table.css'
import {Table} from 'antd'

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: []
        }
        if (props.location && props.location.state) {
          const params = props.location.state.data || 'none'
          console.error('路由穿参数的', params)
        }
    }

    componentDidMount() {
        const data = []

        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `德玛西亚${i}`,
                age: 18,
                address: `西湖区湖底公园${i}号`,
                remark: 'http://www.cnblogs.com/',
                operate: '暂无'
            })
        }

        this.setState({
            tDate: data
        })
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: '姓名',
            width: '20%',
            dataIndex: 'name'
        }, {
            title: '年龄',
            width: '20%',
            dataIndex: 'age',
        }, {
            title: '住址',
            width: '20%',
            dataIndex: 'address'
        }, {
            title: '备注',
            width: '20%',
            dataIndex: 'remark',
            render(text) {
                return <a href={text} rel="noopener noreferrer" target="_blank">博客园</a>
            }
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'operate'
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
          <div className="myTable">
              <div>
                  <h3>
                  表格的标题
                  </h3>
              </div>
            <Table scroll={{ y: 550 }} rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
          </div>
        )
    }
}
