import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../action/posts";
import { updatePost } from "../../action/posts";
import Spinner from "../spinner/spinner";
import { Col, Row, Form, Card } from "react-bootstrap";
import { FaCheck, FaBug } from "react-icons/fa";

const EditPost = ({ location, history }) => {
  const [image, setImage] = useState();
  const [Post, setPost] = useState({});

  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];

  const postData = useSelector((state) => state.getPostById);
  const { post, loading } = postData;

  useEffect(() => {
    if (!post._id || post._id !== id) {
      dispatch(getPostById(id));
    } else {
      const title = post.title;
      const paragraph = post.paragraph;
      const photo = post.photo;
      const seen = post.seen;
      const like = post.like;
      const dislike = post.dislike;
      const date = post.date;
      setPost({ title, paragraph, seen, photo, like, dislike, date });
    }
  }, [dispatch, id, post]);

  const onChange = (e) => {
    setPost({ ...Post, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const path = file.name;
    const formData = new FormData();
    formData.append("image", file);
    setImage(formData);
    setPost({ ...Post, photo: path });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(post, image, Post, history));
  };

  return (
    <>
      {loading && <Spinner />}

      <div>
        <div className="post-success">
          <Card
            className="success-post"
            style={{
              width: "60%",
              margin: "auto",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              className="check"
              style={{
                width: "150px",
                height: "150px",
                background: "green",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <FaCheck size="100" color="white" />
            </div>
            <h3>Post muvaffaqiyatli yuklandi!</h3>
          </Card>
        </div>
        <div className="post-error">
          <Card
            className="success-post"
            style={{
              width: "60%",
              margin: "auto",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              className="check"
              style={{
                width: "150px",
                height: "150px",
                background: "red",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <FaBug size="100" color="white" />
            </div>
            <h3>Siz admin emassiz yoki server xatosi!</h3>
          </Card>
        </div>
        <Row style={{ margin: "auto" }}>
          <Col md={6} style={{ margin: "50px auto", zIndex: "0" }}>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group controlId="title">
                <Form.Label>Post Nomi</Form.Label>
                <Form.Control
                  as="input"
                  onChange={onChange}
                  name="title"
                  value={Post.title || ""}
                />
              </Form.Group>
              <Form.Group controlId="paragraph">
                <Form.Label>Post haqida</Form.Label>
                <Form.Control
                  as="textarea"
                  row="3"
                  onChange={onChange}
                  name="paragraph"
                  value={Post.paragraph || ""}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Post rasmi</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadFileHandler}
                  name="photo"
                />
              </Form.Group>
              <button>Qo'shish</button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditPost;
