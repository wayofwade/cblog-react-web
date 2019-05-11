import React from 'react'
import { Layout, Menu, Icon, Breadcrumb, Dropdown } from 'antd';
import './menu.css'

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu


export default class IndexMenu extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
        return (
            <Layout className="all-height">
              <Sider
                  className="all-height"
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
              >
                <div className="logo" />
                  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                      <Menu.Item key="1">
                          <Icon type="pie-chart" />
                          <span>Option 1</span>
                      </Menu.Item>
                      <Menu.Item key="2">
                          <Icon type="desktop" />
                          <span>Option 2</span>
                      </Menu.Item>
                      <SubMenu
                          key="sub1"
                          title={<span><Icon type="user" /><span>User</span></span>}
                      >
                          <Menu.Item key="3">Tom</Menu.Item>
                          <Menu.Item key="4">Bill</Menu.Item>
                          <Menu.Item key="5">Alex</Menu.Item>
                      </SubMenu>
                      <SubMenu
                          key="sub2"
                          title={<span><Icon type="team" /><span>Team</span></span>}
                      >
                          <Menu.Item key="6">Team 1</Menu.Item>
                          <Menu.Item key="8">Team 2</Menu.Item>
                      </SubMenu>
                      <Menu.Item key="9">
                          <Icon type="file" />
                          <span>File</span>
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <Icon
                      className="trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                  />
                        <span className="head-img">
                             <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                  <img src="../../assets/imgs/b1.jpg"/>
                                </a>
                             </Dropdown>
                        </span>
                </Header>
                <Content style={{
                    margin: '24px 16px', padding: '12px 24px', background: '#fff', minHeight: 280,
                }}
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                  Content
                </Content>
              </Layout>
            </Layout>
        );
    }
}
