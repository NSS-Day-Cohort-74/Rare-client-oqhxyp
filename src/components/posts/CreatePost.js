import { useEffect, useRef, useState } from "react";

import { getTags } from "../../services/tagServices";
import { createNewPost } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";

export const NewPost = ({token}) => {
    const title=useRef()
    const imageUrl=useRef()
    const content=useRef()
    const [categories, setCategories]=useState([])
    const [tags, setTags]=useState([])

    useEffect(()=>{
        getCategories().then((categoriesArray)=>{
            setCategories(categoriesArray)
        });
        getTags().then((tagsArray)=>{
            setTags(tagsArray)
        });
    },[])

    const handleSavePost=async(event)=>{
        event.preventDefault()
        const createdPost={
    }
    
    createNewPost(createdPost)}


    return (
        <section className="columns is-centered">
          <form className="column is-two-thirds" onSubmit={handleSavePost}>
          <h1 className="title">Create New Post</h1>
            
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" ref={title} />
              </div>
            </div>
    
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input className="input" type="text" ref={imageUrl} />
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input className="input" type="text" ref={content} />
              </div>
            </div>

            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <input className="input" type="text" ref={content} />
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