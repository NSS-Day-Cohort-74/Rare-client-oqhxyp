import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postServices";





export const UpdatePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState([]);
    const [editedPost, setEditedPost] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedPost({ ...post });
      };

      const handleSave = async () => {
        try {
          // Make sure editedPost has the id
          const postToUpdate = {
            ...editedPost,
            id: parseInt(postId)  // Ensure id is included and is a number
          };
          
          await updatePost(postToUpdate);  // Pass single post object
          setPost(postToUpdate);
          setIsEditing(false);
        } catch (error) {
          console.error("Error updating post:", error);
          alert("Failed to update post. Please try again.");
        }
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost((prev) => ({
          ...prev,
          [name]: value,
        }));
      };


     const handleCancel = () => {
        setIsEditing(false);
        setEditedPost({ ...post });
      };

      useEffect(() => {
        getPostById(postId).then((data) => {
          const singlePost = data[0];
          if (singlePost) {
            setPost(singlePost);
            setEditedPost(singlePost);
          }
        });
      }, [postId]);

      return (
        <>
          <h1>Update Post</h1>
          <section className="post">
            <header className="post-header">{post.user?.name}</header>
            {isEditing ? (
              <>
                <div>
                  <span className="post-info">Title: </span>
                  <input
                    type="text"
                    name="title"
                    value={editedPost.title || ""}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                </div>
                <div>
                  <span className="post-info">Body: </span>
                  <textarea
                    name="body"
                    value={editedPost.body || ""}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                </div>
                <div className="edit-buttons">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="post-info">Title: </span>
                  {post.title}
                </div>
                <div>
                  <span className="post-info">Body: </span>
                  {post.body}
                </div>
                <div>
                  <span className="post-info">Topic: </span>
                  {post.topic?.topicName}
                </div>
                <div>
                  <span className="post-info">Date: </span>
                  {post.date}
                </div>
                <div>
                  <span className="post-info">Likes: </span>
                  {postLikes.length}
                </div>
                <div className="action-buttons">
                  <button onClick={handleLike} className={hasUserLiked ? "liked" : ""}>
                    {hasUserLiked ? "Unlike" : "Like"}
                  </button>
                  {isPostOwner && (
                    <button onClick={handleEdit}>Edit Post</button>
                  )}
                </div>
              </>
            )}
          </section>
        </>
      );
  };