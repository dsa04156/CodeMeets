import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { Link } from "react-router-dom";

import styled from "styled-components";
// import { BsCameraVideo } from "react-icons/bs";
// import { BsCameraVideoOff } from "react-icons/bs";
// import { AiOutlineCloseCircle } from "react-icons/ai";

import OCRPage from "./OCRPage";

import html2canvas from "html2canvas";

import Crop from "./Crop";
import QuestionPage from "./QestionComponent/QuestionPage";

import { TbCapture } from "react-icons/tb";
import { FiShare } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";

const APPLICATION_SERVER_URL = "https://i8d109.p.ssafy.io/";

class OpenViduMain extends Component {
  constructor(props) {
    super(props);
    // These properties are in the state's component in order to re-render the HTML whenever their values change
    console.log("----------------이게 props", this.props);
    this.state = {
      mySessionId: this.props.meetingUrl.conferenceUrl,
      myUserName: this.props.user.userName,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      newImage: null,
      cropSwitch: true,
      OCRdata: null,
    };

    this.modal = {
      open: true,
      title: "Metting Enter",
    };

    this.cropImage = {
      canvasRef: React.createRef(),
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // this.screenshot = this.screenshot.bind(this);
  }

  // cropImage
  saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  printDocument(domElement) {
    html2canvas(domElement).then((canvas) => {
      // this.saveAs(canvas.toDataURL(), "new.png");
      console.log(canvas.toDataURL());
      this.viewImage(canvas.toDataURL());
    });

    console.log(html2canvas);
  }

  viewImage(image) {
    this.setState({
      newImage: image,
      cropSwitch: false,
    });
    console.log(
      "------------------------------------------",
      this.state.cropSwitch
    );
  }

  closeCropHandler() {
    this.setState({
      cropSwitch: true,
    });
    console.log(
      "------------------------------------------close",
      this.state.cropSwitch
    );
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      var newPublisher = this.OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: "screen", // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: "640x480", // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      });

      newPublisher.once("accessAllowed", (event) => {
        newPublisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .addEventListener("ended", async () => {
            console.log('User pressed the "Stop sharing" button');
            var newPublisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: true, // Whether to mirror your local video or not
            });

            await this.state.session.unpublish(this.state.mainStreamManager);
            await this.state.session.publish(newPublisher);

            this.setState({
              //currentVideoDevice: newVideoDevice[0],
              mainStreamManager: newPublisher,
              publisher: newPublisher,
            });
          });
      });

      await this.state.session.unpublish(this.state.mainStreamManager);
      await this.state.session.publish(newPublisher);

