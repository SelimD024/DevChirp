import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";

function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(getAuth());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [hashtag, setHashtag] = useState(""); // Add the hashtag state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting && !isCooldown) {
      setIsSubmitting(true);
      onSubmit({
        id: Date.now(),
        title,
        username: user.displayName,
        description,
        hashtag,
      });
      setTitle("");
      setDescription("");
      setHashtag("");
    }
  };

  useEffect(() => {
    let cooldownTimeout;
    if (isSubmitting) {
      cooldownTimeout = setTimeout(() => {
        setIsSubmitting(false);
        setIsCooldown(true);
        setTimeout(() => {
          setIsCooldown(false);
        }, 300000); // 5 minutes cooldown
      }, 3000); // 3 seconds delay before cooldown starts
    }
    return () => clearTimeout(cooldownTimeout);
  }, [isSubmitting]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Hashtag</label>
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button
              type="submit"
              className="button"
              disabled={isSubmitting || isCooldown}
            >
              {isCooldown ? "Cooldown..." : "Submit"}
            </button>
            <button onClick={onClose} className="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePostModal;
