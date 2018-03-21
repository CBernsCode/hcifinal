var entityModel = [
  {
    geometry: {
      primitive: "box"
    },
    material: "color: red",
    position: "0 0 -2"
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
      var newText = JSON.stringify(newObjs, null, "  ")
      return {
        ...state,
        text: newText,
        objs: newObjs
      }
    case 'EDITOR_REFRESH':
      // eslint-disable-next-line     
      var newObjs = JSON.parse(action.text)
      // eslint-disable-next-line     
      var newText = JSON.stringify(newObjs, null, "  ")
      return {
        ...state,
        text: newText,
        objs: newObjs
      }
    case 'EDITOR_CLEAR':
      return initial_state
    default:
      return state
  }
}