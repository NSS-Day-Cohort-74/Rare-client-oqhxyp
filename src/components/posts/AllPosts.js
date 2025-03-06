import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/postServices";



export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])

    const fetchAllPosts = async () => {
        try {
          const postArray = await getPosts();
          console.log("j", postArray)
        setAllPosts(postArray);
          } catch (error) {
          console.error("Error fetching allPosts:", error);
        }
      };

useEffect(() => {
    fetchAllPosts()
}, [])

console.log("current all posts", allPosts)

return (
    <>
        <div className="all-post-container">
            <h2>All Posts</h2>
            
            {allPosts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul className="posts-list">
                    {allPosts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/PostsDetails/${post.id}`}>
                                {post.title}
                            </Link>
                            <div className="card-info">
                            <p>{post.content}</p>
                            <p>{post.publication_date}</p>
                            <p>{post.categories.label}</p>
                            <p>{post.user.first_name}</p>
                            <p>{post.user.last_name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
);
};