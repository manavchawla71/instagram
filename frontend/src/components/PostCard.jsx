import React from "react";
import "./../pages/DashboardInstagram.css";

const PostCard = ({ post }) => (
  <div className="ig-post-card">
    <div className="ig-post-header">
      <img
        src={post.profilePic || "https://randomuser.me/api/portraits/men/32.jpg"}
        alt="profile"
        className="ig-sidebar-profile-img"
        style={{ width: 32, height: 32, marginRight: 10 }}
      />
      <span className="ig-post-username">{post.username}</span>
    </div>
    <img className="ig-post-img" src={post.image} alt="" />
    {post.caption && <div className="ig-post-caption">{post.caption}</div>}
  </div>
);

export default PostCard;
