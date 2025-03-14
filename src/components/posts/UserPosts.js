import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getPosts } from "../../services/postServices";
import { deletePostTags } from "../../services/tagServices";
import { HumanDate } from "../utils/HumanDate";

export const UserPosts = ({ token }) => {
  const navigate = useNavigate();
  const [allPosts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log({ token: token });
    getPosts(token).then((data) => setPosts(data));
    console.log({ "current my posts": allPosts });
  }, []);

  useEffect(() => {
    setMyPosts(allPosts.filter((p) => p.user_id == token));
  }, [allPosts, token]);

  const handleEdit = (postId) => {
    navigate(`/myPosts/${postId}`);
  };

  const confirmDeletion = (postId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    console.log(userConfirmed);
    if (userConfirmed) {
      deletePost(postId)
        .then(() => deletePostTags(postId))
        .then(() => {
          window.location.reload();
        });
    } else {
      alert("Post deletion canceled.");
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="title is-3">My Posts</h2>

        {myPosts.length === 0 ? (
          <div className="notification is-light">
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="posts-list">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="box mb-3 py-2 px-3"
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <div className="level mb-2">
                        <div className="level-left">
                          <Link
                            to={`/allPosts/${post.id}`}
                            className="title is-4"
                          >
                            {post.title}
                          </Link>
                        </div>
                        <div className="level-right">
                          <span className="has-text-grey-light">
                            {
                              <HumanDate
                                date={new Date(
                                  post.publication_date
                                ).toLocaleDateString()}
                              />
                            }
                          </span>
                        </div>
                      </div>

                      <p className="mb-3">{post.content}</p>

                      <section className="mb-4 justify-center">
                        <div
                          style={{
                            maxWidth: "400px",
                            maxHeight: "200px",
                            overflow: "hidden",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={post.image_url}
                            alt="Post Cover"
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </section>

                      <div className="level">
                        <div className="level-left">
                          <p className="has-text-weight-medium">
                            By: {post.user.first_name} {post.user.last_name}
                          </p>
                        </div>
                        <div className="level-right">
                          <div className="field is-grouped">
                            <div className="control">
                              <button
                                className="button is-link is-small"
                                onClick={() => handleEdit(post.id)}
                              >
                                Edit
                              </button>
                            </div>
                            <div className="control">
                              <button
                                className="button is-danger is-small"
                                onClick={() => confirmDeletion(post.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
