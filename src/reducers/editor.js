var entityModel = [
  {
    "geometry": {
      "primative": "box"
    },
    "material": {
      "color": "#ff8800",
      "opacity": ".8"
    },
    "position": {
      "x": "0",
      "y": "0",
      "z": "1"
    },
    "xdimm": "200",
    "ydimm": "100",
    "zdimm": "1",
    "dist": "1",
    "rotation": "0 0 0"
  }
]

const initial_state = {
  text: JSON.stringify(entityModel, null, "  "),
  objs: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try {
        let newObjs = state.objs.concat(action.obj)
        let newText = JSON.stringify(newObjs, null, "  ")
        return {
          ...state,
          text: newText,
          objs: newObjs
        }
      } catch (error) {
        console.error(error)
        return state
      }
    case 'EDITOR_REFRESH':
      try {
        let newObjs = JSON.parse(action.text)
        let newText = JSON.stringify(newObjs, null, "  ")
        return {
          ...state,
          text: newText,
          objs: newObjs
        }
      } catch (error) {
        console.error(error)
        return state
      }
    case 'EDITOR_CLEAR':
      return initial_state
    default:
      return state
  }
}