import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../utils/redux/features/productSlice";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsStatus = useSelector((state) => state.products.status);
  const productsError = useSelector((state) => state.products.error);

  const addProduct = async (e) => {
    e.preventDefault();
    await dispatch(addNewProduct({ title, price }));
    navigate("/");
  };

  if (productsStatus === "loading") {
    return <div> Loading..............</div>;
  }

  if (productsStatus === "failed") {
    return <div>Error: {productsError}</div>;
  }

  return (
    <div>
      <form onSubmit={addProduct} className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              placeholder="Title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="text"
                placeholder="Price"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-success">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
