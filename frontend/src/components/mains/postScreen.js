import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, deletePost } from "../../action/posts";
import { commentAction, getComments } from "../../action/comment";
import Spinner from "../spinner/spinner";
import "./postScreen.css";
import { FaUser } from "react-icons/fa";
import {
  FaTelegramPlane,
  FaClock,
  FaHeart,
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaHeartBroken,
  FaTrash,
} from "react-icons/all";

const PostScreen = ({ location, history }) => {
  const [comment, setComment] = useState();

  const dispatch = useDispatch();

  const id = location.pathname.split("/")[2];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postData = useSelector((state) => state.getPostById);
  const { post, loading } = postData;

  const deletedPost = useSelector((state) => state.deletePost);
  const { load, err } = deletedPost;

  const Comments = useSelector((state) => state.getComment);
  const { getComment } = Comments;

  const sendingComment = useSelector((state) => state.sendComment);
  const { sentComment } = sendingComment;

  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getComments(id));
  }, [dispatch, id, post._id]);

  const deleteHandler = () => {
    dispatch(deletePost(id, history));
  };

  const editHandler = (e) => {
    e.preventDefault();
    history.push(`/post/${id}/edit`);
  };

  let isAdmin;
  typeof userInfo === "object" && userInfo && (isAdmin = userInfo.isAdmin);
  typeof userInfo === "string" && (isAdmin = JSON.parse(userInfo).isAdmin);

  const LikeHandler = (x) => {
    let likes;

    const htmlLike = document.querySelector(".like-rate-screen");
    const haveLikes = localStorage.getItem(x ? "likes" : "dislike");
    if (haveLikes === null) {
      likes = [];
    } else {
      likes = JSON.parse(localStorage.getItem(x ? "likes" : "dislike"));
    }
    if (!likes.includes(id)) {
      likes.push(id);
      axios.put(x ? "/like" : "/dislike", { id });
      htmlLike.style.display = "flex";
      htmlLike.style.background = "lightblue";
      htmlLike.innerHTML = x ? "Yoqtirish bosildi!" : "Yoqmadi bosildi!";
    } else {
      htmlLike.style.display = "flex";
      htmlLike.style.background = "rgb(240, 140, 140)";
      htmlLike.innerHTML = x
        ? "Oldin yoqtirish bosilgan!"
        : "Oldin yoqmadi bosilgan!";
    }

    setTimeout(() => (htmlLike.style.display = "none"), 3000);
    localStorage.setItem(x ? "likes" : "dislike", JSON.stringify(likes));
  };

  const commentValue = (e) => {
    setComment(e.target.value);
  };

  const sendComment = async (e) => {
    e.preventDefault();
    dispatch(commentAction(comment, id));
    e.target.children[0].value = "";
  };

  const deleteComment = async (id) => {
    let token;

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      token = JSON.parse(userInfo).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/comment/delete/${id}`, config);
    }
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      {loading || load ? (
        <Spinner />
      ) : err ? (
        <h2>{err}</h2>
      ) : (
        <div style={{ width: "100%", padding: "20px" }}>
          <div>
            <div className="post-screen">
              <h1>{post.title}</h1>
              <img src={post.photo} alt="" />
              <p>{post.paragraph}</p>

              <ul className="rates">
                <li>
                  <FaClock className="post-icon" style={{ color: "grey" }} />
                  {post.date}
                </li>
                <li>
                  <FaHeart className="post-icon" style={{ color: "red" }} />
                  {post.like}
                </li>
                <li>
                  <FaHeartBroken
                    className="post-icon"
                    style={{ color: "red" }}
                  />
                  {post.dislike}
                </li>
                <li>
                  <FaEye className="post-icon" style={{ color: "grey" }} />
                  {post.seen}
                </li>
              </ul>
              <div className="like-me">
                <ul>
                  <li onClick={() => LikeHandler(false)}>
                    <FaThumbsDown size="20px" />
                  </li>
                  <li onClick={() => LikeHandler(true)}>
                    <FaThumbsUp size="20px" />
                  </li>
                </ul>
              </div>

              {isAdmin && (
                <>
                  <button
                    onClick={deleteHandler}
                    style={{ marginRight: "10px" }}
                  >
                    O'chirish
                  </button>
                  <button onClick={editHandler}>Tahrirlash</button>
                </>
              )}
              <div className="comment">
                <div className="comment-display-parent">
                  <div className="comment-display-child">
                    <div className="user-comment">
                      <ul>
                        <li className="comment-user-icon">
                          <FaUser size="20px" color="rgb(70,70,70)" />
                        </li>
                        <li className="comment-text">
                          <p>
                            <b>Munavarov Lutfullo</b>
                          </p>
                          Assalomu alaykum!
                        </li>
                      </ul>
                      <div className="comment-time">
                        <p title="19.05.2021/22:52">22:52</p>
                      </div>
                    </div>
                    {getComment &&
                      getComment.map((comment) => {
                        return (
                          <div className="user-comment" key={comment._id}>
                            <ul>
                              <li className="comment-user-icon">
                                <FaUser size="20px" color="rgb(70,70,70)" />
                              </li>
                              <li className="comment-text">
                                <p>
                                  <b>{comment.user}</b>
                                </p>
                                {comment.comment}
                              </li>
                            </ul>
                            <div className="comment-time">
                              <p title={comment.date}>
                                {comment.date.split(" ")[1]}
                              </p>
                            </div>
                            {isAdmin && (
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "right",
                                  margin: "0",
                                }}
                              >
                                <FaTrash
                                  style={{ width: "30px", cursor: "pointer" }}
                                  onClick={() => deleteComment(comment._id)}
                                />
                              </p>
                            )}
                          </div>
                        );
                      })}
                    {sentComment && (
                      <div className="user-comment">
                        <ul>
                          <li className="comment-user-icon">
                            <FaUser size="20px" color="rgb(70,70,70)" />
                          </li>
                          <li className="comment-text">
                            <p>
                              <b>{sentComment.comment.user}</b>
                            </p>
                            {sentComment.comment.comment}
                          </li>
                        </ul>
                        <div className="comment-time">
                          <p title={sentComment.comment.date}>
                            {sentComment.comment.date.split(" ")[1]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <form className="send-comment" onSubmit={sendComment}>
                  <input
                    type="text"
                    placeholder="Izoh qoldirish"
                    onChange={commentValue}
                    required
                  />
                  <button>
                    <FaTelegramPlane />
                    Jo'natish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="like-rate-screen">
        <p>Hello world</p>
      </div>
    </div>
  );
};

export default PostScreen;
