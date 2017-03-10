import React from 'react'
//import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from './Helpers.js'
import { Meteor } from 'meteor/meteor'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
// AppHeader component - represents the Header workspace of this App
import './../../../styles/app.less'
import './../../../styles/layout.less'

export default class AppHeader extends React.Component {
    toggleNavigation(event) {
        event.preventDefault()
        document.body.classList.toggle('mini-navbar')
      //should prevent the text from jumping removed for now because of jquery
      //smoothlyMenu();
    }
    logOut(event) {
        event.preventDefault()
        Meteor.logout(() => {
            browserHistory.push('/login')
        })
    }
    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">

                        <a class="profile item">
                          <i class="user icon"></i>
                        </a>

                      <a class="ui card" href="#">
                        <div class="content active-group">
                          <div class="header">Active Group</div>
                        </div>
                      </a>
                      <a class="ui card" href="#">
                        <div class="content button-link">
                          <div class="header">buttonLink</div>
                        </div>
                      </a>

                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation.bind(this)}><i className="fa fa-bars"></i> </a>

                        {/*<form role="search" className="navbar-form-custom" method="post" action="">
                            <div className="form-group">
                                <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search"/>
                            </div>
                        </form>*/}
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        {/*<li>
                            <span className="m-r-sm text-muted welcome-message">Welcome to INSPINIA+ Admin Theme.</span>
                        </li>
                        <li className="dropdown">
                                <a className="dropdown-toggle count-info" href="#" data-toggle="dropdown">
                                    <i className="fa fa-envelope"></i> <span className="label label-warning">16</span>
                                </a>
                                <ul className="dropdown-menu dropdown-messages">
                                    <li>
                                        <div className="dropdown-messages-box">
                                            <a href="profile.html" className="pull-left">
                                                <img alt="image" className="img-circle" src="img/a7.jpg"/>
                                            </a>

                                            <div className="media-body">
                                                <small className="pull-right">46h ago</small>
                                                <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br/>
                                                <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="dropdown-messages-box">
                                            <a href="profile.html" className="pull-left">
                                                <img alt="image" className="img-circle" src="img/a4.jpg"/>
                                            </a>

                                            <div className="media-body ">
                                                <small className="pull-right text-navy">5h ago</small>
                                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br/>
                                                <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="dropdown-messages-box">
                                            <a href="profile.html" className="pull-left">
                                                <img alt="image" className="img-circle" src="img/profile.jpg"/>
                                            </a>

                                            <div className="media-body ">
                                                <small className="pull-right">23h ago</small>
                                                <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br/>
                                                <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="text-center link-block">
                                            <a href="mailbox.html">
                                                <i className="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell"></i> <span className="label label-primary">8</span>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="mailbox.html">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="profile.html">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                            <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="grid_options.html">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="notifications.html">
                                            <strong>See All Alerts</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>*/}

                        <li>
                            <a>
                            </a>
                        </li>
                        <li>
                            <a onClick={this.logOut.bind(this)} >
                             <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
