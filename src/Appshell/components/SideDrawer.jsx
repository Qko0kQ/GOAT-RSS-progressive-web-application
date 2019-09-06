import React, { Component } from 'react';
import {Drawer, Button, Menu, Icon} from 'antd';
import "../styles/SideDrawer.scss";

const SubMenu = Menu.SubMenu;
const categories = [{key:"business", name:"Business", type:"dollar"},
    {key:"technology", name:"Technology", type:"laptop"},
    {key:"entertainment", name:"Entertainment", type:"coffee"},
    {key:"sports", name:"Sports", type:"trophy"},
    {key:"science", name:"Science", type:"experiment"},
    {key:"health", name:"Health", type:"heart"},];

class SideDrawer extends Component {
    state = { visible: false, placement: 'left' };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleClick = (e) => {
    };

    renderMenu = () => <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
    >
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>My Subscriptions</span></span>}>
            <Menu.Item key="1"><Icon type="eye" />My News</Menu.Item>
            <Menu.Item key="2"><Icon type="pushpin" />My Sites</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="solution" /><span>Categories</span></span>}>
            {categories.map(item =>
                <Menu.Item key={item.key}>
                    <Icon type={item.type} />
                    <a style={{display: "initial"}} href={`/news/?category=${item.key}`}>{item.name}</a>
                </Menu.Item>)}
        </SubMenu>
    </Menu>;

    render() {
        return(
            <div>
                <Button shape="circle" icon="bars" size="large" onClick={this.showDrawer} style={{border: "none"}}/>
                <Drawer
                    placement="left"
                    title="GOATNews"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.renderMenu()}
                </Drawer>
            </div>
        );
    }
}

export default SideDrawer;