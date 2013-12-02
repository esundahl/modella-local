/**
 * Dependencies
 */

var Model = require('modella-modella')
var local = require('modella-local')
var assert = require('component-assert')


describe('Modella Local', function() {

  var Test = Model('Test')
    .validate(function (test) {
      if (!test.required) {
        test.error('required', 'required truthy value')
      }
    })
    .use(local('Test'))


  describe('save', function() {

    var model

    beforeEach(function() {
      model = new Test()
    })

    it('should implement a save method', function () {
      assert(typeof Test.save == 'function')
    })
    
    it('should not save if isValid fails', function(next) {
      assert(!model.isValid())
      model.save(function (err, attrs) {
        assert(false)
      })
    })
    
    it('should return id attr on successful save', function() {
      assert(false)
    })
  })

  describe('update', function() {
    it('should implement an update method', function () {
      assert(typeof Test.update == 'function')
    })
  })

  describe('remove', function() {
    it('should implement a remove method', function () {
      assert(typeof Test.remove == 'function')
    })
  })

  describe('find', function() {
    it('should implement a find method', function() {
      assert(typeof Test.find == 'function')
    })
  })

  describe('_keys', function() {
    it('should implement a _keys method', function() {
      assert(typeof Test._keys == 'function')
    })
    it('should return keys for all models with proper namespace', function() {
    })
  })
})
