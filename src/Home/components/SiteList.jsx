import React, { Component } from 'react';
import '../styles/SiteList.scss';
import {Button, Card, Skeleton} from 'antd';
import media_list from '../../mock/media_list.json';
import {Link} from "react-router-dom";

class SiteList extends Component {
    state = {
        mockData: media_list,
    };

    render() {
        return(
            <div className="media-card-list">
                {this.state.mockData.length === 0 ?
                    <Skeleton/>
                    : this.state.mockData.map(source => <Card
                        key={source.title}
                        hoverable
                        bordered={false}
                        style={{ width: 240 }}
                        cover={<Link to={`news/?source=${source.title}`}>
                            <img alt="example" src={source.url} style={{width: "100%"}}/>
                        </Link>}
                    >
                        <div>
                            <h3>
                                {source.title}
                                <Button icon="link" shape="circle" className="site-list-menu" href={source.source}/>
                            </h3>
                        </div>
                        <div>
                            {source.description}
                        </div>
                    </Card>)}
            </div>
        );
    }
}
export default SiteList;