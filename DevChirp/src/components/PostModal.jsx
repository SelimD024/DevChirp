import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(getAuth());

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Date.now(),
      title,
      username: user.displayName,
      description,
    }); // Geef een unieke id aan de post (bijvoorbeeld de huidige timestamp)
    setTitle("");
    setDescription("");
  };

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
          <div className="modal-actions">
            <button type="submit" className="button">Submit</button>
            <button onClick={onClose} className="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
