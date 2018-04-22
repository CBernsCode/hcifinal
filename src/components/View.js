import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PSForm from './Form'

const defaultCamPos = '0 0 4'

class View extends Component {
  constructor() {
    super();
    this.state = {
      showKeyboard: false,
      showLogin: false,
      showForm: false,
    }
  }

  helper = (ent, id) => {
    let scale = {}
    if (ent.position && ent.position.z !== undefined) {
      scale = this.scaleFun(ent.xdimm, ent.ydimm, ent.zdimm, ent.position.z < .5 ? .5 : Math.abs(ent.position.z))
    }

    let obj = { ...ent, ...scale };

    // If there are children pull them off and map child entities first
    if (obj.hasOwnProperty('children')) {
      let children = []
      children = children.concat(ent.children)
      delete obj.children;
      return (
        <Entity {...obj}>
          {children.map((it, index) => this.helper(it, index))}
        </Entity>
      )
    } else if (obj.hasOwnProperty('text')){
      try {
        let textWidth = obj.text.width * Math.abs(obj.position.z)
        obj.text.width = textWidth
        return <Entity key={id} {...obj} />
      } catch (error) {
        console.error("Text scaling error:" + error)
      }
    }
    else {
      return <Entity key={id} {...obj} />;
    }
  }

  scaleFun = (x, y, z, scale) => {
    return {
      scale:
        `${x ? (x / 100) * scale : 1} 
          ${y ? (y / 100) * scale : 1} 
          ${z ? (z / 100) * scale : 1}`
    }
  }

  componentDidMount = () => {
    let el = document.querySelector('a-keyboard')
    if (el) {
      el.setAttribute('position', { x: -1, y: -0.5, z: -1 });
    }
  }

  environmentChange = (event) => {
    this.setState({ env: event.target.value });
    var el = document.getElementById('env')
    el.setAttribute('environment', event.target.value)
    el.setAttribute('position', '0 -1 0')
  }

  environment = () => {
    return (
      <div className="form-horizontal" style={{ paddingTop: "10" }}>
        <label className="col-xs-2 control-label" htmlFor="env">Environment</label>
        <div className="col-xs-4" >
          <select name="env" className="form-control" value={this.state.env} onChange={this.environmentChange}>
            <option value="">Default</option>
            <option value="preset: forest">Forest</option>
            <option value="preset: checkerboard">Checkerboard</option>
            <option value="preset: tron">Tron</option>
          </select>
        </div>
      </div>
    )
  }

  toggleKeyboard = () => {
    this.setState({ showKeyboard: !this.state.showKeyboard })
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin })
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  resetCamera = () => {
    document.getElementById('cam').setAttribute('position', defaultCamPos)
  }

  toggles = () => {
    return (
      <div className="form-group">
        <div className="btn-group" >
          <button onClick={this.toggleKeyboard} type="button" className="btn btn-primary">Toggle Keyboard </button>
          <button onClick={this.toggleLogin} type="button" className="btn btn-primary">Toggle Login </button>
          <button onClick={this.toggleForm} type="button" className="btn btn-primary">Toggle Form </button>
          <button onClick={this.resetCamera} type="button" className="btn btn-primary">Reset Camera </button>
        </div>
      </div>
    )
  }
  showKeyboard = () => {
    if (this.state.showKeyboard) {
      return (<a-keyboard id="keyboard" is-open="true" physical-keyboard="true" ></a-keyboard>)
    } else {
      return null
    }
  }

  showLogin = () => {
    if (this.state.showLogin) {
      return (
        <div>
          <a-input position="-0.7 1 -2.5" placeholder="Username" color="black" width="1"></a-input>
          <a-input position="-0.7 0.8 -2.5" type="password" placeholder="Password" color="black" width="1"></a-input>
        </div>
      )
    } else {
      return null
    }
  }

  showForm = () => {
    if (this.state.showForm) {
      return (<PSForm position="1 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.5 0.5 0.5" />)
    } else {
      return null
    }
  }

  render() {
    let objs = []
    if (this.props.objects) {
      objs = objs.concat(this.props.objects)
    }
    return (
      <div id='scene' className='col-lg-8'>
        <a-scene embedded background='color: #e8e8e8'  >
          <a-entity> <a-camera look-controls-enabled wasd-controls-enabled mouse-cursor></a-camera></a-entity>
          <a-entity light='type: hemisphere; color: #eee; groundColor: #000; intensity:1.5'></a-entity>
          <a-entity id='env'></a-entity>
          {objs.map((x, index) => this.helper(x, index))}
          <Entity >
            <a-camera  id='cam' position={defaultCamPos} mouse-cursor look-controls-enabled wasd-controls='fly: false'>
              <a-cursor primitive='a-cursor' />
            </a-camera>
          </Entity>
          {this.state.showKeyboard ? <a-keyboard id="keyboard" is-open="true" physical-keyboard="true" ></a-keyboard> : null}
          {this.state.showLogin ? <a-input position="-0.7 1 -2.5" placeholder="Username" color="black" width="1"></a-input> : null}
          {this.state.showLogin ? <a-input position="-0.7 0.8 -2.5" type="password" placeholder="Password" color="black" width="1"></a-input> : null}
          {this.state.showForm ? <PSForm position="1 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.5 0.5 0.5" /> : null}
        </a-scene>
        <div style={{ margin: 10 }}>
          {this.environment()}
          {this.toggles()}
        </div>
      </div>
    );
  }
}

export default View;

