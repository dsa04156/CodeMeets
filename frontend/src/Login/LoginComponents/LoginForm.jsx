import React, { useState, useRef } from "react";

const LoginForm = (props) => {
  const [val, setVal] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  const list = [
    /^[a-zA-z0-9]{4,12}$/, //id
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, //password
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/, //email
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, //phone
  ];

  const onChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    setVal(val);

    // 유효성 검사
    if (name == "id" || name == "email") {
      const RegExp = list[props.reg];
      const validTest = RegExp.test(val);
      if (!validTest) {
        setMessage(props.errorMsg);
        setValid(false);
      } else {
        setMessage(props.sucessMsg);
        setValid(true);
      }
    }

    // 갯수 검사
    if (name == "name") {
      if (val.length < 2 || val.length > 5) {
        setMessage(props.errorMsg);
        setValid(false);
      } else {
        setMessage(props.sucessMsg);
        setValid(true);
      }
    }
  };

  return (
    <div className="form-el" style={{ marginBottom: "10px" }}>
      <label htmlFor={props.htmlFor} style={{ marginRight: "10px" }}>
        {props.text}
      </label>
      <input id={props.id} name={props.name} value={val} onChange={onChange} />
      <p className="message"> {message} </p>
    </div>
  );
}

export default LoginForm;