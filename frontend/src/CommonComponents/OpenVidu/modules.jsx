import axios from "axios";

export const APPLICATION_SERVER_URL = "https://i8d109.p.ssafy.io/";

// export const selectInterviwee = async (connectionId, mySessionId) => {
//   const response = await axios.post(
//     APPLICATION_SERVER_URL + "conference/interview/interviewee",
//     {
//       session: mySessionId,
//       interviewee: connectionId,
//     },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   return response.data;
// };

export const getToken = async (mySessionId) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

const createSession = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/sessions",
    { customSessionId: sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data; // The sessionId
};

const createToken = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/sessions/connections/" + sessionId,
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data; // The token
};

export const leaveSession = (session, handler) => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    handler(null);
  };