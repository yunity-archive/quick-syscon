/* Imports */
    var Meteor = Package.meteor.Meteor
    var global = Package.meteor.global
    var meteorEnv = Package.meteor.meteorEnv
    var _ = Package.underscore._
    import UpdateHelpers from './update_helpers'
    var Async = Package['meteorhacks:async'].Async
    import * as NpmElasticSearch from 'elasticsearch'
/* Package-scope variables */
    var ElasticSearch, objs, msg;

    (function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/alanning_elasticsearch/elasticsearch.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//////////////////////////////////////////////////////////////////////
// ElasticSearch
//

        'use strict'


// Use Mustache-style underscore templates
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        }

/**
 * Meteor package which wraps the ElasticSearch NPM package and provides
 * some useful helper functions.
 *
 * @module ElasticSearch
 */

/**
 * Meteor package which wraps the ElasticSearch NPM package and provides
 * some useful helper functions.
 *
 * NOTE: In order to use the `partialUpdate` helper function, dynamic
 * groovy scripting must be enabled in
 * ElasticSearch.  You may enable this by adding the following line to your
 * `elasticsearch.yml` config file:
 *
 * `script.engine.groovy.inline.update: on`
 *
 * @module ElasticSearch
 * @class ElasticSearch
 * @param {Object} [config]
 *   @param {String} [config.host] URL of ElasticSearch server.
 *                   Default: "localhost:9200"
 *   @param {String} [config.index] Default index to use.
 *   @param {String} [config.type] Default type to use.
 *   @param {Array} [config.clientFunctions] List of functions on NPM
 *                   ElasticSearch Client object to `Async.wrap` so you
 *                   can use them in your Meteor app (fibers).
 *                   Default: ['index', 'update', 'search']
 */
        ElasticSearch = function (config) {
            var self = this,
                config = config || {}

            if (!config.host) {
                config.host = 'localhost:9200'
            }
            if (!config.apiVersion) {
                config.apiVersion = '5.0'
            }

  /**
   * Raw Npm ElasticSearch client. Prefer `EsClient` since its functions
   * can run in Fibers.
   *
   * @property EsClientRaw
   * @type Object
   */
            self.EsClientRaw = new NpmElasticSearch.Client(config)


            if (!config.clientFunctions) {
                config.clientFunctions = []
            }
  // ensure basic CRUD functions are there
            _.each(['index', 'update', 'search', 'mget'], function (fnName) {
                if (-1 === config.clientFunctions.indexOf(fnName)) {
                    config.clientFunctions.push(fnName)
                }
            })

  /**
   * ElasticSearch client with functions `Async.wrap`-ed to allow for use
   * in Meteor applications (fibers).
   *
   * @property EsClient
   * @type Object
   */
  // make client functions fiber-aware
            self.EsClient = Async.wrap(self.EsClientRaw, config.clientFunctions)

  /**
   * Config object initialized when ElasticSearch instance was created.
   *
   * @property config
   * @type Object
   */
            self.config = config

        }  // end ElasticSearch





