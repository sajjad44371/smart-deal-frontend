import React, { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);

  return (
    <>
      <div className="my-20">
        <h2 className="text-2xl font-bold mb-4">Recent Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestProducts.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default LatestProducts;
