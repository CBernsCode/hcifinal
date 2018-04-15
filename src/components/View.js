import React, { Component } from 'react';
import { Entity } from 'aframe-react';

class View extends Component {
  constructor() {
    super();
    this.state = {}
  }
  helper(ent, id) {
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

  scaleFun(x, y, z, scale) {
    return {
      scale: `${x ? (x / 100) * scale : 1} 
              ${y ? (y / 100) * scale : 1} 
              ${z ? (z / 100) * scale : 1}`
    }
  }

  // options = () => {
  //   let options

  //   return (

  //   )
  // }

  componentDidMount = () => {
    document.querySelector('a-keyboard').setAttribute('position', { x: -1, y: -0.5, z: -1 });
  }
  render() {
    return (
      <div id='scene' className='col-lg-8'>
        <a-scene embedded arjs background='color: #e8e8e8'  >

          <a-entity light='type: hemisphere; color: #eee; groundColor: #000; intensity:1.5'></a-entity>
          <a-entity id='env'></a-entity>
          {this.props.objects.map((x, index) => this.helper(x, index))}
          <a-entity daydream-controller></a-entity>
          <Entity position='0 0 4w'>
            <a-camera wasd-controls='fly: false'>
              <a-cursor primitive='a-cursor' animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            </a-camera>
          </Entity>

          <a-entity laser-controls="hand: right"></a-entity>
          <a-keyboard is-open="true" physical-keyboard="true" ></a-keyboard>
          <a-input position="-0.7 1 -2.5" placeholder="Username" color="black" width="1"></a-input>
          <a-input position="-0.7 0.8 -2.5" type="password" placeholder="Password" color="black" width="1"></a-input>
          <a-rounded position="0.5 0.5 -2.5" width="4" height="2.5" radius="0.05" rotation="0 -20 0" scale="0.3 0.3 0.3">
            <a-form>
              <a-switch position="0.2 2.1 0" enabled="true"></a-switch>
              <a-radio position="0.2 1.8 0" width="3" name="food" label="Ice cream" value="icecream"></a-radio>
              <a-checkbox position="0.2 1.5 0" width="3" name="stuff" label="I am a checkbox" checked="true"></a-checkbox>
              <a-checkbox position="0.2 1.2 0" width="3" name="stuff" label="And I am another one" checked="true" disabled="true"></a-checkbox>
              <a-button position="0.2 0.8 0" name="stuff" value="Click me" type="raised"></a-button>
              <a-button position="0.2 0.35 0" width="3" name="stuff" value="You can now click me" disabled="false"></a-button>
            </a-form>
          </a-rounded>
        </a-scene>
      </div>

    );
  }
}

export default View;