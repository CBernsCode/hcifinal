import React, {Component} from 'react';
import {Entity} from 'aframe-react';
import PSForm from './Form';

const defaultCamPos = '0 0 4';

class View extends Component {
  constructor() {
    super();
    this.state = {
      environment: "preset: none",
      showKeyboard: false,
      showLogin: false,
      showForm: false,
      stats: false,
      vrBtn: false
    };
  }

  helper = (ent, id) => {
    let scale = {};
    if (ent.position && ent.position.z !== undefined) {
      let scaleFactor = Math.abs(ent.position.z);
      scale = this.scaleFun(ent.xdimm, ent.ydimm, ent.zdimm, scaleFactor < .5 ? .5 : scaleFactor);
    }

    let obj = {...ent, ...scale};

    // If there are children pull them off and map child entities first
    if (ent.hasOwnProperty('children')) {
      let children = [];
      children = children.concat(ent.children);
      delete obj.children;
      return (
        <Entity key={id} {...obj}>
          {children.map((it, index) => this.helper(it, index))}
        </Entity>
      );
    } else if (ent.hasOwnProperty('text')) {
      try {     
        // delete obj.text.width
        obj.text.width = ent.text.width * Math.abs(ent.position.z)
        return <Entity key={id} {...obj} />;
      } catch (error) {
        console.error("Text scaling error:" + error);
      }
    }
    else {
      return <Entity key={id} {...obj} />;
    }
  };

  scaleFun = (x, y, z, scale) => {
    return {
      scale:
        `${x ? (x / 1000) * scale : 1} 
          ${y ? (y / 1000) * scale : 1} 
          ${z ? (z / 1000) * scale : 1}`
    };
  };

  // Keyboard is way below the scene, this moves it into view
  componentDidMount = () => {
    let el = document.querySelector('a-keyboard');
    if (el) {
      el.setAttribute('position', {x: -1, y: -0.5, z: -1});
    }
  };

  environmentChange = (event) => {
    this.setState({environment: event.target.value});
  };

  environmentOpts = () => {
    return (
      <div className="form-horizontal" style={{paddingTop: "10"}}>
        <label className="col-xs-4 control-label" htmlFor="env">Environment</label>
        <div className="col-xs-3" >
          <select name="env" className="form-control" value={this.state.environment} onChange={this.environmentChange}>
            <option value="preset: none">Default</option>
            <option value="preset: forest">Forest</option>
            <option value="preset: checkerboard">Checkerboard</option>
            <option value="preset: tron">Tron</option>
            <option value="preset: egypt">Egypt</option>
            <option value="preset: osiris">Osiris</option>
            <option value="preset: threetowers">Three Towers</option>
          </select>
        </div>
      </div>
    );
  };

  enviroment = () => {
    return <a-entity id="env" position="0 -2 0" environment={this.state.environment}></a-entity>
  }

  toggleKeyboard = () => {
    this.setState({showKeyboard: !this.state.showKeyboard});
  };

  toggleLogin = () => {
    this.setState({showLogin: !this.state.showLogin});
  };

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm});
  };

  toggleStats = () => {
    this.setState({stats: !this.state.stats});
  };

  toggleVrBtns = () => {
    this.setState({vrBtn: !this.state.vrBtn});
  };

  vrBtns = () => {
    if (this.state.vrBtn) {
      return (<Entity position="-4 0 0" rotation="0 45 0" >
        <a-button value="Keyboard" name="Keyboard" width="3" position="0 0 0" onClick={this.toggleKeyboard}>Toggle Keyboard </a-button>
        <a-button value="Login" width="3" position="0 .4 0" onClick={this.toggleLogin} ></a-button>
        <a-button value="Form" width="3" position="0 .8 0" onClick={this.toggleForm} ></a-button>
        <a-button value="Camera" width="3" position="0 1.2 0" onClick={this.resetCamera} ></a-button>
      </Entity>);
    } else {
      return null;
    }

  };

  resetCamera = () => {
    document.getElementById('cam').setAttribute('position', defaultCamPos);
  };

  toggles = () => {
    return (
      <div className="form-group">
        <div className="btn-group" >
          <button onClick={this.toggleKeyboard} type="button" className="btn btn-default">Toggle Keyboard </button>
          <button onClick={this.toggleLogin} type="button" className="btn btn-default">Toggle Login </button>
          <button onClick={this.toggleForm} type="button" className="btn btn-default">Toggle Form </button>
          <button onClick={this.resetCamera} type="button" className="btn btn-default">Reset Camera </button>
          <button onClick={this.toggleStats} type="button" className="btn btn-default">Toggle Stats </button>
          <button onClick={this.toggleVrBtns} type="button" className="btn btn-default">Toggle VR Buttons </button>
        </div>
      </div>
    );
  };

  render() {
    let objs = [];
    if (this.props.objects) {
      objs = this.props.objects;
    }
    const form = <PSForm position="1 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.5 0.5 0.5" />;
    const keyboard = <a-keyboard id="keyboard" is-open="true" physical-keyboard="true" ></a-keyboard>;
    return (
      <div id='scene' className='col-lg-8'>
        <a-scene embedded stats={this.state.stats} >
          <a-entity light='type: hemisphere;'></a-entity>
          <a-sky color="#fff"></a-sky>
          {this.enviroment()}
          {objs.map((x, index) => this.helper(x, index))}
          <Entity >
            <a-camera id='cam' position={defaultCamPos} mouse-cursor look-controls-enabled wasd-controls='fly: false'>
              <a-cursor primitive='a-cursor' />
            </a-camera>
          </Entity>
          {this.state.showKeyboard ? keyboard : null}
          {this.state.showLogin ? <a-input position="-0.7 1 -2.5" placeholder="Username" color="black" width="1"></a-input> : null}
          {this.state.showLogin ? <a-input position="-0.7 0.8 -2.5" type="password" placeholder="Password" color="black" width="1"></a-input> : null}
          {this.state.showForm ? form : null}
          {this.vrBtns()}
        </a-scene>
        <div style={{margin: 10}}>
          {this.environmentOpts()}
          {this.toggles()}
        </div>
      </div>
    );
  }
}

export default View;

