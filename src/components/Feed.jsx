import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { TWEET_API_END_POINT } from "../utils/constants";

const Feed = () => {
  const dispatch = useDispatch();
  const { tweets, refresh, isActive } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user); // ✅ Correct slice

  // Fetch tweets (For You / Following)
  const fetchTweets = async () => {
    try {
      if (!user?._id) return; // Wait for user data

      const endpoint = isActive
        ? `${TWEET_API_END_POINT}/all-tweets/${user._id}` // 👈 For You (user + following)
        : `${TWEET_API_END_POINT}/all-following-tweets/${user._id}`; // 👈 Following only

      const res = await axios.get(endpoint, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(getAllTweets(res.data.tweets || []));
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  // Run when feed loads or refresh/isActive changes
  useEffect(() => {
    fetchTweets();
  }, [refresh, isActive]);

  return (
    <div className="w-[50%] border border-gray-200 min-h-screen bg-white">
      {/* 🐦 Create Post Section */}
      <CreatePost />

      {/* 📰 Tweets Section */}
      <div>
        {tweets?.length > 0 ? (
          tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
        ) : (
          <p className="text-center text-gray-400 mt-6">No tweets found</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
