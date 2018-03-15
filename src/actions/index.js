export const EDITOR_RENDER = 'EDITOR_RENDER'
export const EDITOR_REFRESH = 'EDITOR_REFRESH'
export const EDITOR_CLEAR = 'EDITOR_CLEAR'


export function render(text, obj){
  return { type: EDITOR_RENDER, text, obj}
}

export function refresh(text){
  return { type: EDITOR_REFRESH, text}
}

export function clear(){
  return { type: EDITOR_CLEAR}
}
