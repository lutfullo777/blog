import React from "react";
import { FaClock, FaHeart, FaEye } from "react-icons/fa";

const Post = ({ post, history }) => {
  
  let postParagraph, date, time;
  if (post.paragraph && post.date) {
    postParagraph = post.paragraph.slice(0, 250);
    date = post.date.slice(0, 10);
    time = post.date.slice(11,16);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    history.push(`/post/${post._id}`);
  };
  return (
    <>
      <div className="post">
        <div className="home-item">
          <div className="about-post">
            <h2>{post.title}</h2>
            <ul>
              <li>
                <FaClock className="post-icon" style={{ color: "grey" }} />
                {date} / {time}
              </li>
              <li>
                <FaHeart className="post-icon" style={{ color: "red" }} />
                {post.like}
              </li>
              <li>
                <FaEye className="post-icon" style={{ color: "grey" }} />
                {post.seen}
              </li>
            </ul>
            <p>{postParagraph}...</p>
          </div>
          <div className="post-image">
            <img src={post.photo} alt={post.title} />
          </div>
        </div>
        <button
          type="button"
          className=" post-button"
          onClick={onClickHandler}
        >
          Davomi {">>>"}
        </button>
        
      </div>
    </>
  );
};

export default Post;
