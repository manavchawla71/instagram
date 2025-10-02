import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import "./DashboardInstagram.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  let username;
  try {
    username = window.localStorage.getItem("username");
  } catch (e) {
    username = undefined;
  }

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLogout = () => {
    window.localStorage.removeItem("username");
    navigate("/");
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        handleCloseModal();
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/posts", {
        username,
        image,
        caption,
      });
      setPosts([res.data.post, ...posts]);
      setCaption("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <div className="ig-sidebar">
        <div className="ig-sidebar-logo">Instagram</div>
        <div className="ig-sidebar-nav">
          <div className="ig-sidebar-nav-item">🏠 Home</div>
          <div className="ig-sidebar-nav-item">🔍 Search</div>
          <div className="ig-sidebar-nav-item">🧭 Explore</div>
          <div className="ig-sidebar-nav-item">🎬 Reels</div>
          <div className="ig-sidebar-nav-item">💬 Messages</div>
          <div className="ig-sidebar-nav-item">❤️ Notifications</div>
          <div className="ig-sidebar-nav-item" onClick={handleOpenModal}>
            ➕ Create
          </div>
          <div className="ig-sidebar-nav-item" onClick={handleProfileClick}>
            👤 Profile
          </div>
        </div>
        <div className="ig-sidebar-profile" onClick={handleProfileClick}>
          <img
            className="ig-sidebar-profile-img"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
          />
          <span>{username}</span>
        </div>
        <button className="ig-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ig-main-content">
        {/* Stories Bar */}
        <div className="ig-stories-bar">
          {[...Array(8)].map((_, i) => (
            <div className="ig-story" key={i}>
              <img
                className="ig-story-img"
                src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                alt="story"
              />
              <span className="ig-story-username">user{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Caption input and Post button (after image is selected) */}
        {image && (
          <form
            className="ig-post-form"
            onSubmit={handlePost}
            style={{ width: "430px", margin: "0 auto 32px auto" }}
          >
            <img
              src={image}
              alt="preview"
              style={{ width: "100%", borderRadius: 8, marginBottom: 12 }}
            />
            <input
              type="text"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            />
            <button type="submit" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        )}

        {/* Feed */}
        <div className="ig-feed-center">
          <div className="ig-feed">
            {posts.map((post, index) => (
              <PostCard key={post.id || index} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileSelect={handleImageChange}
      />
    </div>
  );
};

export default DashboardPage;
