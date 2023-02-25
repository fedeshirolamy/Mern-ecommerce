import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/9789242/pexels-photo-9789242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        style={{
          width: "200vh",
          height: "50vh",
        }}
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last Products</h2>
        {/* last products here */}
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
      <div className="sale_banner--container mt-4">
        <img
          src="https://i.ibb.co/F81WxJ6/Dark-Bycycle-Review-Youtube-Thumbnail.png"
          style={{ width: "1500px" }}
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
