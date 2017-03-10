import { createStore } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

import {combineReducers} from 'redux-immutablejs'
import {routerReducer} from 'react-router-redux'
import {reducer as toastrReducer} from 'react-redux-toastr'


import React from 'react'
import { Meteor } from 'meteor/meteor'

// import { _ } from 'meteor/underscore'
var _ = require('underscore')

// import type {Reducer} from '../flowtypes/redux';

const adminReducer = (state = false, action) => {
    switch (action.type) {
    case 'LOAD_ADMIN': return {state: true, data: action.data}
    default: return state // TODO maybe false
    }
}

const contactWindowReducer = (state = false, action) => {
    var data
  // id ref data
    if (action.data) {
    //console.log(action.data);
        data = action.data
    }
    switch (action.type) {
    case 'OPEN_CONTACT_WINDOW': return { state: true, data: data, key: action.key, lockedBy: action.lockedBy, editTime: action.editTime }
    case 'CLOSE_CONTACT_WINDOW': return { state: false, data: null, key: null, lockedBy: null }
    default: return state // TODO maybe false
    }
}

const griddleReducer = (state = false, action) => {
    //for global griddle stuff
    switch (action.type) {
    default: return state // TODO maybe false
    }
}

const contactTableReducer = (state = false, action) => {
    switch (action.type) {
    case 'CONTACT_TABLE_QUERY':
        return Object.assign({}, state, {
          queryString: action.querystring,
          page: action.page,
          pageSize: action.pageSize,
          sortColumn: action.sortColumn,
          sortOrder: action.sortOrder
        })
    default: return state // TODO maybe false
    }
}
const currentReducers: {[key: string]: reducer} = {
    router: routerReducer,
    toastr: toastrReducer, // <- Notifications
    form: formReducer,
    griddle: griddleReducer,
    contactWindow: contactWindowReducer,
    contactTable: contactTableReducer,
    adminReducer: adminReducer
}

export default (newReducers?: {[key: string]: Reducer} = {}): Reducer => {
    Object.assign(currentReducers, newReducers)
    return combineReducers(currentReducers)
}
