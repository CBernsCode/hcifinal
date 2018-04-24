import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Button, Modal } from 'react-bootstrap';

class PSCurvedImg extends Component {
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
    this.setState({ show: false });
    let vals = this.state.submittedValues
    if (Object.keys(this.state.submittedValues).length !== 0) {
      let newObj = {
        type: "curved plane",
        primitive: 'a-curvedimage',
        material: {
          color: vals.color ? vals.color : "#888",
          opacity: vals.opacity ? vals.opacity : "1",
          wireframe: false
        },
        position: vals.position ? vals.position : '0 0 0',
        scale: vals.scale ? vals.scale : '1 1 1',
        rotation: vals.rotation,
        height: vals.height ? vals.height : '1',
        radius: vals.radius ? vals.radius : 2,
        'theta-length': vals.thetalength ? vals.thetalength : 180,
        'theta-start': vals.thetastart ? vals.thetastart : 90

      };
      this.props.render(JSON.stringify(this.state.submittedValues), newObj)
      this.setState({
        submittedValues: {}
      })
    }
  }
  handleShow = () => {
    this.setState({ show: true });
  }
  renderParams() {
    const params = [
      {
        text: 'Position',
        target: 'position',
        tip: `X Y Z like '1 1 -3'`
      },
      {
        text: 'Rotation',
        target: 'rotation',
        tip: `X Y Z like '1 2 3' in degrees`,
      },
      {
        text: 'Scale',
        target: 'scale',
        tip: `X Y like '1 2'`
      },
      {
        text: 'color',
        target: 'color',
        tip: `'red' or '#ff8800'`
      },
      {
        text: 'Height',
        target: 'height'
      },
      {
        text: 'Opacity',
        target: 'opacity',
        tip: "0 - 1"
      },
      {
        text: 'Radius',
        target: 'radius'
      },
      {
        text: 'Theta Start',
        target: 'thetastart',
        tip: 'in degrees'
      },
      {
        text: 'Theta Length',
        target: 'thetalength',
        tip: 'in degrees'
      },
    ];
    return (
      params.map((x, index) => {
        return (
          <div key={index} className='col-xs-6 params'>
            <label htmlFor={`text-input-${x.target}`} className='col-xs-5'>{x.text}</label>
            <Text field={x.target} placeholder={x.tip} id={`text-input-${x.target}`} className='col-xs-7' />
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
                <form onSubmit={formApi.submitForm} id='text-input-form'>
                  <div className='form-group'>
                    {this.renderParams()}
                    <hr />
                    <Button type='submit' className='btn btn-primary btn-block'>Submit</Button>
                    <Button onClick={formApi.resetAll} className='btn btn-danger btn-block'>Clear</Button>
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
      <div id='curved-ui' className='btn-group' >
        <Button bsStyle='default' onClick={this.handleShow}>
        <i className="fab fa-cuttlefish"></i> Curved Plane
        </Button>
        {this.curvedForm()}
      </div>
    )
  }
}

export default PSCurvedImg;