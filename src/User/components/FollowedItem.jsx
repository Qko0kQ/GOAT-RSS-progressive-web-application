import React, { Component } from 'react';
import {Avatar, Card, Button, message} from "antd";
import "../styles/FollowedItem.scss";
import {Link} from "react-router-dom";
import axios from "axios";
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";

class FollowedItem extends Component {

  handleUnfollow = () => {
    UserStore.state.loading = true;
    axios.put(`http://18.191.243.106:3000/api/user/${UserStore.user.uid}`, {name:this.props.name, type: this.props.type}).then( res => {
          message.success(`Delete ${this.props.name} successfully!`);
          delete (UserStore.user.channels[this.props.name]);
          UserStore.state.loading = false;
        }
    )
  };

  render() {
      return (
        <Card className="item-card">
          <div className="item-container">
            <Link to={this.props.type==='other'? "/news/" : `/news/?${this.props.type}=${this.props.name}`}>
              <Avatar size={50} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {this.props.name[0].toUpperCase()}
              </Avatar>
            </Link>
            <div className="item-description">
              <Link to={this.props.type==='other'? "/news/" : `/news/?${this.props.type}=${this.props.name}`}>
                {this.props.name.toUpperCase()}
              </Link>
            </div>
            <div className="item-operation">
              <Button shape="circle" icon="delete" type="danger" disabled={UserStore.user.loading} onClick={this.handleUnfollow}/>
            </div>
          </div>
        </Card>
      );
    }
}

decorate(FollowedItem, {
  FollowedItem: observer,
});

export default FollowedItem;