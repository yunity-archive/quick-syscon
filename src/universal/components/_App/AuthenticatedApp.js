import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Tracker } from 'meteor/tracker'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import keydown, { Keys } from 'react-keydown'

import AppHeader from './AppHeader.js'
import AppNavBar from './AppNavBar.js'
import { AppFooter } from './AppFooter.js'
import Progress from './Progress.js'
import ReduxToastr from 'react-redux-toastr'
import { correctHeight, detectBody } from './Helpers.js'

import './../../../styles/app.less'
import './../../../styles/layout.less' //Bootstrap 3.3.7 + reset styles
import './../../../styles/main.less' //semantic quatsch styles + reset styles
// import './../../../styles/app.less'
// import './../../../styles/layout.less' //Bootstrap 3.3.7 + reset styles
// import './../../../styles/font-awesome.css' // Icon Font
// import './../../../styles/sweetalert2.css' // Alert Styles
// import './../../../styles/icheck_skins/all.css' // Icheck Plugin Stylesheet
// import './../../../styles/ladda-themeless.min.css' // Loading Buttons Stylesheet
// import './../../../styles/infinite-calendar.css' // InfiniteCalendar
// import './../../../styles/react-date-picker.css' // react-datepicker
// import './../../../styles/react-day-picker.css' // react-daypicker
// import './../../../styles/styles.css' // Inspinia Stylesheet
// import './../../../styles/animate.css' // Inspinia Animations Stylesheet
// import './../../../styles/custom.css' // Custom Stylesheet

// App component - represents the whole app
class AuthenticatedApp extends React.Component {
    constructor(props){
        super(props)
    }
    static propTypes = {
    // Injected by React Router
        children: PropTypes.node
    }
    componentWillMount() {
        if (!Meteor.userId()) {
            browserHistory.push('/login')
        }

    }
    componentDidMount() {
        // Run correctHeight function on load and resize window event
        window.addEventListener('load resize', function() {
            correctHeight()
            detectBody()
        })
        // Correct height of wrapper after metisMenu animation.
        // jQuery('.metismenu a').click(() => {
        //     setTimeout(() => {
        //         correctHeight();
        //     }, 300)
        // });
    }
    componentWillUnmount() {
        window.removeEventListener('load resize', function() {
            correctHeight()
            detectBody()
        })
    }
    componentDidUpdate(prevProps, prevState) {
      // Navigate to a sign in page if the user isn't authenticated when data changes
        if (!Meteor.userId()) {
            browserHistory.push('/login')
        }

        if (this.props.Store.get('contactWindow').state == true) {
            document.body.classList.add('no-scroll-background')
        } else {
            document.body.classList.remove('no-scroll-background')
        }

    }
    render() {
        return (
          <div className="ui fixed inverted orange menu">
             		<div className="main container">
              		<div className="item logo">
          	</div>

              <a className="item groups">
          	    Active Group gt  Unity1
          	</a>


              <a className="item topics">
              	Topics
              </a>
              <a className="item archive">
              	Archive
              </a>

          	<div className="ui inverted right orange menu">
          	    <div className="ui item">
          	        <ul className="notifications">

              </ul>
          	    </div>

          		<a className="item profile">
          			<i className="user white icon"></i>
          		</a>

          	    <a className="item logout">Logout</a>

            	</div>
              <div>
                <a className="active-group item">
                  <i className="group icon"></i>
                </a>
              </div>
              </div>
              </div>

        )
    }
}

var mapStateToProps = (state, ownProps) => ({
    Store: state
})
var mapDispatchToProps = dispatch => ({
})
export default keydown(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedApp))
