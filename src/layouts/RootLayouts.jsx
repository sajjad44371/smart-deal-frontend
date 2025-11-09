import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayouts = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <section>
          <Navbar></Navbar>
        </section>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};

export default RootLayouts;
