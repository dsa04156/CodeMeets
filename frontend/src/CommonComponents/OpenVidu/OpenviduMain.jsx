import { OpenVidu } from "openvidu-browser";

import React, { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

// import {
//   getToken,
//   APPLICATION_SERVER_URL,
//   leaveSession,
// } from "./modules";

import axios from "axios";

const OpenviduMain = () => {
  const loginUser = useRecoilValue(user);
  const APPLICATION_SERVER_URL = "https://i8d109.p.ssafy.io/";

  const [session, setSesssion] = useState(null);
  const [OV, setOV] = useState(new OpenVidu());

  const [info, setInfo] = useState({
    mySessionId: "sessionA",
    myUserName: loginUser.userName,
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
  });

  // componentDidMount -> 렌더링 이후 즉시 요청되는 함수
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      // leaveSession(session, setOV);
      leaveSession();
    });
  }, []);

  // componentWillUnmount -> 언마운트는 JSX 에 포함되었다가 이후에 제거되는 경우에 발생합니다
  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", () => {
        // leaveSession(session, setOV);
        leaveSession();
      });
    };
  });

  // 이거 정해준 듯?------------------------------------------------------------------
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
  // -------------------------------------------------------------------------------

  const handleMainVideoStream = (stream) => {
    if (info.mainStreamManager !== stream)
      setInfo((prev) => {
        return {
          ...prev,
          mainStreamManager: stream,
        };
      });
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

  const joinSession = () => {
    setSesssion(OV.initSession());
  };

  const getToken = async (mySessionId) => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + '/connections',
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // The token
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = info.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOV(null);
  };

  useEffect(() => {
    setInfo((prev) => {
      return {
        ...prev,
        session: undefined,
        subscribers: [],
        mySessionId: "sessionA",
        myUserName: loginUser.userName,
        mainStreamManager: undefined,
        publisher: undefined,
      };
    });
  }, [OV]);

  useEffect(() => {
    let mySession = session;

    if (mySession !== null) {
      mySession.on("streamCreated", (e) => {
        let subscriber = mySession.subscribe(e.stream, undefined);
        let subscribers = info.subscribers;
        subscribers.push(subscriber);

        setInfo((prev) => {
          return { ...prev, subscribers: subscribers };
        });
      });

      mySession.on("streamDestroyed", (e) => {
        console.log("연결 해제");
        console.log(e);
        console.log("커넥션 ID: " + e.stream.connection.connectionId);
        deleteSubscriber(e.stream.streamManager);
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      getToken(info.mySessionId).then((token) => {
        mySession
          .connect(token, { clientData: info.myUserName })
          .then(async () => {
            let publisher = await OV.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: false,
            });
            mySession.publish(publisher);

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

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      let videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== info.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          let newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await info.session.unpublish(info.mainStreamManager);

          await info.session.publish(newPublisher);
          setInfo((prev) => {
            return {
              ...prev,
              currentVideoDevice: newVideoDevice[0],
              mainStreamManager: newPublisher,
              publisher: newPublisher,
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {session === null ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
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
                  type="text"
                  id="sessionId"
                  value={info.mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== null ? (
        <div>
          <div>
            <h1>{info.mySessionId}</h1>
            <input
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {info.mainStreamManager !== undefined ? (
            <div >
              <UserVideoComponent
                streamManager={info.mainStreamManager}
              />
              <input
                className="btn btn-large btn-success"
                type="button"
                onClick={switchCamera}
                value="Switch Camera"
              />
            </div>
          ) : null}

          <div>
          {info.publisher !== undefined ? (
            <div onClick={() => handleMainVideoStream(info.publisher)}>
              <UserVideoComponent streamManager={info.publisher} />
            </div>
          ) : null}
          </div>

          <div>
            {info.subscribers.map((sub, i) => (
              <div
                key={i}
                onClick={() => {
                  handleMainVideoStream(sub);
                }}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenviduMain;