// Static functions
        _.extend(ElasticSearch, {

  /**
   * Takes a MongoDB mutator and returns an elasticsearch partial update.
   * If it encounters operations that are not supported an error is thrown.
   *
   *     Examples:
   *
   *     {$set: {"profile.name": "John"}}
   *      => {script: "ctx._source.profile.name = \"John\""}
   *
   *     {$unset: {"profile.age":1}}
   *      => {script: "ctx._source.profile.remove(\"age\")"}
   *
   *     {$inc: {"score": 10}}
   *      => {script: "ctx._source.tags+=10"}
   *
   *     {$push: {"tags": "foo"}}
   *      => {script: "ctx._source.tags+=\"foo\""}
   *
   *     {$pull: {"tags": "foo"}}
   *      => {script: "ctx._source.tags-=\"foo\""}
   *
   *     {$pullAll: {"tags": ["foo", "bar"]}}
   *      => {script: "ctx._source.tags-=\"foo\";ctx._source.tags-=\"bar\""}
   *
   *     {$addToSet: {"tags": "foo"}}
   *      => {"script": "if (!ctx._source.tags) {
   *                       ctx._source.tags = [\"foo\"];
   *                     } else if (!ctx._source.tags.contains(\"foo\")) {
   *                       ctx._source.tags += \"foo\";
   *                     }"
   *         }
   * @method mongo2es
   * @param {Object} mutator MongoDB mutator object
   * @return {Object} elasticsearch partial update object
   * @static
   */
            mongo2es: function (mutator) {
                var result = {}

                _.each(mutator, function (params, op) {
                    var transform = ElasticSearch.transforms[op],
                        msg,
                        esConversion

                    if (!transform) {
                        msg = '[ElasticSearch.mongo2es] Error: Unsupported operation ' +
              '\'' + op + '\' encountered.'
                        throw new Error(msg)
                    }

                    esConversion = transform(params)

                    for (var fieldName in esConversion) {
                        if (!result[fieldName]) {
                            result[fieldName] = esConversion[fieldName]
                        } else {
                            result[fieldName] += ';' + esConversion[fieldName]
                        }
                    }
                })

                return result
            },  // end mongo2es


  /**
   * Retrieve the document _ids from a MongoDB query selector.
   * If there are no _ids found, return null
   *
   * ex: {_id: "xyz"}
   * ex: {_id: {$in: ["xyz", "abc"]}}
   *
   * @method extractIdsFromSelector
   * @param {Object} selector
   * @return {Array|null} _ids Array of _ids or null if no _ids found
   * @static
   */
            extractIdsFromSelector: function (selector) {
    // ex: {_id: "xyz"}
                if ('string' === typeof selector._id) {
                    return [selector._id]
                }

    // ex: {_id: {$in: ["xyz", "abc"]}}
                if ('object' === typeof selector._id &&
        _.isArray(selector._id.$in)) {
                    return selector._id.$in
                }

                return null
            },  // end extractIdsFromSelector


  /**
   * Converters that transform a MongoDB operation into its equivalent
   * ElasticSearch groovy script.
   *
   * @property transforms
   * @type Object
   * @static
   */
            transforms: {

    /**
     * Converts MongoDB `$set` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * Supports indexed array elements ('tags.1') but throws error on
     * use of '$' since we can't determine which index should be updated.
     *
     * @method transforms.$set
     * @param {Object} params MongoDB parameter object
     *
     *     {"profile.name": "John"}
     *       => {"script": "ctx._source.profile.name = \"John\""}
     *
     *     {"tags.1": "rain gear"}
     *       => {"script": "ctx._source.tags[1] = \"rain gear\""}
     *
     *     {"ratings.0.rating": 10}
     *       => {"script": "ctx._source.ratings[0].rating = 10"}
     *
     *     {"ratings.$.rating": 10}
     *       => throws Error "'$' not supported"
     * @static
     */
                '$set': function (params) {
                    var results = [],
                        template = 'ctx._source.{{key}} = {{value}}',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        var strVal,
                            keyParts

                        if (-1 !== key.indexOf('\.$')) {
                            throw new Error('[ElasticSearch.mongo2es] Error: Positional variable \'$\' not supported in \'' + key + '\'.  Use `update` to update the entire field.')
                        }

        // convert specified array elements to groovy style
        // ex:  "ratings.0.rating" => "ratings[0].rating"
        // TODO: Verify generated groovy script actually works
                        keyParts = _.map(key.split('.'), function (keyPart) {
                            if (isNumeric(keyPart)) {
                                return '[' + keyPart + ']'
                            } else {
                                return '.' + keyPart
                            }
                        })
                        if (keyParts[0][0] === '.') {
                            keyParts[0] = keyParts[0].substring(1)
                        }

                        if ('string' === typeof value) {
                            strVal = '"' + value + '"'
                        } else if ('number' === typeof value) {
                            strVal = value
                        } else {
                            strVal = JSON.stringify(value)
                            strVal = strVal.replace('{', '[').replace('}', ']')
                        }
                        results.push(t({key: keyParts.join(''), value: strVal}))
                    })

                    return {script: results.join(';')}
                },  // end $set


    /**
     * Converts MongoDB `$unset` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$unset
     * @param {Object} params MongoDB parameter object
     *
     *     {"profile.age":1}
     *       => {script: "ctx._source.profile.remove(\"age\")"}
     * @static
     */
                '$unset': function (params) {
                    var results = [],
                        template = 'ctx._source.{{rest}}.remove("{{last}}")',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        var context = {},
                            parts = key.split('.')

                        if (parts.length == 1) {
                            results.push('ctx._source.remove("' + key + '")')
                        } else {
                            context.last = parts.pop()
                            context.rest = parts
                            results.push(t(context))
                        }
                    })

                    return {script: results.join(';')}
                },  // end $unset


    /**
     * Converts MongoDB `$inc` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$inc
     * @param {Object} params MongoDB parameter object
     *
     *     {"score": 10}
     *       => {script: "ctx._source.score+=10"}
     * @static
     */
                '$inc': function (params) {
                    var results = [],
                        template = 'ctx._source.{{key}}+={{value}}',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        results.push(t({key: key, value: value}))
                    })

                    return {script: results.join(';')}
                },  // end $inc


    /**
     * Converts MongoDB `$push` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$push
     * @param {Object} params MongoDB parameter object
     *
     *     {"tags": "foo"}
     *       => {script: "ctx._source.tags+=\"foo\""}
     *
     *     {"tags": {$each: ["foo", "bar"]}}
     *       => {script: "ctx._source.tags+=\"foo\";ctx._source.tags+=\"bar\";"}
     * @static
     */
                '$push': function (params) {
                    var results = [],
                        template = 'ctx._source.{{key}}+="{{value}}"',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        if (value && value.$each) {
                            _.each(value.$each, function (element) {
                                results.push(t({key: key, value: element}))
                            })
                        } else {
                            results.push(t({key: key, value: value}))
                        }
                    })

                    return {script: results.join(';')}
                },  // end $push


    /**
     * Converts MongoDB `$pull` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$pull
     * @param {Object} params MongoDB parameter object
     *
     *     {"tags": "foo"}
     *       => {script: "ctx._source.tags-=\"foo\""}
     *
     *     {"tags": {$each: ["foo", "bar"]}}
     *       => {script: "ctx._source.tags-=\"foo\";ctx._source.tags-=\"bar\""}
     * @static
     */
                '$pull': function (params) {
                    var results = [],
                        template = 'ctx._source.{{key}}-="{{value}}"',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        if (value && value.$each) {
                            _.each(value.$each, function (element) {
                                results.push(t({key: key, value: element}))
                            })
                        } else {
                            results.push(t({key: key, value: value}))
                        }
                    })

                    return {script: results.join(';')}
                },  // end $pull


    /**
     * Converts MongoDB `$pullAll` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$pullAll
     * @param {Object} params MongoDB parameter object
     *
     *     {"tags": ["foo", "bar"]}
     *       => {script: "ctx._source.tags-=\"foo\";ctx._source.tags-=\"bar\""}
     * @static
     */
                '$pullAll': function (params) {
                    var results = [],
                        template = 'ctx._source.{{key}}-="{{value}}"',
                        t = _.template(template)

                    _.each(params, function (value, key) {
                        if (_.isArray(value)) {
                            _.each(value, function (element) {
                                results.push(t({key: key, value: element}))
                            })
                        } else {
                            results.push(t({key: key, value: value}))
                        }
                    })

                    return {script: results.join(';')}
                },  // end $pullAll


    /**
     * Converts MongoDB `$addToSet` operation to the equivalent ElasticSearch
     * groovy script.
     *
     * @method transforms.$addToSet
     * @param {Object} params MongoDB parameter object
     *
     *     {"tags": "foo"}
     *       => {"script": "if (!ctx._source.tags) {
     *                        ctx._source.tags = [\"foo\"];
     *                      } else if (!ctx._source.tags.contains(\"foo\")) {
     *                        ctx._source.tags += \"foo\";
     *                      }"
     *          }
     *
     *     {"tags": {$each: ["foo", "bar"]}}
     *       => {"script": "if (!ctx._source.tags) {
     *                        ctx._source.tags = [\"foo\"];
     *                      } else if (!ctx._source.tags.contains(\"foo\")) {
     *                        ctx._source.tags += \"foo\";
     *                      };
     *                      if (!ctx._source.tags.contains(\"bar\")) {
     *                        ctx._source.tags += \"bar\";
     *                      }"
     *          }
     * @static
     */
                '$addToSet': function (params) {
                    var results = [],
                        template = 'if (!ctx._source.{{key}}) {' +
                     '  ctx._source.{{key}} = ["{{value}}"];' +
                     '} else if (!ctx._source.{{key}}.contains("{{value}}")) {' +
                     '  ctx._source.{{key}} += "{{value}}";' +
                     '}',
                        main = _.template(template),
                        template2 = 'if (!ctx._source.{{key}}.contains("{{value}}")) {' +
                      '  ctx._source.{{key}} += "{{value}}";' +
                      '}',
                        secondary = _.template(template2)

                    _.each(params, function (value, key) {
                        if (value && value.$each) {
          // mutator = {$addToSet: {tags: {$each: ["foo", "bar"]}}}
                            _.each(value.$each, function (element, index) {
                                if (index === 0) {
                                    results.push(main({key: key, value: element}))
                                } else {
                                    results.push(secondary({key: key, value: element}))
                                }
                            })
                        } else {
                            results.push(main({key: key, value: value}))
                        }
                    })

                    return {script: results.join(';')}
                }  // end $addToSet

            }  // end transforms

        })  // end _.extend ElasticSearch



