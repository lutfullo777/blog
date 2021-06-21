import React, { useState } from "react";
import "./register.css";
import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import Login from "../../action/userLogin";
import { userRegister } from "../../action/userRegister";
import Message from "../flashMessage/message";

const Register = () => {
  const dispatch = useDispatch();

  const userReg = useSelector((state) => state.userRegister);

  const userLog = useSelector((state) => state.userLogin);

  const { loginError } = userLog;

  const { error } = userReg;

  const [login, setLogin] = useState(true);

  const [checkPassword, setCheckPassword] = useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({});

  const onChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const registerChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const { password, password1 } = register;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(Login(userLogin));
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
      dispatch(userRegister(register));
    }
  };

  window.addEventListener("click", (e) => {
    
    e.target === document.querySelector(".register-form") &&
      document
        .querySelector(".register-form")
        .classList.remove("show-register");
  });

  const removeRegisterHandler = () => {
    setLogin(true);
    document.querySelector(".register-form").classList.remove("show-register");
  };

  const onRegisterHandler = () => {
    setLogin(false);
  };

  const onLoginHandler = () => {
    setLogin(true);
  };

  const forgotPassword = () => {
    alert('Parolingizni eslab ko\'ring')
  }

 

  return (
    <div className="register-form">
      {checkPassword && (
        <Message variant="danger">Parollar bir biriga mos emas!</Message>
      )}
  
      {error && <Message variant="danger">{error}</Message>}
      {loginError &&  <Message variant="danger">{loginError}</Message>}
      

      <div className="register">
        <ul className="register-page">
          <li>{login ? <h3>Kirish</h3> : <h3>Ro'yhatdan o'tish</h3>}</li>
          <li>
            <FaTimes
              onClick={removeRegisterHandler}
              className="register-close-button"
              style={{
                fontSize: "2em",
                color: "rgb(104, 104, 104)",
                cursor: "pointer",
              }}
            />
          </li>
        </ul>
        {login ? (
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              placeholder="Emailingizni kiriting"
              aria-describedby="basic-addon1"
              required
            />

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              placeholder="Parolni kiriting"
              aria-describedby="basic-addon1"
              required
            />
            <button type="submit">Kirish</button>
           
              <p className="register-items" onClick={forgotPassword}>Parolni unutdingizmi?</p>
            
            
              <p onClick={onRegisterHandler} className='register-items'>
                Ro'yhatdan o'tish
              </p>
            
          </form>
        ) : (
          <form onSubmit={onRegisterSubmit}>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={registerChange}
              placeholder="Ism va familiyangizni kiriting"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={registerChange}
              placeholder="Emailingizni kiriting"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={registerChange}
              placeholder="Parolni kiriting"
              aria-describedby="basic-addon1"
              required
            />
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password1"
              onChange={registerChange}
              placeholder="Parolni takrorlang"
              aria-describedby="basic-addon1"
              required
            />
            <button type="submit" style={{width:'150px'}}>Ro'yhatdan o'tish</button>
            
              <p to="/" onClick={onLoginHandler} className='register-items'>
                Kirish
              </p>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
