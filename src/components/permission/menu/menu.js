/**
 * Created by Administrator on 2019/10/9.
 */
import React, { Component } from 'react';

import './style/index.scss'

import { Table, Form, Select, Button, Divider, Popconfirm, Input, message, Pagination } from 'antd'

import menu from '@src/request/permission/menu'

import axiosObj from '@src/axios/dataRequest'

import AddDialog from './addDialog'

const { Option } = Select;


class menuForm extends Component {

    constructor(props) {

        super(props);

        this.state = {

            ridList: [], // 编辑的时候初始化的rid数据

            tableList: [], // 所有的菜单

            parentList: [], //父菜单

            loading: false,

            visible: false,

            ifShow: false, // 弹窗的展示

            searchForm: {

                status: '',

                isParent: '',

                isDefault: '',

                name: '',

                count: 10

            },

            statusOption: [{ name: '已删除', value: '0' }, { name: '正常', value: '1' }],

            menuTypeOption: [{ name: '否', value: '0' }, { name: '是', value: '1' }],

            page: {

                total: 0,

                index: 1,

                size: 10

            },

            menu: {}

        }

    }


    componentWillMount() {

        this.onSearch() // 查询表格数据

        this.searchFatherMenu() // 查询所有的父级菜单

        // this.getList()

    }

    /**

     * 测试前端菜单接口

     */

    getList(){

        axiosObj.get({

            url: '/localApi/permission/menu/menuList',

            params: {}

        }).then((res) => {

            console.log(res)

        }).catch((error) => {

            console.error(error)

        })

    }

    /**

     * 获取所有的菜单

     */

    searchFatherMenu(){

        let form = {

            start: 0,

            type: '1', // 父级菜单

            size: 200

        }

        menu.getMenuList(form).then((res) => {

            const parentList = []

            res.list.forEach((item,index) => {

                if(item.menu.isParent === '1'){

                    parentList.push(item.menu)

                }

            })

            this.setState({

                parentList:parentList

            })

        }).catch((error) => {

            console.error(error)

        })

    }




    onChange(value) {

        let status = value === undefined ? '' : value

        let searchForm = Object.assign({},this.state.searchForm, {status: status})

        this.setState({

            searchForm: searchForm

        })

    }

    onChangeMenu (value) {

        let status = value === undefined ? '' : value

        let searchForm = Object.assign({},this.state.searchForm, {isParent: status})

        this.setState({

            searchForm: searchForm

        })

    }

    onDefaultMenu (value) {

        let status = value === undefined ? '' : value

        let searchForm = Object.assign({},this.state.searchForm, {isDefault: status})

        this.setState({

            searchForm: searchForm

        })

    }

    /**

     * 修改菜单名字

     * @param {*} data

     */

    changeName(data){

        const searchForm =  Object.assign({}, this.state.searchForm, {name: data.target.value})

        this.setState({

            searchForm: searchForm

        })

    }

    successMessage = () => {

        message.success('操作成功');

    }

    editForm = (formData) => { // 编辑的时候设置用户信息

        this.setState({

            ifShow: true

        })

        this.refs.addDialogMenu.initData(formData)

    }

    /**

     * 复制，和编辑一样，就是没有id

     */

    copyForm = (formData) => {

        formData.menu.mid = ''

        this.setState({

            ifShow: true

        })

        this.refs.addDialogMenu.initData(formData)

    }

    addDialog = () => { // 添加的对话框

        this.refs.addDialogMenu.initData()

    }

    /**

     * 关闭窗口

     */

    closeListDialog(){

        this.setState({

            ifShow: false

        })

    }


    handleDelete(row) {

        const status = row.status === '1' ? '0' : '1'

        let params = {

            mid: row.mid,

            status: status

        }

        menu.delMenu(params).then((res) => {

            this.successMessage()

            this.onSearch()

        }).catch((error) => {

            console.error(error)

        })

    }

    changePage(value) {

        let index = value

        let page = Object.assign({}, this.state.page, { index: index })

        this.setState({

            page: page

        })

        this.onSearch(value)

    }

    onHandleSearch() { // 点击按钮的时候重新从0开始

        let index = 1

        let page = Object.assign({}, this.state.page, { index: index })

        this.setState({

            page: page

        })

        this.onSearch(1)

    }

    onSearch(pageIndex) {

        let status = this.state.searchForm.status

        let {isDefault, isParent, name} = this.state.searchForm

        let index = Number(this.state.page.index) - 1

        let start = (typeof pageIndex !== "number") ? index * 10 : (pageIndex - 1) * 10

        let end = start + 10

        let form = {

            start: start,

            end: end,

            status: status,

            name: name,

            type: isParent,

            otherType: isDefault

        }

        menu.getMenuList(form).then((res) => {

            let length = res.total

            let page = Object.assign({}, this.state.page, { total: length })

            this.setState({

                page: page,

                tableList: res.list

            })

        }).catch((error) => {

            console.error(error)

        })

    }

