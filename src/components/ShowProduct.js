import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
} from "../utils/redux/features/productSlice";

const ShowProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);
  const productsStatus = useSelector((state) => state.products.status);
  const productsError = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (productsStatus === "loading") {
    return <div> Loading..............</div>;
  }

  if (productsStatus === "failed") {
    return <div>Error: {productsError}</div>;
  }

  return (
    <div className="box mt-5">
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
                <button className="button is-info is-mall">Edit</button>
                <button className="button is-danger is-mall">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
