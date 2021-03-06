import React from "react"
import { Shaders, GLSL, Node } from "gl-react"
import { connect } from "react-redux"

import { Slider } from "antd"

import { getInElements } from "./helpers"

const shaders = Shaders.create({
  Switch: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D in1;
uniform sampler2D in2;
uniform float alpha;
void main () {
  vec4 c1 = texture2D(in1, vec2(uv.x, uv.y));
  vec4 c2 = texture2D(in2, vec2(uv.x, uv.y));
  gl_FragColor = alpha*c1 + (1.-alpha)*c2;
}
`,
  },
})

const SwitchScreen = props => (
  <Node
    shader={shaders.Switch}
    uniforms={{
      alpha: props.alpha,
      ...getInElements(props.graph, props.id),
    }}
  />
)

const SwitchSettings = props => (
  <div>
    Switch:{" "}
    <Slider
      max={1}
      step={0.01}
      value={props.alpha}
      onChange={props.handleSliderChange}
    />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    alpha: state.gates.Switch[ownProps.id] || 0,
    graph: state.controller.graph,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSliderChange: value => dispatch(setAlpha(ownProps.id, value)),
})

const setAlpha = (id, value) => ({
  type: "SWITCH_SET_ALPHA",
  id,
  value,
})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SWITCH_SET_ALPHA":
      return { ...state, [action.id]: action.value }
    default:
      return state
  }
}

export default {
  Settings: connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwitchSettings),
  Screen: connect(mapStateToProps)(SwitchScreen),
  reducer,
}
