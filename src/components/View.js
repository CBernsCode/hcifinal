import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PSForm from './Form'
class View extends Component {
  constructor() {
    super();
    this.state = {
      showKeyboard: false,
      showLogin: false
    }
  }
  helper = (ent, id) => {
    let scale = {}
    if (ent.position && ent.position.z !== undefined) {
      scale = this.scaleFun(ent.xdimm, ent.ydimm, ent.zdimm, ent.position.z < 1 ? 1 : Math.abs(ent.position.z))
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
    } else {
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
      <div className="form-horizontal">
        <label className="col-xs-2 control-label" for="env">Environment</label>
        <div className="col-xs-4" >
          <select name="env" className="form-control" value={this.state.env} onChange={this.environmentChange}>
            <option value="preset: forest">Forest</option>
            <option value="preset: checkerboard">Default</option>
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

  toggles = () => {
    return (
      <div className="form-group">
        <div className="btn-group" >
          <button onClick={this.toggleKeyboard} type="button" className="btn btn-primary">Toggle Keyboard </button>
          <button onClick={this.toggleLogin} type="button" className="btn btn-primary">Toggle Login </button>
        </div>
      </div>
    )
  }

  showLogin = () => {
    if (this.state.showLogin) {
      return (<PSForm position="1 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.5 0.5 0.5" />)
    } else {
      return null
    }
  }

  render() {
    return (
      <div id='scene' className='col-lg-8'>
        <a-scene embedded background='color: #e8e8e8'  >
          <a-entity light='type: hemisphere; color: #eee; groundColor: #000; intensity:1.5'></a-entity>
          <a-entity id='env'></a-entity>
          {this.props.objects.map((x, index) => this.helper(x, index))}
          <Entity position='0 0 4w'>
            <a-camera mouse-cursor look-controls-enabled wasd-controls='fly: false'>
              <a-cursor primitive='a-cursor' animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            </a-camera>
          </Entity>
          {this.state.showKeyboard ? <a-keyboard id="keyboard" is-open="true" physical-keyboard="true" ></a-keyboard> : null}
          {this.state.showLogin ? <a-input position="-0.7 1 -2.5" placeholder="Username" color="black" width="1"></a-input> : null}
          {this.state.showLogin ? <a-input position="-0.7 0.8 -2.5" type="password" placeholder="Password" color="black" width="1"></a-input> : null}
          <PSForm position="1 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.5 0.5 0.5" />
        </a-scene>
        {this.environment()}
        {this.toggles()}
      </div>

    );
  }
}

export default View;