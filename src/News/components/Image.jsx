import React, { Component } from 'react';
import {Avatar} from 'antd';
import '../styles/NewsItem.scss'


class Image extends Component {
  constructor(){
    super();
    this.state = {
      imgErr: false
    }
  }

  handleError = () => {
    this.setState({
      imgErr: true
    })
  };

  render() {
    let item;
    if (this.state.imgErr) {
      if (this.props.type === "list") {
        item =
          <Avatar
            shape="square"
            size={100}
            style={{ borderRadius: '10px', fontSize: '40px', color: '#13c2c2', backgroundColor: '#e6fffb'}}>
            {this.props.source[0]}
          </Avatar>
      }
      else {
        item = null;
      }
    }
    else {
      item = <img alt="logo" src={this.props.address} onError={this.handleError}/>;
    }
    return (
      item
    )
  }
}

export default Image