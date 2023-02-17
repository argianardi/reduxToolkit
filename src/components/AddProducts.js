import React from "react";

const AddProducts = () => {
  return (
    <div>
      <from className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input type="text" placeholder="Title" className="input" />
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input type="text" placeholder="Price" className="input" />
            </div>
          </div>
          <div className="field">
            <button className="button is-success">Submit</button>
          </div>
        </div>
      </from>
    </div>
  );
};

export default AddProducts;
