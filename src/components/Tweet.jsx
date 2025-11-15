// import React, { useState, memo } from "react";
// import Avatar from "react-avatar";
// import {
//   CiHeart,
//   CiBookmark
// } from "react-icons/ci";
// import {
//   FaHeart,
//   FaBookmark,
//   FaRegComment
// } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { getRefresh } from "../redux/tweetSlice";
// import { getUser } from "../redux/userSlice";
// import {
//   TWEET_API_END_POINT,
//   USER_API_END_POINT,
//   timeSince,
// } from "../utils/constants";
// import MediaLightbox from "./MediaLightbox";
// import CommentSection from "./CommentSection"; // ✅ optional (Step 3 comments)

// const Tweet = ({ tweet, onUnbookmark, onDelete }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.user);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   // 🩵 Interaction States
//   const hasLiked = tweet?.like?.includes(user?._id);
//   const hasBookmarked = user?.bookmarks?.includes(tweet?._id);

//   /** ❤️ Like / Unlike a Tweet */
//   const likeOrDislikeHandler = async (id) => {
//     try {
//       const res = await axios.put(
//         `${TWEET_API_END_POINT}/like/${id}`,
//         { id: user?._id },
//         { withCredentials: true }
//       );
//       dispatch(getRefresh());
//       toast.success(res.data.message || "Like updated");
//     } catch (error) {
//       toast.error("Error liking tweet");
//       console.error("Like error:", error);
//     }
//   };

//   /** 🔖 Toggle Bookmark */
//   const handleBookmark = async () => {
//     try {
//       const res = await axios.put(
//         `${USER_API_END_POINT}/bookmarks/${tweet._id}`,
//         { id: user._id },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         if (onUnbookmark && res.data.action === "removed") {
//           setIsRemoving(true);
//           setTimeout(() => onUnbookmark(tweet._id), 350);
//         }

//         dispatch(getUser({ ...user, bookmarks: res.data.bookmarks }));
//         dispatch(getRefresh());

//         toast.success(
//           res.data.message ||
//             (res.data.action === "removed"
//               ? "Removed from bookmarks"
//               : "Added to bookmarks")
//         );
//       }
//     } catch (error) {
//       toast.error("Error updating bookmark status");
//       console.error("Bookmark error:", error);
//     }
//   };

//   /** 🗑️ Delete Tweet */
//   const deleteTweetHandler = async (id) => {
//     try {
//       const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
//         withCredentials: true,
//       });
//       toast.success(res.data.message);

//       if (onDelete) {
//         setIsRemoving(true);
//         setTimeout(() => onDelete(id), 350);
//       }

//       dispatch(getRefresh());
//     } catch (error) {
//       toast.error("Failed to delete tweet");
//       console.error("Delete tweet error:", error);
//     }
//   };

//   /** ☁️ Cloudinary Optimization */
//   const optimizedUrl = (url) =>
//     url?.includes("/upload/")
//       ? url.replace("/upload/", "/upload/q_auto,f_auto/")
//       : url;

//   const mediaUrl = optimizedUrl(tweet?.mediaUrl);

//   return (
//     <div
//       className={`border-b border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out transform ${
//         isRemoving ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
//       }`}
//     >
//       <div className="flex flex-col sm:flex-row p-3 sm:p-4 w-full">
//         {/* 👤 Avatar */}
//         <div className="flex-shrink-0">
//           <Avatar
//             src={
//               tweet?.userDetails?.[0]?.avatar ||
//               tweet?.userId?.avatar ||
//               "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//             }
//             size="45"
//             round={true}
//           />
//         </div>

//         {/* 📝 Content */}
//         <div className="flex-1 sm:ml-3 mt-2 sm:mt-0">
//           {/* Header */}
//           <div className="flex flex-wrap items-center text-sm sm:text-base">
//             <h1 className="font-semibold text-gray-800 truncate">
//               {tweet?.userDetails?.[0]?.name || tweet?.userId?.name || "User"}
//             </h1>
//             <p className="text-gray-500 ml-1 truncate">
//               @{tweet?.userDetails?.[0]?.username || tweet?.userId?.username}
//             </p>
//             <span className="text-gray-400 ml-2 text-xs sm:text-sm">
//               • {timeSince(tweet?.createdAt)}
//             </span>
//           </div>

