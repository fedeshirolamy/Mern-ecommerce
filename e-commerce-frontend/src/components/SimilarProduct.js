import React from "react";
import "./ProductPreview.css";

function SimilarProduct({ _id, category, name, pictures }) {
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

export default SimilarProduct;
