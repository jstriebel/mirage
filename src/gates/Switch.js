import React from "react";
import { Shaders, GLSL, Node } from "gl-react"
import { connect } from 'react-redux'
import pick from 'lodash/pick'

import { Slider } from 'antd';
import { setAlpha } from "../actions"

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
`
  }
});

const SwitchScreen = (props) => (
  <Node shader={shaders.Switch} uniforms={pick(props, "in1", "in2", "alpha")} />
);

const SwitchController = (props) => (
  <div>
    Switch: <Slider max={1} step={0.01} value={props.alpha} onChange={props.handleSliderChange} />
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    alpha: state.alpha
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSliderChange: value => dispatch(setAlpha(value))
})

export default {
  Controller: connect(mapStateToProps, mapDispatchToProps)(SwitchController),
  Screen: connect(mapStateToProps)(SwitchScreen)
}
