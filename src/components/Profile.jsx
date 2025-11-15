// // import React, { useState } from "react";
// // import { IoMdArrowBack } from "react-icons/io";
// // import { Link } from "react-router-dom";
// // import Avatar from "react-avatar";
// // import useGetProfile from "../hooks/useGetProfile";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { USER_API_END_POINT } from "../utils/constants";
// // import toast from "react-hot-toast";
// // import { followingUpdate, getUser } from "../redux/userSlice";
// // import { getRefresh } from "../redux/tweetSlice";
// // import bannerImage from "../assets/bannerImage.webp";

// // const Profile = () => {
// //   const { user, profile } = useSelector((store) => store.user);
// //   const { id } = useParams();
// //   const dispatch = useDispatch();

// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [name, setName] = useState(profile?.name || "");
// //   const [username, setUsername] = useState(profile?.username || "");
// //   const [bio, setBio] = useState(profile?.bio || "");
// //   const [avatar, setAvatar] = useState(null);
// //   const [banner, setBanner] = useState(null);
// //   const [previewAvatar, setPreviewAvatar] = useState(profile?.avatar || "");
// //   const [previewBanner, setPreviewBanner] = useState(profile?.banner || "");

// //   useGetProfile(id);

// //   const followAndUnfollowHandler = async () => {
// //     try {
// //       axios.defaults.withCredentials = true;
// //       const res = await axios.post(
// //         `${USER_API_END_POINT}/follow-unfollow/${id}`,
// //         {
// //           id: user?._id,
// //         }
// //       );
// //       dispatch(followingUpdate(id));
// //       dispatch(getRefresh());
// //       toast.success(res.data.message);
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Action failed");
// //     }
// //   };

// //   const handleAvatarChange = (e) => {
// //     const file = e.target.files[0];
// //     setAvatar(file);
// //     setPreviewAvatar(URL.createObjectURL(file));
// //   };

// //   const handleBannerChange = (e) => {
// //     const file = e.target.files[0];
// //     setBanner(file);
// //     setPreviewBanner(URL.createObjectURL(file));
// //   };

// //   const handleUpdateProfile = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("username", username);
// //       formData.append("bio", bio);
// //       if (avatar) formData.append("avatar", avatar);
// //       if (banner) formData.append("banner", banner);

// //       const res = await axios.put(
// //         `${USER_API_END_POINT}/edit-profile`,
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //           withCredentials: true,
// //         }
// //       );

// //       if (res.data.success) {
// //         toast.success("Profile updated successfully!");
// //         dispatch(getUser(res.data.user));
// //         setShowEditModal(false);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to update profile");
// //     }
// //   };

// //   return (
// //     <div className="w-full sm:w-[50%] border-l border-r border-gray-200 bg-white relative min-h-screen">
// //       {/* Header */}
// //       <div className="flex items-center py-2 sticky top-0 bg-white z-10 border-b">
// //         <Link
// //           to="/"
// //           className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
// //         >
// //           <IoMdArrowBack size="24px" />
// //         </Link>
// //         <div className="ml-2">
// //           <h1 className="font-bold text-lg">{profile?.name}</h1>
// //           <p className="text-gray-500 text-sm">
// //             {profile?.tweets?.length || 0} Posts
// //           </p>
// //         </div>
// //       </div>

// //       {/* Banner */}
// //       <div className="relative">
// //         <img
// //           src={previewBanner || profile?.banner || bannerImage}
// //           alt="Banner"
// //           className="w-full h-48 object-cover"
// //         />
// //         {/* Avatar */}
// //         <div className="absolute left-5 bottom-[-50px] border-4 border-white rounded-full">
// //           <Avatar
// //             src={
// //               previewAvatar ||
// //               profile?.avatar ||
// //               "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
// //             }
// //             size="100"
// //             round={true}
// //           />
// //         </div>
// //       </div>

// //       {/* Edit / Follow Button */}
// //       <div className="flex justify-end items-center m-4 mt-14">
// //         {profile?._id === user?._id ? (
// //           <button
// //             onClick={() => setShowEditModal(true)}
// //             className="cursor-pointer px-4 py-1 font-semibold text-lg hover:bg-gray-200 rounded-full border border-gray-400 transition"
// //           >
// //             Edit Profile
// //           </button>
// //         ) : (
// //           <button
// //             onClick={followAndUnfollowHandler}
// //             className="cursor-pointer px-4 py-1 bg-black text-white font-semibold text-lg rounded-full transition"
// //           >
// //             {user?.following.includes(id) ? "Following" : "Follow"}
// //           </button>
// //         )}
// //       </div>

