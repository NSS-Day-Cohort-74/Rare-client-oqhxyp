import { useEffect, useState } from "react";
import { getPosts} from "../../services/postServices";
import { Link } from "react-router-dom";


export const UserPosts = ({token}) => {

  const [allPosts, setPosts] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [refreshedPosts, setRefreshedPosts] = useState(false)
  
    // const fillAllTags = () => {
    //   pass
    // }
    
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


  
      return (
          <>
          

              <div className="all-post-container">
                  <h2>All Posts</h2>
                  
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
                                  <p>{post.categories.label}</p>
                                  <p>{post.user.first_name}</p>
                                  <p>{post.user.last_name}</p>
                                  </div>
                                  <button>delete</button>
                                  <button>edit</button>
                              </li>
                          ))}
                      </ul>
                  )}
              </div>
          </>
      );
  };