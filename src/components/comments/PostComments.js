

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteComment, getComments } from "../../services/commentServices";


export const PostComments = ({token}) => {

  const [allComments, setComments] = useState([])
  const [PostComments, setPostComments] = useState([])
  const [refreshedComments, setRefreshedComments] = useState(false)
  
  const{postId}=useParams()
  console.log(postId)
    
    useEffect(() => {
      getComments()
      .then((data) => setComments(data)
    ) 
    },[])


    useEffect(() => {
      if (allComments.length > 0 && postId) {
        setPostComments(allComments.filter(c => {
          return c.post_id === Number(postId); // Convert postId to a number
        }));
      }
    }, [allComments, postId]);

  
    const confirmDeletion=(commentId)=>{
        const userConfirmed=window.confirm("Are you sure you want to delete this comment?");
        if (userConfirmed){
            deleteComment(commentId)
            .then(()=>{window.location.reload() 
        })
        }else{
            alert("Comment deletion canceled.")
        }
    }


     const postTitle=PostComments.length>0?PostComments[0].post.title:null


      return (
          <>
              <div className="all-post-container">
                  <h2>{postTitle} Comments</h2>

                  <div>
                  <Link to={`/allPosts/${postId}/newComment`}><button>Add Comment</button></Link>
                  </div>
                  
                  {PostComments.length === 0 ? (
                      <p>No comments found.</p>
                  ) : (
                      <ul className="comment-list">
                          {PostComments.map((comment) => (
                              <li key={comment.id}>
                                  <div className="card-info">
                                  <p>{comment.content}</p>
                                  <p>-{comment.author.username}</p>
                                  </div>
                                  
                                 {comment.author_id===Number(token) &&(
                                    <>
                                    <button className="btn-warning" onClick={()=>confirmDeletion(comment.id)}>🚮</button>
                                    <button>edit</button>
                                    </>)
                                    }
                              </li>
                          ))}
                      </ul>
                  )}
              </div>
          </>
      );
  };