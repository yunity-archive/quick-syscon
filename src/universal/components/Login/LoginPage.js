import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: null,
            loginErrMsg: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var errors = {};

        if (!username) {
            errors.username = 'User required';
            this.setState({errors: errors.username});
        }

        if (!password) {
            errors.password = 'Password required';
            this.setState({errors: errors.password});
        }

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword( username, password, ( error, response ) => {
            if ( error ) {
                this.setState({loginErrMsg: error.reason});
                console.log('login error');
            } else {
                console.log('login succ');
                browserHistory.push('/secure/contacts');
            }
        });
    }
    componentWillMount() {
    // Update the page's title
        document.title = 'SHS-4 Login';
    }
    render() {
        return (
          <div>
          <h1 className="logo-name text-center p-xl">Quick - Syscon</h1>
          <div className="middle-box text-center loginscreen animated fadeInDown">
                <h3>Herzlich Willkommen im System</h3>
                  <p>Stand v.0.1.</p>
                  <p>Bitte anmelden.</p>

                  {(!this.state.loginErrMsg == '') ? (
                    <p className="bg-danger p-xs full-width">{this.state.loginErrMsg}</p>
                  ) : (null)}
                  <form className="m-t" role="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <input type="text" name="username" className={(!this.state.loginErrMsg == '') ? ('form-control bg-danger') : ('form-control')} placeholder="Username" required="" value={this.state.username}
                              onChange={this.handleUsernameChange} />
                      </div>
                      <div className="form-group">
                          <input type="password" name="password" className={(!this.state.loginErrMsg == '') ? ('form-control bg-danger') : ('form-control')} placeholder="Password" required="" value={this.state.password}
                              onChange={this.handlePasswordChange}/>
                      </div>
                      <button type="submit" className="btn btn-primary block full-width m-b submit" value="login">Login</button>
                      <a href="#"><small>Passwort vergessen?</small></a>
                    <div className="p-sm"/>
                      <p className="text-muted text-center"><small>Sie haben noch keinen Benutzer?</small></p>
                      <Link className="btn btn-sm btn-white btn-block" to="/register">Registrieren</Link>
                  </form>
                  <p className="m-t"> <small>Yunity &copy; 2016</small> </p>
              </div>

          </div>

        );
    }
}
