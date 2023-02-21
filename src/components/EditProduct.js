import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProduct,
  getProducts,
  productSelectors,
} from "../utils/redux/features/productSlice";

const EditProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) =>
    productSelectors.selectById(state, id)
  );

  const editProductStatus = useSelector(
    (state) => state.products.editProductStatus
  );

  const editProductError = useSelector(
    (state) => state.products.editProductError
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await dispatch(editProduct({ id, title, price }));
    if (!editProductError) {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleEdit} className="box mt-5">
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
            <button className="button is-success">
              {editProductStatus === "loading" ? "Submiting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      {editProductStatus === "failed" && (
        <div> Error updeting product: {editProductError} </div>
      )}
    </div>
  );
};

export default EditProducts;
