import axios from 'axios';
import React from 'react'
import {BASE_URL} from './utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeedFromUser } from './utils/feedSlice';

const UserCard = ({user}) => {
  
  const {_id,firstName,lastName,age,gender,about,photoUrl} = user;
  const dispatch = useDispatch();
  const handleSendRequest = async(status,userId)=>{
    try{
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      dispatch(removeFeedFromUser(userId));
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="profile photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender &&<p>{age+","+gender}</p>} 
    <p>{about}</p>
    <div className="card-actions justify ">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignored</button>
      <button className="btn btn-secondary"  onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;
