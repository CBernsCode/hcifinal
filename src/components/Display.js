import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class PSPlane extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      show: false,
      submittedValues: {},
      prevValues: []
    };
  }
  handleClose = () => {
    this.setState({ show: false })
    let vals = this.state.submittedValues
    if (Object.keys(this.state.submittedValues).length !== 0) {
      let newObj = {
        type: "panel",
        geometry: {
          primitive: "box"
        },
        material: {
          color: vals.color ? vals.color : "#000",
          opacity: vals.opacity ? vals.opacity : "1",
          wireframe: false
        },
        position: {
          x: vals.xpos ? vals.xpos : 0,
          y: vals.ypos ? vals.ypos : 0,
          z: vals.zpos ? vals.zpos : 1,
        },
        xdimm: vals.xdimm ? vals.xdimm : 100,
        ydimm: vals.ydimm ? vals.ydimm : 100,
        zdimm: 1,
        rotation: vals.rotation ? vals.rotation : "0 0 0",
      };
      var arr = this.state.prevValues.concat(newObj);
      this.props.render(JSON.stringify(this.state.submittedValues), newObj);
      this.setState({
        prevValues: arr,
        submittedValues: {}
      });
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
    );
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
        tip: "Vertical Position"
      },
      {
        text: "Z Position",
        target: "zpos",
        tip: "Distance from Origin"
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
        text: "Color",
        target: "color",
        tip: "'red' or '#ff8800'"
      },
      {
        text: "Opacity",
        target: "opacity",
        tip: "0 - 1"
      },
    ];
    return (
      params.map((x, index) => {
        return (
          <div key={index} className="col-xs-6 params">
            <label htmlFor={`text-input-${x.target}`} className="col-xs-5">{x.text}</label>
            <Text field={x.target} placeholder={x.tip} id={`text-input-${x.target}`} className="col-xs-7" />
          </div>
        );
      })
    );
  }
  displayForm() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Display</Modal.Title>
            Add a plane to mock a flat panel in the UI. The display will scale automatically as you increase or decrease the Z position. <br />
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submittedValues => {
              this.setState({ submittedValues });
              this.handleClose();
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
    );
  }
  render() {
    return (
      <div id="display-ui" className="btn-group">
        <Button bsStyle="default" onClick={this.handleShow}>
        <i className="far fa-square"></i> Add Plane
        </Button>
        {this.displayForm()}
      </div>
    );
  }
}

export default PSPlane;