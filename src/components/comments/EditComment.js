

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewComment, getCommentById, updateComment } from "../../services/commentServices";

export const EditComment = ({token}) => {
    const navigate=useNavigate()
    const {postId}=useParams();
    const {commentId}=useParams()
    const [content, setContent]=useState()

    useEffect(()=>{
      const fetchAndSetData= async()=>{

       const comment=await getCommentById(commentId)
       console.log(comment)
        if (comment){
          setContent(comment.content||"")
        }}
      fetchAndSetData()
    },[commentId])

    

    const handleSaveComment=async(event)=>{
        event.preventDefault()
        
        const editedComment={
          id:parseInt(commentId),
          post_id: postId,
          author_id: token,
          content: content
       
    }
    console.log(editedComment)
    updateComment(editedComment.id, editedComment).then(()=>{
        navigate(`/allPosts/${Number(postId)}`)
    
    })
    
  }
    return (
        <section className="columns is-centered">
          <form className="column is-two-thirds" onSubmit={handleSaveComment}>
          <h1 className="title">Edit Comment</h1>
            
            <div className="field">
              <label className="label">Content</label>
              <div className="control">
               <textarea 
                className="textarea" 
                value={content}  
                style={{width:'100%' , height: '100px'}}
                onChange={(e)=>setContent(e.target.value)}/> 
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