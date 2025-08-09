import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "./utils/requestSlice";
import { addconnections } from "./utils/connectionsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests || []);
  //const connections = useSelector((store) => store.connections || []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

 const reviewRequest = async (status, requestId) => {
  try {
    await axios.post(
      `${BASE_URL}/request/review/${status}/${requestId}`,
      {},
      { withCredentials: true }
    );

   
    dispatch(addRequests(requests.filter((r) => r._id !== requestId)));


    if (status === "accepted") {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addconnections(res?.data?.data || []));
    }
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-semibold mb-4">Connection Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No new requests</p>
      ) : (
        requests.map((request) => {
          const user = request.fromUserId;
          return (
            <div key={user._id} className="card w-96 bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  {user.firstName} {user.lastName}
                </h2>
                <p>Status: {request.status}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Requests;

