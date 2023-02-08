import { OpenVidu } from "openvidu-browser";

import React, { useEffect, useState } from "react";
import "./App.css";
import UserVideoComponent from "./UserVideoComponent2";
import {
  selectInterviwee,
  getToken,
  APPLICATION_SERVER_URL,
  leaveSession,
} from "./modules";

function App() {
  const [info, setInfo] = useState({
    interviewee: "미지정",
    mySessionId: "SessionA",
    myUserName: "Participant" + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
  });
  const [session, setSession] = useState(null);
  const [OV, setOV] = useState(new OpenVidu());

  //componentDidMount
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      leaveSession(session, setOV);
    });
  }, []);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", () => {
        leaveSession(session, setOV);
      });
    };
  });

  useEffect(() => {
    let mySession = session;

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    if (mySession !== null) {
      mySession.on("streamCreated", (e) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        let subscriber = mySession.subscribe(e.stream, undefined);
        let subscribers = info.subscribers;
        subscribers.push(subscriber);

        // Update the state with the new subscribers
        setInfo((prev) => {
          return { ...prev, subscribers: subscribers };
        });
      });

      // On every Stream destroyed...
      mySession.on("streamDestroyed", (e) => {
        // Remove the stream from 'subscribers' array
        console.log("연결 해제");
        console.log(e);
        console.log("커넥션 ID: " + e.stream.connection.connectionId);
        deleteSubscriber(e.stream.streamManager);
      });

      mySession.on("broadcast-interviewee", (e) => {
        console.log("면접자 : " + e.data);
        setInfo((prev) => {
          return { ...prev, interviewee: e.data };
        });
      });

      // On every asynchronous exception...
      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      getToken(info.mySessionId).then((token) => {
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token, { clientData: info.myUserName })
          .then(async () => {
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = await OV.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Obtain the current video device in use
            let devices = await OV.getDevices();
            let videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );

            let currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;

            let currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher

            setInfo((prev) => {
              return {
                ...prev,
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              };
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
  }, [session]);

  useEffect(() => {
    setInfo((prev) => {
      return {
        ...prev,
        session: undefined,
        subscribers: [],
        mySessionId: "SessionA",
        myUserName: "Participant" + Math.floor(Math.random() * 100),
        mainStreamManager: undefined,
        publisher: undefined,
      };
    });
  }, [OV]);

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    // --- 2) Init a session ---
    setSession(OV.initSession());
  };

  const deleteSubscriber = (streamManager) => {
    let subscribers = info.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setInfo((prev) => {
        return { ...prev, subscribers: subscribers };
      });
    }
  };

  const handleChangeSessionId = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        mySessionId: e.target.value,
      };
    });
  };

  const handleChangeUserName = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        myUserName: e.target.value,
      };
    });
  };

  /*
        면접자 지정
        connectionId : 면접자
    */
  const handleMainVideoStream = (stream) => {
    if (info.mainStreamManager !== stream) {
      setInfo((prev) => {
        return {
          ...prev,
          mainStreamManager: stream,
        };
      });
    }
  };

  return (
    <div className="container">
      {session === null ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={info.myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={info.mySessionId}
                  onChange={handleChangeSessionId}
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
      ) : null}

      {session !== null ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{info.mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          <div>
            <h1>면접자ID : {info.interviewee}</h1>
          </div>

          {info.mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={info.mainStreamManager} />
              {/* <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              /> */}
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {info.publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(info.publisher)}
              >
                <UserVideoComponent streamManager={info.publisher} />
                <button
                  onClick={() =>
                    selectInterviwee(
                      info.publisher.stream.connection.connectionId,
                      info.mySessionId
                    )
                  }
                >
                  면접자 지정
                </button>
              </div>
            ) : null}
            {info.subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
                <button
                  onClick={() =>
                    selectInterviwee(sub.stream.connection.connectionId)
                  }
                >
                  면접자 지정
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
