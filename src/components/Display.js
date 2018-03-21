import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class Display extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      show: false,
      submittedValues: {},
      prevValues: []
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
    let vals = this.state.submittedValues
    if (Object.keys(this.state.submittedValues).length !== 0) {
      let newObj = {
        geometry: {
          primitive: 'box',
        },
        material: `color: ${vals.color ? vals.color : "#ff8800"}; ` +
          `opacity: ${vals.opacity ? vals.opacity : "1"};`,
        position: vals.position ? vals.position : '0 0 0',
        scale: vals.scale ? `${vals.scale} .01` : '1 1 .01',
        rotation: vals.rotation ? vals.rotation : '0 0 0',
        opacity: vals.opacity ? vals.opacity : "1"
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
  handleShow() {
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
        text: "Position",
        target: "position",
        tip: "X Y Z like '1 1 -3'"
      },
      {
        text: "Rotation",
        target: "rotation",
        tip: "X Y Z like '1 2 3'"
      },
      {
        text: "Scale",
        target: "scale",
        tip: "X Y like '1 2'"
      },
      {
        text: "Color",
        target: "color",
        tip: "'red' or '#ff8800'"
      },
      {
        text: "Opacity",
        target: "opacity",
        tip: "0 - 1"
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
            <Modal.Title>Add a Display</Modal.Title>
            Displays are flat panel representations of screens
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
      <div id="display-ui" className="btn-group" role="group">
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add Display Object
        </Button>
        {this.displayForm()}
      </div>
    )
  }
}

export default Display