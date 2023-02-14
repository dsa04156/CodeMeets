import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

import styled from "styled-components";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    console.log(
      "-----------------------",
      JSON.parse(this.props.streamManager.stream.connection.data).clientData
    );
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    const videoType = this.props.type;
    const streamManager = this.props.streamManager;
    if (streamManager !== undefined && videoType !== "main") {
      return (
        <DivStyle>
          <OpenViduVideoComponent
            streamManager={this.props.streamManager}
            type={this.props.type}
          />
        </DivStyle>
      );
    } else if (streamManager !== undefined && videoType === "main") {
      return (
        <OpenViduVideoComponent
          streamManager={this.props.streamManager}
          type={this.props.type}
        />
      );
    } else {
      return null;
    }
    // return (
    //     <div>
    //         {this.props.streamManager !== undefined && this.props.type !=="main" ? (
    //             <DivStyle>
    //                 <OpenViduVideoComponent streamManager={this.props.streamManager} type={this.props.type}/>
    //             </DivStyle>
    //         ) : <OpenViduVideoComponent streamManager={this.props.streamManager} type={this.props.type} />}
    //     </div>
    // );
  }
}

const DivStyle = styled.div`
  width: 10vh;
  height: 7vh;
`;
