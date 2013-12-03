// TODO: Implement browser storage when indexdb is unavailable


/**
 * Module Dependencies
 */

var dex = require('dex')
var sync = {}


var local = module.exports = function (db) {
  var db = local.db = dex(db)
  return function(Model) {
    Model.db = db
    Model.save = local.save
    Model.update = local.update
    Model.remove = local.remove
    Model.find = local.find
    return Model
  }
}


/**
 * Find
 */

local.find = function (params, fn) {
  var self = this
  fn = fn || params || function() {}
  
  local._keys.call(this, getRecords)
  
  function getRecords (err, keys) {
    if (err) return fn(err)

    keys.forEach(function (key) {
      local.db.get(key)
    })
    
    local.db.end(function (err, all) {
      if (err) return fn(err)
      var models = []
      
      if (arguments.length > 1) all = filter(all)
      
      all.forEach(function (obj) {
        models.push(new self(obj.item.value))
      })
      
      fn(null, models)
    })
  }
  
  function filter (records) {
    return records.filter(function (record) {
      for (var param in params) {
        if (params[param] !== record.item.value[param]) return false
      }
      return true
    })
  }
}


/**
 * Get
 */

local.get = function (key, fn) {
  var db = this.db
  db.get(key, function (err, obj) {
    if (err) return fn(err)
    else if (!obj) return fn(null, false)
    return fn(null, obj)
    console.log('get called');
  })
}


/**
 * removeAll
 */

sync.removeAll = function (query, fn) {
  throw new Error('model.removeAll not implemented')
}


/**
 * save
 */

local.save =
local.update = function (callback) {
  var json = this.toJSON()
  var id = this.primary()
  var db = this.model.db
  callback = callback || function(){}
  db
  .set(this.model.modelName + '!' + id, json)
  .end(function (err) {
    if (err) return callback(err)
    return callback(null, json)
  })
}


/**
 * remove
 */

local.remove = function (fn) {
  var db = this.model.db
  var id = this.primary()
  db.del(this.model.modelName + '!' + id, function (err) {
    if (err) return fn(err)
    return fn()
  })
}



/**
 * returns all keys associated with this
 * model
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

local._keys = function (fn) {
  var namespace = new RegExp(this.modelName + '!.*')
  fn = fn || function(){}
  local.db.keys(namespace, function (err, keys) {
    if (err) return fn(err)
    fn(null, keys)
  })
}
