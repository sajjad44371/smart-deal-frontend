import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { _id: productId } = useLoaderData();
  const modalRef = useRef(null);
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  // get bid
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authorization: `bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids data:", data);
        setBids(data);
      });
  }, [productId, user]);

  const handleShowModal = () => {
    modalRef.current.showModal();
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const bidAmount = event.target.bidAmount.value;
    // console.log(name, email, bidAmount);
    const bidData = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_amount: bidAmount,
      status: "pending",
    };

    // Handle bid submission logic here
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bidData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Bid submitted successfully:", data);
        // Optionally close the modal after submission
        if (data.insertedId) {
          modalRef.current.close();
          event.target.reset();

          // newly added bid show in the bid list without refresh
          bidData._id = data.insertedId;
          const updatedBids = [...bids, bidData].sort(
            (a, b) => b.bid_amount - a.bid_amount
          );
          setBids(updatedBids);

          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting bid:", error);
      });
  };

  return (
    <>
      <div>
        {/* product details  */}
        <div>
          <div>
            <button onClick={handleShowModal} className="btn btn-primary">
              I want to buy this product
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog
              ref={modalRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Give the best offer!</h3>
                <p className="py-4">Offer something good for this product.</p>

                <form onSubmit={handleBidSubmit}>
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input"
                      defaultValue={user?.displayName}
                      readOnly
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      defaultValue={user?.email}
                      readOnly
                    />
                    <label className="label">Bid</label>
                    <input
                      type="text"
                      name="bidAmount"
                      className="input"
                      placeholder="Bid Amount"
                    />
                    <button className="btn btn-neutral mt-4">Bid</button>
                  </fieldset>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        {/* product bids  */}
        <div>
          <h2>Total bids: {bids?.length}</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL NO.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{bid.buyer_name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          {bid.buyer_email}
                        </span>
                      </td>
                      <td>{bid.bid_amount}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
