import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import type {Store, State} from '../universal/flowtypes/redux';
//
import App from './../universal/components/_App/App';
import AuthenticatedApp from './../universal/components/_App/AuthenticatedApp';
import LoginPage from './../universal/components/Login/LoginPage';
import NotFoundPage from './../universal/components/NotFound/NotFoundPage';

// import MainView from './../universal/components/MainView';

type Props = {
  store: Store,
}

export default class Root extends Component<void,Props,void> {
    static propTypes = {
        store: PropTypes.object.isRequired
    }
  /**
   * Callback function handling frontend route changes.
   */
    onUpdate() {
    // Prevent duplicate fetches when first loaded.
    // Explanation: On server-side render, we already have __INITIAL_STATE__
    // So when the client side onUpdate kicks in, we do not need to fetch twice.
    // We set it to null so that every subsequent client-side navigation will
    // still trigger a fetch data.
    // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
        if (window.__INITIAL_STATE__ !== null) {
            window.__INITIAL_STATE__ = null;
            return;
        }
    }

    render(): React.Element<any> {
        const {store} = this.props;
        const history = syncHistoryWithStore(browserHistory, store, {
            selectLocationState: (state: State): Object => state.get('router')
        });
        return (
      <Provider store={store}>
         <Router history={history} onUpdate={this.onUpdate}>
         <Route path="/" component={App}>
         <IndexRoute component={LoginPage} />
           <Route path="login" component={LoginPage} />
         </Route>
           <Route path="/secure" component={AuthenticatedApp}>
                   <Route path="configuration">
                   <IndexRoute component={NotFoundPage} />
                     <Route path="*" component={NotFoundPage} />
                   </Route>
               <Route path="*" component={NotFoundPage} />
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Router>
      </Provider>
        );
    }
}
