import React, { Component } from "react";

import FullsizeSurface from "../components/FullsizeSurface";

import videos from "../videos"
import Switch from "./Switch"

class Screen extends Component {
  render() {
    return (
      <FullsizeSurface pixelRatio={1}>
        <Switch.Screen in1={videos["2.mp4"]} in2={videos["3.mp4"]}/>
      </FullsizeSurface>
    );
  }
}

export default {
  Screen: Screen
}
