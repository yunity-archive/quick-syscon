/* @flow */
/* eslint react/no-danger:0 */
import React from 'react'
import {Provider} from 'react-redux'
import {RouterContext} from 'react-router'
import {renderToString} from 'react-dom-stream/server'

// Injects the server rendered state and app into a basic html template
export default class Html extends  React.Component {
    render(): React.Element<any> {
        const PROD = process.env.NODE_ENV === 'production'
        const {title, __meteor_runtime_config__, store, assets, renderProps, onError} = this.props
        const {manifest, app, vendor, meteor} = assets || {}
        const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`
        const root = PROD && !process.env.DISABLE_FULL_SSR && renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
        if (root && onError) root.on('error', onError)

        return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" />}
          <title>{title}</title>
        </head>
        <body>
          <script dangerouslySetInnerHTML={{
              __html: `window.__meteor_runtime_config__ = ${JSON.stringify(__meteor_runtime_config__)}`
          }} />
          <script dangerouslySetInnerHTML={{__html: initialState}} />
          {root ? <div id="root" dangerouslySetInnerHTML={{__html: root}}></div> : <div id="root"></div>}
          {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}} />}
          {PROD && <script src={vendor.js} />}
          {PROD && <script src={meteor.js} />}
          <script src={PROD ? app.js : '/static/app.js'} />
        </body>
      </html>
        )
    }
}

Html.propTypes = {
    __meteor_runtime_config__:  React.PropTypes.object,
    store:  React.PropTypes.object,
    title:  React.PropTypes.string,
    assets:  React.PropTypes.object,
    env:  React.PropTypes.object,
    settings:  React.PropTypes.object,
    renderProps:  React.PropTypes.object,
    onError:  React.PropTypes.func,
}
