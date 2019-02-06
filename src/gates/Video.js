import { Input } from "antd"
import { connect } from "react-redux"
import raf from "raf"
import React, { Component } from "react"

import videos from "../videos"

function Screen(props) {
  class InnerVideo extends Component {
    componentDidMount() {
      const loop = () => {
        this._raf = raf(loop)
        const { video } = this.refs
        if (!video) return
        const currentTime = video.currentTime
        // Optimization that only call onFrame if time changes
        if (currentTime !== this.currentTime) {
          this.currentTime = currentTime
          this.props.onFrame(currentTime)
        }
      }
      this._raf = raf(loop)
    }

    componentWillUnmount() {
      raf.cancel(this._raf)
    }

    render() {
      const { onFrame, dispatch, ...rest } = this.props
      return (
        <video {...rest} ref="video" src={videos[this.props.path + ".mp4"]} />
      )
    }
  }

  const ConnectedVideo = connect(mapStateToProps)(InnerVideo)

  return redraw => (
    <ConnectedVideo id={props.id} onFrame={redraw} autoPlay loop muted />
  )
}

const Settings = props => (
  <div>
    Filename:{" "}
    <Input
      placeholder="path"
      value={props.path}
      onChange={e => props.handleSetPath(e.target.value)}
    />
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  path: state.gates.Video[ownProps.id] || "",
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetPath: value => dispatch(setPath(ownProps.id, value)),
})

const setPath = (id, value) => ({
  type: "VIDEO_SET_PATH",
  id,
  value,
})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "VIDEO_SET_PATH":
      return { ...state, [action.id]: action.value }
    default:
      return state
  }
}

export default {
  Settings: connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings),
  Screen: Screen,
  reducer,
}
