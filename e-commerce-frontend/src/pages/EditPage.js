import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./CreateProduct.css";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [pictures, setPictures] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get("/products/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setPictures(product.pictures);
        setPrice(product.price);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dvmarheuq",
        uploadPreset: "xb2f8ysg",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setPictures((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  function handleRemoveImg(imgObject) {
    setImgToRemove(imgObject.public_id);
    axios
      .delete(`/images/${imgObject.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setPictures((prev) =>
          prev.filter((img) => img.public_id !== imgObject.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !pictures.length) {
      return alert("Please fill out all the fields");
    }
    updateProduct({ id, name, description, price, category, pictures }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  return (
    // <Container>
    //   <Row>
    //     <Col md={6} className="new-product__form--container">
    //       <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
    //         <h1 className="mt-4">Edit Product</h1>
    //         {isSuccess && <Alert variant="success">Product updated</Alert>}
    //         {isError && <Alert variant="danger">{error.data}</Alert>}
    //         <Form.Group className="mb-3">
    //           <Form.Label>Product name</Form.Label>
    //           <Form.Control
    //             type="text"
    //             placeholder="Enter product name"
    //             value={name}
    //             required
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>Product description</Form.Label>
    //           <Form.Control
    //             as="textarea"
    //             placeholder="Product description"
    //             style={{ height: "100px" }}
    //             value={description}
    //             required
    //             onChange={(e) => setDescription(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>Product price($)</Form.Label>
    //           <Form.Control
    //             type="number"
    //             placeholder="Price($)"
    //             value={price}
    //             required
    //             onChange={(e) => setPrice(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Form.Group
    //           className="mb-3"
    //           onChange={(e) => setCategory(e.target.value)}
    //         >
    //           <Form.Label>Category</Form.Label>
    //           <Form.Select value={category}>
    //             <option disabled selected>
    //               -- Select One --
    //             </option>
    //             <option value="mountain-bike">Mountain-Bike</option>
    //             <option value="road-bike">Road-Bike</option>
    //             <option value="ride-bike">Ride-Bike</option>
    //           </Form.Select>
    //         </Form.Group>
    //         <Form.Group className="mb-3">
    //           <Button type="button" onClick={showWidget}>
    //             Upload images
    //           </Button>
    //           <div className="images-preview-container">
    //             {pictures.map((image) => (
    //               <div className="image-preview">
    //                 <img src={image.url} />
    //                 {imgToRemove !== image.public_id && (
    //                   <i
    //                     className="fa fa-times-circle"
    //                     onClick={() => handleRemoveImg(image)}
    //                   ></i>
    //                 )}
    //               </div>
    //             ))}
    //           </div>
    //         </Form.Group>
    //         <Form.Group>
    //           <Button type="submit" disabled={isLoading || isSuccess}>
    //             Update Product
    //           </Button>
    //         </Form.Group>
    //       </Form>
    //     </Col>
    //     <Col md={6} className="new-product__image--container"></Col>
    //   </Row>
    // </Container>
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Edit product</h1>
            {isSuccess && <Alert variant="success">Product updated</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select value={category}>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {pictures.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Update Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditProduct;
