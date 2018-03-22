import React, { Component } from 'react';
import { Form, Text} from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class CurvedImg extends Component {
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
        geometry: "primative: curvedimage",
        position: vals.position ? vals.position: "0 0 0",
        scale: vals.scale ? vals.scale: "1 1 1",
        rotation: vals.rotation,
        height: vals.height ? vals.height: "1",
        src: vals.src ? vals.src: process.env.PUBLIC_URL + '/img/landscape.jpg',
        radius: vals.radius ? vals.radius : 2,
        opacity: vals.opacity ? vals.opacity : "1",
        transparent: false
      }
      window.curve = newObj
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
        text: "color",
        target: "color",
        tip: "'red' or '#ff8800'"
      },
      {
        text: "Height",
        target: "height"
      },
      {
        text: "Opacity",
        target: "opacity"
      },
      {
        text: "Radius",
        target: "radius"
      },
      {
        text: "Src",
        target: "src"
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
  curvedForm() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Curved Img</Modal.Title>
            Displays are flat panel representations of screens
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submittedValues => {
              this.setState({ submittedValues })
              this.handleClose()
            }}>
              {formApi => (
                <form onSubmit={formApi.submitForm} id="text-input-form">
                  {this.renderParams()}
                  <hr/>
                  <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                  <Button onClick={formApi.resetAll} className="btn btn-danger btn-block">Clear</Button>
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
      <div id="curved-ui" className="btn-group" >
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add a Cuved Img
        </Button>
        {this.curvedForm()}
      </div>
    )
  }
}

export default CurvedImg