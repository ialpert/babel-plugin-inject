'use strict';

import {transformFile} from 'babel-core';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import {join} from 'path';
import {readFile, access} from 'fs';


let pluginPath = join(__dirname, '../src/index.js');

let babelOpts = {
  presets: ['es2015'],
  plugins: [pluginPath, ['__coverage__', {'ignore': 'test/'}]]
};

function test(name, next, opts = babelOpts) {

  const testFilePath = join('test', 'fixtures', name);
  const resultsFilePath = join('test', 'results', name);

  transformFile(testFilePath, opts, (err, babelFixture)=> {

    expect(err).toBe(null);

    let code = babelFixture.code.replace(/[\n\s]/g, '');

    expect(code).toBeTruthy();

    access(resultsFilePath, function (err) {
      if (!err) {
        readFile(resultsFilePath, 'utf8', (err, result)=> {

          result = result && result.replace(/[\n\s]/g, '');

          expect(result).toBeTruthy();
          expect(code).toBe(result);
          next();
        });

      } else {
        next();
      }
    });


  });
}


describe('Babel Plugin Inject', () => {

  jsdom();


  it('Empty test to make sure it runs', (next) => {
    test('test1.js', next);
  });


  it('Inline injection with non-existent handler should return null', (next) => {
    test('test2.js', next);
  });


  it('Inline injection with existent handler should return text content', (next) => {
    test('test3.js', next);
  });

  it('Inline injection with existent handler should return css content', (next) => {
    test('test4.js', next);
  });


  it('Inline injection with existent handler should return template function', (next) => {
    test('test5.js', next);
  });

  it('Dependency injection with existent handler should return template function', (next) => {
    test('test6.js', next);
  });


  it('Should be non conflict and support another function name -- inject2', (next) => {
    test('test7.js', next, {
      presets: ['es2015'],
      plugins: [[pluginPath, {fn: 'inject2'}]]
    });
  });

  it('injectCSS helper', (next) => {
    let injectCSS = require('../src/plugins/injectCSS').injectCSS();

    injectCSS('body{color:red}');
    expect(window.getComputedStyle(document.body).color).toBe('red');

    next();
  });

});