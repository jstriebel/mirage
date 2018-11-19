import raf from "raf";
import React, { Component } from "react";

// We implement a component <Video> that is like <video>
// but provides a onFrame hook so we can efficiently only render
// if when it effectively changes.
export default function Video(src) {
  class InnerVideo extends Component {
    componentDidMount() {
      const loop = () => {
        this._raf = raf(loop);
        const { video } = this.refs;
        if (!video) return;
        const currentTime = video.currentTime;
        // Optimization that only call onFrame if time changes
        if (currentTime !== this.currentTime) {
          this.currentTime = currentTime;
          this.props.onFrame(currentTime);
        }
      };
      this._raf = raf(loop);
    }

    componentWillUnmount() {
      raf.cancel(this._raf);
    }

    render() {
      const { onFrame, ...rest } = this.props;
      return <video {...rest} ref="video" />;
    }
  }

  return redraw => (
    <InnerVideo onFrame={redraw} autoPlay loop muted>
      <source type="video/mp4" src={src} />
    </InnerVideo>
  );
}
