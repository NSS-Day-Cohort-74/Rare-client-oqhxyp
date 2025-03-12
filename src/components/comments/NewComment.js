import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewComment } from "../../services/commentServices";

export const NewComment = ({token}) => {
    const content=useRef()
    const navigate=useNavigate()

    const {postId}=useParams();

    const handleSaveComment=async(event)=>{
        event.preventDefault()
        
        const createdComment={
          post_id: postId,
          author_id: token,
          content: content.current.value,
       
    }
    console.log(createdComment)
    createNewComment(createdComment).then(()=>{
        navigate(`/allPosts/${postId}/comments`)
    })
    
  }
    return (
        <section className="columns is-centered">
          <form className="column is-two-thirds" onSubmit={handleSaveComment}>
          <h1 className="title">Create New Comment</h1>
            
            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <textarea className="textarea" ref={content}  style={{width:'100%' , height: '100px'}}/>
              </div>
            </div>
    
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">Submit</button>
              </div>
            </div>
    
          </form>
        </section>
      )
    }