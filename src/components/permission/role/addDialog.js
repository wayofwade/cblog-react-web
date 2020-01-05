/**
 * Created by Administrator on 2020/1/5.
 */
import React, { Component } from 'react';
import { Button, message, Form, Modal, Input, Transfer,Row, Col  } from 'antd'
import role from '@src/request/permission/role'
import user from '@src/request/permission/user'


const { TextArea } = Input;




class menuForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: {}, // 初始化的数据
            uploading: false,
            mockData: [],
            targetKeys: [],
            uidList: []
        }
    }

    componentWillMount() {
        this.getUsers();
    }

    componentDidMount() {
    }

    async getUsers() {
        let targetKeys = [];
        let mockData = [];
        // 请求后端的角色数据
        let data = {
            status: 1,
            start: 0,
            size: 200
        }
        let req = await user.getUsers(data)
        console.log(req)

        let realData = req.list.map((item, index) => {
            return {
                key: item.user.uid,
                title: item.user.username,
                chosen: false
            }
        })
        mockData = [...realData]
        this.setState({ mockData, targetKeys });
    };
    // 穿梭框过滤标题
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
        this.props.setTarget(targetKeys)
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    beforeHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let menu = Object.assign({}, this.state.menu, values)
                this.setState({
                    menu: menu
                })
                this.handleOk(menu)
            }
        });
    }

    handleOk = (formData) => { // 确定
        this.setState({ loading: true });

        formData = Object.assign({}, this.props.formData, formData)
        let uidList = JSON.parse(JSON.stringify(this.props.uidList))
        // 现在的右边的数据
        let targetKeys = this.props.targetKeys
        this.setState({ loading: false });
        // 求出addList  delList
        let addList = []
        let delList = []
        addList = targetKeys.filter((item, index) => {
            return uidList.indexOf(item) === -1
        })
        delList = uidList.filter((item, index) => {
            return targetKeys.indexOf(item) === -1
        })

        let data = {
            role: formData,
            uidList: targetKeys,
            addList: formData.rid ? addList : targetKeys, // 复制的时候addList等于uidList
            delList: delList
        }
        // 父组件请求后端
        this.props.submitForm(data)
    };



    handleCancel = () => {
        this.props.closeListDialog()
    }

    /**
      * 修改菜单
     */
    changeMenu(mid) {
        console.log(mid)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    width={750}
                    visible={this.props.ifShow}
                    title="新增菜单弹窗"
                    onOk={this.beforeHandleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={false} onClick={this.beforeHandleOk}>
                            确认
                        </Button>,
                    ]}
                >
                    <div className="margin-top-5">
                        <Form labelCol={{ span: 7}} wrapperCol={{ span: 12 }}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <div className="gutter-box">
                                        <Form.Item label="权限名称">
                                            {getFieldDecorator('roleName', {
                                                rules: [{ required: true, message: '请输入' }],
                                            })(<Input className="short-input" placeholder="请输入" />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <div className="gutter-box">
                                        <Form.Item label="描述">
                                            {getFieldDecorator('desc', {
                                                rules: [{ required: false, message: '请输入' }],
                                            })(<TextArea
                                                autosize={{ minRows: 3, maxRows: 5 }}
                                                className="short-input" placeholder="请输入" />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                        </Form>

                        <div className="menu-role-div">
                            <div className="menu-role-div-title">用户</div>
                            <Transfer
                                listStyle={{
                                    width: 300,
                                    height: 360,
                                    textAlign: 'left'
                                }}
                                dataSource={this.state.mockData}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.props.targetKeys}
                                onChange={this.handleChange}
                                onSearch={this.handleSearch}
                                render={item => item.title}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}




// 新建form组件。然后把form组件引入到弹窗。最后export弹窗组件

const MenuForm = Form.create({ name: 'menu' })(menuForm);

export default class addDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifShow: false,
            uidList: [],
            paths: [], // 菜单的默认数据
            formData: {}, // form的数据
            initForm: { // 初始化的数据
                roleName: '',
                desc: '',
                rid: ''
            }
        }
    }



    closeListDialog(needSearch = false) {
        this.setState({
            ifShow: false
        })
        needSearch && this.props.onSearch() && this.props.searchFatherMenu()
    }

    reqData() {
        let data = this.props.getBoardData()
        return data

    }

    /**
      * 通过id获取路径
      * @param {*} mid 
      */

    getPath(mid) {
        // mid = 3
        let list = this.props.allMenuList
        // list = [{value: 2, children: [{value: 4, children: [{value: 3, children:[]}]}]}]
        let path = []
        // 查找mid的路径
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (item.value === mid) {
                path = [item.value]
                break
            }
            path = [item.value]
            path = this.transData(mid, item.children,path)
            if (path.includes(mid)) {
                break
            }
        }
        return path
    }

    transData(mid, list, path) {
        list.forEach((item,index) => {
            if(item.value === mid) {
                path.push(mid)
                return path
            } else {
                if (item.children && item.children.length > 0) {
                    path.push(item.value)
                    path = this.transData(mid, item.children, path)
                }
                return path
            }
        })
        return path
    }



    /**
      * 初始化数据
      */
    initData(datas = null) {
        let data = JSON.parse(JSON.stringify(datas))
        const role = data ? data.role : this.state.initForm
        const uidList = data ? data.uidList : []
        if (datas) { // 修改的时候
            role.rid = String(role.rid || "")
            this.refs.menus.setFieldsValue(role)
        } else {
            this.refs.menus.setFieldsValue(role)
        }

        this.setState({
            formData: role,
            targetKeys: JSON.parse(JSON.stringify(uidList)),
            uidList: JSON.parse(JSON.stringify(uidList))
        })

        setTimeout(() =>{
            this.setState({
                ifShow: true
            })
        }, 10)
    }
    /**
      * 子组件调用
      * @param {*} targetKeys 
      */
    setTarget(targetKeys){
        this.setState({
            targetKeys: targetKeys
        })
    }
    /**
      * 设置表单的数据
      * @param {*} formData 
      */
    setFormData(formData){
        formData.pid = formData.pid || ""
        this.setState({
            formData: formData
        })
    }

    submitForm (data){
        role.addRole(data).then((res) => {
            message.success('操作成功')
            this.closeListDialog(true)
        }).catch((error) => {
            console.error(error)
        })
    }


    render() {
        return (
            <MenuForm ref="menus" 
                      submitForm={this.submitForm.bind(this)}
                      targetKeys={this.state.targetKeys} 
                      paths={this.state.paths}
                      uidList={this.state.uidList}
                      formData={this.state.formData} 
                      ifShow={this.state.ifShow}
                      visible={this.state.visible}
                      allMenuList={this.props.allMenuList}
                      setTarget={this.setTarget.bind(this)}
                      setFormData={this.setFormData.bind(this)}
                      closeListDialog={this.closeListDialog.bind(this)} />
        )
    }
}