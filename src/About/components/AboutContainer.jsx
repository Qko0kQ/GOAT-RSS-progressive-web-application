import React, { Component } from 'react';
import '../../News/styles/NewsList.scss';
import MemberItem from "./MemberItem";
import team from "../team.json";


class AboutContainer extends Component {
  render() {
    return(
        <div className="container">
          <br/>
          <div className="list-headline">
            <h1 className="list-title">ABOUT US</h1>
          </div>
          <div className="list-container">
            {team.map((member,index) =>
              <div>
                <MemberItem item={member} key={index}/>
                <br/>
              </div>
            )}
          </div>
        </div>
    );
  }
}
export default AboutContainer;