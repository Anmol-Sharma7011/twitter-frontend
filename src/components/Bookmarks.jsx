import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import Tweet from "./Tweet";
import toast from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const navigate = useNavigate();

  // ✅ Fetch bookmarks with pagination
  const fetchBookmarks = async (currentPage) => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/bookmarks?page=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const newTweets = res.data.tweets;

        if (newTweets.length === 0 || currentPage >= res.data.totalPages) {
          setHasMore(false);
        }

        // ✅ Avoid duplicates
        setTweets((prev) => {
          const existingIds = new Set(prev.map((t) => t._id));
          const filtered = newTweets.filter((t) => !existingIds.has(t._id));
          return [...prev, ...filtered];
        });
      }
    } catch (error) {
      console.error("Bookmark fetch error:", error);
      toast.error("Failed to fetch bookmarks");
    }
  };

  // 🌀 Fetch when page changes
  useEffect(() => {
    fetchBookmarks(page);
  }, [page]);

  // 🔁 Infinite scroll logic
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // ✅ Instantly remove tweet when unbookmarked
  const handleUnbookmark = (tweetId) => {
    setTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId));
  };

  // ✅ Instantly remove tweet when deleted
  const handleDelete = (tweetId) => {
    setTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId));
    toast.success("Tweet deleted and removed from bookmarks");
  };

  return (
    <div className="w-full sm:w-[50%] border-l border-r border-gray-200 min-h-screen bg-white">
      {/* 🧭 Sticky Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-20 backdrop-blur-lg bg-opacity-90">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-200 rounded-full transition"
          aria-label="Go back"
        >
          <IoMdArrowBack size={22} className="text-gray-700" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-bold">Bookmarks</h1>
          <p className="text-sm text-gray-500 -mt-1">Only visible to you</p>
        </div>
      </div>

      {/* 🗂️ Bookmarked Tweets */}
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="animate-fadeIn transition-all duration-300"
          >
            <Tweet
              tweet={tweet}
              onUnbookmark={handleUnbookmark}
              onDelete={handleDelete} // 👈 new prop for delete handling
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-6 text-center">
          <p className="text-lg font-medium">No bookmarks yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            When you save tweets, they’ll appear here.
          </p>
        </div>
      )}

      {/* 🔁 Loading state */}
      {hasMore && tweets.length > 0 && (
        <div className="flex justify-center p-4 text-gray-400 text-sm">
          Loading more...
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
