/**
 * Created by Administrator on 2019/10/9.
 */
import React, { Component } from 'react';

import './style/index.scss'

import { Table, Form, Select, Button, Divider, Popconfirm, Input, message, Pagination } from 'antd'

import menu from '@src/request/permission/menu'

import operate from '@src/request/permission/operate'

import AddDialog from './addDialog'

const { Option } = Select;


class menuForm extends Component {

    constructor(props) {

        super(props);

        this.state = {

            btns: [],

            ridList: [], // 编辑的时候初始化的rid数据

            tableList: [], // 表格的数据

            menuList: [], // 原始菜单

            allMenuList: [], // 包含父子关系的菜单

            loading: false,

            visible: false,

            ifShow: false, // 弹窗的展示

            searchForm: {

                status: '',

                isParent: '',

                name: '',

                count: 10

            },

            statusOption: [{ name: '已删除', value: '0' }, { name: '正常', value: '1' }],

            page: {

                total: 0,

                index: 1,

                size: 10

            },

            menu: {}

        }

    }


    componentWillMount() {

        this.getOptBtn() // 获取当前权限的操作

        this.onSearch() // 查询表格数据

        this.searchFatherMenu() // 查询所有的原始的菜单

        this.getList()

    }

    /**

     * 当一个页面有操作权限的时候，就需要这个方法

     */

    getOptBtn() {

        const url = this.props.location.pathname

        operate.getOptBtns({url: url}).then((res) => {

            console.log(res)

            this.setState({

                btns: res.btns

            })

        }).catch((error) => {

            console.log(error)

        })

    }

    /**

     * 获取所有的菜单，父子关系的

     */

    async getList(){

        let res = {}

        try{

            res = await menu.getMenuMapList({})

            console.log(res.list)


            let allMenuList = this.transData(res.list)

            console.log(allMenuList)

            this.setState({

                allMenuList: allMenuList

            })

        }catch(e){

            console.error(e)

        }

    }

    /**

     * 进行递归操作

     * 把后端给的数据改为前端需要的

     * @param {*} list

     */

    transData(list){

        return list.map((item,index) => {

            let obj = {}

            obj.value = (item.mid)

            obj.label = item.title

            obj.children = (item.subs && item.subs.length > 0 && this.transData(item.subs)) || []

            return obj

        })

    }

    /**

     * 获取所有的菜单

     */

    searchFatherMenu(){

        let form = {

            start: 0,

            size: 200

        }

        menu.getAllList(form).then((res) => {

            this.setState({

                menuList:res.list

            })

            console.log(res.list)

        }).catch((error) => {

            console.error(error)

        })

    }




    onChange(value) {

        let status = value === undefined ? '' : value

        this.setState({

            searchForm: { status: status }

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

        this.refs.addDialog1.initData(formData)

    }

    addDialog = () => { // 添加的对话框

        this.refs.addDialog1.initData()

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

            oid: row.oid,

            status: status

        }

        operate.delOpt(params).then((res) => {

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

        let name = this.state.searchForm.name

        let index = Number(this.state.page.index) - 1

        let start = (typeof pageIndex !== "number") ? index * 10 : (pageIndex - 1) * 10

        let form = {

            start: start,

            size: 10,

            name: name,

            status: status

        }

        operate.getOptList(form).then((res) => {

            console.log(res)

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

        const data = this.state.menuList.filter((item,index) =>{

            return Number(item.mid) === pid

        })

        return data.length ? data[0].name : ''

    }


    render() {

        const options = this.state.statusOption.map(d => <Option key={d.value}>{d.name}</Option>);



        const columns = [

            {

                title: 'id',

                key: 'oid',

                render: (text, record) => (

                    <span>

            {record.opt.oid}

          </span>

                )

            },

            {

                title: '名称',

                key: 'name',

                render: (text, record) => (

                    <span>

            {record.opt.name}

          </span>

                )

            },

            {

                title: 'url',

                key: 'url',

                render: (text, record) => (

                    <span>

            {record.opt.url}

          </span>

                )

            },

            {

                title: '父菜单',

                key: 'mid',

                render: (text, record) => (

                    <span>

            {this.getParentName(record.opt.mid)}

          </span>

                )

            },

            {

                title: '状态',

                key: 'status',

                render: (text, record) => (

                    <span>

            {record.opt.status === '1' ? '正常' : '已删除'}

          </span>

                )

            },

            {

                title: '操作',

                key: 'action',

                render: (text, record) => (

                    <span>

            <Button size="small" type="primary" onClick={this.editForm.bind(this, record)}>修改</Button>

            <Divider type="vertical" />

            <Popconfirm cancelText="取消" okText="确认" title={record.opt.status === '1' ? '确认删除此数据吗' : '确认恢复此数据吗'}

                        onConfirm={() => this.handleDelete(record.opt)}>



              {this.state.btns.includes("delete")  ? <Button size="small" type={record.opt.status === '1' ? 'danger' : 'primary'}>

                  {record.opt.status === '1' ? '删除' : '恢复'}</Button> : null}



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

                        <span className="menu-type">权限名称</span>

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

                    <AddDialog ref="addDialog1" onSearch={this.onSearch.bind(this)}

                               allMenuList={this.state.allMenuList}

                               searchFatherMenu={this.searchFatherMenu.bind(this)}

                               visible={this.state.visible} ifShow={this.state.ifShow}/>

                </div>

            </div>

        )

    }

}

menuForm = Form.create({})(menuForm);

export default menuForm