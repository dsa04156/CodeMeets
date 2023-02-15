import React, { Component } from "react";
import styled from "styled-components";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div>
        {console.log(this.props)}
        {this.props.type === "main" ? (
          <div
            style={{
              width: "150vh",
              height: "78vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MainVideo autoPlay={true} ref={this.videoRef}  />
          </div>
        ) : (
          <SmallVideo autoPlay={true} ref={this.videoRef} />
        )}
      </div>
    );
  }
}

const MainVideo = styled.video`
  /* width: 150vh; */
  height: 78vh;
  border-radius: 20px;
  object-fit: fill;
  max-width:150vh;
`;

const SmallVideo = styled.video`
  width: 10vh;
  height: 7vh;
  object-fit: cover;
`;
