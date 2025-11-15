// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import Avatar from "react-avatar";
// import { Link } from "react-router-dom";

// const RightSidebar = ({ otherUsers }) => {
//   return (
//     <aside
//       className="
//         hidden
//         md:flex
//         flex-col
//         w-[35%]
//         lg:w-[25%]
//         px-4
//         py-3
//         border-l
//         border-gray-200
//         sticky
//         top-0
//         h-screen
//         overflow-y-auto
//         bg-white
//       "
//     >
//       {/* 🔍 Search Bar */}
//       <div className="flex items-center p-2 bg-gray-100 rounded-full w-full mb-5">
//         <CiSearch size="20px" className="text-gray-600" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-transparent outline-none px-2 text-sm w-full placeholder-gray-500"
//         />
//       </div>

//       {/* 👥 Who to follow */}
//       <div className="p-4 bg-gray-100 rounded-2xl shadow-sm">
//         <h1 className="font-bold text-lg mb-3">Who to follow</h1>

//         {otherUsers?.length > 0 ? (
//           otherUsers.map((user) => (
//             <div
//               key={user?._id}
//               className="flex items-center justify-between my-3 hover:bg-gray-200 rounded-xl p-2 transition-all duration-150"
//             >
//               {/* Left: Avatar + Info */}
//               <div className="flex items-center">
//                 {/* <Avatar
//                   name={user?.name?.charAt(0).toUpperCase()}
//                   size="40"
//                   round={true}
//                 /> */}
//                 <Avatar
//                   key={user?.avatar || user?._id}
//                   src={user?.avatar || undefined}
//                   name={user?.name || (user?.username ? user.username : "U")}
//                   size="40"
//                   round={true}
//                   onError={(e) => {
//                     e.currentTarget.src = "/images/default-avatar.png";
//                   }}
//                 />

//                 <div className="ml-2">
//                   <h1 className="font-semibold text-sm text-gray-800">
//                     {user?.name}
//                   </h1>
//                   <p className="text-xs text-gray-500">@{user?.username}</p>
//                 </div>
//               </div>

//               {/* Right: Profile Button */}
//               <Link to={`/profile/${user?._id}`}>
//                 <button className="cursor-pointer px-3 py-1 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-all">
//                   Profile
//                 </button>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500 text-center mt-3">
//             No users to follow yet.
//           </p>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default RightSidebar;





import React, { useState, useMemo, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers = [] }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef(null);

  // debounce input so we don't run filter on every keystroke
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // memoized filtered list
  const filteredUsers = useMemo(() => {
    if (!debouncedQuery) return otherUsers;
    const q = debouncedQuery.toLowerCase();
    return otherUsers.filter((u) => {
      const name = u?.name?.toLowerCase() || "";
      const username = u?.username?.toLowerCase() || "";
      return name.includes(q) || username.includes(q);
    });
  }, [otherUsers, debouncedQuery]);

  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-[35%]
        lg:w-[25%]
        px-4
        py-3
        border-l
        border-gray-200
        sticky
        top-0
        h-screen
        overflow-y-auto
        bg-white
      "
    >
      {/* 🔍 Search Bar */}
      <div className="flex items-center p-2 bg-gray-100 rounded-full w-full mb-5">
        <CiSearch size="20px" className="text-gray-600" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search people (name or @username)"
          className="bg-transparent outline-none px-2 text-sm w-full placeholder-gray-500"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-2 text-sm text-gray-500 hover:text-gray-700 transition"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* 👥 Who to follow */}
      <div className="p-4 bg-gray-100 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-bold text-lg">Who to follow</h1>
          <p className="text-xs text-gray-500">
            {filteredUsers?.length ?? 0} {filteredUsers?.length === 1 ? "result" : "results"}
          </p>
        </div>

        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user?._id}
              className="flex items-center justify-between my-3 hover:bg-gray-200 rounded-xl p-2 transition-all duration-150"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center">
                <Avatar
                  key={user?.avatar || user?._id}
                  src={user?.avatar || undefined}
                  name={user?.name || (user?.username ? user.username : "U")}
                  size="40"
                  round={true}
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-avatar.png";
                  }}
                />

                <div className="ml-2">
                  <h1 className="font-semibold text-sm text-gray-800">
                    {user?.name}
                  </h1>
                  <p className="text-xs text-gray-500">@{user?.username}</p>
                </div>
              </div>

              {/* Right: Profile Button */}
              <Link to={`/profile/${user?._id}`}>
                <button className="cursor-pointer px-3 py-1 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-all">
                  Profile
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center mt-3">
            {debouncedQuery ? "No users found." : "No users to follow yet."}
          </p>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
