import React from 'react'
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "./utils/constants";
import { removeUser } from './utils/userSlice';

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() =>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    }catch(err){
      console.log(err);
    }
  }
  return (
      <div className="navbar bg-base-content shadow-sm">
  <div class="flex-1">
    <Link to="/" className="btn btn-ghost text-xl text-base-100">DevTinder</Link>
  </div>
  {user && (<div class="flex gap-2">
    <div className="text-base-100">Welcome, {user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 ">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" class="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  </div>)}
</div>
   
  )
}

export default NavBar
