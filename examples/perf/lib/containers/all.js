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
  name: 'Render as Class',
  defer: true,
  fn: function fn(deferred) {
    return renderClass(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render stateless',
  defer: true,
  fn: function fn(deferred) {
    return renderStateless(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render pure',
  defer: true,
  fn: function fn(deferred) {
    return renderPure(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render stateless wrapped',
  defer: true,
  fn: function fn(deferred) {
    return renderStatlessWrapped(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render stateless-children',
  defer: true,
  fn: function fn(deferred) {
    return renderStatelessWithChildren(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render pure-children',
  defer: true,
  fn: function fn(deferred) {
    return renderPureWithChildren(function () {
      return deferred.resolve();
    });
  }
}).add({
  name: 'Render stateless children wrapped',
  defer: true,
  fn: function fn(deferred) {
    return renderStatelessWithChildrenWrapped(function () {
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

var renderClass = function renderClass(callback) {
  ticks.push(0);
  var element = _react2['default'].createElement(WrappedProgressBar, { key: 'bar',
    title: 'Class',
    timeElapsed: Date.now() - start,
    ticks: ticks,
    TickStrategy: WrappedTick
  });
  _reactDom.render(element, document.getElementById('app'), callback);
};

var renderStateless = function renderStateless(callback) {
  ticks.push(0);
  var element = _react2['default'].createElement(_componentsProgressBar.ProgressBar, { key: 'bar',
    title: 'Stateless',
    timeElapsed: Date.now() - start,
    ticks: ticks
  });
  _reactDom.render(element, document.getElementById('app0'), callback);
};

var renderPure = function renderPure(callback) {
  ticks.push(0);
  var element = _react2['default'].createElement(_componentsProgressBar.ProgressBar, { key: 'bar',
    title: 'Pure',
    timeElapsed: Date.now() - start,
    ticks: ticks,
    TickStrategy: _componentsProgressBar.PureTick
  });
  _reactDom.render(element, document.getElementById('app1'), callback);
};

var renderStatlessWrapped = function renderStatlessWrapped(callback) {
  ticks.push(0);
  var element = _react2['default'].createElement(_componentsProgressBar.ProgressBar, { key: 'bar',
    title: 'Stateless: ticks wrapped in deeply nested HoCs',
    timeElapsed: Date.now() - start,
    ticks: ticks,
    TickStrategy: MultiWrappedTick
  });
  _reactDom.render(element, document.getElementById('app2'), callback);
};

var renderStatelessWithChildren = function renderStatelessWithChildren(callback) {
  ticks.push(_react2['default'].createElement(_componentsProgressBar.Tick, { key: ticks.length, data: ticks.length }));
  var element = _react2['default'].createElement(
    _componentsProgressBar.ProgressBar,
    { key: 'bar',
      title: 'Stateless: ticks as children',
      timeElapsed: Date.now() - start },
    ticks
  );
  _reactDom.render(element, document.getElementById('app3'), callback);
};

var renderPureWithChildren = function renderPureWithChildren(callback) {
  ticks.push(_react2['default'].createElement(_componentsProgressBar.PureTick, { key: ticks.length, data: ticks.length }));
  var element = _react2['default'].createElement(
    _componentsProgressBar.ProgressBar,
    { key: 'bar',
      title: 'Pure: ticks as children',
      timeElapsed: Date.now() - start },
    ticks
  );
  _reactDom.render(element, document.getElementById('app4'), callback);
};

var renderStatelessWithChildrenWrapped = function renderStatelessWithChildrenWrapped(callback) {
  ticks.push(_react2['default'].createElement(MultiWrappedTick, { key: ticks.length, data: ticks.length }));
  var element = _react2['default'].createElement(
    _componentsProgressBar.ProgressBar,
    { key: 'bar',
      title: 'Stateless: ticks as children wrapped in deeply nested HoCs',
      timeElapsed: Date.now() - start },
    ticks
  );
  _reactDom.render(element, document.getElementById('app5'), callback);
};