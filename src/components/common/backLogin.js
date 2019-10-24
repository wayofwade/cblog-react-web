/**
 * Created by Administrator on 2019/10/23.
 */
import { Modal } from 'antd';

import React from 'react'


class BackLogin extends React.Component {


    constructor(props) {

        super(props);

        this.state = {

            visible: false

        }

    }


    componentWillMount () {

        window.showModal = this.showModal

        window.handleCancel = this.handleCancel

        window.handleOk = this.handleOk

    }

    showModal = () => {

        this.setState({

            visible: true

        });

    };


    handleOk = e => { // 跳转到登录页面

        console.log(e);

        this.props.history.push('/login')

        this.setState({

            visible: false,

        });

    };


    handleCancel = e => {

        console.log(e);

        this.setState({

            visible: false,

        });

    };


    render() {

        return (

            <div>

                <Modal

                    maskClosable={false}

                    closable={false}

                    title="提示"

                    cancelText="取消"

                    okText="重新登录"

                    visible={this.state.visible}

                    onOk={this.handleOk}

                    onCancel={this.handleCancel}

                >

                    <p>登录信息过期，请重新登录</p>

                </Modal>

            </div>

        );

    }

}


export default BackLogin


