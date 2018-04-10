import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class PSButton extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      show: false,
      submittedValues: {},
      prevValues: []
    }
  }
  handleClose = () => {
    this.setState({show: false})
    let vals = this.state.submittedValues
    if (Object.keys(this.state.submittedValues).length !== 0) {
      let newObj = {
        geometry: {
          primative: "plane",
          width: "auto",
          height: "auto"
        },
        material: {
          color: vals.color ? vals.color : "#ff8800",
          opacity: vals.opacity ? vals.opacity : "0",
        },
        position: {
          x: vals.xpos ? vals.xpos : 1,
          y: vals.ypos ? vals.ypos : 1,
          z: vals.dist ? vals.dist : -1,
        },
        xdimm: vals.xdimm ? vals.xdimm : 100,
        ydimm: vals.ydimm ? vals.ydimm : 100,
        zdimm: vals.zdimm ? vals.zdimm : 100,
        rotation: vals.rotation ? vals.rotation : "90 0 0",
        children:{
          "ui-button": true,
          material: {
            color: vals.color ? vals.color : "#ff8800",
            opacity: vals.opacity ? vals.opacity : "1",
          },
          position: {
            x:  0,
            y:  0,
            z: -1,
          },
          xdimm: vals.xdimm ? vals.xdimm : 100,
          ydimm: vals.ydimm ? vals.ydimm : 100,
          zdimm: vals.zdimm ? vals.zdimm : 100,
          color: vals.color ? vals.color : "#ff0000",
        }
      }
      window.display = newObj
      var arr = this.state.prevValues.concat(newObj)
      this.props.render(JSON.stringify(this.state.submittedValues), newObj)
      this.setState({
        prevValues: arr,
        submittedValues: {}
      })
    }
  }
  handleShow = () => {
    this.setState({ show: true });
  }
  textAndLabel(text, target) {
    return (
      <div>
        <label htmlFor={"text-input-" + target} className="col-xs-4">{text}</label>
        <Text field={target} id={"text-input-" + target} className="col-xs-8" /><br />
      </div>
    )
  }
  renderParams() {
    const params = [
      {
        text: "X Position",
        target: "xpos",
        tip: "Horizontal Position"
      },
      {
        text: "Y Position",
        target: "ypos",
        tip: "Veritcal Position"
      },
      {
        text: "Z Position",
        target: "zpos",
        tip: "Distance from origin"
      },
      {
        text: "X-dimm",
        target: "xdimm",
        tip: "scaled units"
      },
      {
        text: "Y-dimm",
        target: "ydimm",
        tip: "scaled units"
      },
      {
        text: "Rotation",
        target: "rotation",
        tip: "X Y Z like '1 2 3'"
      },
      {
        text: "color",
        target: "color",
        tip: "color"
      },
      {
        text: "opacity",
        target: "opacity",
        tip: "opacity"
      }
    ]
    return (
      params.map((x, index) => {
        return (
          <div key={index} className="col-xs-6 params">
            <label htmlFor={`text-input-${x.target}`} className="col-xs-5">{x.text}</label>
            <Text field={x.target} placeholder={x.tip} id={`text-input-${x.target}`} className="col-xs-7" />
          </div>
        )
      })
    )
  }
  displayForm() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Text</Modal.Title>
            Add text
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submittedValues => {
              this.setState({ submittedValues })
              this.handleClose()
            }}>
              {formApi => (
                <form onSubmit={formApi.submitForm} id="text-input-form">
                  <div className="form-group">
                    {this.renderParams()}
                    <hr />
                    <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                    <Button onClick={formApi.resetAll} className="btn btn-danger btn-block">Clear</Button>
                  </div>
                </form>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
  render() {
    return (
      <div id="text-button" className="btn-group">
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add Button
        </Button>
        {this.displayForm()}
      </div>
    )
  }
}

export default PSButton