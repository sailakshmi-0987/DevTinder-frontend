import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const ProfilePage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${id}`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="card bg-base-100 shadow-xl w-96">
        <figure>
          <img
            src={user.photoUrl || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-40 h-40 object-cover rounded-full mt-4"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-xl">
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.age} | {user.gender}</p>
          <p className="mt-2">{user.about}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