// //       {/* Profile Info */}
// //       <div className="px-6 mt-2">
// //         <h1 className="font-bold text-xl">{profile?.name}</h1>
// //         <p className="text-gray-600">@{profile?.username}</p>
// //         <p className="text-sm text-gray-700 mt-2 leading-relaxed">
// //           {profile?.bio}
// //         </p>
// //       </div>

// //       {/* Edit Modal */}
// //       {showEditModal && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
// //           <div className="bg-white rounded-2xl w-[90%] sm:w-[500px] p-6 shadow-2xl relative animate-fadeIn">
// //             <h2 className="text-xl font-semibold mb-4 border-b pb-2">
// //               Edit Profile
// //             </h2>
// //             <form onSubmit={handleUpdateProfile} className="space-y-4">
// //               {/* Banner Upload */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">
// //                   Banner Image
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleBannerChange}
// //                 />
// //                 {previewBanner && (
// //                   <img
// //                     src={previewBanner}
// //                     alt="banner preview"
// //                     className="w-full h-32 object-cover mt-2 rounded-md"
// //                   />
// //                 )}
// //               </div>

// //               {/* Avatar Upload */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">
// //                   Profile Avatar
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleAvatarChange}
// //                 />
// //                 {previewAvatar && (
// //                   <img
// //                     src={previewAvatar}
// //                     alt="avatar preview"
// //                     className="w-20 h-20 object-cover rounded-full mt-2 border"
// //                   />
// //                 )}
// //               </div>

// //               {/* Name */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">
// //                   Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
// //                 />
// //               </div>

// //               {/* Username */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">
// //                   Username
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
// //                 />
// //               </div>

// //               {/* Bio */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-1">
// //                   Bio
// //                 </label>
// //                 <textarea
// //                   value={bio}
// //                   onChange={(e) => setBio(e.target.value)}
// //                   rows="3"
// //                   maxLength="180"
// //                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
// //                 />
// //                 <p className="text-xs text-gray-500 text-right">
// //                   {bio.length}/180
// //                 </p>
// //               </div>

// //               {/* Buttons */}
// //               <div className="flex justify-end space-x-3 pt-3 border-t">
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowEditModal(false)}
// //                   className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
// //                 >
// //                   Save
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;

// import React, { useState, useEffect } from "react";
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from "react-router-dom";
// import Avatar from "react-avatar";
// import useGetProfile from "../hooks/useGetProfile";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT, TWEET_API_END_POINT } from "../utils/constants";
// import toast from "react-hot-toast";
// import { followingUpdate, getUser } from "../redux/userSlice";
// import { getRefresh } from "../redux/tweetSlice";
// import bannerImage from "../assets/bannerImage.webp";

// const Profile = () => {
//   const { user, profile } = useSelector((store) => store.user);
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [name, setName] = useState("");
//   const [tweets, setTweets] = useState([]);

//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [banner, setBanner] = useState(null);
//   const [previewAvatar, setPreviewAvatar] = useState("");
//   const [previewBanner, setPreviewBanner] = useState("");

//   // Fetch profile from server
//   useGetProfile(id);

//   // 🔁 Sync local state whenever profile updates
//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setUsername(profile.username || "");
//       setBio(profile.bio || "");
//       setPreviewAvatar(profile.avatar || "");
//       setPreviewBanner(profile.banner || "");
//     }
//   }, [profile]);
//   useEffect(() => {
//     const fetchUserTweets = async () => {
//       try {
//         const res = await axios.get(`${TWEET_API_END_POINT}/user/${id}`, {
//           withCredentials: true,
//         });
//         setTweets(res.data.tweets);
//       } catch (error) {
//         console.log("Error fetching user tweets:", error);
//       }
//     };

//     fetchUserTweets();
//   }, [id]);

//   // 🧩 Follow / Unfollow
//   const followAndUnfollowHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${USER_API_END_POINT}/follow-unfollow/${id}`,
//         { id: user?._id },
//         { withCredentials: true }
//       );
//       dispatch(followingUpdate(id));
//       dispatch(getRefresh());
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Action failed");
//     }
//   };

//   // 📸 Avatar Upload
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//     setPreviewAvatar(URL.createObjectURL(file));
//   };

//   // 🖼️ Banner Upload
//   const handleBannerChange = (e) => {
//     const file = e.target.files[0];
//     setBanner(file);
//     setPreviewBanner(URL.createObjectURL(file));
//   };

