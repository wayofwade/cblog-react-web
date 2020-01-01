/**
 * Created by Administrator on 2020/1/1.
 */
import React, { Component } from 'react';

import { Button, message, Form, Modal, Input, Transfer,Select,Row, Col } from 'antd'

import menu from '@src/request/permission/menu'

import role from '@src/request/permission/role'

const { Option } = Select;



class menuForm extends Component {

    constructor(props) {

        super(props)

        this.state = {

            menu: {isParent: '0', isDefault: '0'}, // 初始化的数据

            uploading: false,

            mockData: [],

            targetKeys: [],

            ridList: []

        }

    }

    componentWillMount() {

        this.getRoleList();

    }

    componentDidMount() {

    }

    async getRoleList() {

        let targetKeys = [];

        let mockData = [];

        // 请求后端的角色数据

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

        this.setState({ mockData, targetKeys });

    };

    // 穿梭框过滤标题

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = targetKeys => {

        this.setState({ targetKeys });

        this.props.setTarget(targetKeys)

    };

    handleSearch = (dir, value) => {

        console.log('search:', dir, value);

    };

    beforeHandleOk = () => {

        this.props.form.validateFields((err, values) => {

            if (!err) {

                let menu = Object.assign({}, this.state.menu, values)

                this.setState({

                    menu: menu

                })

                this.handleOk(menu)

            }

        });

    }

    handleOk = (formData) => { // 确定

        this.setState({ loading: true });

        // 原始的数据

        let ridList = JSON.parse(JSON.stringify(this.props.ridList))

        // 现在的右边的数据

        let targetKeys = this.props.targetKeys

        this.setState({ loading: false });

        // 求出addList  delList

        let addList = []

        let delList = []

        addList = targetKeys.filter((item, index) => {

            return ridList.indexOf(item) === -1

        })

        delList = ridList.filter((item, index) => {

            return targetKeys.indexOf(item) === -1

        })

        formData = Object.assign({}, this.props.formData, formData)

        let data = {

            menu: formData,

            ridList: targetKeys,

            addList: formData.mid ? addList : targetKeys, // 有mid就是编辑。没有mid就是复制

            delList: delList

        }

        // 父组件请求后端

        this.props.submitForm(data)

    };


    handleCancel = () => {

        this.props.closeListDialog()

    }

    /**

     * 此菜单为父组件的时候设置这个父组件为0

     * @param {*} value

     */

    changeIsParent(value){

        const data = (value === '1') ? {isParent: value, pid: ''} : {isParent: value}

        const formData = Object.assign({}, this.props.formData,data)

        this.props.setFormData(formData)

        // 修改form的值

        this.props.form.setFieldsValue({pid: ''})

    }

    changeIsDefault(value){

        const data = (value === '1') ? {isDefault: value} : {isDefault: value}

        const formData = Object.assign({}, this.props.formData,data)

        this.props.setFormData(formData)

    }


    changeParentName(value) {

        const formData = Object.assign({}, this.props.formData,{pid: value})

        this.props.setFormData(formData)

    }

