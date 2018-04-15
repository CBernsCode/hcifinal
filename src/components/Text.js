import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class PSText extends Component {
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
    this.setState({ show: false })
    let vals = this.state.submittedValues
    if (Object.keys(this.state.submittedValues).length !== 0) {
      let newObj = {
        type: "text",
        geometry: {
          primitive: "plane",
          // width: "0",
          // height: "0"
        },
        material: {
          opacity: vals.opacity ? vals.opacity : "0",
        },
        position: {
          x: vals.xpos ? vals.xpos : 1,
          y: vals.ypos ? vals.ypos : 1,
          z: vals.dist ? vals.dist : -1,
        },
        rotation: vals.rotation ? vals.rotation : "0 0 0",
        text: {
          color: vals.color ? vals.color : "#000",
          align: vals.align ? vals.align : "center",
          value: vals.value ? vals.value : "Hello World!",
          zOffset: .01,
          xdimm: vals.xdimm ? vals.xdimm : 100,
          ydimm: vals.ydimm ? vals.ydimm : 100,
          zdimm: 1,
          width: vals.width ? vals.width : 10,
        },
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
        text: "width",
        target: "width",
        tip: "Text width"
      },
      {
        text: "Rotation",
        target: "rotation",
        tip: "X Y Z like '1 2 3'"
      },
      {
        text: "align",
        target: "align",
        tip: "align"
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
      },
      {
        text: "value",
        target: "value",
        tip: "value"
      },
      {
        text: "side",
        target: "side",
        tip: "side"
      },
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
      <div id="text-ui" className="btn-group">
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add Text
        </Button>
        {this.displayForm()}
      </div>
    )
  }
}

export default PSText