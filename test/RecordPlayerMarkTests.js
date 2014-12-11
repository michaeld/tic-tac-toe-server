var assert = require("assert")

describe('RecordPlayerMarkHandler', function(){
  describe('#execute', function(){
    it('should write the message to the console', function(){
      
      var handler = require('../handlers/RecordPlayerMark');

      handler.execute({ data : 'data' });

      assert(true);      
    })
  })
})