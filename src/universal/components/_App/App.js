import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import Progress from './Progress.js';
import { correctHeight, detectBody } from './Helpers.js';

import './../../../styles/app.less'
import './../../../styles/layout.less' //Bootstrap 3.3.7 + reset styles
// import './../../../styles/font-awesome.css';
// import './../../../styles/sweetalert2.css';
// import './../../../styles/styles.css'; // Inspinia Stylesheet
// import './../../../styles/animate.css'; // Inspinia Animations Stylesheet
// import './../../../styles/custom.css'; // Custom Stylesheet

// App component - represents the whole app
export default class App extends React.Component {
    componentWillMount() {
        // Check that the user is logged in before the component mounts
        if (Meteor.userId()) {
            browserHistory.push('/secure');
        }
    }

    componentDidMount() {
        // Run correctHeight function on load and resize window event
        window.addEventListener('load resize', function() {
            correctHeight();
            detectBody();
        });
    }
    componentWillUnmount() {
        window.removeEventListener('load resize', function () {
            correctHeight();
            detectBody();
        });
    }
    render() {
        return (
            <div id="wrapper">
                {this.props.children}
            </div>
        );
    }
}
