import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../action/posts";
import OnePost from "./post";
import Spinner from "../spinner/spinner";

const Home = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  const Posts = useSelector((state) => state.Posts);

  const { posts } = Posts;
  const loading = Posts.loading;

  return (
    <div className="home-page">
      {loading && <Spinner />}
      <div className="home-items">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <OnePost post={post} history={history} key={post._id} />
          ))
        ) : (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Hozircha post mavjud emas
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
