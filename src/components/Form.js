import React, { Component } from 'react';

const radioSample = [
  {
    pos: "0.2 1.8 0",
    label: "Ice Cream",
    width: 3
  },
  {
    pos: "0.2 1.5 0",
    label: "Pizza",
    width: 3
  }
];

const btnSample = [
  {
    pos: "0.2 0.8 0",
    name: "Click me",
    value: "Click me",
    width: 5,
    disabled: false
  },
  {
    pos: "0.2 0.35 0",
    name: "Click me",
    value: "Click me",
    width: 5,
    disabled: false
  }
];

class PSForm extends Component {

  radio(key, pos, label, width) {
    return (<a-radio key={key} position={pos} label={label} width={width} ></a-radio>);
  }

  button(key, pos, name, value, width, disabled) {
    return (<a-button key={key} position={pos} name={name} value={value} width={width} disabled={disabled}></a-button>);
  }

  render() {
    return (
      <a-rounded
        position={this.props.position}
        width={this.props.width}
        height={this.props.height}
        radius={this.props.radius}
        rotation={this.props.rotation}
        scale={this.props.scale}>
        <a-form background-color="#000">
          {radioSample.map((it, index) => this.radio(index, it.pos, it.label))}
          {btnSample.map((it, index) => this.button(index, it.pos, it.name, it.value, it.width))}
        </a-form>
      </a-rounded>
    );
  }
}

export default PSForm;