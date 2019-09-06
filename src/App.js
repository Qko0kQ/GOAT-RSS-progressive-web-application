import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {BackTop} from 'antd';
import HomeContainer from "./Appshell/components/HomeContainer";
import Header from './Appshell/components/Header.jsx';
import NewsDetail from './News/components/NewsDetail';
import NewsList from './News/components/NewsList';
import ProfileContainer from './User/components/ProfileContainer';
import AboutContainer from './About/components/AboutContainer';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route exact path="/news/:id" component={NewsDetail}/>
            <Route exact path="/news/" component={NewsList}/>
            <Route path="/profile/" component={ProfileContainer}/>
            <Redirect from="/rss-pwa/" to="/"/>
            <Route path="/about/" component={AboutContainer}/>
          </Switch>
        </Router>
        <BackTop />
      </div>
    );
  }
}

export default App;
