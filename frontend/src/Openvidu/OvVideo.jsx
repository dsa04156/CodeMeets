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
          <MainVideo autoPlay={true} ref={this.videoRef} />
        ) : (
            <SmallVideo autoPlay={true} ref={this.videoRef} />
        )}
      </div>
    );
  }
}

const MainVideo = styled.video`
  width: 150vh;
  height: 78vh;
  border: 2px solid grey;
  border-radius: 20px;

  background-color: rgb(142, 195, 176);
`;

const SmallVideo = styled.video`
  width: 10vh;
  height: 7vh;
  object-fit: cover;
`;
