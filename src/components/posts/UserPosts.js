import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { deletePost, getPosts} from "../../services/postServices";



export const UserPosts = ({token}) => {
  const navigate = useNavigate();
  const [allPosts, setPosts] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [refreshedPosts, setRefreshedPosts] = useState(false)
  
    
    useEffect(() => {
      console.log({"token":token})
      getPosts(token)
      .then((data) => setPosts(data)
    )
      console.log({"current my posts":allPosts})
      
    },[])

    useEffect(() => {

      setMyPosts(allPosts.filter(p => p.user_id == token))

    },[allPosts, token])

    const handleEdit = (postId) => {
        navigate(`/myPosts/${postId}`)
    }

    const confirmDeletion=(postId)=>{
        const userConfirmed=window.confirm("Are you sure you want to delete this post?");
        if (userConfirmed){
            deletePost(postId)
            //.then(()=>deletePostTags(postId))
            .then(()=>{window.location.reload() 
            //or getPosts(token).then((data) => {
          //setPosts(data);  // Update all posts
         // setMyPosts(data.filter((p) => p.user_id === token)); // Update my posts
        })
        }else{
            alert("Post deletion canceled.")
        }
    }
    
  
      return (
          <>
              <div className="all-post-container">
                  <h2>My Posts</h2>
                  
                  {myPosts.length === 0 ? (
                      <p>No posts found.</p>
                  ) : (
                      <ul className="posts-list">
                          {myPosts.map((post) => (
                              <li key={post.id}>
                                  <Link to={`/allPosts/${post.id}`}>
                                      {post.title}
                                  </Link>
                                  <div className="card-info">
                                  <p>{post.content}</p>
                                  <p>{post.publication_date}</p>
                                  {/* <p>{post.categories.label}</p> */}
                                  <p>{post.user.first_name}</p>
                                  <p>{post.user.last_name}</p>
                                  </div>
                                  
                                  <button onClick={() => handleEdit(post.id)}>edit</button>
                                  <button className="btn-warning" onClick={()=>confirmDeletion(post.id)}>🚮</button>
                                  
                              </li>
                          ))}
                      </ul>
                  )}
              </div>
          </>
      );
  };