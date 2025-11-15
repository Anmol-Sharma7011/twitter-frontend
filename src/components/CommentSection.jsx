// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import Avatar from "react-avatar";
// // import { TWEET_API_END_POINT } from "../utils/constants";
// // import { useSelector } from "react-redux";

// // const CommentSection = ({ tweetId }) => {
// //   const [comments, setComments] = useState([]);
// //   const [text, setText] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const { user } = useSelector((store) => store.user);

// //   // 🌀 Fetch all comments
// //   const fetchComments = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${TWEET_API_END_POINT}/${tweetId}/comments`,
// //         { withCredentials: true }
// //       );

// //       if (res.data.success) {
// //         setComments(res.data.comments);
// //       }
// //     } catch (error) {
// //       console.error("Fetch comments error:", error);
// //       toast.error("Failed to load comments");
// //     }
// //   };

// //   // 🗨️ Add new comment
// //   const handleAddComment = async (e) => {
// //     e.preventDefault();

// //     if (!text.trim()) {
// //       toast.error("Please write something!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const res = await axios.post(
// //         `${TWEET_API_END_POINT}/${tweetId}/comment`,
// //         { text },
// //         { withCredentials: true }
// //       );

// //       if (res.data.success) {
// //         toast.success("Comment added!");
// //         setText("");
// //         setComments(res.data.tweet.comments.reverse()); // update instantly
// //       }
// //     } catch (error) {
// //       console.error("Add comment error:", error);
// //       toast.error("Failed to post comment");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchComments();
// //   }, [tweetId]);

// //   return (
// //     <div className="mt-3 border-t border-gray-200 pt-3">
// //       {/* 📝 Add Comment Box */}
// //       <form onSubmit={handleAddComment} className="flex gap-3 items-start">
// //         <Avatar
// //           src={
// //             user?.avatar ||
// //             "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
// //           }
// //           size="35"
// //           round={true}
// //         />
// //         <div className="flex-1">
// //           <input
// //             type="text"
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             placeholder="Post your reply..."
// //             className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`px-4 py-1 text-sm rounded-full font-semibold ${
// //             loading
// //               ? "bg-blue-300 cursor-not-allowed"
// //               : "bg-blue-500 hover:bg-blue-600"
// //           } text-white transition`}
// //         >
// //           {loading ? "Posting..." : "Reply"}
// //         </button>
// //       </form>

// //       {/* 💬 Display Comments */}
// //       <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
// //         {comments.length > 0 ? (
// //           comments.map((comment, idx) => (
// //             <div
// //               key={idx}
// //               className="flex items-start gap-3 border-b border-gray-100 pb-2"
// //             >
// //               <Avatar
// //                 src={
// //                   comment.user?.avatar ||
// //                   "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
// //                 }
// //                 size="30"
// //                 round={true}
// //               />
// //               <div className="flex flex-col">
// //                 <p className="text-sm font-semibold text-gray-800">
// //                   {comment.user?.name || "Unknown User"}
// //                 </p>
// //                 <p className="text-gray-700 text-sm">{comment.text}</p>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   {new Date(comment.createdAt).toLocaleString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-gray-500 text-sm text-center">
// //             No comments yet — be the first!
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CommentSection;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Avatar from "react-avatar";
// import { TWEET_API_END_POINT } from "../utils/constants";
// import { useSelector } from "react-redux";
// import { MdDeleteOutline } from "react-icons/md";

// const CommentSection = ({ tweetId, tweetOwnerId }) => {
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.user);

//   // 🌀 Fetch all comments
//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(
//         `${TWEET_API_END_POINT}/${tweetId}/comments`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setComments(res.data.comments);
//       }
//     } catch (error) {
//       console.error("Fetch comments error:", error);
//       toast.error("Failed to load comments");
//     }
//   };

//   // 🗨️ Add new comment
//   const handleAddComment = async (e) => {
//     e.preventDefault();

//     if (!text.trim()) {
//       toast.error("Please write something!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${TWEET_API_END_POINT}/${tweetId}/comment`,
//         { text },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success("Comment added!");
//         setText("");
//         setComments(res.data.tweet.comments.reverse());
//       }
//     } catch (error) {
//       console.error("Add comment error:", error);
//       toast.error("Failed to post comment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🗑️ Delete comment
//   const deleteComment = async (commentId) => {
//     try {
//       const res = await axios.delete(
//         `${TWEET_API_END_POINT}/comment/${tweetId}/${commentId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success("Comment deleted");

