import React from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./CartPage.css";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <h1 className="pt--2 h3">Shopping Cart</h1>
        {cart.length == 0 ? (
          <Alert variant="info">Shopping cart is empty, add products</Alert>
        ) : (
          <div>Payment</div>
        )}
      </Row>
    </Container>
  );
}

export default CartPage;
