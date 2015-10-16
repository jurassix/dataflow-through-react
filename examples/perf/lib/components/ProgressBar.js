'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recomposePure = require('recompose/pure');

var _recomposePure2 = _interopRequireDefault(_recomposePure);

var _recomposeWrapDisplayName = require('recompose/wrapDisplayName');

var _recomposeWrapDisplayName2 = _interopRequireDefault(_recomposeWrapDisplayName);

var Tick = function Tick(_ref) {
  var data = _ref.data;
  return _react2['default'].createElement('div', { className: 'tick', 'data-tick': data });
};
exports.Tick = Tick;
var PureTick = _recomposePure2['default'](Tick);

exports.PureTick = PureTick;
var Legend = function Legend(_ref2) {
  var title = _ref2.title;
  var numTicks = _ref2.numTicks;
  var timeElapsed = _ref2.timeElapsed;
  return _react2['default'].createElement(
    'div',
    { className: 'info' },
    _react2['default'].createElement(
      'h3',
      null,
      title
    ),
    _react2['default'].createElement(
      'ul',
      null,
      _react2['default'].createElement(
        'li',
        null,
        'Ticks Rendered: ',
        numTicks
      ),
      _react2['default'].createElement(
        'li',
        null,
        'Elapsed Time: ',
        timeElapsed
      )
    )
  );
};

exports.Legend = Legend;
var PureLegend = _recomposePure2['default'](Legend);

exports.PureLegend = PureLegend;
var ProgressBar = function ProgressBar(_ref3) {
  var title = _ref3.title;
  var timeElapsed = _ref3.timeElapsed;
  var ticks = _ref3.ticks;
  var children = _ref3.children;
  var TickStrategy = _ref3.TickStrategy;

  var mapper = function mapper(tick, index) {
    return _react2['default'].createElement(TickStrategy, { key: index, data: index });
  };
  var renderedTicks = ticks.length > 0 ? ticks.map(mapper) : children;
  var numTicks = renderedTicks.length;
  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(PureLegend, { title: title,
      numTicks: numTicks,
      timeElapsed: timeElapsed }),
    _react2['default'].createElement(
      'div',
      { className: 'bar' },
      renderedTicks
    )
  );
};

exports.ProgressBar = ProgressBar;
ProgressBar.defaultProps = {
  ticks: [],
  TickStrategy: Tick
};

var Wrap = function Wrap(WrappedComponent) {
  return (function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      _React$Component.apply(this, arguments);
    }

    _class.prototype.render = function render() {
      return _react2['default'].createElement(WrappedComponent, this.props);
    };

    _createClass(_class, null, [{
      key: 'displayName',
      value: _recomposeWrapDisplayName2['default'](WrappedComponent, 'Wrap'),
      enumerable: true
    }]);

    return _class;
  })(_react2['default'].Component);
};
exports.Wrap = Wrap;