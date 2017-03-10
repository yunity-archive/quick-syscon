import React from 'react'
import { Link, browserHistory, Location } from 'react-router'
import { Dropdown } from 'react-bootstrap'
import AnalogClock, { Themes } from 'react-analog-clock'
import { Meteor } from 'meteor/meteor'

import './../../../styles/app.less'
import './../../../styles/layout.less'
// AppNavBar component - represents the Navigation Buttons of this App
export default class AppNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: 'Herr Systemhaus',
            showClock: true
        }
        var self = this
        Meteor.subscribe('users', {
            onReady: function () {
                var currentUser = Meteor.users.findOne({_id : Meteor.userId()})
                if (currentUser) {
                    var userName = currentUser.profile.firstname + ' '  + currentUser.profile.lastname
                    if (userName) {
                        self.setState({ userName: userName })
                    }
                }
            },
            onError: function () { console.log('subscribe Error', arguments) }
        })
    }
    componentWillMount() {

    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">

                <a className="close-canvas-menu">
                    <i className="fa fa-times"></i>
                </a>
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
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

                              <span className="clear username-navigation">
                              {this.state.userName}
                            </span>
                        <ul className="dropdown-menu animated fadeInRight m-t-xs">
                            <li>
                                <Link to="/">Profile</Link>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <Link to="/">Logout</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="logo-element">
                        SHS3
                    </div>
                </li>
                <li className={this.activeRoute('/secure/configuration')}>
                    <Link to="/secure/configuration/usersettings"><i className="fa fa-cog"></i> <span className="nav-label">Konfiguration</span> <span className="fa arrow"></span></Link>
                     <ul className={this.secondLevelActive('/secure/configuration')}>
                         <li className={this.activeRoute('/secure/configuration/usersettings')}><Link to="/secure/configuration/usersettings">Mitarbeiter</Link></li>
                         <li className={this.activeRoute('/secure/configuration/contactssettings')}><Link to="/secure/configuration/contactssettings">Kontakte</Link></li>
                     </ul>
                </li>
                <li className={this.activeRoute('/secure/contacts')}>
                     <Link to="/secure/contacts"><i className="fa fa-group"></i> <span className="nav-label">Kontakte</span></Link>
                </li>
            </ul>
        </div>
      </nav>
        )
    }
  }
