import pickBy from "lodash/pickBy"
import React, { Component } from "react";
import { connect } from 'react-redux'

import FullsizeSurface from "../components/FullsizeSurface";

import gates from "."
import { getInNodes } from "./helpers"

export class Screen extends Component {
  render() {
    const allScreens = pickBy(
      this.props.graph.nodes,
      node => node.component === "Screen"
    )
    if (Object.keys(allScreens).length === 0)
      return <div/>
    const firstScreenId = allScreens[Object.keys(allScreens)[0]].id
    const inNode = getInNodes(this.props.graph, firstScreenId).in
    const inComponent = React.createElement(
      gates[inNode.component].Screen, {id: inNode.id}
    )
    return (
      <FullsizeSurface pixelRatio={1}>
        {inComponent}
        {/* <Switch.Screen id={2} in1={videos["2.mp4"]} in2={videos["3.mp4"]}/> */}
      </FullsizeSurface>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    graph: state.controller.graph
  }
}

export default {
  Screen: connect(mapStateToProps)(Screen),
}
