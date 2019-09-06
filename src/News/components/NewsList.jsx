import React, { Component } from 'react';
import '../styles/NewsList.scss';
import {Button, Divider, Icon, Empty, Skeleton, message} from 'antd';
import axios from "axios";
import NewsItem from './NewsItem'
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";


class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      news: [],
      display: [],
      count: 1,
      following: false,
      category: "HEADLINE",
      loading: false,
      hideFollow: false
    }
  }

  componentDidMount() {
    this.isFollow(this.props);
    this.parseSearch(this.props);
  }

  parseSearch = (props) => {
    this.setState({loading: true});
    if (!props.location.search) {
      axios.get("http://18.191.243.106:3000/api/offline/").then(
        res => {
          this.setState({
            news: res.data || [],
            display: res.data.slice(0, 10),
            loading: false
          })
        }
      ).catch(err => {
        message.error("Network error");
        this.setState({loading: false});
      });
    }
    else {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      if (params.get('category')) {
        axios.get(`http://18.191.243.106:3000/api/offline/category/${params.get('category')}`).then(
          res => {
            this.setState({
              news: res.data || [],
              display: res.data.slice(0, 10),
              category: params.get('category'),
              loading: false
            })
          }
        ).catch(err => {
          message.error("Network error");
          this.setState({loading: false});
        });
      }

      else if (params.get('news')) {
        axios.get(`http://18.191.243.106:3000/api/offline/search/${params.get('news')}`).then(
            res => {
              console.log(res.data);
              this.setState({
                news: res.data || [],
                display: res.data || [],
                category: "SEARCH RESULT",
                loading: false,
                hideFollow: true,
              })
            }
        ).catch(err => {
          message.error("Network error");
          this.setState({loading: false});
        });
      }

      else if (params.get('source')) {
        axios.get(`http://18.191.243.106:3000/api/offline/source/${params.get('source')}`).then(
            res => {
              this.setState({
                news: res.data || [],
                display: res.data || [],
                category: params.get('source'),
                loading: false
              })
            }
        ).catch(err => {
          message.error("Network error");
          this.setState({loading: false});
        });
      }
    }
  };

  getType = (props) => {
    if (!props.location) {
      return "other";
    }
    const search = props.location.search;
    const params = new URLSearchParams(search);
    if (params.get('news')) return "news";
    if (params.get('category')) return "category";
    if (params.get('source')) return "source";
    return "other";
  };


  handleFollow = () => {
    axios.put(`http://18.191.243.106:3000/api/user/${UserStore.user.uid}`,
        {name: this.state.category, type: this.getType(this.props)}).then(res => {
      this.setState({following: !this.state.following});
    }).catch(err =>
        message.error("Network error")
    );
  };

  handleMore = () => {
    const currCount = this.state.count + 1;
    const currNews = this.state.news.slice(0, 10*currCount);
    this.setState({
      count: currCount,
      display: currNews
    })
  };

  isFollow = () => {
    if (!UserStore.user.channels) return false;
    let key = 'headline';
    if (this.props.location) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      key = params.get('news') || params.get('category') || params.get('source') || 'headline';
    }

    return (key in UserStore.user.channels) || this.state.following;
  };

  render() {

    let displayNews = [];
    if (this.state.display.length !== 0) {
      // change key to item.id once added
      displayNews = this.state.display.map((item, index) =>
        <div key={index}>
          <NewsItem item={item}/>
          <br/>
        </div>
      );
    }
    return (
      <div className="container">
        <br/>
        <div className="list-headline">
            <h1 className="list-title">{this.state.category.toUpperCase()}</h1>
            {this.state.hideFollow
              ? <div></div>
              : <Button shape="round" onClick={this.handleFollow} disabled={UserStore.user.isAnonymous}>
                <Icon type="star" theme={this.isFollow() ? "filled" : ""}/>
                {this.isFollow() ? "Unfollow" : "Follow"}
                </Button>
            }
        </div>
        <div className="list-container">
          {(this.state.loading || UserStore.state.loading) ?
              <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </div>
              : (displayNews.length === 0 ? <Empty description=" "/> : displayNews)}
        </div>
        <Divider>
          {this.state.news.length === this.state.display.length ?
              "No more content" :
            <div className="read-more">
              <Button onClick={this.handleMore} style={{border: "none"}}>
                Read More
                <Icon type="down"/>
              </Button>
            </div>
          }
        </Divider>
      </div>

    );
  }
}

decorate(NewsList, {
  NewsList: observer,
});

export default NewsList