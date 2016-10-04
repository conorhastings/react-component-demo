'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSyntaxHighlighter = require('react-syntax-highlighter');

var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

var _rainbow = require('react-syntax-highlighter/dist/styles/rainbow');

var _rainbow2 = _interopRequireDefault(_rainbow);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComponentDemo = function (_React$Component) {
  _inherits(ComponentDemo, _React$Component);

  function ComponentDemo(props) {
    _classCallCheck(this, ComponentDemo);

    var _this = _possibleConstructorReturn(this, (ComponentDemo.__proto__ || Object.getPrototypeOf(ComponentDemo)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = props.props;
    return _this;
  }

  _createClass(ComponentDemo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node.setAttribute('contentEditable', true);
      this.node.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      });
      this.node.addEventListener('keyup', this.onKeyup);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.node.setAttribute('contentEditable', true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var Component = _props.Component;
      var name = _props.name;
      var codeContainerStyle = _props.codeContainerStyle;
      var componentContainerStyle = _props.componentContainerStyle;

      var codeString = Object.keys(this.state).reduce(function (codeString, prop) {
        return codeString + ('\n  ' + prop + '={' + JSON.stringify(_this2.state[prop]) + '}');
      }, '<' + name) + '\n/>';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { ref: function ref(node) {
              return _this2.node = node;
            } },
          _react2.default.createElement(
            _reactSyntaxHighlighter2.default,
            { language: 'javascript', style: _rainbow2.default, customStyle: codeContainerStyle || {} },
            codeString
          )
        ),
        _react2.default.createElement(
          'div',
          { style: componentContainerStyle || {} },
          _react2.default.createElement(Component, this.state)
        )
      );
    }
  }]);

  return ComponentDemo;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onKeyup = (0, _lodash2.default)(function () {
    var props = _this3.node.innerText.split('\n');
    var updatedProps = props.slice(1, props.length - 2).reduce(function (props, prop) {
      var _prop$trim$split = prop.trim().split("=");

      var _prop$trim$split2 = _slicedToArray(_prop$trim$split, 2);

      var key = _prop$trim$split2[0];
      var value = _prop$trim$split2[1];

      value = JSON.parse(value.substr(1, value.length - 2));
      props[key] = value;
      return props;
    }, {});
    _this3.setState(updatedProps);
  }, 200);
};

exports.default = ComponentDemo;