    /**

     * 查询父级菜单的名字

     */

    getParentName(pid){

        const data = this.state.parentList.filter((item,index) =>{

            return Number(item.mid) === pid

        })

        return data.length ? data[0].name : ''

    }


    render() {

        const options = this.state.statusOption.map(d => <Option key={d.value}>{d.name}</Option>);

        const menuOptions = this.state.menuTypeOption.map(d => <Option key={d.value}>{d.name}</Option>);



        const columns = [

            {

                title: '名称',

                key: 'name',

                render: (text, record) => (

                    <span>

            {record.menu.name}

          </span>

                )

            },

            {

                title: '排序',

                key: 'order',

                render: (text, record) => (

                    <span>

            {record.menu.order}

          </span>

                )

            },

            {

                title: 'url',

                key: 'password',

                render: (text, record) => (

                    <span>

            {record.menu.url}

          </span>

                )

            },

            {

                title: '组件名字',

                key: 'component',

                render: (text, record) => (

                    <span>

            {record.menu.component}

          </span>

                )

            },

            {

                title: '是否父级',

                key: 'isParent',

                render: (text, record) => (

                    <span>

            {record.menu.isParent === '1' ? '是' : '否'}

          </span>

                )

            },

            {

                title: '是否默认',

                key: 'isDefault',

                render: (text, record) => (

                    <span>

            {record.menu.isDefault === '1' ? '是' : '否'}

          </span>

                )

            },

            {

                title: '父菜单',

                key: 'pid',

                render: (text, record) => (

                    <span>

            {this.getParentName(record.menu.pid)}

          </span>

                )

            },

            {

                title: '状态',

                key: 'status',

                render: (text, record) => (

                    <span>

            {record.menu.status === '1' ? '正常' : '已删除'}

          </span>

                )

            },

            {

                title: '操作',

                key: 'action',

                render: (text, record) => (

                    <span>

            <Button size="small" type="primary" onClick={this.editForm.bind(this, record)}>修改</Button>

            <span className="btn-copy"><Button size="small" type="primary" onClick={this.copyForm.bind(this, record)}>复制</Button></span>

            <Divider type="vertical" />

            <Popconfirm cancelText="取消" okText="确认" title={record.menu.status === '1' ? '确认删除此数据吗' : '确认恢复此数据吗'}

                        onConfirm={() => this.handleDelete(record.menu)}>

              <Button size="small" type={record.menu.status === '1' ? 'danger' : 'primary'}>

              {record.menu.status === '1' ? '删除' : '恢复'}</Button>

            </Popconfirm>

          </span>

                ),

            }

        ];

        return (

            <div className="menu-main-div">

                <div className="main-div">

                    <div className="search-div">

                        <span className="menu-type">状态</span>

                        <Select

                            style={{ width: 100 }}

                            placeholder="请选择"

                            allowClear={true}

                            onChange={this.onChange.bind(this)}

                        >

                            {options}

                        </Select>

                        <span className="menu-type">是否父菜单</span>

                        <Select

                            style={{ width: 100 }}

                            placeholder="请选择"

                            allowClear={true}

                            onChange={this.onChangeMenu.bind(this)}

                        >

                            {menuOptions}

                        </Select>

                        <span className="menu-type">是否默认菜单</span>

                        <Select

                            style={{ width: 100 }}

                            placeholder="请选择"

                            allowClear={true}

                            onChange={this.onDefaultMenu.bind(this)}

                        >

                            {menuOptions}

                        </Select>

                        <span className="menu-type">菜单名称</span>

                        <Input className="short-input" onChange={this.changeName.bind(this)}/>

                        <span className="button-div">

              <Button type="primary" icon="search" onClick={this.onHandleSearch.bind(this)}>

                搜索

                </Button>

            </span>

                        <span className="button-add-div">

              <Button  type="primary" onClick={this.addDialog}>

                添加

              </Button>

            </span>

                    </div>

                    <div className="table-div">

                        <Table pagination={false} dataSource={this.state.tableList} columns={columns} >

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

                    <AddDialog ref="addDialogMenu" onSearch={this.onSearch.bind(this)}

                               parentList={this.state.parentList} searchFatherMenu={this.searchFatherMenu.bind(this)}

                               visible={this.state.visible} ifShow={this.state.ifShow}/>

                </div>

            </div>

        )

    }

}

menuForm = Form.create({})(menuForm);

export default menuForm