import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
  productSelectors,
} from "../utils/redux/features/productSlice";

const ShowProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);
  const getProductsStatus = useSelector(
    (state) => state.products.getProductsStatus
  );
  const getProductsError = useSelector(
    (state) => state.products.getProductsError
  );
  const deleteProductStatus = useSelector(
    (state) => state.products.deleteProductStatus
  );
  const deleteProductError = useSelector(
    (state) => state.products.deleteProductError
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (getProductsStatus === "loading") {
    return <div> Loading..............</div>;
  }

  if (getProductsStatus === "failed") {
    return <div>Error: {getProductsError}</div>;
  }

  return (
    <div className="box mt-5">
      <Link to="add" className="button is-success">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Link
                  to={`edit/${product.id}`}
                  className="button is-info is-mall"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteProduct(product.id))}
                  className="button is-danger is-mall"
                >
                  {deleteProductStatus === "loading"
                    ? "Deleting...."
                    : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteProductStatus === "failed" && (
        <div> Error deleting product: {deleteProductError} </div>
      )}
    </div>
  );
};

export default ShowProduct;
