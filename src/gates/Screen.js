import pickBy from "lodash/pickBy"
import React, { Component } from "react";
import { connect } from 'react-redux'

import FullsizeSurface from "../components/FullsizeSurface";

import { getInElements } from "./helpers"

export class Screen extends Component {
  render() {
    const allScreens = pickBy(
      this.props.graph.nodes,
      node => node.component === "Screen"
    )
    if (Object.keys(allScreens).length === 0)
      return <div/>
    const firstScreenId = allScreens[Object.keys(allScreens)[0]].id
    const inElement = getInElements(this.props.graph, firstScreenId).in
    return (
      <FullsizeSurface pixelRatio={1}>
        {inElement}
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
