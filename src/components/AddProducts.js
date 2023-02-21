import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../utils/redux/features/productSlice";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addProductStatus = useSelector(
    (state) => state.products.addProductStatus
  );
  const addProductError = useSelector(
    (state) => state.products.addProductError
  );

  const addProduct = async (e) => {
    e.preventDefault();
    await dispatch(addNewProduct({ title, price }));
    navigate("/");
  };

  if (addProductStatus === "loading") {
    return <div> Loading..............</div>;
  }

  if (addProductStatus === "failed") {
    return <div>Error: {addProductError}</div>;
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
