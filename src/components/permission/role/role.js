import React, { Component } from 'react';
import './index.scss'
import { Table, Form, Select, Button, Divider, Popconfirm, Modal, Input, message, Pagination } from 'antd'
import role from '@src/request/permission/role'
import AddDialog from './addDialog'


const { Option } = Select;
const { TextArea } = Input;


class RoleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            loading: false,
            visible: false,
            searchForm: {
                status: '',
                count: 10
            },
            statusOption: [{ name: '已删除', value: '0' }, { name: '正常', value: '1' }],
            page: {
                total: 0,
                index: 1,
                size: 10
            },
            role: {}
        }
    }



    componentWillMount() {
        this.onSearch()
    }

    onChange(value) {
        let status = value === undefined ? '' : value
        this.setState({
            searchForm: { status: status }
        })
    }

    successMessage = () => {
        message.success('操作成功');
    }

    editForm = (formData) => { // 编辑的时候设置用户信息
        this.setState({
            ifShow: true
        })
        this.refs.addDialogRole.initData(formData)
    }

    /**
    * 复制，和编辑一样，就是没有id
    */

    copyForm = (formData) => {
        console.log(formData)
        formData.role.rid = ''
        this.setState({
            ifShow: true
        })
        this.refs.addDialogRole.initData(formData)
    }

    addDialog = () => { // 添加的对话框
        this.refs.addDialogRole.initData()
    }

    showModal = () => { // 显示对话框
        this.setState({
            visible: true,
        });
    };

    beforeHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let role = Object.assign({}, this.state.role, values)
                this.setState({
                    role: role
                })
                this.handleOk(role)
            }
        });
    }

    handleOk = (formData) => { // 确定
        this.setState({ loading: true });
        role.addRole(formData).then((res) => {
            message.success('操作成功')
            this.setState({ loading: false, visible: false });
            this.onSearch()
        }).catch((error) => {
            console.log(error)
        })
    };

    handleCancel = () => { // 取消
        this.setState({ visible: false });
    };

    changeRoleName(e) {
        let roleName = e.target.value
        let role = Object.assign({}, this.state.role, { roleName: roleName })
        this.setState({
            role: role
        })
    }



    handleDelete(row) {
        const status = row.role.status === '1' ? '0' : '1'
        let params = {
            rid: row.role.rid,
            status: status
        }
        role.delRole(params).then((res) => {
            this.successMessage()
            this.onSearch()
        }).catch((error) => {
            console.log(error)
        })
    }

    changePage(value) {
        let index = value
        let page = Object.assign({}, this.state.page, { index: index })
        this.setState({
            page: page
        })
        this.onSearch(value)
    }

    onHandleSearch() { // 点击按钮的时候重新从0开始
        let index = 1
        let page = Object.assign({}, this.state.page, { index: index })
        this.setState({
            page: page
        })
        this.onSearch(1)
    }

    onSearch(pageIndex) {
        let status = this.state.searchForm.status
        let index = Number(this.state.page.index) - 1
        let start = (typeof pageIndex !== "number") ? index * 10 : (pageIndex - 1) * 10
        let end = start + 10
        let form = {
            start: start,
            end: end,
            status: status
        }

        role.getRoleListWithUid(form).then((res) => {
            let length = res.total
            let page = Object.assign({}, this.state.page, { total: length })
            this.setState({
                page: page,
                tableList: res.list
            })
        }).catch((error) => {
            console.log(error)
        })
    }



    render() {
        const { visible, loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const options = this.state.statusOption.map(d => <Option key={d.value}>{d.name}</Option>);
        const columns = [
            {
                title: '角色id',
                key: 'rid',
                render: (text, record) => (
                    <span>
            {record.role.rid}
          </span>
                )
            },
            {
                title: '角色名字',
                key: 'roleName',
                render: (text, record) => (
                    <span>
            {record.role.roleName}
          </span>
                )
            },
            {
                title: '角色描述',
                key: 'desc',
                render: (text, record) => (
                    <span>
            {record.role.desc}
          </span>
                )
            },
            {
                title: '状态',
                key: 'status',
                render: (text, record) => (
                    <span>
            {record.role.status === '1' ? '正常' : '已删除'}
          </span>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
            <Button size="small" type="primary" onClick={this.editForm.bind(this, record)}>修改</Button>
            <span className="btn-copy">
              <Button  size="small" type="primary" onClick={this.copyForm.bind(this, record)}>复制</Button>
            </span>
            <Divider type="vertical" />
            <Popconfirm cancelText="取消" okText="确认" title={record.role.status === '1' ? '确认删除此数据吗' : '确认恢复此数据吗'}
                        onConfirm={() => this.handleDelete(record)}>
              <Button  size="small" type={record.role.status === '1' ? 'danger' : 'primary'}>{record.role.status === '1' ? '删除' : '恢复'}</Button>
            </Popconfirm>
          </span>
                ),
            }
        ];

        return (
            <div>
                <div className="main-div">
                    <div className="search-div">
                        <span className="role-type">角色状态</span>
                        <Select
                            style={{ width: 200 }}
                            placeholder="请选择"
                            allowClear={true}
                            onChange={this.onChange.bind(this)}
                        >
                            {options}
                        </Select>
                        <span className="button-div">
              <Button type="primary" icon="search" onClick={this.onHandleSearch.bind(this)}>搜索</Button>
            </span>
                        <span className="button-add-div">
              <Button type="primary" onClick={this.addDialog}>添加</Button>
            </span>
                    </div>
                    <div className="table-div">
                        <Table pagination={false} dataSource={this.state.tableList} columns={columns} >
                        </Table>
                        <div className="page-div">
                            <Pagination
                                onChange={this.changePage.bind(this)}
                                className="page"
                                current={this.state.page.index}
                                total={this.state.page.total}
                                showTotal={total => `共 ${total} 条`}
                                pageSize={this.state.page.size}
                                defaultCurrent={this.state.page.index}
                            />
                        </div>
                    </div>
                </div>


                <div>
                    <AddDialog ref="addDialogRole" onSearch={this.onSearch.bind(this)}
                               visible={this.state.visible} ifShow={this.state.ifShow}/>
                </div>
                <div>
                    <Modal
                        width={450}
                        visible={visible}
                        title="新增权限"
                        onOk={this.beforeHandleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.beforeHandleOk}>
                                确认
                            </Button>,
                        ]}
                    >

                        <div className="margin-top-5">
                            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                                <Form.Item label="权限名字">
                                    {getFieldDecorator('roleName', {
                                        rules: [{ required: true, message: '请输入' }],
                                    })(<Input onChange={this.changeRoleName.bind(this)} className="short-input" placeholder="请输入" />)}
                                </Form.Item>


                                <Form.Item label="角色描述">
                                    {getFieldDecorator('desc', {
                                        rules: [{ required: false, message: '请输入' }],
                                    })(<TextArea
                                        autosize={{ minRows: 3, maxRows: 5 }}
                                        className="short-input" placeholder="请输入" />)}
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

RoleForm = Form.create({})(RoleForm);

export default RoleForm