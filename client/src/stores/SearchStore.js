/*eslint indent: [2, 2, {"SwitchCase": 1}]*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// internal storage
// functions that update internal storage
// register callbacks w/dispatcher

var _searchResults = {};

var searchEndpoints = {
  technologies: 'searchbytech',
  products: 'searchbyname'
};

// search by tech or name of product
var _getSearchResults = function(searchInfo) {
  // determine which api route to post to
  $.ajax({
    url: 'api/products/' + searchEndpoints[searchInfo.searchMode],
    type: 'POST',
    dataType: 'json',
    data: {
      searchString: searchInfo.text,
      resultPage: searchInfo.resultPage
    },
    success: function(data) {
      if(searchInfo.resultPage > 1) {
        // will handle results differently here
        _searchResults = _searchResults.concat(data);
        SearchStore.emitChange();
      } else {
        _searchResults = data;
        SearchStore.emitChange();
      }
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in SearchStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};

// all setter functions exist outside of exported interface
// get results
// -- query api
// -- set searchResults to API query

var SearchStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function() {
    return _searchResults;
  }
});

SearchStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_SEARCH:
      _getSearchResults(action.searchInfo);
      break;
  }
});

module.exports = SearchStore;
