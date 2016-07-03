var RecrawlWarning = require('../src/utils/recrawl-warning-dedupe')
var assert = require('assert');

describe.only('RecrawlWarning', function() {
  afterEach(function() {
    RecrawlWarning.RECRAWL_WARNINGS.length = 0;
  });

  describe('.findByRoot', function() {
    it('returns undefined, if nothing is found', function() {
      assert(RecrawlWarning.findByRoot('find/nothing') === undefined, 'expected nothing to be found');
    });

    describe('something to find', function() {
      it('returns undefined, if nothing is found', function() {
        RecrawlWarning.RECRAWL_WARNINGS.push(new RecrawlWarning('some/path', 5));
        assert(RecrawlWarning.findByRoot('find/nothing') === undefined, 'expected nothing to be found');
      });

      it('returns warning, if found', function() {
        var warning = new RecrawlWarning('some/path', 5);
        RecrawlWarning.RECRAWL_WARNINGS.push(warning);
        assert.equal(RecrawlWarning.findByRoot('some/path'), warning, 'expected the warning to be found');
      });

      it('returns FIRST warning, if found', function() {
        var warning = new RecrawlWarning('some/path', 5);
        var warning2 = new RecrawlWarning('some/path', 5);
        RecrawlWarning.RECRAWL_WARNINGS.push(warning);
        RecrawlWarning.RECRAWL_WARNINGS.push(warning2);
        assert.equal(RecrawlWarning.findByRoot('some/path'), warning, 'expected the warning to be found');
      });

      describe('count', function() {
        it('returns first, regardless of count', function() {
          var warning = new RecrawlWarning('some/path', 5);
          var warning2 = new RecrawlWarning('some/path', 4);
          RecrawlWarning.RECRAWL_WARNINGS.push(warning2);
          RecrawlWarning.RECRAWL_WARNINGS.push(warning);
          assert.equal(RecrawlWarning.findByRoot('some/path'), warning2, 'expected the warning to be found');
        });
      });
    });
  });

  describe('.isRecrawlWarningDupe', function() {
    describe('invalid warningMessage', function() {
      it('returns false for warning no message', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe(), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe(undefined), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe(false), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe(2), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe([]), false);
      });

      it('returns false for non-matching warning message', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe(''), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('some string'), false);
      });
    });

    describe('valid warningMessage', function() {
      it('new message', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 1 times, most recently because:\n\/foo\/bar\/baz:'), false);
      });

      it('same message twice', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/foo\/bar\/baz:'), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/foo\/bar\/baz:'), true);
      });

      it('same count, but different root twice', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/foo\/bar\/baz:'), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/baz\/bar\/baz:'), false);
      });

      it('incrementing count, but fixed root', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/foo\/bar\/baz:'), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 3 times, most recently because:\n\/foo\/bar\/baz:'), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 4 times, most recently because:\n\/foo\/bar\/baz:'), false);
      });

      it('decrementing count, but fixed root', function() {
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 4 times, most recently because:\n\/foo\/bar\/baz:'), false);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 3 times, most recently because:\n\/foo\/bar\/baz:'), true);
        assert.equal(RecrawlWarning.isRecrawlWarningDupe('Recrawled this watch 2 times, most recently because:\n\/foo\/bar\/baz:'), true);
      });
    });
  });
});
