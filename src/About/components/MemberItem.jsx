import React, { Component } from 'react';
import {Tag, Icon, Button} from 'antd';
import Image from '../../News/components/Image';
import "../../News/styles/NewsItem.scss";



class MemberItem extends Component {
  render() {
    let tags;
    if (this.props.item.hashtags) {
      tags = this.props.item.hashtags.map(item =>
          <Tag color="cyan">{item}</Tag>
      )
    }
    return (
        <div className="round-container">
          <div className="content" style={{display:"flex"}}>
            <div className="image" style={{marginRight: "20px"}}>
              <a href={this.props.item.url}>
                <Image address={this.props.item.img} source={this.props.item.source}/>
              </a>
            </div>
            <div>
              <a href={this.props.item.url}>
                <div className="title">{this.props.item.name}</div>
              </a>
              <div className="post-time">Position: {this.props.item.position}</div>
              <div className="description">{this.props.item.description}</div>
              <div className="tags" style={{fontSize: "large"}}>Contact me:
                <Button style={{margin: "0 10px"}} icon="github" href={this.props.item.github}>Github</Button>
                <Button icon="linkedin" href={this.props.item.linkedin}>Linkedin</Button>
              </div>
            </div>
          </div>

        </div>
    )
  }
}
export default MemberItem;