//           {/* Description */}
//           {tweet?.description && (
//             <p className="text-gray-800 mt-1 text-sm sm:text-base break-words leading-relaxed">
//               {tweet?.description}
//             </p>
//           )}

//           {/* 🖼️ Media */}
//           {mediaUrl && (
//             <div
//               className="mt-3 rounded-2xl overflow-hidden border border-gray-200 w-full cursor-zoom-in"
//               onClick={() => setLightboxOpen(true)}
//             >
//               {tweet?.mediaType === "video" ? (
//                 <video
//                   src={mediaUrl}
//                   controls
//                   className="w-full max-h-[400px] sm:max-h-[500px] object-cover rounded-xl"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               ) : (
//                 <img
//                   src={mediaUrl}
//                   alt="tweet media"
//                   className="w-full max-h-[400px] sm:max-h-[500px] object-cover rounded-xl"
//                 />
//               )}
//             </div>
//           )}

//           {/* ❤️ Interaction Bar */}
//           <div className="flex flex-wrap justify-between mt-3 text-gray-600 text-sm sm:text-base select-none">
//             {/* ❤️ Like */}
//             <div
//               onClick={() => likeOrDislikeHandler(tweet?._id)}
//               className="flex items-center gap-1.5 sm:gap-2 p-2 hover:bg-red-100 rounded-full cursor-pointer transition"
//             >
//               {hasLiked ? (
//                 <FaHeart size="20px" className="text-red-500" />
//               ) : (
//                 <CiHeart size="22px" />
//               )}
//               <p>{tweet?.like?.length || 0}</p>
//             </div>

//             {/* 💬 Comment */}
//             <div
//               onClick={() => setShowComments(!showComments)}
//               className="flex items-center gap-1.5 sm:gap-2 p-2 hover:bg-green-100 rounded-full cursor-pointer transition"
//             >
//               <FaRegComment size="20px" />
//               <p>{showComments ? "Hide" : "Comments"}</p>
//             </div>

//             {/* 🔖 Bookmark */}
//             <div
//               onClick={handleBookmark}
//               className="flex items-center gap-1.5 sm:gap-2 p-2 hover:bg-yellow-100 rounded-full cursor-pointer transition"
//             >
//               {hasBookmarked ? (
//                 <FaBookmark size="20px" className="text-yellow-500" />
//               ) : (
//                 <CiBookmark size="22px" />
//               )}
//               <p>Save</p>
//             </div>

//             {/* 🗑️ Delete (only owner) */}
//             {String(user?._id) ===
//               String(tweet?.userId?._id || tweet?.userId) && (
//               <div
//                 onClick={() => deleteTweetHandler(tweet?._id)}
//                 className="flex items-center p-2 hover:bg-red-200 rounded-full cursor-pointer transition"
//               >
//                 <MdDeleteOutline size="22px" />
//               </div>
//             )}
//           </div>

//           {/* 💬 Comments Section (collapsible) */}
//           {showComments && (
//             <div className="animate-fadeIn mt-3">
//               <CommentSection tweetId={tweet._id} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 🖼️ Lightbox */}
//       <MediaLightbox
//         open={lightboxOpen}
//         onClose={() => setLightboxOpen(false)}
//         url={mediaUrl}
//         type={tweet?.mediaType || "image"}
//       />
//     </div>
//   );
// };

// // 🧠 Optimization: Prevent unnecessary re-renders
// export default memo(Tweet);

// import React, { useState, memo, useEffect } from "react";
// import Avatar from "react-avatar";
// import { CiHeart, CiBookmark } from "react-icons/ci";
// import { FaHeart, FaBookmark, FaRegComment } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { getRefresh } from "../redux/tweetSlice";
// import { getUser } from "../redux/userSlice";
// import {
//   TWEET_API_END_POINT,
//   USER_API_END_POINT,
//   timeSince,
// } from "../utils/constants";
// import MediaLightbox from "./MediaLightbox";
// import CommentSection from "./CommentSection";

// const Tweet = ({ tweet, onUnbookmark, onDelete }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.user);

//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   // ⭐ Instant UI update for likes
//   const [likes, setLikes] = useState(tweet?.like || []);