//         // Remove from UI instantly
//         setComments((prev) =>
//           prev.filter((comment) => comment._id !== commentId)
//         );
//       }
//     } catch (error) {
//       console.error("Delete comment error:", error);
//       toast.error("Failed to delete comment");
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [tweetId]);

//   return (
//     <div className="mt-3 border-t border-gray-200 pt-3">
//       {/* 📝 Add Comment Box */}
//       <form onSubmit={handleAddComment} className="flex gap-3 items-start">
//         <Avatar
//           src={
//             user?.avatar ||
//             "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//           }
//           size="35"
//           round={true}
//         />
//         <div className="flex-1">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Post your reply..."
//             className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-1 text-sm rounded-full font-semibold ${
//             loading
//               ? "bg-blue-300 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           } text-white transition`}
//         >
//           {loading ? "Posting..." : "Reply"}
//         </button>
//       </form>

//       {/* 💬 Display Comments */}
//       <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
//         {comments.length > 0 ? (
//           comments.map((comment) => (
//             <div
//               key={comment._id}
//               className="flex items-start gap-3 border-b border-gray-100 pb-2 group"
//             >
//               {" "}
//               console.log("COMMENT:", comment)
//               <Avatar
//                 src={
//                   comment.user?.avatar ||
//                   "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
//                 }
//                 size="30"
//                 round={true}
//               />
//               <div className="flex-1">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {comment.user?.name}
//                 </p>
//                 <p className="text-gray-700 text-sm break-words">
//                   {comment.text}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {new Date(comment.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               {/* 🗑️ Delete icon (only visible for comment owner or tweet owner) */}
//               {(user?._id === comment.user?._id ||
//                 user?._id === tweetOwnerId) && (
//                 <button
//                   onClick={() => deleteComment(comment._id)}
//                   className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-600"
//                 >
//                   <MdDeleteOutline size={20} />
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-sm text-center">
//             No comments yet — be the first!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "react-avatar";
import { TWEET_API_END_POINT } from "../utils/constants";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

const CommentSection = ({ tweetId, tweetOwnerId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);

  // ⭐ Safe helper to extract ID from any comment shape
  const getCommentId = (comment) =>
    comment.commentId || comment._id || comment.id;

  // 🌀 Fetch all comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/${tweetId}/comments`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
      toast.error("Failed to load comments");
    }
  };

  // 🗨️ Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please write something!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${TWEET_API_END_POINT}/${tweetId}/comment`,
        { text },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Comment added!");
        setText("");

        // Avoid array mutation → FIX
        const updated = [...res.data.tweet.comments].reverse();
        setComments(updated);
      }
    } catch (error) {
      console.error("Add comment error:", error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete comment
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/comment/${tweetId}/${commentId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Comment deleted");

        // Remove instantly from UI
        setComments((prev) =>
          prev.filter((comment) => getCommentId(comment) !== commentId)
        );
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [tweetId]);

  return (
    <div className="mt-3 border-t border-gray-200 pt-3">
      {/* 📝 Add Comment Box */}
      <form onSubmit={handleAddComment} className="flex gap-3 items-start">
        <Avatar
          src={
            user?.avatar ||
            "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
          }
          size="35"
          round={true}
        />

        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Post your reply..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-1 text-sm rounded-full font-semibold ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition`}
        >
          {loading ? "Posting..." : "Reply"}
        </button>
      </form>

      {/* 💬 Display Comments */}
      <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const commentId = getCommentId(comment);
            const isCommentOwner = user?._id === comment?.user?._id;
            const isTweetOwner = user?._id === tweetOwnerId;
            // console.log("COMMENT OBJECT:", comment);

            return (
              <div
                key={commentId}
                className="flex items-start gap-3 border-b border-gray-100 pb-2 group"
              >
                <Avatar
                  src={
                    comment.user?.avatar ||
                    "https://imgv3.fotor.com/images/homepage-feature-card/fotor-cartoon-avatar.jpg"
                  }
                  size="30"
                  round={true}
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.user?.name}
                  </p>
                  <p className="text-gray-700 text-sm break-words">
                    {comment.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* 🗑️ Delete icon (comment owner or tweet owner) */}
                {(isCommentOwner || isTweetOwner) && (
                  <button
                    onClick={() => deleteComment(commentId)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-600"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No comments yet — be the first!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
