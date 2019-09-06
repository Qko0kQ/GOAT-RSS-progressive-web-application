import React, { Component } from 'react';
import "../styles/Header.scss";
import UserDropDown from "./UserDropdown.jsx";
import SideDrawer from "./SideDrawer.jsx";

class Header extends Component {

    state = {
        current: 'mail',
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <nav className="header-container">
                <div className="header-container-title">
                    <SideDrawer/>
                    <a href="/">
                        GOATNews
                    </a>
                </div>
                <div className="header-container-extra">
                    <span className="header-container-btn"><a href="/news/"><div>News</div></a></span>
                    <span className="header-container-btn"><a href="/about/"><div>About</div></a></span>
                    <span className="header-container-btn">
                        <div>
                            <UserDropDown/>
                        </div>
                    </span>
                </div>
            </nav>
        );
    }
}
export default Header;