import React, { Component } from 'react';
import { Entity } from 'aframe-react';

class View extends Component {
  helper(ent, id) {
    if (ent.geometry === 'primitive: curvedimage') {
      return (
        <Entity key={id} {...ent}/>
      )
    } else if (ent.children) {
      let children = ent.children;
      delete ent.children;
      let scale = {};
      if (ent.position && ent.position.z !== undefined) {
        let dist = ent.position.z < 1 ? 1 : Math.abs(ent.position.z)
        scale = {
          scale: `${ent.xdimm ? (ent.xdimm / 100) * dist : 1} 
                ${ent.ydimm ? (ent.ydimm / 100) * dist : 1} 
                ${ent.zdimm ? (ent.zdimm / 100) * dist : 1}`,
        }
      }
      let obj = { ...ent, ...scale }
      return (
        <Entity {...obj}>
          {this.helper(children)}
        </Entity>
      )
    } else {
      let scale = {}
      if (ent.position && ent.position.z !== undefined) {
        let dist = Math.abs(ent.position.z);
        scale = {
          scale: `${ent.xdimm ? (ent.xdimm / 100) * dist : 1} 
                ${ent.ydimm ? (ent.ydimm / 100) * dist : 1} 
                ${ent.zdimm ? (ent.zdimm / 100) * dist : 1}`
        }
      }
      // Here we apply the calculated values to the 
      let obj = { ...ent, ...scale };
      return <Entity key={id} {...obj} />;
    }
  }
  render() {
    return (
      <div id='scene' className='col-lg-8'>
        <a-scene embedded arjs background='color: #e8e8e8' >
    
          <a-entity light='type: hemisphere; color: #eee; groundColor: #000; intensity:1.5'></a-entity>
          {/* <a-scene stats embedded > */}
          {/* <a-assets>
            <img id='colorSides' alt='colored-sides' src={process.env.PUBLIC_URL + '/img/colorSides.png'} />
            <a-asset-item id='xwing-obj' src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.obj'}></a-asset-item>
            <a-asset-item id='xwing-mtl' src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.mtl'}></a-asset-item>
          </a-assets> */}
          <a-entity id='env'></a-entity>
          {/* <a-obj-model src='#xwing-obj' mtl='#xwing-mtl'></a-obj-model> */}
          {this.props.objects.map((x, index) => this.helper(x, index))}
          <a-entity daydream-controller></a-entity>
          <Entity position='0 0 5'>
            <a-camera wasd-controls='fly: true'>
              <a-cursor primitive='a-cursor' animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            </a-camera>
          </Entity>
        </a-scene>
      </div>
    );
  }
}

export default View;