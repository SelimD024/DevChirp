import React from "react";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import { useHistory, Link } from "react-router-dom";

function Post({
  id,
  username,
  daysAgo,
  title,
  description,
  hashtag,
  likes,
  comments,
  handleLike,
  profilePicture,
}) {
  const history = useHistory();

  return (
    <div className="card" key={id}>
      <Link to={`/posts/${id}`}>
        <div className="header">
          <img
            src={profilePicture || avatar} // Use profilePicture if available, otherwise use default avatar
            alt="Profile Picture"
            onClick={() => history.push("/")}
            className="Post_profilepicture"
          />

          <div className="card-info">
            <h2 className="Username">{username}</h2>
            <p className="daysago">{daysAgo}</p>
          </div>
          <img src={Bookmark} alt="React Logo" />
        </div>
      </Link>
      <div className="body">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="footer">
        <div className="inner">
          <div className="likes">
            {" "}
            <img
              src={Like}
              alt="React Logo"
              onClick={() => handleLike(id)} // Uncomment this line to call handleLike function
              style={{ cursor: "pointer" }}
            />
            <span>{likes}</span>
          </div>
          <div className="comments">
            {" "}
            <img src={Comment} alt="React Logo" /> <span>{comments}</span>
            <span>{likes}</span>
          </div>
        </div>

        <div className="inner">
          <span className="tags">#{hashtag}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
