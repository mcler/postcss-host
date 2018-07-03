var fs = require('fs');
var path = require('path');

var expect = require('expect');
var postcss = require('postcss');

import postcssHost from "../index.js";

describe('postcssHost', function() {
  it('should replace :host:pseudo-class to :host(:pseudo-class)', function() {
    var src = fs.readFileSync(path.join(__dirname, 'src/index.css'));
    var dist = fs.readFileSync(path.join(__dirname, 'dist/index.css'));

    var output = postcss()
      .use(postcssHost())
      .process(src)
      .css;

    expect(output).toEqual(dist.toString());
  });
});