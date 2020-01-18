import React, {Component} from 'react';
import {Table, Form, Select, Button, Divider, Popconfirm, Modal, Input, message, Pagination, Transfer} from 'antd'
import user from '@src/request/permission/user'
import role from '@src/request/permission/role'
import userCss from './style/user.module.css'
const {Option} = Select;

class userForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ridList: [], // 编辑的时候初始化的rid数据
            mockData: [],
            targetKeys: [],
            tableList: [],
            loading: false,
            visible: false,
            searchForm: {
                status: '',
                count: 10
            },
            statusOption: [{name: '已删除', value: '0'}, {name: '正常', value: '1'}],
            page: {
                total: 0,
                index: 1,
                size: 10
            },
            user: {},
            isAddStatus: true // 默认是添加的状态
        }
    }

    componentWillMount() {
        // this.getMock();
        this.onSearch()
    }

    async getMock() {
        let targetKeys = [];
        let mockData = [];
        // 请求后端的角色数据
        let data = {
            status: 1,
            start: 0,
            size: 100
        }
        let req = await role.getRoleList(data)
        let realData = req.list.map((item, index) => {
            return {
                key: item.rid,
                title: item.roleName,
                chosen: false
            }
        })
        mockData = [...realData]
        this.setState({mockData, targetKeys});
    };

    // 穿梭框过滤标题
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({targetKeys});
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    onChange(value) {
        let status = value === undefined ? '' : value
        this.setState({
            searchForm: {status: status}
        })
    }

    successMessage = () => {
        message.success('操作成功');
    }

    /**
     * 编辑按钮
     */
    editForm = (formData) => {
        this.setState({
            isAddStatus: false
        })
        console.log(formData)
        const newUser = formData
        // 清空选择
        let mockData = this.state.mockData
        mockData = mockData.map((item, index) => {
            item.chosen = false
            return item
        })
        this.setState({
            user: newUser
        })
        this.props.form.setFieldsValue({
            username: newUser.username,
            password: newUser.password
        });
        this.showModal()
    }
    addDialog = () => { // 添加的对话框
        const user = {
            username: '',
            password: ''
        }
        this.setState({
            user: user,
            targetKeys: [],
            ridList: []
        })
        this.props.form.setFieldsValue({
            username: '',
            password: ''
        });
        this.showModal()
    }
    showModal = () => { // 显示对话框
        this.setState({
            visible: true,
        });
    };
    beforeHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let user = Object.assign({}, this.state.user, values)
                this.setState({
                    user: user
                })
                this.handleOk(user)
            }
        });
    }

    /**
     * 添加用户或者编辑用户点击确定
     * @param formData
     */
    handleOk = (formData) => { // 确定
        const {isAddStatus} = this.state

        console.log(formData)
        if (isAddStatus) {
            let data = {
                username: formData.username,
                password: formData.password
            }
            user.addUser(data).then((res) =>{
                message.success('操作成功')
                this.setState({
                    visible: false,
                });
                this.onSearch()
            })
        } else {
            let data = {
                username: formData.username,
                password: formData.password,
                uid: formData.uid
            }
            user.addUser(data).then((res) =>{
                message.success('操作成功')
                this.setState({
                    visible: false,
                });
                this.onSearch()
            })
        }

    };
    handleCancel = () => { // 取消
        this.setState({visible: false});
    };

    handleDelete(row) {
        const status = row.status === '1' ? '0' : '1'
        let params = {
            id: row.uid,
            status: status
        }
        user.delUser(params).then((res) => {
            this.successMessage()
            this.onSearch()
        }).catch((error) => {
            console.log(error)
        })
    }

    changePage(value) {
        let index = value
        let page = Object.assign({}, this.state.page, {index: index})
        this.setState({
            page: page
        })
        this.onSearch(value)
    }

    onHandleSearch() { // 点击按钮的时候重新从0开始
        let index = 1
        let page = Object.assign({}, this.state.page, {index: index})
        this.setState({
            page: page
        })
        this.onSearch(1)
    }

    onSearch(pageIndex) {
        let status = this.state.searchForm.status
        let index = Number(this.state.page.index) - 1
        let start = (typeof pageIndex !== "number") ? index * 10 : (pageIndex - 1) * 10
        let end = start + 10
        let form = {
            start: start,
            size: 10,
            status: status
        }
        user.getUsers(form).then((res) => {
            console.log(res)
            let length = res.total
            let page = Object.assign({}, this.state.page, {total: length})
            this.setState({
                page: page,
                tableList: res.list
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {visible, loading} = this.state;
        const {getFieldDecorator} = this.props.form;
        const options = this.state.statusOption.map(d => <Option key={d.value}>{d.name}</Option>);
        const columns = [
            {
                title: '用户id',
                key: 'uid',
                render: (text, record) => (
                    <span>
            {record.uid}
          </span>
                )
            },
            {
                title: '用户名字',
                key: 'username',
                render: (text, record) => (
                    <span>
            {record.username}
          </span>
                )
            },
            {
                title: '用户密码',
                key: 'password',
                render: (text, record) => (
                    <span>
            {record.password}
          </span>
                )
            },
            {
                title: '创建时间',
                key: 'createTime',
                render: (text, record) => (
                    <span>
            {record.createTime}
          </span>
                )
            },
            {
                title: '修改时间',
                key: 'updateTime',
                render: (text, record) => (
                    <span>
            {record.updateTime}
          </span>
                )
            },
            {
                title: '状态',
                key: 'status',
                render: (text, record) => (
                    <span>
            {record.status === '1' ? '正常' : '已删除'}
          </span>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
            <Button size="small" type="primary" onClick={this.editForm.bind(this, record)}>修改</Button>
            <Divider type="vertical"/>
            <Popconfirm cancelText="取消" okText="确认" title={record.status === '1' ? '确认删除此数据吗' : '确认恢复此数据吗'}
                        onConfirm={() => this.handleDelete(record)}>
              <Button size="small"
                      type={record.status === '1' ? 'danger' : 'primary'}>{record.status === '1' ? '删除' : '恢复'}</Button>
            </Popconfirm>
          </span>
                ),
            }
        ];
        return (
            <div>
                <div className="main-div">
                    <div className="search-div">
                        <span className="user-type">状态</span>
                        <Select
                            style={{width: 200}}
                            placeholder="请选择"
                            allowClear={true}
                            onChange={this.onChange.bind(this)}
                        >
                            {options}
                        </Select>
                        <span className="button-div">
              <Button type="primary" icon="search" onClick={this.onHandleSearch.bind(this)}>
                搜索
                </Button>
            </span>
                        <span className="button-add-div">
              <Button type="primary" onClick={this.addDialog}>
                添加
              </Button>
            </span>
                    </div>
                    <div className="table-div">
                        <Table pagination={false} dataSource={this.state.tableList} columns={columns}>
                        </Table>
                        <div className="page-div">
                            <Pagination
                                onChange={this.changePage.bind(this)}
                                className="page"
                                current={this.state.page.index}
                                total={this.state.page.total}
                                showTotal={total => `共 ${total} 条`}
                                pageSize={this.state.page.size}
                                defaultCurrent={this.state.page.index}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Modal
                        width={750}
                        visible={visible}
                        title="新增"
                        onOk={this.beforeHandleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.beforeHandleOk}>
                                确认
                            </Button>,
                        ]}
                    >
                        <div className="margin-top-5">
                            <Form labelCol={{span: 5}} wrapperCol={{span: 12}}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '请输入'}],
                                    })(<Input className="short-input" placeholder="请输入"/>)}
                                </Form.Item>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入'}],
                                    })(<Input
                                        className="short-input" placeholder="请输入"/>)}
                                </Form.Item>
                            </Form>

                            <div>所属角色</div>
                            <Transfer
                                listStyle={{
                                    width: 300,
                                    height: 300,
                                    textAlign: 'left'
                                }}

                                dataSource={this.state.mockData}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                onSearch={this.handleSearch}
                                render={item => item.title}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

userForm = Form.create({})(userForm);
export default userForm