// Instance functions
        _.extend(ElasticSearch.prototype, {

  /**
   * Create a new document in ElasticSearch
   *
   * @method insert
   * @param {Object} doc Document to insert into ElasticSearch
   * @param {Object} config
   *   @param {String} config.index ElasticSearch index to write to.
   *                     May be specified during class constructor call instead.
   *   @param {String} config.type  ElasticSearch type to write to
   *                     May be specified during class constructor call instead.
   *   @param {Array.string} [config.fieldsToInclude] List of document fields
   *                   to include when writing to ElasticSearch.  Useful when
   *                   you want to filter what gets stored in ElasticSearch.
   */
            insert: function (id, doc, config) {
                var self = this,
                    msg

                config = config || {}

                config.index = config.index || self.config.index
                if ('string' !== typeof config.index) {
                    msg = '[ElasticSearch.insert] Error: Missing `config.index`'
                    throw new Error (msg)
                }
                config.type = config.type || self.config.type
                if ('string' !== typeof config.type) {
                    msg = '[ElasticSearch.insert] Error: Missing `config.type`'
                    throw new Error (msg)
                }
                if (!doc || !doc._id || !id) {
                    msg = '[ElasticSearch.insert] Error: Missing `doc._id`'
                    throw new Error (msg)
                }

                if(typeof id !== 'string'){
                    JSON.stringify(id)
                }
                //to remove unnecessary double quotes
                if (id.charAt(0) === '"' && id.charAt(id.length-1) === '"') {
                    id = id.substr(1, id.length-2)
                }
                if (config.fieldsToInclude) {
                    if (!_.contains(config.fieldsToInclude, '_id')) {
                        config.fieldsToInclude.push('_id')
                    }
                    doc = _.reduce(doc, function (memo, value, key) {
                        if (_.contains(config.fieldsToInclude, key)) {
                            memo[key] = value
                        }
                        return memo
                    }, {})
                }
                // create a document in Elastic Search
                return self.EsClient.index({
                    index: config.index,
                    type: config.type,
                    id: id,
                    body:{doc},
                    refresh: 'true'
                })

            },  // end insert


  /**
   * Update a complete or partial document in ElasticSearch.
   *
   * NOTE: Unlike `partialUpdate`, this function does _not_ require dynamic
   * script support to be enabled in ElasticSearch.  However, you will need
   * to supply the complete data for each updated field, so performing a
   * MongoDB update using `$addToSet` in your application would generally
   * require a separate query to retrieve the actual result before updating
   * ElasticSearch.
   *
   * @method update
   * @param {Object} doc New document data to be written to ElasticSearch.
   *                     May be a complete document or only selected fields.
   * @param {Object} config
   *   @param {String} config.index ElasticSearch index to update
   *                     May be specified during class constructor call instead.
   *   @param {String} config.type  ElasticSearch type to update
   *                     May be specified during class constructor call instead.
   *   @param {Array.string} [config.fieldsToInclude] List of document fields
   *                   to include when writing to ElasticSearch.  Useful when
   *                   you want to filter what gets stored in ElasticSearch.
   */
            update: function (doc, config) {
                var self = this,
                    msg

                config = config || {}

                config.index = config.index || self.config.index
                if ('string' !== typeof config.index) {
                    msg = '[ElasticSearch.update] Error: Missing `config.index`'
                    throw new Error (msg)
                }
                config.type = config.type || self.config.type
                if ('string' !== typeof config.type) {
                    msg = '[ElasticSearch.update] Error: Missing `config.type`'
                    throw new Error (msg)
                }
                if (!doc || !doc._id) {
                    msg = '[ElasticSearch.update] Error: Missing `doc._id`'
                    throw new Error (msg)
                }

                if (config.fieldsToInclude) {
                    if (!_.contains(config.fieldsToInclude, '_id')) {
                        config.fieldsToInclude.push('_id')
                    }
                    doc = _.filter(doc, function (value, key) {
                        return _.contains(config.fieldsToInclude, key)
                    })
                }
    // create a document in Elastic Search
                return self.EsClient.index({
                    index: config.index,
                    type: config.type,
                    id: doc._id,
                    body: {
                        doc
                    },
                    refresh: 'true'
                })
            },

            /**
             * Update data in Elastic Search.
             *
             * The goal of this function is to prevent unnecessary database queries when
             * updating fields.
             *
             * This function offers more flexibility than the `update` function since
             * it directly supports conversion of MongoDB operations such as `$addToSet`
             * without requiring the caller provide the full, resulting object.
             *
             * NOTE: If document _ids can not be directly extracted from the provided
             * `selector`, a query is executed against the supplied `sourceCollection`
             * to retrieve the _ids.
             *
             * NOTE: This function requires that dynamic groovy scripting be enabled
             * as outlined here:
             * https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html#enable-dynamic-scripting
             *
             * Enable dynamic groovy scripting by adding the following line to your
             * `elasticsearch.yml` config file:
             *
             * `script.engine.groovy.inline.update: on`
             *
             *
             * @method partialUpdate
             * @param {Object} selector MongoDB query selector
             * @param {Object} mutator MongoDB update mutator
             * @param {Object} config
             *   @param {String} config.index ElasticSearch index to update
             *                     May be specified during class constructor call instead.
             *   @param {String} config.type  ElasticSearch type to update
             *                     May be specified during class constructor call instead.
             *   @param {Array.string} [config.fieldsToInclude] List of document fields
             *                   to include when writing to ElasticSearch.  Useful when
             *                   you want to filter what gets stored in ElasticSearch.
             *   @param {Object} [config.sourceCollection] MongoDB collection object
             *                   Used to retrieve document _ids when they are not
             *                   explicitly set in the selector
             */
            partialUpdate: function (id, mutator, config) {
                var self = this,
                    msg,
                    filteredMutator,
                    shouldUpdate = false,
                    partialUpdate

                config = config || {}

                config.index = config.index || self.config.index
                if ('string' !== typeof config.index) {
                    msg = '[ElasticSearch.partialUpdate] Error: Missing `config.index`'
                    throw new Error (msg)
                }
                config.type = config.type || self.config.type
                if ('string' !== typeof config.type) {
                    msg = '[ElasticSearch.partialUpdate] Error: Missing `config.type`'
                    throw new Error (msg)
                }

                if (config.fieldsToInclude) {
                    filteredMutator = UpdateHelpers.filterMutator(mutator, config.fieldsToInclude)
                } else {
                   // no specific fields to watch, update everything
                    filteredMutator = mutator
                }
                shouldUpdate = !_.isEmpty(filteredMutator)
                if (!shouldUpdate) {
                    return
                }
                if(typeof id !== 'string'){
                    JSON.stringify(id)
                }

                partialUpdate = ElasticSearch.mongo2es(filteredMutator)
                return self.EsClient.update({
                    index: config.index,
                    type: config.type,
                    id: id,
                    body: partialUpdate
                })

            },  // end partialUpdate


  /**
   * Perform a query against ElasticSearch.
   *
   * @method search
   * @param {Object} query ElasticSearch search query
   * @param {Object} config
   *   @param {String} config.index ElasticSearch index to update
   *                     May be specified during class constructor call instead.
   *   @param {String} config.type  ElasticSearch type to update
   *                     May be specified during class constructor call instead.
   * @return {Object} ElasticSearch result object
   */
            search: function (query, config) {
                var self = this
                config = config || {}

                // if (!EsClient) {
                //     ElasticSearch.init()
                // }

                config.index = config.index || self.config.index
                if ('string' !== typeof config.index) {
                    msg = '[ElasticSearch.search] Error: Missing `config.index`'
                    throw new Error (msg)
                }
                config.type = config.type || self.config.type
                if ('string' !== typeof config.type) {
                    msg = '[ElasticSearch.search] Error: Missing `config.type`'
                    throw new Error (msg)
                }
                //Changed by Friedrich, to support whole body element in search.
                // console.log(query)
                return self.EsClient.search({
                    index: config.index,
                    type: config.type,
                    body: query
                })

            },  // end search

            /**
             * Perform a mget operation to get more than one ids results from ElasticSearch.
             *
             * @method mget
             * @param {Object} ids ElasticSearch search query
             * @param {Object} config
             *   @param {String} config.index ElasticSearch index to update
             *                     May be specified during class constructor call instead.
             *   @param {String} config.type  ElasticSearch type to update
             *                     May be specified during class constructor call instead.
             * @return {Object} ElasticSearch result object
             */
            mget: function (body, config) {
                var self = this
                config = config || {}

                          // if (!EsClient) {
                          //     ElasticSearch.init()
                          // }

                config.index = config.index || self.config.index
                if ('string' !== typeof config.index) {
                    msg = '[ElasticSearch.mget] Error: Missing `config.index`'
                    throw new Error (msg)
                }
                config.type = config.type || self.config.type
                if ('string' !== typeof config.type) {
                    msg = '[ElasticSearch.mget] Error: Missing `config.type`'
                    throw new Error (msg)
                }
                //Changed by Friedrich, to support whole body element in search.
                // console.log(body)
                return self.EsClient.mget({
                    index: config.index,
                    type: config.type,
                    body: body
                })

            }  // end search
        })  // end _.extend ElasticSearch.prototype


        function isNumeric (n) {
            return !isNaN(parseInt(n)) && isFinite(n)
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }).call(this)

    export default ElasticSearch
