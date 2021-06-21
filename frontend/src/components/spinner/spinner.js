import React from "react";
import "./spinner.css";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="spinner">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{
          color: "red",
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Loader;
