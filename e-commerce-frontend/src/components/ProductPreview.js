import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";

function ProductPreview({ _id, category, name, pictures }) {
  return (
    <LinkContainer to={`/product/${_id}`} className="linkContainer">
      <Card className="cardTop">
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge bg="warning" text="dark">
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
