//@flow
import React, { Component } from "react"
import { Surface } from "gl-react-dom"

export default class FullsizeSurface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    return (
      <Surface
        width={this.state.width}
        height={this.state.height}
        {...this.props}
      >
        {this.props.children}
      </Surface>
    )
  }
}