//   // ⭐ Sync likes if tweet updates externally
//   useEffect(() => {
//     setLikes(tweet?.like || []);
//   }, [tweet.like]);

//   const hasLiked = likes.includes(user?._id);
//   const hasBookmarked = user?.bookmarks?.includes(tweet?._id);

//   /** ❤️ Like / Unlike */
//   const likeOrDislikeHandler = async (id) => {
//     try {
//       let message = "";

//       // Instant UI update
//       if (hasLiked) {
//         setLikes(likes.filter((uid) => uid !== user._id));
//         message = "Disliked";
//       } else {
//         setLikes([...likes, user._id]);
//         message = "Liked ❤️";
//       }

//       // API call
//       const res = await axios.put(
//         `${TWEET_API_END_POINT}/like/${id}`,
//         { id: user._id },
//         { withCredentials: true }
//       );

//       toast.success(res.data.message || message);

//       dispatch(getRefresh());
//     } catch (error) {
//       toast.error("Error liking tweet");
//       console.error(error);
//     }
//   };

//   /** 🔖 Toggle Bookmark */
//   const handleBookmark = async () => {
//     try {
//       const res = await axios.put(
//         `${USER_API_END_POINT}/bookmarks/${tweet._id}`,
//         { id: user._id },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         // Remove from bookmarks page instantly if needed
//         if (onUnbookmark && res.data.action === "removed") {
//           setIsRemoving(true);
//           setTimeout(() => onUnbookmark(tweet._id), 350);
//         }

//         // Update user bookmarks in Redux
//         dispatch(getUser({ ...user, bookmarks: res.data.bookmarks }));
//         dispatch(getRefresh());

//         toast.success(res.data.message || "Bookmark updated");
//       }
//     } catch (error) {
//       toast.error("Bookmark error");
//       console.error(error);
//     }
//   };

//   /** 🗑️ Delete Tweet */
//   const deleteTweetHandler = async (id) => {
//     try {
//       const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
//         withCredentials: true,
//       });

//       toast.success(res.data.message);

//       if (onDelete) {
//         setIsRemoving(true);
//         setTimeout(() => onDelete(id), 350);
//       }

//       dispatch(getRefresh());
//     } catch (error) {
//       toast.error("Failed to delete tweet");
//       console.error(error);
//     }
//   };

//   /** Cloudinary Optimization */
//   const optimizedUrl = (url) =>
//     url?.includes("/upload/")
//       ? url.replace("/upload/", "/upload/q_auto,f_auto/")
//       : url;

//   const mediaUrl = optimizedUrl(tweet?.mediaUrl);

//   return (
//     <div
//       className={`border-b border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 transform ${
//         isRemoving ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
//       }`}
//     >
//       <div className="flex flex-col sm:flex-row p-3 sm:p-4 w-full">
//         {/* Avatar */}
//         <div className="flex-shrink-0">
//           <Avatar
//             src={
//               tweet?.userDetails?.[0]?.avatar ||
//               tweet?.userId?.avatar ||
//               "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//             }
//             size="45"
//             round={true}
//           />
//         </div>

//         {/* Content */}
//         <div className="flex-1 sm:ml-3 mt-2 sm:mt-0">
//           {/* Header */}
//           <div className="flex items-center flex-wrap text-sm sm:text-base">
//             <h1 className="font-semibold text-gray-800 truncate">
//               {tweet?.userDetails?.[0]?.name || tweet?.userId?.name}
//             </h1>
//             <p className="text-gray-500 ml-1 truncate">
//               @{tweet?.userDetails?.[0]?.username || tweet?.userId?.username}
//             </p>
//             <span className="text-gray-400 ml-2 text-xs">
//               • {timeSince(tweet?.createdAt)}
//             </span>
//           </div>

//           {/* Description */}
//           {tweet?.description && (
//             <p className="text-gray-800 mt-1 text-sm sm:text-base break-words">
//               {tweet?.description}
//             </p>
//           )}

