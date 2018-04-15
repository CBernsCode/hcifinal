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
]

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
]
class PSForm extends Component {

  radio = (pos, label, width) => {
    return (<a-radio position={pos} label={label} width={width} ></a-radio>)
  }
  button = (pos, name, value, width, disabled) => {
    return (<a-button position={pos} name={name} value={value} width={width} disabled={disabled}></a-button>)
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
        <a-form>
          {radioSample.map((it, index) => this.radio(it.pos, it.label))}
          {btnSample.map((it, index) => this.button(it.pos, it.name, it.value, it.width))}
        </a-form>
      </a-rounded>
    )
  }
}

export default PSForm