import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";
import { Suspense } from "react";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <>
      <div className="">
        <Suspense fallback={<div>Loading latest products...</div>}>
          <LatestProducts
            latestProductsPromise={latestProductsPromise}
          ></LatestProducts>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
