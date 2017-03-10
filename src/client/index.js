import 'meteor-imports';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Map as iMap } from 'immutable';
import makeStore from '../universal/redux/makeStore'
import Root from './Root';

Meteor.startup(() => {
    const { router } = window.__INITIAL_STATE__;

  // routing is currently a regualr JS object. This may change in the future
    const initialState = iMap({
        router,
    });

    const store = makeStore(initialState);
    render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
  );

    let reloads = 0;

  // Hot Module Replacement API
    if (module.hot) {
        module.hot.accept('./Root', () => {
            const Root = require('./Root').default;
            render(
        <AppContainer>
          <Root store={store} />
        </AppContainer>,
        document.getElementById('root')
      );
        });
    }
});
