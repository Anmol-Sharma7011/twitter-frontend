// import React from "react";
// import { FaXTwitter } from "react-icons/fa6";
// import { IoHome } from "react-icons/io5";
// import { FaHashtag, FaUserAlt, FaRegBookmark } from "react-icons/fa";
// import { IoMdNotifications } from "react-icons/io";
// import { LuMessageSquareLock } from "react-icons/lu";
// import { MdLogout } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { USER_API_END_POINT } from "../utils/constants";
// import { getMyProfile, getOtherUser, getUser } from "../redux/userSlice";

// const LeftSidebar = () => {
//   const { user } = useSelector((store) => store.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // 🔴 Handle Logout
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${USER_API_END_POINT}/logout`,
//         {},
//         { withCredentials: true }
//       );

//       dispatch(getUser(null));
//       dispatch(getOtherUser(null));
//       dispatch(getMyProfile(null));

//       toast.success(res.data.message || "Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error(error?.response?.data?.message || "Logout failed");
//     }
//   };

//   // 🟢 Navigate to Bookmarks
//   const handleBookmarks = () => {
//     navigate("/bookmarks");
//   };

//   // 🟢 Navigate to Post Section (and focus create box)
//   const handlePostClick = () => {
//     navigate("/", { state: { focusPostBox: true } });
//   };

//   return (
//     <div className="w-[20%] min-w-[250px] hidden sm:flex flex-col justify-between h-screen px-2 border-r border-gray-200">
//       <div>
//         {/* Logo */}
//         <div className="p-4">
//           <FaXTwitter size="36px" className="text-[#1D9BF0]" />
//         </div>

//         {/* Navigation Links */}
//         <div className="my-4">
//           {/* Home */}
//           <Link
//             to="/"
//             className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full"
//           >
//             <IoHome size="24px" />
//             <h1 className="font-bold text-lg ml-2">Home</h1>
//           </Link>

//           {/* Explore */}
//           <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
//             <FaHashtag size="24px" />
//             <h1 className="font-bold text-lg ml-2">Explore</h1>
//           </div>

//           {/* Notifications */}
//           <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
//             <IoMdNotifications size="24px" />
//             <h1 className="font-bold text-lg ml-2">Notifications</h1>
//           </div>

//           {/* Messages */}
//           <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
//             <LuMessageSquareLock size="24px" />
//             <h1 className="font-bold text-lg ml-2">Messages</h1>
//           </div>

//           {/* Profile */}
//           <Link
//             to={`/profile/${user?._id}`}
//             className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full"
//           >
//             <FaUserAlt size="24px" />
//             <h1 className="font-bold text-lg ml-2">Profile</h1>
//           </Link>

//           {/* Bookmarks */}
//           <div
//             onClick={handleBookmarks}
//             className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer"
//           >
//             <FaRegBookmark size="24px" />
//             <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="mb-4">
//         {/* Post Button */}
//         <button
//           onClick={handlePostClick}
//           className="px-4 py-2 mb-3 bg-[#1D9BF0] hover:bg-[#1A8CD8] w-full rounded-full font-bold text-white transition-all"
//         >
//           Post
//         </button>

//         {/* Logout */}
//         <div
//           onClick={logoutHandler}
//           className="flex items-center justify-center py-2 hover:bg-gray-200 rounded-full cursor-pointer transition"
//         >
//           <MdLogout size="22px" />
//           <h1 className="font-semibold text-md ml-2">Logout</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;




import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaHashtag, FaUserAlt, FaRegBookmark } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { LuMessageSquareLock } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constants";
import { getMyProfile, getOtherUser, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(getUser(null));
      dispatch(getOtherUser(null));
      dispatch(getMyProfile(null));
      toast.success(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  // Navigate to Bookmarks
  const handleBookmarks = () => navigate("/bookmarks");

  // Navigate to Home and auto-focus post box
  const handlePostClick = () => {
    navigate("/", { state: { focusPostBox: true } });
  };

  return (
    <div className="w-[20%] min-w-[250px] hidden sm:flex flex-col justify-between h-screen px-2 border-r border-gray-200">
      <div>
        <div className="p-4">
          <FaXTwitter size="36px" className="text-[#1D9BF0]" />
        </div>

        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full"
          >
            <IoHome size="24px" />
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <FaHashtag size="24px" />
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <IoMdNotifications size="24px" />
            <h1 className="font-bold text-lg ml-2">Notifications</h1>
          </div>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <LuMessageSquareLock size="24px" />
            <h1 className="font-bold text-lg ml-2">Messages</h1>
          </div>

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full"
          >
            <FaUserAlt size="24px" />
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>

          <div
            onClick={handleBookmarks}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <FaRegBookmark size="24px" />
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={handlePostClick}
          className="px-4 py-2 mb-3 bg-[#1D9BF0] hover:bg-[#1A8CD8] w-full rounded-full font-bold text-white transition-all"
        >
          Post
        </button>

        <div
          onClick={logoutHandler}
          className="flex items-center justify-center py-2 hover:bg-gray-200 rounded-full cursor-pointer transition"
        >
          <MdLogout size="22px" />
          <h1 className="font-semibold text-md ml-2">Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
