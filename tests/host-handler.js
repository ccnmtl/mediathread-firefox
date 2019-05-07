/* eslint-env es6, mocha, node */

const assert = require('assert');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HH = require('../src/common/host-handler.js');
const { hostHandler } = HH;

describe('hosthandler', function() {
    it('should exist', function() {
        assert.equal(typeof hostHandler, 'object');
        assert.equal(typeof hostHandler['flickr.com'], 'object');
    });
});

describe('blakearchive.org', function() {
    it('has the expected title', function(done) {
        JSDOM.fromURL(
            'http://www.blakearchive.org/' +
                'copy/songsie.n?descId=songsie.n.illbk.08').then(dom => {
            assert.equal(dom.window.document.title,
                'The William Blake Archive');
            done();
        });
    });

    it('has the expected title for the enlarged image page', function(done) {
        JSDOM.fromURL('http://www.blakearchive.org/' +
                      'new-window/enlargement/songsie.n?' +
                      'descId=songsie.n.illbk.08')
            .then(dom => {
                assert.equal(dom.window.document.title, 'The William Blake Archive');
                done();
            });
    });
});

describe('classpop.ccnmtl.columbia.edu', function() {
    it('has the expected DOM', function(done) {
        JSDOM.fromURL('https://classpop.ccnmtl.columbia.edu/' +
                      'content/perspectives-freedom-speech')
            .then(dom => {
                assert.ok(dom.window.document.getElementById('currently_playing'));
                done();
            });
    });
});

/*describe('flickr.com', function() {
    it('has the expected DOM', function(done) {
        JSDOM.fromURL('https://www.flickr.com/photos/dropacat/15183956471/')
            .then(dom => {
                assert.ok(dom.window.document.getElementsByTagName('img').length > 0);
                done();
            });
    });
});*/

describe('youtube.com', function() {
    it('has the expected DOM', function(done) {
        JSDOM.fromURL('https://www.youtube.com/watch?v=ZQhbB6-cT3Y')
            .then(dom => {
                // The host handler looks for #movie_player, but this won't
                // get rendered in jsdom. We can look for the on-page
                // javascript that instantiates it with this ID, though.
                assert.ok(dom.serialize().indexOf('movie_player') >= 0);
                done();
            });
    });
});