      this.setState({
        //currentVideoDevice: newVideoDevice[0],
        mainStreamManager: newPublisher,
        publisher: newPublisher,
      });
    } catch (e) {
      console.error(e);
    }
  }

  // 클립보드 복사
  readClipboard = async () => {};

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    //   <button onClick={() => this.closeCropHandler()}>
    //   {" "}
    //   newImage:null{" "}
    // </button>
    return (
      <Container>
        {/* {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="resources/images/openvidu_grey_bg_transp_cropped.png"
                alt="OpenVidu logo"
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null} */}
        {/* ------------------------- 여기서 부터 화상 화면 ------------------------------ */}
        {this.state.session !== undefined ? (
          <div style={{ display: "flex" }}>
            <div id="session">
              <div style={{ display: "flex" }}>
                {/* 상단 멤버들 */}
                <SubscriberLine>
                  <SubscriberBox>
                    {this.state.publisher !== undefined ? (
                      <EachSubscriber
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() =>
                          this.handleMainVideoStream(this.state.publisher)
                        }
                      >
                        <UserVideoComponent
                          streamManager={this.state.publisher}
                          type="sub"
                        />
                      </EachSubscriber>
                    ) : null}
                    {this.state.subscribers.map((sub, i) => (
                      <EachSubscriber
                        key={i}
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() => this.handleMainVideoStream(sub)}
                      >
                        <UserVideoComponent streamManager={sub} type="sub" />
                      </EachSubscriber>
                    ))}
                  </SubscriberBox>
                </SubscriberLine>
                <UrlBar>{this.state.mySessionId}</UrlBar>
              </div>
              {this.state.mainStreamManager !== undefined ? (
                <MainBox>
                  <div id="main-video" className="col-md-6">
                    <MainContainer>
                      <MainLine>
                        {this.state.cropSwitch ? (
                          <VideoBox ref={this.cropImage.canvasRef}>
                            <UserVideoComponent
                              streamManager={this.state.mainStreamManager}
                              type="main"
                            />
                          </VideoBox>
                        ) : (
                          <VideoBox>
                            <Crop
                              image={this.state.newImage}
                              closeHandler={() => {
                                this.setState({
                                  cropSwitch: true,
                                });
                              }}
                              OCRhandler={(data) => {
                                this.setState({ OCRdata: data });
                              }}
                            />
                          </VideoBox>
                        )}
                        <div>
                          {this.state.cropSwitch ? (
                            <ToolBar>
                              <TbCapture
                                onClick={() => {
                                  this.setState({
                                    mirror: false,
                                  });
                                  console.log(this.state.mirror);
                                  this.printDocument(
                                    this.cropImage.canvasRef.current
                                  );
                                }}
                                size="35"
                                style={{
                                  marginRight: "10vh",
                                  cursor: "pointer",
                                }}
                              ></TbCapture>
                              <FiShare
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                                size="35"
                                style={{ cursor: "pointer" }}
                              />
                              <Link to="/home">
                                <IoExitOutline
                                  className="btn btn-large btn-danger"
                                  type="button"
                                  id="buttonLeaveSession"
                                  onClick={this.leaveSession}
                                  value="Leave session"
                                  size="35"
                                  color="rgb(255, 0, 0)"
                                  style={{
                                    marginLeft: "30vh",
                                    cursor: "pointer",
                                  }}
                                />
                              </Link>
                            </ToolBar>
                          ) : null}
                        </div>
                      </MainLine>
                      <div>
                        <SideContainer>
                          <OCRPage ocrResult={this.state.OCRdata} />
                          <QuestionPage />
                        </SideContainer>
                      </div>
                    </MainContainer>
                  </div>
                </MainBox>
              ) : null}
            </div>
          </div>
        ) : null}
      </Container>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default OpenViduMain;

const Container = styled.div`
  width: 197.7vh;
  height: 96vh;
  padding: 3vh;
  padding-top: 1vh;
  background: rgb(188, 234, 213);
  background: linear-gradient(
    149deg,
    rgba(188, 234, 213, 1) 0%,
    rgba(222, 245, 229, 0.28904061624649857) 100%
  );
  overflow: hidden;
`;

const SubscriberLine = styled.div`
  border: 2px solid grey;
  border-radius: 20px;
  width: 150vh;
  margin-bottom: 1vh;
  background-color: rgb(142, 195, 176);
`;

const SubscriberBox = styled.div`
  display: flex;
`;

const EachSubscriber = styled.div`
  margin: 10px;
  border: 2px solid grey;
  border-radius: 10px;
  overflow: hidden;
`;

const MainBox = styled.div`
  display: flex;
`;

const VideoBox = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  display: flex;
`;

const SideContainer = styled.div`
  /* border: 2px solid grey;
  border-radius: 10px; */
  /* background-color: rgb(142, 195, 176); */
  height: 86vh;
  width: 47vh;
  display: flex;
  margin-left: 1vh;
  flex-direction: column;
`;

const MainLine = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToolBar = styled.div`
  border: 2px solid grey;
  padding-left: 24vh;
  border-radius: 10px;
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(142, 195, 176);
`;

const UrlBar = styled.div`
  display: flex;
  margin-right: 1vh;
  width: 46.8vh;
  border: 2px solid grey;
  margin-left: 1vh;
  background-color: white;
  border-radius: 5px;
  height: 3vh;
  justify-content: center;
`;


