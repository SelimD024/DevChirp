import React from "react";

function CommunityCard({ name, members, backgroundImage, logo }) {
  return (
    <div
      className="card"
      onClick={() => (window.location.href = "/Community")}
    >
      <div className="top" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-icon" style={{ backgroundImage: `url(${logo})` }}></div>
      </div>
      <div className="bottom">
        <h2>{name}</h2>
        <p>{members} members</p>
      </div>
    </div>
  );
}

export default CommunityCard;
