import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postServices";
import { HumanDate } from "../utils/HumanDate";

export const PostDetails = ({ token }) => {
  const [post, setPost] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchAndSetPostData = () => {
    getPostById(Number(postId)).then((postDataArray) => {
      setPost(postDataArray);
    });
  };

  useEffect(() => {
    fetchAndSetPostData();
  }, []);

  if (postId && post) {
    return (
      <>
        <div className="columns is-centered">
          <div className="column is-half">
            <section className="container has-background-light box">
              <div className="columns is-vcentered">
                <div className="column has-text-centered">
                  <h1 className="title">{post.title}</h1>
                </div>
                <div className="column is-narrow">
                  <div className="tag is-medium">{post.categories.label}</div>
                </div>
              </div>
              <div
                style={{
                  maxWidth: "500px",
                  maxHeight: "300px",
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
              <div className="columns is-vcentered mt-4">
                <div className="column">
                  <p>
                    Published on{" "}
                    {
                      <HumanDate
                        date={new Date(
                          post.publication_date
                        ).toLocaleDateString()}
                      />
                    }{" "}
                  </p>
                  <p>
                    By{" "}
                    <Link to={`/users/${post.user_id}`}>
                      {post.user.first_name} {post.user.last_name}
                    </Link>
                  </p>
                </div>
                <div className="column has-text-center">
                  <Link to={`/allPosts/${post.id}/newComment`}>
                    <button className="button is-primary">Add Comment</button>
                  </Link>
                  <Link to={`/allPosts/${post.id}/comments`}>
                    <button className="button is-info ml-2">
                      View Comments
                    </button>
                  </Link>
                </div>
              </div>

              <section className="mt-4">{post.content}</section>
            </section>
          </div>
        </div>
      </>
    );
  }
};
