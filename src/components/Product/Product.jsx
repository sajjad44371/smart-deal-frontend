import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { title, price_min, image, description, _id } = product;
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={image} alt={title} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div>
            <p className="">Price: {price_min}</p>
          </div>
          <Link className="btn btn-primary" to={`/product-details/${_id}`}>
            View Details
          </Link>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
