import React, { Component } from 'react';
import {Avatar, Card, Divider, Empty, Icon, Skeleton, Spin} from "antd";
import "../styles/ProfileContainer.scss";
import '../../Home/styles/NewsList.scss';
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import FollowedItem from "./FollowedItem.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';

const { Meta } = Card;

class ProfileContainer extends Component {

    //todo: replace them to the real news list
  state = {
    news: [],
    channels: {},
    loading: true,
  };

  componentDidMount() {
    const that = this;
    const request = window.indexedDB.open("news", 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('recent')) {
        db.createObjectStore('recent', { keyPath: 'id' });
      }
    };
    request.onsuccess = function(event) {
      const db = event.target.result;
      db.transaction(['recent']).objectStore('recent').openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        const news = that.state.news;
        if (cursor) {
          news.push(cursor.value);
          cursor.continue();
        } else {
          that.setState({news: news});
        }
      }

    }
  }

  renderCard = () => {
    if (UserStore.state.loading) {
      return <Skeleton/>
    }
    if (this.state.news.length === 0) {
      return <Empty/>
    }
    const readNews = this.state.news;
    return <div className="news-card-list">
      {readNews.length > 0 ? readNews.map((news, index) =>
          <Link key={index} to={{pathname: `/news/${news.id}`, state: {news: news.id}}}>
            <Card
                key={index}
                hoverable
                bordered={false}
                style={{width: 290, margin: "5px"}}
                cover={<img src={news.img} alt={"N/A"}/>}
            >

              <Meta
                  title={news.title}
              />
              <div>
                <Icon type="clock-circle"/>{moment(news.time).fromNow()}
              </div>
            </Card>
          </Link>)
          : <div style={{margin: "0 auto"}}>
            <Empty/>
          </div>
      }

    </div>;
  };

  render() {
      if (UserStore.state.loading) {
          return (
              <div className="profile-container">
                  <div className="profile-avatar">
                     <Spin/>
                  </div>
              </div>
          );
      }

      if (!UserStore.user.email) {
          return (
              <div className="profile-container">
                  <div className="profile-avatar">
                      <h1>You have to Sign in</h1>
                  </div>
              </div>
          );
      }

      return(
          <div className="profile-container">
              <div className="profile-avatar">
                  <Avatar size={100} icon="user" src={UserStore.user.photoURL ? UserStore.user.photoURL : ""}/>
                  <h1>Welcome, {UserStore.user.displayName || UserStore.user.email}</h1>
                  <br/>
              </div>
              <section className="profile-section">
                  <h1>My Subscription</h1>
                <div className="subcriptions">
                  {UserStore.user.channels ? Object.keys(UserStore.user.channels).map((chan, index) =>
                      <FollowedItem name={chan} type={UserStore.user.channels[chan].type} key={index}/>) :
                      <div style={{margin: "0 auto"}}>
                        <Empty/>
                      </div>
                  }
                </div>
              </section>
              <Divider/>
              <section className="profile-section">
                  <h1>Browsed News</h1>
                  {this.renderCard()}
              </section>
              <Divider/>
          </div>
      );
    }
}

decorate(ProfileContainer, {
    ProfileContainer: observer,
});
export default ProfileContainer;