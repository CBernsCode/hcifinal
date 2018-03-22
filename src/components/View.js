import React, { Component } from 'react';

class View extends Component {
  helper(ent, id) {
    if ('geometry' in ent){
      if (ent.geometry === "primative: curvedimage") {
        return (
          <a-curvedimage key={id} src={ent.src} scale={ent.scale}
            position={ent.position} height={ent.height}
            material={ent.material} />
        )
      }
    }
    return <a-entity key={id} {...ent} />;
  }
  render() {
    return (
      <div id="scene" className="col-lg-8">
        <a-scene embedded >
        <a-entity light="type: hemisphere; color: #eeed; groundColor: #000; intensity:1.5"></a-entity>
          {/* <a-scene stats embedded > */}
          <a-assets>
            <img id="colorSides" alt="colored-sides" src={process.env.PUBLIC_URL + '/img/colorSides.png'} />
            {/* <a-asset-item id="xwing-obj" src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.obj'}></a-asset-item>
            <a-asset-item id="xwing-mtl" src={process.env.PUBLIC_URL + '/objs/star-wars-x-wing.mtl'}></a-asset-item> */}
          </a-assets>
          <a-entity id="env" environment='preset: checkerboards'></a-entity>
          {/* <a-obj-model src="#xwing-obj" mtl="#xwing-mtl"></a-obj-model> */}
          {this.props.objects.map((x, index) => this.helper(x, index))}
          <a-entity id="box"
            geometry={{ primitive: 'box' }} s
            material="color: #333; opacity: 0.6"
            position="0 0 -4">
            <a-entity position="0 0 .5" ui-button scale="3 3 3" rotation="90"></a-entity>
            <a-entity position=".5 0 0" ui-button scale="3 3 3" rotation="90 90"></a-entity>
            <a-entity position="-0.5 0 0" ui-button scale="3 3 3" rotation="90 270"></a-entity>
            <a-entity position="0 0 -.5" ui-button scale="3 3 3" rotation="270"></a-entity>
          </a-entity>
          <a-camera wasd-controls="fly: true">
            <a-cursor primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
          </a-camera>
        </a-scene>
      </div>
    );
  }
}

export default View;