//           {/* Media */}
//           {mediaUrl && (
//             <div
//               className="mt-3 rounded-2xl overflow-hidden border cursor-zoom-in"
//               onClick={() => setLightboxOpen(true)}
//             >
//               {tweet?.mediaType === "video" ? (
//                 <video
//                   src={mediaUrl}
//                   controls
//                   className="w-full max-h-[400px] sm:max-h-[500px] object-cover"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               ) : (
//                 <img
//                   src={mediaUrl}
//                   alt="tweet media"
//                   className="w-full max-h-[400px] sm:max-h-[500px] object-cover"
//                 />
//               )}
//             </div>
//           )}

//           {/* Interaction Bar */}
//           <div className="flex justify-between mt-3 text-gray-600 text-sm select-none">
//             {/* Like */}
//             <div
//               onClick={() => likeOrDislikeHandler(tweet._id)}
//               className="flex items-center gap-2 p-2 hover:bg-red-100 rounded-full cursor-pointer transition"
//             >
//               {hasLiked ? (
//                 <FaHeart size={20} className="text-red-500" />
//               ) : (
//                 <CiHeart size={22} />
//               )}
//               <p>{likes.length}</p>
//             </div>

//             {/* Comment */}
//             <div
//               onClick={() => setShowComments(!showComments)}
//               className="flex items-center gap-2 p-2 hover:bg-green-100 rounded-full cursor-pointer transition"
//             >
//               <FaRegComment size={20} />
//               <p>{showComments ? "Hide" : "Comments"}</p>
//             </div>

//             {/* Bookmark */}
//             <div
//               onClick={handleBookmark}
//               className="flex items-center gap-2 p-2 hover:bg-yellow-100 rounded-full cursor-pointer transition"
//             >
//               {hasBookmarked ? (
//                 <FaBookmark size={20} className="text-yellow-500" />
//               ) : (
//                 <CiBookmark size={22} />
//               )}
//               <p>Save</p>
//             </div>

//             {/* Delete */}
//             {String(user?._id) ===
//               String(tweet?.userId?._id || tweet.userId) && (
//               <div
//                 onClick={() => deleteTweetHandler(tweet._id)}
//                 className="flex items-center p-2 hover:bg-red-200 rounded-full cursor-pointer transition"
//               >
//                 <MdDeleteOutline size={22} />
//               </div>
//             )}
//           </div>

//           {/* Comments */}
//           {showComments && (
//             <div className="animate-fadeIn mt-3">
//               <CommentSection tweetId={tweet._id} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Lightbox */}
//       <MediaLightbox
//         open={lightboxOpen}
//         onClose={() => setLightboxOpen(false)}
//         url={mediaUrl}
//         type={tweet?.mediaType}
//       />
//     </div>
//   );
// };

// export default memo(Tweet);

