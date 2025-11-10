import React, { use } from "react";
import AuthContext from "../../AuthProvider/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebase.config";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/bids?buyer_email=${user?.email}`, {
      headers: {
        authorization: `bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("my bids data:", data);
        setBids(data);
      });
  }, [user]);

  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("delete bid response:", data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id !== id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <>
      <div>
        <div>
          <h2>Total bids: {bids?.length}</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL NO.</th>
                  <th>Product</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <>
                    <tr key={index}>
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
                            <span className="badge badge-ghost badge-sm">
                              {bid.buyer_name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>{bid.bid_amount}</p>
                      </td>
                      <td>
                        <p className="badge badge-ghost badge-sm">
                          {bid.status}
                        </p>
                      </td>
                      <th>
                        <button
                          onClick={() => handleRemoveBid(bid?._id)}
                          className="btn btn-outline"
                        >
                          Remove bid
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

export default MyBids;