//   // 💾 Update Profile
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("username", username);
//       formData.append("bio", bio);
//       if (avatar) formData.append("avatar", avatar);
//       if (banner) formData.append("banner", banner);

//       const res = await axios.put(
//         `${USER_API_END_POINT}/edit-profile`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Profile updated successfully!");
//         dispatch(getUser(res.data.user));

//         // 🔁 Sync UI instantly
//         setName(res.data.user.name);
//         setUsername(res.data.user.username);
//         setBio(res.data.user.bio || "");
//         setPreviewAvatar(res.data.user.avatar || "");
//         setPreviewBanner(res.data.user.banner || "");

//         // Optional: if same user, update Redux profile too
//         if (profile?._id === user?._id) {
//           dispatch({
//             type: "user/getMyProfile",
//             payload: res.data.user,
//           });
//         }

//         setShowEditModal(false);
//       }
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   return (
//     <div className="w-full sm:w-[50%] border-l border-r border-gray-200 bg-white relative min-h-screen">
//       {/* Header */}
//       <div className="flex items-center py-2 sticky top-0 bg-white z-10 border-b">
//         <Link
//           to="/"
//           className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
//         >
//           <IoMdArrowBack size="24px" />
//         </Link>
//         <div className="ml-2">
//           <h1 className="font-bold text-lg">{profile?.name}</h1>
//           <p className="text-gray-500 text-sm">{tweets.length} Posts</p>
//         </div>
//       </div>

//       {/* Banner Section */}
//       <div className="relative">
//         <img
//           src={previewBanner || profile?.banner || bannerImage}
//           alt="Banner"
//           className="w-full h-48 object-cover"
//         />
//         {/* Avatar */}
//         <div className="absolute left-5 bottom-[-50px] border-4 border-white rounded-full">
//           <Avatar
//             src={
//               previewAvatar ||
//               profile?.avatar ||
//               "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//             }
//             size="100"
//             round={true}
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end items-center m-4 mt-14">
//         {profile?._id === user?._id ? (
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="cursor-pointer px-4 py-1 font-semibold text-lg hover:bg-gray-200 rounded-full border border-gray-400 transition"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <button
//             onClick={followAndUnfollowHandler}
//             className="cursor-pointer px-4 py-1 bg-black text-white font-semibold text-lg rounded-full transition"
//           >
//             {user?.following.includes(id) ? "Following" : "Follow"}
//           </button>
//         )}
//       </div>

//       {/* Profile Info */}
//       <div className="px-6 mt-2">
//         <h1 className="font-bold text-xl">{name}</h1>
//         <p className="text-gray-600">@{username}</p>
//         <p className="text-sm text-gray-700 mt-2 leading-relaxed">{bio}</p>
//       </div>
//       {/* USER TWEETS SECTION */}
//       <div className="mt-6 border-t">
//         <h2 className="font-bold text-lg px-4 py-3">Posts</h2>

//         {tweets.length === 0 ? (
//           <p className="text-center text-gray-500 py-6">No posts yet</p>
//         ) : (
//           tweets.map((tweet) => (
//             <div
//               key={tweet._id}
//               className="p-4 border-b hover:bg-gray-50 transition cursor-pointer"
//             >
//               <div className="flex items-start gap-3">
//                 <Avatar src={tweet.userId.avatar} size="40" round={true} />

//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-bold">{tweet.userId.name}</h3>
//                     <p className="text-gray-500">@{tweet.userId.username}</p>
//                     <span className="text-gray-400 text-xs">
//                       {new Date(tweet.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <p className="text-gray-800 mt-1">{tweet.description}</p>

//                   {tweet.mediaUrl && (
//                     <img
//                       src={tweet.mediaUrl}
//                       alt=""
//                       className="mt-3 rounded-xl border max-h-96 object-cover"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✏️ Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-2xl w-[90%] sm:w-[500px] p-6 shadow-2xl relative animate-fadeIn">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">
//               Edit Profile
//             </h2>
//             <form onSubmit={handleUpdateProfile} className="space-y-4">
//               {/* Banner Upload */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Banner Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleBannerChange}
//                 />
//                 {previewBanner && (
//                   <img
//                     src={previewBanner}
//                     alt="banner preview"
//                     className="w-full h-32 object-cover mt-2 rounded-md"
//                   />
//                 )}
//               </div>

//               {/* Avatar Upload */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Profile Avatar
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarChange}
//                 />
//                 {previewAvatar && (
//                   <img
//                     src={previewAvatar}
//                     alt="avatar preview"
//                     className="w-20 h-20 object-cover rounded-full mt-2 border"
//                   />
//                 )}
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               {/* Username */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               {/* Bio */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Bio
//                 </label>
//                 <textarea
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   rows="3"
//                   maxLength="180"
//                   className="border rounded-md w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
//                 />
//                 <p className="text-xs text-gray-500 text-right">
//                   {bio.length}/180
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end space-x-3 pt-3 border-t">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from "react";
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from "react-router-dom";
// import Avatar from "react-avatar";
// import useGetProfile from "../hooks/useGetProfile";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT, TWEET_API_END_POINT } from "../utils/constants";
// import toast from "react-hot-toast";
// import { followingUpdate, getUser } from "../redux/userSlice";
// import { getRefresh } from "../redux/tweetSlice";
// import bannerImage from "../assets/bannerImage.webp";
// import Tweet from "../components/Tweet"; // ✅ IMPORTANT

// const Profile = () => {
//   const { user, profile } = useSelector((store) => store.user);
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [name, setName] = useState("");
//   const [tweets, setTweets] = useState([]);
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [banner, setBanner] = useState(null);
//   const [previewAvatar, setPreviewAvatar] = useState("");
//   const [previewBanner, setPreviewBanner] = useState("");
//   const [editName, setEditName] = useState("");
//   const [editUsername, setEditUsername] = useState("");
//   const [editBio, setEditBio] = useState("");
//   // 👉 Fetch profile
//   useGetProfile(id);

//   // 👉 Sync profile state
//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setUsername(profile.username || "");
//       setBio(profile.bio || "");
//       setPreviewAvatar(profile.avatar || "");
//       setPreviewBanner(profile.banner || "");
//     }
//   }, [profile]);
//   useEffect(() => {
//     if (showEditModal && profile) {
//       setEditName(profile.name);
//       setEditUsername(profile.username);
//       setEditBio(profile.bio || "");
//     }
//   }, [showEditModal, profile]);

//   // 👉 Fetch tweets of the profile user
//   useEffect(() => {
//     const fetchUserTweets = async () => {
//       try {
//         const res = await axios.get(`${TWEET_API_END_POINT}/user/${id}`, {
//           withCredentials: true,
//         });
//         setTweets(res.data.tweets);
//       } catch (error) {
//         console.log("Error fetching user tweets:", error);
//       }
//     };

//     fetchUserTweets();
//   }, [id]);

//   // 👉 Follow / Unfollow
//   const followAndUnfollowHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${USER_API_END_POINT}/follow-unfollow/${id}`,
//         { id: user?._id },
//         { withCredentials: true }
//       );
//       dispatch(followingUpdate(id));
//       dispatch(getRefresh());
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Action failed");
//     }
//   };

//   // 👉 Avatar Upload
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//     setPreviewAvatar(URL.createObjectURL(file));
//   };

//   // 👉 Banner Upload
//   const handleBannerChange = (e) => {
//     const file = e.target.files[0];
//     setBanner(file);
//     setPreviewBanner(URL.createObjectURL(file));
//   };

//   // 👉 Edit Profile Submit
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("username", username);
//       formData.append("bio", bio);
//       if (avatar) formData.append("avatar", avatar);
//       if (banner) formData.append("banner", banner);

//       const res = await axios.put(
//         `${USER_API_END_POINT}/edit-profile`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Profile updated successfully!");
//         dispatch(getUser(res.data.user));

//         setPreviewAvatar(res.data.user.avatar || "");
//         setPreviewBanner(res.data.user.banner || "");

//         setShowEditModal(false);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   return (
//     <div className="w-full sm:w-[50%] border-l border-r border-gray-200 bg-white min-h-screen">
//       {/* Header */}
//       <div className="flex items-center py-2 sticky top-0 bg-white z-10 border-b">
//         <Link
//           to="/"
//           className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
//         >
//           <IoMdArrowBack size="24px" />
//         </Link>
//         <div className="ml-2">
//           <h1 className="font-bold text-lg">{profile?.name}</h1>
//           <p className="text-gray-500 text-sm">{tweets.length} Posts</p>
//         </div>
//       </div>

//       {/* Banner */}
//       <div className="relative">
//         <img
//           src={previewBanner || profile?.banner || bannerImage}
//           alt="Banner"
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute left-5 bottom-[-50px] border-4 border-white rounded-full">
//           <Avatar
//             src={previewAvatar || profile?.avatar}
//             size="100"
//             round={true}
//           />
//         </div>
//       </div>

//       {/* Follow / Edit button */}
//       <div className="flex justify-end m-4 mt-14">
//         {profile?._id === user?._id ? (
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="px-4 py-1 font-semibold rounded-full border border-gray-400 hover:bg-gray-100"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <button
//             onClick={followAndUnfollowHandler}
//             className="px-4 py-1 bg-black text-white rounded-full"
//           >
//             {user?.following.includes(id) ? "Following" : "Follow"}
//           </button>
//         )}
//       </div>

//       {/* Profile Info */}
//       <div className="px-6 mt-2">
//         <h1 className="font-bold text-xl">{name}</h1>
//         <p className="text-gray-600">@{username}</p>
//         <p className="mt-2 text-gray-700">{bio}</p>
//       </div>

//       {/* Tweets Section */}
//       <div className="mt-6 border-t">
//         <h2 className="font-bold text-lg px-4 py-3">Posts</h2>

//         {tweets.length === 0 ? (
//           <p className="text-center text-gray-500 py-6">No posts yet</p>
//         ) : (
//           tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/40 overflow-y-auto flex justify-center z-50 py-10">
//           <div className="bg-white w-[90%] sm:w-[500px] p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>

//             <form
//               onSubmit={async (e) => {
//                 e.preventDefault();

//                 const formData = new FormData();
//                 formData.append("name", editName);
//                 formData.append("username", editUsername);
//                 formData.append("bio", editBio);
//                 if (avatar) formData.append("avatar", avatar);
//                 if (banner) formData.append("banner", banner);

//                 try {
//                   const res = await axios.put(
//                     `${USER_API_END_POINT}/edit-profile`,
//                     formData,
//                     {
//                       headers: { "Content-Type": "multipart/form-data" },
//                       withCredentials: true,
//                     }
//                   );

//                   if (res.data.success) {
//                     toast.success("Profile updated!");

//                     // Update UI with saved values
//                     setName(editName);
//                     setUsername(editUsername);
//                     setBio(editBio);

//                     dispatch(getUser(res.data.user));

//                     setShowEditModal(false);
//                   }
//                 } catch (error) {
//                   toast.error("Failed to update profile");
//                 }
//               }}
//               className="space-y-4"
//             >
//               {/* Name */}
//               <div>
//                 <label className="block font-medium mb-1">Name</label>
//                 <input
//                   className="w-full border px-3 py-2 rounded-md"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                 />
//               </div>

//               {/* Username */}
//               <div>
//                 <label className="block font-medium mb-1">Username</label>
//                 <input
//                   className="w-full border px-3 py-2 rounded-md"
//                   value={editUsername}
//                   onChange={(e) => setEditUsername(e.target.value)}
//                 />
//               </div>

//               {/* Bio */}
//               <div>
//                 <label className="block font-medium mb-1">Bio</label>
//                 <textarea
//                   className="w-full border px-3 py-2 rounded-md"
//                   rows="3"
//                   value={editBio}
//                   onChange={(e) => setEditBio(e.target.value)}
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 border rounded-full"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-5 py-2 bg-blue-500 text-white rounded-full"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// {
// {
//   showEditModal && (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-[90%] sm:w-[500px] p-6 rounded-xl shadow-xl">
//         <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>

//         <form onSubmit={handleUpdateProfile} className="space-y-4">
//           {/* Banner Upload */}
//           <div>
//             <label className="block font-medium mb-1">Banner Image</label>
//             <input type="file" accept="image/*" onChange={handleBannerChange} />
//             {previewBanner && (
//               <img
//                 src={previewBanner}
//                 className="w-full mt-2 rounded-md h-28 object-cover"
//               />
//             )}
//           </div>

//           {/* Avatar Upload */}
//           <div>
//             <label className="block font-medium mb-1">Profile Avatar</label>
//             <input type="file" accept="image/*" onChange={handleAvatarChange} />
//             {previewAvatar && (
//               <img
//                 src={previewAvatar}
//                 className="h-20 w-20 rounded-full mt-2"
//               />
//             )}
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block font-medium mb-1">Name</label>
//             <input
//               className="w-full border px-3 py-2 rounded-md"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           {/* Username */}
//           <div>
//             <label className="block font-medium mb-1">Username</label>
//             <input
//               className="w-full border px-3 py-2 rounded-md"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block font-medium mb-1">Bio</label>
//             <textarea
//               className="w-full border px-3 py-2 rounded-md"
//               rows="3"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-2">
//             <button
//               type="button"
//               onClick={() => setShowEditModal(false)}
//               className="px-4 py-2 border rounded-full"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-2 bg-blue-500 text-white rounded-full"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT, TWEET_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { followingUpdate, getMyProfile, getUser } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import bannerImage from "../assets/bannerImage.webp";
import Tweet from "../components/Tweet";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  // display fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");

  // edit fields
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const [tweets, setTweets] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  // fetch profile
  useGetProfile(id);

  // sync display data when profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setUsername(profile.username || "");
      setBio(profile.bio || "");

      setPreviewAvatar(profile.avatar || "");
      setPreviewBanner(profile.banner || "");
    }
  }, [profile]);

  // load updated profile into form every time modal opens
  useEffect(() => {
    if (showEditModal && profile) {
      setEditName(profile.name);
      setEditUsername(profile.username);
      setEditBio(profile.bio || "");
      setAvatar(null);
      setBanner(null);
    }
  }, [showEditModal, profile]);

  // fetch tweets
  useEffect(() => {
    const fetchUserTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_END_POINT}/user/${id}`, {
          withCredentials: true,
        });
        setTweets(res.data.tweets);
      } catch (error) {
        console.log("Error fetching user tweets:", error);
      }
    };
    fetchUserTweets();
  }, [id]);

  // follow/unfollow
  const followAndUnfollowHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/follow-unfollow/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(followingUpdate(id));
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  // avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  // banner upload
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
  };

  // update profile
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("username", editUsername);
      formData.append("bio", editBio);
      if (avatar) formData.append("avatar", avatar);
      if (banner) formData.append("banner", banner);

      const res = await axios.put(
        `${USER_API_END_POINT}/edit-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Profile updated!");

        // Update both user and profile in Redux
        dispatch(getUser(res.data.user));
        dispatch(getMyProfile(res.data.user));

        // Update local UI fields
        setName(res.data.user.name);
        setUsername(res.data.user.username);
        setBio(res.data.user.bio || "");
        setPreviewAvatar(res.data.user.avatar || "");
        setPreviewBanner(res.data.user.banner || "");

        // Update edit form for NEXT modal open
        setEditName(res.data.user.name);
        setEditUsername(res.data.user.username);
        setEditBio(res.data.user.bio || "");

        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="w-full sm:w-[50%] border-l border-r border-gray-200 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex items-center py-2 sticky top-0 bg-white border-b z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
          <IoMdArrowBack size={24} />
        </Link>
        <div className="ml-2">
          <h1 className="font-bold text-lg">{name}</h1>
          <p className="text-gray-500 text-sm">{tweets.length} Posts</p>
        </div>
      </div>

      {/* BANNER */}
      <div className="relative">
        <img
          src={previewBanner || bannerImage}
          alt="banner"
          className="w-full h-48 object-cover"
        />
        <div className="absolute left-5 bottom-[-50px] border-4 border-white rounded-full">
          <Avatar src={previewAvatar} size="100" round />
        </div>
      </div>

      {/* EDIT / FOLLOW BUTTON */}
      <div className="flex justify-end m-4 mt-14">
        {profile?._id === user?._id ? (
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-1 border rounded-full font-semibold hover:bg-gray-100"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={followAndUnfollowHandler}
            className="px-4 py-1 bg-black text-white rounded-full"
          >
            {user?.following.includes(id) ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {/* PROFILE INFO */}
      <div className="px-6 mt-2">
        <h1 className="font-bold text-xl">{name}</h1>
        <p className="text-gray-600">@{username}</p>
        <p className="mt-2 text-gray-700">{bio}</p>
      </div>

      {/* POSTS */}
      <div className="mt-6 border-t">
        <h2 className="font-bold text-lg px-4 py-3">Posts</h2>

        {tweets.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No posts yet</p>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              key={tweet._id}
              tweet={tweet}
              onDelete={(deletedId) =>
                setTweets((prev) => prev.filter((t) => t._id !== deletedId))
              }
            />
          ))
        )}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto flex justify-center py-10">
          <div className="bg-white w-[90%] sm:w-[500px] p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="block font-medium mb-1">Username</label>
                <input
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* BIO */}
              <div>
                <label className="block font-medium mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                  rows={3}
                />
              </div>

              {/* AVATAR */}
              <div>
                <label className="block font-medium mb-1">Profile Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* BANNER */}
              <div>
                <label className="block font-medium mb-1">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded-full"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-500 text-white rounded-full"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
