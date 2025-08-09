import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import {BASE_URL} from './utils/constants';
import UserCard from './UserCard';

const Feed = () => {
  const feed  = useSelector((store)=>store.feed);
  console.log(feed);
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    if(feed && feed.length>0) return;
    try{
      
      const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err);
    }
  };
  useEffect(()=>{
    getFeed();
  },[])

  return (
  feed?.length > 0 ? (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  ) : (
    <p className="text-center mt-10 text-gray-500">No users in feed</p>
  )
);
};

export default Feed;
