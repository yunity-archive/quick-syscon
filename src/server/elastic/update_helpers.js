'use strict'

var _ = Package.underscore._

var MONGODB_OPERATORS = ['$set',
    '$unset',
    '$inc',
    '$push',
    '$pull',
    '$pop',
                         //"$rename",
    '$pullAll',
    '$addToSet',
    '$bit'
]

/**
 * @module UpdateHelpers
 * @class UpdateHelpers
 * @static
 */
var UpdateHelpers = {

  /**
   * Retrieve a list of operations that are being performed.
   * Source: matb33:collection-hooks
   *
   * @method getOperations
   * @static
   * @return {Array} List of operations that are being performed.
   */
    getOperations: function (mutator) {
        return _.map(mutator, function (params, op) {
            return op
        })
    },  // end getOperations


  /**
   * Retrieve the top-level fields that are being changed.
   * Modified from original source: matb33:collection-hooks
   *
   * @method getFields
   * @static
   * @param {Object} mutator
   * @param {Object} [options]
   *   @param {Boolean} [options.topLevelOnly] Should only top-level field
   *                    names be returned?  Default: false
   * @return {Array} Names of fields that are being changed.
   */
    getFields: function getFields(mutator, options) {
    // compute modified fields
        var fields = []

        options = options || {}

        _.each(mutator, function (params, op) {
            if (_.contains(MONGODB_OPERATORS, op)) {
                _.each(_.keys(params), function (field) {
                    if (options.topLevelOnly) {
            // treat dotted fields as if they are replacing their
            // top-level part
                        if (field.indexOf('.') !== -1) {
                            field = field.substring(0, field.indexOf('.'))
                        }
                    }

          // record the field we are trying to change
                    if (!_.contains(fields, field)) {
                        fields.push(field)
                    }
                })
            } else {
                fields.push(op)
            }
        })

        return fields
    },  // end getFields


  /**
   * Return a new mutator object with only the specified fields affected.
   * Useful when updating external services with only a subset of data.
   *
   *     mutator = {$set: {"profile.name": "John",
   *                       "lastSeen": new Date()},
   *                $unset: {"profile.age": 1}};
   *
   *     newMutator = UpdateHelpers.filterMutator(mutator, ["profile"]);
   *
   *     // newMutator => {$set: {"profile.name": "John"},
   *     //                $unset: {"profile.age": 1}}
   *
   * @method filterMutator
   * @static
   * @param {Object} mutator
   * @param {Array} fieldsToKeep List of field names to keep. Names can be
   *                  top-level or more specific (both "profile" and
   *                  "profile.name" are ok).
   *                  Ex: ["profile"]
   * @return {Object} new mutator with only selected fields
   */
    filterMutator: function (mutator, fieldsToKeep) {
        var result = {}

        if (!mutator || _.isEmpty(mutator)) {
            return result
        }

        _.each(mutator, function (params, op) {
      // ex: op == "$set"
      //     params == {"profile.name" : "John",
      //                "lastSeen"     : new Date()}
            if (_.contains(MONGODB_OPERATORS, op)) {
                _.each(params, function (value, key) {
          // ex: key == "profile.name" , value == "John"
          //     key == "lastSeen"     , value == new Date()
                    var shouldKeep = false,
                        topLevelPart

                    if (_.contains(fieldsToKeep, key)) {
                        shouldKeep = true
                    }

                    if (!shouldKeep && key.indexOf('.') !== -1) {
            // check again with just the top-level part
                        topLevelPart = key.substring(0, key.indexOf('.'))
                        if (_.contains(fieldsToKeep, topLevelPart)) {
                            shouldKeep = true
                        }
                    }

                    if (shouldKeep) {
                        if (!result[op]) {
                            result[op] = {}
                        }
                        result[op][key] = value
                    }
                })
            }
        })

        return result
    }  // end filterMutator

}  // end UpdateHelpers

export default UpdateHelpers