    render() {

        const { getFieldDecorator } = this.props.form;

        let parentList = this.props.parentList

        parentList = parentList.map((item,index) => {

            item.mid = String(item.mid)

            return item

        })

        const optionList = [];

        for (let i = 0; i < parentList.length; i++) {

            optionList.push(<Option key={parentList[i].mid}>{parentList[i].name}</Option>);

        }

        return (

            <div>

                <Modal

                    width={750}

                    visible={this.props.ifShow}

                    title="新增菜单弹窗"

                    onOk={this.beforeHandleOk}

                    onCancel={this.handleCancel}

                    footer={[

                        <Button key="back" onClick={this.handleCancel}>

                            取消

                        </Button>,

                        <Button key="submit" type="primary" loading={false} onClick={this.beforeHandleOk}>

                            确认

                        </Button>,

                    ]}

                >

                    <div className="margin-top-5">


                        <Form labelCol={{ span: 7}} wrapperCol={{ span: 12 }}>





                            <Row gutter={16}>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="名称">

                                            {getFieldDecorator('name', {

                                                rules: [{ required: true, message: '请输入' }],

                                            })(<Input className="short-input" placeholder="请输入" />)}

                                        </Form.Item>

                                    </div>

                                </Col>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="组件名称">

                                            {getFieldDecorator('component', {

                                                rules: [{ required: this.props.formData.isParent === '0', message: '请输入' }],

                                            })(<Input

                                                className="short-input" placeholder="请输入" />)}

                                        </Form.Item></div>

                                </Col>

                            </Row>


                            <Row gutter={16}>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="url">

                                            {getFieldDecorator('url', {

                                                rules: [{ required: true, message: '请输入' }],

                                            })(<Input

                                                className="short-input" placeholder="请输入" />)}

                                        </Form.Item>

                                    </div>

                                </Col>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="图标">

                                            {getFieldDecorator('icon', {

                                                rules: [{ required: this.props.formData.isParent !== '0', message: '请输入' }],

                                            })(<Input

                                                className="short-input" placeholder="请输入" />)}

                                        </Form.Item>

                                    </div>

                                </Col>

                            </Row>


                            <Row gutter={16}>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="排序">

                                            {getFieldDecorator('order', {

                                                rules: [{ required: false, message: '请输入' }],

                                            })(<Input

                                                className="short-input" placeholder="请输入" />)}

                                        </Form.Item>

                                    </div>

                                </Col>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">



                                        <Form.Item label="是否父菜单">

                                            {getFieldDecorator('isParent', {

                                                rules: [{ required: true, message: '请输入' }],

                                            })(<Select key="h" style={{ width: 120 }} onChange={this.changeIsParent.bind(this)}>

                                                <Option value="1">是</Option>

                                                <Option value="0">否</Option>

                                            </Select>)}

                                        </Form.Item>

                                    </div>

                                </Col>

                            </Row>



                            <Row gutter={16}>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        {/* 赋值的时候-没有出现-已经渲染好了--然后再赋值------------后续才进行判断的 */}

                                        <Form.Item label="父菜单名称">

                                            {getFieldDecorator('pid', {

                                                rules: [{ required: this.props.formData.isParent === '0', message: '请输入' }],

                                            })(<Select

                                                value={this.props.formData.pid || ""}

                                                disabled={this.props.formData.isParent !== '0'}

                                                placeholder="请选择"

                                                onChange={this.changeParentName.bind(this)}

                                                style={{ width: 160}}

                                            >

                                                {optionList}

                                            </Select>)}

                                        </Form.Item>

                                    </div>

                                </Col>

                                <Col className="gutter-row" span={12}>

                                    <div className="gutter-box">

                                        <Form.Item label="是否默认菜单">

                                            {getFieldDecorator('isDefault', {

                                                rules: [{ required: true, message: '请输入' }],

                                            })(<Select key="h" style={{ width: 120 }} onChange={this.changeIsDefault.bind(this)}>

                                                <Option value="1">是</Option>

                                                <Option value="0">否</Option>

                                            </Select>)}

                                        </Form.Item>

                                    </div>

                                </Col>

                            </Row>



                        </Form>

                        <div className="menu-role-div">

                            <div className="menu-role-div-title">所属角色</div>

                            <Transfer

                                listStyle={{

                                    width: 300,

                                    height: 360,

                                    textAlign: 'left'

                                }}

                                dataSource={this.state.mockData}

                                showSearch

                                filterOption={this.filterOption}

                                targetKeys={this.props.targetKeys}

                                onChange={this.handleChange}

                                onSearch={this.handleSearch}

                                render={item => item.title}

                            />

                        </div>

                    </div>

                </Modal>

            </div>

        )

    }

}



// 新建form组件。然后把form组件引入到弹窗。最后export弹窗组件

const MenuForm = Form.create({ name: 'menu' })(menuForm);

export default class addDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            ifShow: false,

            ridList: [],

            formData: {}, // form的数据

            initForm: { // 初始化的数据

                name: '',

                component: '',

                url: '',

                icon: '',

                order: '',

                isParent: '0',

                isDefault: '0',

                pid: ''

            }

        }

    }


    closeListDialog(needSearch = false) {

        this.setState({

            ifShow: false

        })

        needSearch && this.props.onSearch() && this.props.searchFatherMenu()

    }

    reqData() {

        let data = this.props.getBoardData()

        return data

    }

    /**

     * 初始化数据

     */

    initData(datas = {}) {

        let data = JSON.parse(JSON.stringify(datas))

        const menu = data.menu || this.state.initForm

        const ridList = data.ridList || []

        if (menu) { // 修改的时候

            menu.pid = String(menu.pid || "")

            this.refs.menus1.setFieldsValue(menu)

        } else {

            this.refs.menus1.setFieldsValue(menu)

        }

        this.setState({

            formData: menu,

            targetKeys: JSON.parse(JSON.stringify(ridList)),

            ridList: JSON.parse(JSON.stringify(ridList))

        })

        this.setState({

            ifShow: true

        })

    }

    /**

     * 子组件调用

     * @param {*} targetKeys

     */

    setTarget(targetKeys){

        this.setState({

            targetKeys: targetKeys

        })

    }

    /**

     * 设置表单的数据

     * @param {*} formData

     */

    setFormData(formData){

        formData.pid = formData.pid || ""

        this.setState({

            formData: formData

        })

    }

    submitForm (data){

        menu.addMenu(data).then((res) => {

            message.success('操作成功')

            this.closeListDialog(true)

        }).catch((error) => {

            console.error(error)

        })

    }


    render() {

        return (

            <MenuForm ref="menus1" submitForm={this.submitForm.bind(this)}

                      targetKeys={this.state.targetKeys}

                      ridList={this.state.ridList}

                      formData={this.state.formData} ifShow={this.state.ifShow}

                      visible={this.state.visible} parentList={this.props.parentList}

                      setTarget={this.setTarget.bind(this)}

                      setFormData={this.setFormData.bind(this)}

                      closeListDialog={this.closeListDialog.bind(this)} />

        )

    }

}