'use strict';

import {parse, transform, transformFile, traverse, types as t} from 'babel-core';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import {join, resolve} from 'path';
import {readFile} from 'fs';
import * as path from 'path';


let pluginPath = join(__dirname, '../src/index.js');

let babelOpts = {
  presets: ['es2015'],
  plugins: [pluginPath]
};

function test(name, next, opts = babelOpts) {
  transformFile(join('test', 'fixtures', name), opts, (err, babelFixture)=> {
    var code;


    expect(err).toBe(null);

    readFile(join('test', 'results', name), 'utf8', (err, result)=> {

      code = babelFixture.code.replace(/\n/g, '');

      expect(code).toBeTruthy();

      result = result && result.replace(/\n/g, '');

      expect(result).toBeTruthy();
      expect(code).toBe(result);
      next();
    });

  });
}


describe('Babel Plugin Inject', () => {

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


});