import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import rainbow from 'react-syntax-highlighter/dist/styles/rainbow';
import debounce from 'lodash.debounce';

export default class ComponentDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.props;
  }
  
  onKeyup = debounce(() => {
    const props = this.node.innerText.split('\n');
    const updatedProps = props.slice(1, props.length - 2).reduce((props, prop) => {
      let [key, value] = prop.trim().split("=");
      value = JSON.parse(value.substr(1, value.length - 2));
      props[key] = value;
      return props;
    }, {});
    this.setState(updatedProps);
  }, 200)

  componentDidMount() {
    this.node.setAttribute('contentEditable', true);
    this.node.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    });
    this.node.addEventListener('keyup', this.onKeyup);
  }

  componentDidUpdate() {
    this.node.setAttribute('contentEditable', true); 
  }

  render() {
    const { Component, name, codeContainerStyle, componentContainerStyle } = this.props;
    const codeString = `${Object.keys(this.state).reduce((codeString, prop) => (
      codeString + `\n  ${prop}={${JSON.stringify(this.state[prop])}}`
    ), `<${name}`)}\n/>`;

    return (
      <div>
        <div ref={node => this.node = node}>
          <SyntaxHighlighter language="javascript" style={rainbow} customStyle={codeContainerStyle || {}}>
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div style={componentContainerStyle || {}}>
          <Component {...this.state} />
        </div>
      </div>
    );
  }
}