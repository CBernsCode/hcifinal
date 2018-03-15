var entityModel = [
  {
    geometry: {
      primitive: "box"
    },
    material: "color: red",
    position: "0 0 -2",
    animation: "property: position; dir: alternate; dur: 1000;easing: easeInSine; loop: true; to: 0 2 -2"
  }
]

const initial_state = {
  text: JSON.stringify(entityModel, null, "  "),
  objs: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      var newObjs = state.objs.concat(action.obj)
      let newText = JSON.stringify(newObjs, null, "  ")
      return {
        text: newText,
        objs: newObjs
      }
    case 'EDITOR_REFRESH':
      var newObjs = JSON.parse(action.text)
      var newText = JSON.stringify(newObjs, null, "  ")
      return {
        text: newText,
        objs: newObjs
      }
    case 'EDITOR_CLEAR':
      return initial_state
    default:
      return state
  }
}