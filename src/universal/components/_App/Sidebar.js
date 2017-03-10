import React from 'react';
var $ = require('jquery');
import jQuery from 'jquery';
window.jQuery = $;

class Sidebar extends React.Component {

    componentDidMount(){
        const { sidebardPanel } = this.refs;

        // Set the full height of right sidebar
        var heightWithoutNavbar = $('#wrapper').height() - 61;
        $(sidebardPanel).css('min-height', heightWithoutNavbar + 'px');

    }

    render() {

        let peityLine = {
            fill: '#1ab394',
            stroke:'#169c81'
        };

        let peityBar = {
            fill: ['#1ab394', '#d7d7d7']
        };


        return (
            <div className="sidebard-panel" ref="sidebardPanel">
                <div>
                    <h4>Messages <span className="badge badge-info pull-right">16</span></h4>

                    <div className="feed-element">
                        <a href="#" className="pull-left">
                            <img alt="image" className="img-circle" src="img/a1.jpg"/>
                        </a>
                        <div className="media-body">
                            There are many variations of passages of Lorem Ipsum available.
                            <br/>
                            <small className="text-muted">Today 4:21 pm</small>
                        </div>
                    </div>
                    <div className="feed-element">
                        <a href="#" className="pull-left">
                            <img alt="image" className="img-circle" src="img/a2.jpg"/>
                        </a>

                        <div className="media-body">
                            TIt is a long established fact that.
                            <br/>
                            <small className="text-muted">Yesterday 2:45 pm</small>
                        </div>
                    </div>
                    <div className="feed-element">
                        <a href="#" className="pull-left">
                            <img alt="image" className="img-circle" src="img/a3.jpg"/>
                        </a>

                        <div className="media-body">
                            Many desktop publishing packages.
                            <br/>
                            <small className="text-muted">Yesterday 1:10 pm</small>
                        </div>
                    </div>
                    <div className="feed-element">
                        <a href="#" className="pull-left">
                            <img alt="image" className="img-circle" src="img/a4.jpg"/>
                        </a>

                        <div className="media-body">
                            The generated Lorem Ipsum is therefore always free.
                            <br/>
                            <small className="text-muted">Monday 8:37 pm</small>
                        </div>
                    </div>
                </div>

                <div className="m-t-md">
                    <h4>Statistics</h4>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                    </p>

                    <div className="row m-t-sm">
                        <div className="col-md-6">
                            <h5><strong>169</strong> Posts</h5>
                        </div>
                        <div className="col-md-6">
                            <h5><strong>28</strong> Orders</h5>
                        </div>
                    </div>
                </div>
                <div className="m-t-md">
                    <h4>Discussion</h4>

                    <div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="badge badge-primary">16</span>
                                General topic
                            </li>
                            <li className="list-group-item ">
                                <span className="badge badge-info">12</span>
                                The generated Lorem
                            </li>
                            <li className="list-group-item">
                                <span className="badge badge-warning">7</span>
                                There are many variations
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