import React, { useState, memo, useEffect } from "react";
import Avatar from "react-avatar";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { FaHeart, FaBookmark, FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { getUser } from "../redux/userSlice";
import {
  TWEET_API_END_POINT,
  USER_API_END_POINT,
  timeSince,
} from "../utils/constants";
import MediaLightbox from "./MediaLightbox";
import CommentSection from "./CommentSection";

const Tweet = ({ tweet, onUnbookmark, onDelete }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // ⭐ Instant Like UI State
  const [likes, setLikes] = useState(tweet?.like || []);

  useEffect(() => {
    setLikes(tweet?.like || []);
  }, [tweet.like]);

  const hasLiked = likes.includes(user?._id);
  const hasBookmarked = user?.bookmarks?.includes(tweet?._id);

  /** ❤️ Like / Dislike */
  const likeOrDislikeHandler = async (id) => {
    try {
      let message = hasLiked ? "Disliked" : "Liked ❤️";

      // Instant UI change
      if (hasLiked) {
        setLikes(likes.filter((uid) => uid !== user._id));
      } else {
        setLikes([...likes, user._id]);
      }

      // API Call
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user._id },
        { withCredentials: true }
      );

      toast.success(res.data.message || message);

      dispatch(getRefresh());
    } catch (error) {
      toast.error("Error liking tweet");
      console.error(error);
    }
  };

  /** 🔖 Bookmark Handler */
  const handleBookmark = async () => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmarks/${tweet._id}`,
        { id: user._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        if (onUnbookmark && res.data.action === "removed") {
          setIsRemoving(true);
          setTimeout(() => onUnbookmark(tweet._id), 350);
        }

        dispatch(getUser({ ...user, bookmarks: res.data.bookmarks }));
        dispatch(getRefresh());

        toast.success(res.data.message || "Bookmark updated");
      }
    } catch (error) {
      toast.error("Bookmark error");
      console.error(error);
    }
  };

  /** 🗑 Delete Tweet */
  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);

      if (onDelete) {
        setIsRemoving(true);
        setTimeout(() => onDelete(id), 350);
      }

      dispatch(getRefresh());
    } catch (error) {
      toast.error("Failed to delete tweet");
      console.error(error);
    }
  };

  /** Cloudinary Optimization */
  const optimizedUrl = (url) =>
    url?.includes("/upload/")
      ? url.replace("/upload/", "/upload/q_auto,f_auto/")
      : url;

  const mediaUrl = optimizedUrl(tweet?.mediaUrl);

  const tweetOwnerId = tweet?.userId?._id || tweet?.userId;

  return (
    <div
      className={`border-b border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 transform ${
        isRemoving ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
      }`}
    >
      <div className="flex flex-col sm:flex-row p-3 sm:p-4 w-full">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={
              tweet?.userDetails?.[0]?.avatar ||
              tweet?.userId?.avatar 
              // "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
            }
            size="45"
            round={true}
          />
        </div>

        {/* Content */}
        <div className="flex-1 sm:ml-3 mt-2 sm:mt-0">
          {/* Header */}
          <div className="flex items-center flex-wrap text-sm sm:text-base">
            <h1 className="font-semibold text-gray-800 truncate">
              {tweet?.userDetails?.[0]?.name || tweet?.userId?.name}
            </h1>
            <p className="text-gray-500 ml-1 truncate">
              @{tweet?.userDetails?.[0]?.username || tweet?.userId?.username}
            </p>
            <span className="text-gray-400 ml-2 text-xs">
              • {timeSince(tweet?.createdAt)}
            </span>
          </div>

          {/* Description */}
          {tweet?.description && (
            <p className="text-gray-800 mt-1 text-sm sm:text-base break-words">
              {tweet?.description}
            </p>
          )}

          {/* Media */}
          {mediaUrl && (
            <div
              className="mt-3 rounded-2xl overflow-hidden border cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              {tweet?.mediaType === "video" ? (
                <video
                  src={mediaUrl}
                  controls
                  className="w-full max-h-[400px] sm:max-h-[500px] object-cover"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="tweet"
                  className="w-full max-h-[400px] sm:max-h-[500px] object-cover"
                />
              )}
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex justify-between mt-3 text-gray-600 text-sm select-none">
            {/* ❤️ Like */}
            <div
              onClick={() => likeOrDislikeHandler(tweet._id)}
              className="flex items-center gap-2 p-2 hover:bg-red-100 rounded-full cursor-pointer transition"
            >
              {hasLiked ? (
                <FaHeart size={20} className="text-red-500" />
              ) : (
                <CiHeart size={22} />
              )}
              <p>{likes.length}</p>
            </div>

            {/* 💬 Comment */}
            <div
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 p-2 hover:bg-green-100 rounded-full cursor-pointer transition"
            >
              <FaRegComment size={20} />
              <p>{showComments ? "Hide" : "Comments"}</p>
            </div>

            {/* 🔖 Bookmark */}
            <div
              onClick={handleBookmark}
              className="flex items-center gap-2 p-2 hover:bg-yellow-100 rounded-full cursor-pointer transition"
            >
              {hasBookmarked ? (
                <FaBookmark size={20} className="text-yellow-500" />
              ) : (
                <CiBookmark size={22} />
              )}
              <p>Save</p>
            </div>

            {/* 🗑️ Delete tweet */}
            {String(user?._id) === String(tweetOwnerId) && (
              <div
                onClick={() => deleteTweetHandler(tweet._id)}
                className="flex items-center p-2 hover:bg-red-200 rounded-full cursor-pointer transition"
              >
                <MdDeleteOutline size={22} />
              </div>
            )}
          </div>

          {/* 💬 Comment Section */}
          {showComments && (
            <div className="animate-fadeIn mt-3">
              <CommentSection tweetId={tweet._id} tweetOwnerId={tweetOwnerId} />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <MediaLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        url={mediaUrl}
        type={tweet?.mediaType}
      />
    </div>
  );
};

export default memo(Tweet);
