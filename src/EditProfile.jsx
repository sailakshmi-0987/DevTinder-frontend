import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills)
      ? user.skills.join(", ")
      : user.skills || ""
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
        skills: skillsArray,
      };

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      const updatedUser = res.data.user ?? res.data;
      dispatch(addUser(updatedUser));

      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSuccess(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-4 md:p-8">
      {/* Success Alert */}
      {success && (
        <div className="alert alert-success shadow-lg mb-4 w-full lg:w-[380px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Edit Form */}
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6 border border-base-300">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Your Profile
        </h2>
        <div className="space-y-4">
          <Input label="First Name" value={firstName} onChange={setFirstName} />
          <Input label="Last Name" value={lastName} onChange={setLastName} />
          <Input label="Age" value={age} onChange={setAge} type="number" />
          <Input label="Gender" value={gender} onChange={setGender} />
          <Input label="About" value={about} onChange={setAbout} />
          <Input label="Photo URL" value={photoUrl} onChange={setPhotoUrl} />

          {/* Skills */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Skills (comma separated)</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={skills}
              placeholder="e.g. React, Node.js, MongoDB"
              onChange={(e) => setSkills(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt text-sm">
                Separate skills with commas.
              </span>
            </label>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>
        )}

        <div className="mt-6">
          <button
            className="btn btn-primary w-full hover:scale-[1.02] transition-transform"
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="hidden lg:block w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3 text-center">Live Preview</h3>
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
            skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }}
        />
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="form-control">
    <label className="label font-medium">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      className="input input-bordered w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default EditProfile;

