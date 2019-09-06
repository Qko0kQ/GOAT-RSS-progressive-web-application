import React, { Component } from 'react';
import '../styles/Home.scss';
import "../styles/HomeContainer.scss"
import { Input, Select, Divider, message } from 'antd';
import NewsList from '../../Home/components/NewsList.jsx'
import SiteList from '../../Home/components/SiteList.jsx'
import '../styles/Home.scss';
import {Link} from "react-router-dom";


const Option = Select.Option;
const Search = Input.Search;

class HomeContainer extends Component {

    state = {
        input: "",
        select: "news",
    };

    selectBefore = () =>
        <Select defaultValue={this.state.select} style={{width: 90}} onChange={this.onSelectChange}>
            <Option value="news">News</Option>
            <Option value="source">Source</Option>
        </Select>;

    onSelectChange = (val) => {
        this.setState({select: val});
    };

    onInputChange = (e) => {
        this.setState({input: e.target.value});
    };

    onInputSubmit = () => {
        if (!this.state.input) {
            message.error("Input cannot be empty!");
            return
        }
        window.location.href =`/news/?${this.state.select}=${this.state.input}`;
    };

    render() {
        return(
            <div className="Home">
                <article className="home-container">
                    <section>
                        <div className="home-container-title">
                            <h1 className="main-title">
                                GOATNews - Progressive Web Application
                            </h1>
                            <h1 className="sub-title">
                                Read news anywhere
                            </h1>
                        </div>
                        <div className="search-bar">
                            <Search addonBefore={this.selectBefore()}
                                    placeholder="input search text"
                                    onChange={this.onInputChange}
                                    onSearch={this.onInputSubmit}
                            />
                        </div>
                    </section>
                    <section className="home-sections">
                        <Link to="/news/"><h1> Trend News</h1></Link>
                        <NewsList/>
                    </section>
                    <Divider/>
                    <section className="home-sections">
                        <h1> Hot Sources</h1>
                        <SiteList/>
                    </section>
                    <Divider/>
                </article>
            </div>
        );
    }
}
export default HomeContainer;