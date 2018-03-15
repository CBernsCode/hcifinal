import React, { Component } from 'react';
import Aframe from 'aframe'
import 'aframe-animation-component'
import 'aframe-ui-widgets'

class View extends Component {
  helper(ent, id) {
    if (ent !== null) {
      if (ent.geometry.primitive === "curvedimage") {
        return (
          <a-curvedimage key={id} src={ent.src} scale={ent.scale}
            position={ent.position} height={ent.height}
            material={ent.material} />
        )
      }
      return <a-entity key={id} {...ent} />;
    }
  }
  render() {
    return (
      <div id="scene" className="col-lg-8">
        <a-scene embedded >
        {/* <a-scene stats embedded > */}
          <a-assets>
            <a-mixin id="box" geometry="primitive: box"></a-mixin>
            <a-mixin id="tall" geometry="height: 10"></a-mixin>
            <a-mixin id="wide" geometry="width: 10"></a-mixin>
            <img id="sky" src={process.env.PUBLIC_URL + '/img/360.jpg'} />
            <img id="pond" src={process.env.PUBLIC_URL + '/img/pond.jpg'} />
            <img id="chess" src={process.env.PUBLIC_URL + '/img/chess-world.jpg'} />
            <img id="indoors" src={process.env.PUBLIC_URL + '/img/principedisavoia.jpg'} />
            {/* <a-asset-item id="xwing-obj" src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.obj'}></a-asset-item>
            <a-asset-item id="xwing-mtl" src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.mtl'}></a-asset-item> */}
          </a-assets>
          <a-sky src="#indoors"></a-sky>
          {/* <a-obj-model src="#xwing-obj" mtl="#xwing-mtl"></a-obj-model> */}
          {this.props.objects.map((x, index) => this.helper(x, index))}
          {/* <a-cylinder color="#000" radius="0.2"
                animation="property: color; dir: alternate; dur: 1000;
                           easing: easeInSine; loop: true; to: #5F5"></a-cylinder> */}
          <a-entity position="0 0 1" ui-rotary rotation="45"></a-entity>
          <a-entity position="0 1 0.5" ui-button rotation="45"></a-entity>
          <a-entity position="1 0 1" ui-button rotation="45"></a-entity>
          <a-entity position="1 1 0.5" ui-button rotation="45"></a-entity>
        </a-scene>
      </div>
    );
  }
}

export default View;