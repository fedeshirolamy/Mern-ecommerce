import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dvmarheuq/image/upload/v1682618552/qx1jpmq7fsyaps2s8d8i.png"
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last Products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
      </div>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: "rigth",
            display: "block",
            textDecoration: "none",
          }}
        >
          See more {">>"}
        </Link>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img
          src="https://res.cloudinary.com/dvmarheuq/image/upload/v1682615999/sfn0vpwd4qzqb5vvxdcf.png"
          alt="banner"
        />
      </div>

      <div className="recent-products-container container mt-4">
        <h3>Categories</h3>
        <Row>
          {categories.map((cat) => (
            <LinkContainer to={`/category/${cat.name.toLocaleLowerCase()}`}>
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cat.img})`,
                    gap: "10px",
                  }}
                  className="category-title"
                >
                  {cat.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
