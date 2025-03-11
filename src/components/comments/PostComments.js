import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteComment, getComments } from "../../services/commentServices";


export const PostComments = ({token}) => {

  const [allComments, setComments] = useState([])
  const [PostComments, setPostComments] = useState([])
  
  const{postId}=useParams()
    
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
        <div className="container">
          <div className="section">
            <div className="has-text-centered mb-5">
              <h2 className="title is-3">{postTitle ? `${postTitle} Comments` : 'Comments'}</h2>
              
              <div className="mt-4 mb-5">
                <Link to={`/allPosts/${postId}/newComment`} className="button is-primary is-medium">
                  Add Comment
                </Link>
              </div>
            </div>
            
            {PostComments.length === 0 ? (
              <div className="notification is-light has-text-centered">
                <p className="is-size-5">No comments found.</p>
              </div>
            ) : (
              <div className="columns is-multiline is-centered">
                {PostComments.map((comment) => (
                  <div key={comment.id} className="column is-5 mb-4">
                    <div className="card">
                      <div className="card-content">
                        <div className="content">
                          <p>{comment.content}</p>
                          <p className="has-text-right has-text-weight-bold">
                            - {comment.author.username}
                          </p>
                        </div>
                      </div>
                      
                      {comment.author_id === Number(token) && (
                        <div className="card-footer">
                          <div className="card-footer-item">
                            <div className="buttons">
                              <button className="button is-warning">
                                Edit
                              </button>
                              <button 
                                className="button is-danger" 
                                onClick={() => confirmDeletion(comment.id)}
                              >
                                Delete
                              </button>
                              
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };