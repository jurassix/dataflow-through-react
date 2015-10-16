'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _benchmark = require('benchmark');

var _componentsProgressBar = require('../components/ProgressBar');

var MultiWrappedTick = _componentsProgressBar.Wrap(_componentsProgressBar.Wrap(_componentsProgressBar.Wrap(_componentsProgressBar.Wrap(_componentsProgressBar.Wrap(_componentsProgressBar.Tick)))));
var WrappedTick = _componentsProgressBar.Wrap(_componentsProgressBar.Tick);
var WrappedProgressBar = _componentsProgressBar.Wrap(_componentsProgressBar.ProgressBar);

var ticks = [];
var start = Date.now();

var suite = new _benchmark.Benchmark.Suite();

suite.add({
  name: 'Render stateless-children',
  defer: true,
  fn: function fn(deferred) {
    return renderStatelessWithChildren(function () {
      return deferred.resolve();
    });
  }
}).on('cycle', function (event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

var renderStatelessWithChildren = function renderStatelessWithChildren(callback) {
  ticks.push(_react2['default'].createElement(_componentsProgressBar.Tick, { key: ticks.length, data: ticks.length }));
  var element = _react2['default'].createElement(
    _componentsProgressBar.ProgressBar,
    { key: 'bar',
      title: 'Stateless: ticks as children',
      timeElapsed: Date.now() - start },
    ticks
  );
  _reactDom.render(element, document.getElementById('app'), callback);
};