import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import logOut from "../../action/logOut";
import Spinner from "../spinner/spinner";
import { createPost } from "../../action/posts";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  let isAdmin;
  typeof userInfo === "object" && userInfo && (isAdmin = userInfo.isAdmin);
  typeof userInfo === "string" && (isAdmin = JSON.parse(userInfo).isAdmin);

  const userRegister = useSelector((state) => state.userRegister);
  const { load, userRegis } = userRegister;

  const registerHandler = () => {
    document.querySelector(".register-form").classList.add("show-register");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    dispatch(logOut());
  };

  const onTogleDropdown = () => {
    document.querySelector(".profile-card").classList.toggle("show-dropdown");
  };

  window.addEventListener("click", (e) => {
    const path = document.getElementsByTagName('path')

    const dropdown = document.querySelector(".show-dropdown");
    if (dropdown && (e.target !== path[3])) {
      document.querySelector(".profile-card").classList.toggle("show-dropdown");
    }
  });

  // const showSearchHandler = () => {
  //   document.querySelector(".search").classList.add("show-search");
  // };

  const hideSearchHandler = () => {
    document.querySelector(".search").classList.remove("show-search");
  };

  const addPostHandler = () => {
    dispatch(createPost());
  };

  return (
    <div className="header">
      <div className="search">
        <div className="search-input">
          <input type="text" />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={hideSearchHandler}
          >
            Qidirmoq
          </button>
        </div>
      </div>
      {(loading || load) && <Spinner />}
      <div className="header-items">
        <div className="header-logo-items">
          <Link to="/" className="header-logo">
            <h2>Munavarov Lutfullo</h2>
          </Link>
          <ul>
            <li>
              <NavLink className="header-link" to="/" exact>
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink className="header-link" to="/boshqa">
                Boshqalar
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <FaSearch
                // onClick={showSearchHandler}
                style={{
                  fontSize: "1.5em",
                  cursor: "pointer",
                  color: "rgb(104, 104, 104)",
                }}
                className="header-icon"
              />
            </li>
            {userInfo || userRegis ? (
              <>
                <li>
                  <FaBell
                    style={{
                      fontSize: "1.5em",
                      cursor: "pointer",
                      color: "rgb(104, 104, 104)",
                    }}
                    className="header-icon"
                  />
                </li>
                <li>
                  <div>
                    <div>
                      <FaUser
                        style={{
                          fontSize: "1.5em",
                          cursor: "pointer",
                          color: "rgb(104, 104, 104)",
                        }}
                        className="header-icon"
                        onClick={onTogleDropdown}
                      />
                    </div>
                    <ul className="profile-card">
                      <li>Profile</li>
                      <li onClick={logoutHandler}>Chiqish</li>
                      {isAdmin && (
                        <>
                          <li>
                            <Link
                              to="/admin/post"
                              onClick={addPostHandler}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              Post qo'shish
                            </Link>
                          </li>
                          <li>Foydalanuvchilar</li>
                        </>
                      )}
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <button onClick={registerHandler} >
                  Kirish
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
