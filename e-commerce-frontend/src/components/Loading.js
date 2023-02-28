import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <Spinner animation="grow" />
    </div>
  );
}

export default Loading;
