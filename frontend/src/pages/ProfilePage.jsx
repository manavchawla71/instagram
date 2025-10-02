import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  // Load user info from localStorage
  let username = "";
  let storedProfile = {};
  try {
    username = window.localStorage.getItem("username") || "username";
    storedProfile = JSON.parse(
      window.localStorage.getItem("profileInfo") || "{}"
    );
  } catch (e) {
    username = "username";
    storedProfile = {};
  }
  const [fullName, setFullName] = useState(storedProfile.fullName || "");
  const [profilePic, setProfilePic] = useState(
    storedProfile.profilePic || "https://randomuser.me/api/portraits/men/32.jpg"
  );
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("images"); // "images" or "videos"
  const fileInputRef = useRef();
  const handleNameChange = (e) => setFullName(e.target.value);
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [editDone, setEditDone] = useState(false);

  // Fetch posts from backend and filter by username
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      const filtered = res.data.filter((post) => post.username === username);
      setUserPosts(filtered);
    });
  }, [username]);

  // Helper to determine if post is image or video
  const isImage = (post) => {
    // If post.image is a data URL, check mime type; else, fallback to file extension
    if (post.image && post.image.startsWith("data:")) {
      return post.image.startsWith("data:image");
    }
    if (post.image) {
      const ext = post.image.split('.').pop().toLowerCase();
      return ["jpg","jpeg","png","gif","bmp","webp"].includes(ext);
    }
    return false;
  };
  const isVideo = (post) => {
    if (post.image && post.image.startsWith("data:")) {
      return post.image.startsWith("data:video");
    }
    if (post.image) {
      const ext = post.image.split('.').pop().toLowerCase();
      return ["mp4","webm","ogg","mov","avi","mkv"].includes(ext);
    }
    return false;
  };

  const imagePosts = userPosts.filter(isImage);
  const videoPosts = userPosts.filter(isVideo);

  const handleSave = (e) => {
    e.preventDefault();
    window.localStorage.setItem(
      "profileInfo",
      JSON.stringify({ fullName, profilePic })
    );
    setEditDone(true);
  };

  return (
    <div className="profile-ig-container">
      <div className="profile-ig-box">
        <div className="profile-ig-header">
          <div className="profile-ig-avatar-wrapper">
            <img src={profilePic} alt="Profile" className="profile-ig-avatar" />
            {!editDone && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePicChange}
                  style={{ display: "none" }}
                />
                <span
                  className="profile-ig-camera-icon"
                  onClick={() => fileInputRef.current.click()}
                  title="Change profile picture"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      background: "#0008",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  >
                    <circle cx="12" cy="13" r="3.5" />
                    <path d="M9.5 7h5l1-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2l1 2z" />
                  </svg>
                </span>
              </>
            )}
          </div>
          <div className="profile-ig-info">
            <div className="profile-ig-username">{username}</div>
            <form onSubmit={handleSave} className="profile-ig-form">
              <input
                type="text"
                value={fullName}
                onChange={handleNameChange}
                placeholder="Full Name"
                className="profile-ig-fullname"
                disabled={editDone}
              />
              {!editDone && (
                <button type="submit" className="profile-ig-btn">
                  Save Profile
                </button>
              )}
            </form>
            <div className="profile-ig-stats">
              <span>
                <b>{userPosts.length}</b> posts
              </span>
              <span>
                <b>0</b> followers
              </span>
              <span>
                <b>0</b> following
              </span>
            </div>
          </div>
        </div>
        <hr className="profile-ig-divider" />

        {/* Tabs for Images and Videos (with icons) */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 24 }}>
          <button
            className={activeTab === "images" ? "profile-ig-tab profile-ig-tab-active" : "profile-ig-tab"}
            onClick={() => setActiveTab("images")}
            title="Images"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Image icon (grid) */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={activeTab === "images" ? "#fff" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button
            className={activeTab === "videos" ? "profile-ig-tab profile-ig-tab-active" : "profile-ig-tab"}
            onClick={() => setActiveTab("videos")}
            title="Videos"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Video icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={activeTab === "videos" ? "#fff" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="15" height="16" rx="2"/><polygon points="17 8 22 12 17 16 17 8"/></svg>
          </button>
        </div>

        <div className="profile-ig-posts">
          {activeTab === "images" && imagePosts.length === 0 && (
            <div style={{ textAlign: "center", color: "#888", gridColumn: "1/-1" }}>No image posts yet.</div>
          )}
          {activeTab === "videos" && videoPosts.length === 0 && (
            <div style={{ textAlign: "center", color: "#888", gridColumn: "1/-1" }}>No video posts yet.</div>
          )}
          {activeTab === "images" && imagePosts.map((post, index) => (
            <img
              src={post.image}
              alt="no image"
              key={index}
              className="profile-ig-post-img"
            />
          ))}
          {activeTab === "videos" && videoPosts.map((post, index) => (
            <video
              key={index}
              className="profile-ig-post-img"
              controls
              src={post.image}
              style={{ background: "#000" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
