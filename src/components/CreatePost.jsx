// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Avatar from "react-avatar";
// import { CiImageOn } from "react-icons/ci";
// import axios from "axios";
// import { TWEET_API_END_POINT } from "../utils/constants";
// import toast from "react-hot-toast";
// // import {store} from "../redux/store";
// import { getIsActive, getRefresh } from "../redux/tweetSlice";

// const CreatePost = () => {
//   const [description, setDescription] = useState("");
//   const { user } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const {isActive} = useSelector(store => store.tweet);

//   const forYouHandler = async() => {
//       dispatch(getIsActive(true))
//   }
//    const followingYouHandler = async() => {
//       dispatch(getIsActive(false))
//   }

//   const submitHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${TWEET_API_END_POINT}/create`,
//         { description, id: user?._id },
//         {
//           withCredentials: true,
//         }
//       );
//       dispatch(getRefresh());
//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//     setDescription("");
//   };
//   return (
//     <div className="w-[100%]">
//       <div>
//         <div className="flex items-center justify-evenly border-b border-gray-200 ">
//           <div onClick={forYouHandler}
//            className={`${isActive ? "border-b-4 border-blue-500": null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
//             <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
//           </div>
//           <div onClick={followingYouHandler}
//           className={`${!isActive ? "border-b-4 border-blue-700": null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
//             <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
//           </div>
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center p-4">
//           <div>
//             <Avatar
//               src="https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//               size="40"
//               round={true}
//             />
//           </div>
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full outline-none border-none text-xl ml-2"
//             type="text"
//             placeholder="What is happening ?!"
//           />
//         </div>

//         <div className="flex items-center justify-between p-4 border-b border-gray-300">
//           <div>
//             <CiImageOn size="24px" />
//           </div>
//           <button
//             onClick={submitHandler}
//             className="bg-[#1D9BF0] px-4 py-1 text-2xl text-white border-none rounded-full"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CreatePost;

// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import toast from "react-hot-toast";
// import { Image as ImageIcon, Video as VideoIcon } from "lucide-react";
// import Avatar from "react-avatar";
// import { TWEET_API_END_POINT } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { getRefresh, getIsActive } from "../redux/tweetSlice";

// const CreatePost = () => {
//   const [description, setDescription] = useState("");
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const { isActive } = useSelector((store) => store.tweet);
//   const { user } = useSelector((store) => store.user);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!description.trim() && !media) {
//       toast.error("Write something or add a file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("description", description);
//     if (media) formData.append("media", media);

//     try {
//       setLoading(true);
//       const res = await axios.post(`${TWEET_API_END_POINT}/create`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         toast.success("Tweet posted successfully!");
//         setDescription("");
//         setMedia(null);
//         setPreview(null);

//         // 🔥 Trigger refresh so Feed.jsx re-fetches tweets
//         dispatch(getRefresh());
//       }
//     } catch (error) {
//       toast.error("Failed to post tweet");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm transition-all">
//       {/* 🧭 Tabs */}
//       <div className="flex items-center justify-around border-b border-gray-200">
//         <button
//           onClick={() => dispatch(getIsActive(true))}
//           className={`flex-1 text-center py-3 font-semibold text-lg transition-all ${
//             isActive
//               ? "text-blue-500 border-b-4 border-blue-500"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           For You
//         </button>

//         <button
//           onClick={() => dispatch(getIsActive(false))}
//           className={`flex-1 text-center py-3 font-semibold text-lg transition-all ${
//             !isActive
//               ? "text-blue-500 border-b-4 border-blue-500"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Following
//         </button>
//       </div>

//       {/* 🐦 Create Post Section */}
//       <form onSubmit={handleSubmit} className="flex space-x-3 p-4">
//         <div>
//           <Avatar name={user?.username || "User"} size="45" round />
//         </div>

//         <div className="flex-1">
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="What’s happening?"
//             rows="3"
//             className="w-full resize-none border-none focus:ring-0 text-gray-800 placeholder-gray-500 text-lg outline-none bg-transparent"
//           />

//           {preview && (
//             <div className="mt-3 rounded-xl overflow-hidden border border-gray-300">
//               {media.type.startsWith("video") ? (
//                 <video src={preview} controls className="w-full rounded-lg" />
//               ) : (
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-full object-cover"
//                 />
//               )}
//             </div>
//           )}

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-4">
//               <label className="cursor-pointer flex items-center text-blue-500 hover:text-blue-600">
//                 <ImageIcon size={22} />
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>

//               <label className="cursor-pointer flex items-center text-blue-500 hover:text-blue-600">
//                 <VideoIcon size={22} />
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || (!description && !media)}
//               className={`${
//                 loading || (!description && !media)
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-semibold px-5 py-2 rounded-full transition-all`}
//             >
//               {loading ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constants";
import { getRefresh, getIsActive } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { isActive } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  const textareaRef = useRef();

  // 🧭 Auto-focus when user clicks "Post" button in sidebar
  useEffect(() => {
    if (location.state?.focusPostBox) {
      textareaRef.current?.focus();
    }
  }, [location.state]);

  // 📸 Handle image or video selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🐦 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() && !media) {
      toast.error("Write something or add a file!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (media) formData.append("media", media);

    try {
      setLoading(true);
      const res = await axios.post(`${TWEET_API_END_POINT}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Tweet posted successfully!");
        setDescription("");
        setMedia(null);
        setPreview(null);
        dispatch(getRefresh());
      }
    } catch (error) {
      console.error("Tweet creation failed:", error);
      toast.error("Failed to post tweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm sm:w-[95%] md:w-[90%] lg:w-[80%] mx-auto transition-all duration-300">
      {/* 🧭 Tabs Section */}
      <div className="flex items-center justify-around border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <button
          onClick={() => dispatch(getIsActive(true))}
          className={`flex-1 text-center py-3 font-semibold text-lg transition-all duration-200 ${
            isActive
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          For You
        </button>

        <button
          onClick={() => dispatch(getIsActive(false))}
          className={`flex-1 text-center py-3 font-semibold text-lg transition-all duration-200 ${
            !isActive
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Following
        </button>
      </div>

      {/* 🐦 Create Post Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:space-x-3 p-4"
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mb-3 sm:mb-0">
          {/* <Avatar
            name={user?.username || "User"}
            size="45"
            round={true}
            className="cursor-pointer"
          /> */}
          <Avatar
            key={user?.avatar || "no-avatar"} // forces remount when avatar URL changes
            src={user?.avatar || undefined}
            name={user?.username || "User"}
            size="45"
            round={true}
            className="cursor-pointer"
            onError={(e) => {
              e.currentTarget.src = "/images/default-avatar.png";
            }}
          />
        </div>

        {/* Input + Media */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What’s happening?"
            rows="3"
            className="w-full resize-none border-none focus:ring-0 text-gray-800 placeholder-gray-500 text-lg outline-none bg-transparent"
          />

          {/* Media Preview */}
          {preview && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-300">
              {media.type.startsWith("video") ? (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer flex items-center text-blue-500 hover:text-blue-600 transition-all">
                <ImageIcon size={22} />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer flex items-center text-blue-500 hover:text-blue-600 transition-all">
                <VideoIcon size={22} />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || (!description && !media)}
              className={`${
                loading || (!description && !media)
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold px-5 py-2 rounded-full transition-all duration-200`}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
