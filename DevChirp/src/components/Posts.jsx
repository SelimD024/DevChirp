import React from "react";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import { useHistory } from "react-router-dom";

function Post({
  id,
  username,
  daysAgo,
  title,
  description,
  likes,
  comments,
}) {
  const history = useHistory();

  return (
    <div className="card" key={id}>
      <div className="header">
        <img src={avatar} alt="React Logo" onClick={() => history.push("/")} />

        <div className="card-info">
          <h2 className="Username">{username}</h2>
          <p className="daysago">{daysAgo}</p>
        </div>
        <img src={Bookmark} alt="React Logo" />
      </div>
      <div className="body">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="footer">
        <div className="inner">
          <img
            src={Like}
            alt="React Logo"
            // onClick={() => handleLike(id)}
            style={{ cursor: "pointer" }}
          />
          <span>{likes}</span>
        </div>

        <div className="inner">
          <img src={Comment} alt="React Logo" /> <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
