import { useEffect, useRef, useState } from "react";
import { getTags } from "../../services/tagServices";
import { createNewPost } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import { HumanDate } from "../utils/HumanDate";
import { useNavigate } from "react-router-dom";

export const NewPost = ({token}) => {
    const title=useRef()
    const imageUrl=useRef()
    const content=useRef()
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [categories, setCategories]=useState([])
    const [tags, setTags]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        getCategories().then((categoriesArray)=>{
            setCategories(categoriesArray)
        });
        getTags().then((tagsArray)=>{
            setTags(tagsArray)
        });
    },[])

    const handleTagsChange = (e) => {
      const foundTag = selectedTags.find(selectedTags => {
          return selectedTags.id === Number(e.target.id)
      })
      if(foundTag){
        console.log(foundTag)
        const newCurrentTags = selectedTags.filter(selectedTag => {
          return selectedTag.id !== foundTag.id
        })
        setSelectedTags(newCurrentTags)
      }else{
        const newTag = {
          tagId:Number(e.target.id)
        }
        const addedTags = [...selectedTags, newTag]
        setSelectedTags(addedTags)
      }
    }

    const handleSavePost=async(event)=>{
        event.preventDefault()

        const date= new Date()
        const editedDate=HumanDate(date)
        
        const createdPost={
          user_id: token,
          category_id: selectedCategory,
          title: title.current.value,
          publication_date: editedDate,
          image_url: imageUrl.current.value,
          content: content.current.value,
          approved: 1
    }
    console.log(date)
    const NewPost=await createNewPost(createdPost)
    if (selectedTags.length > 0 && NewPost.id){
      const tagsInPostArray = selectedCategory.map((tag) =>({
        post_id: NewPost.id,
        tag_id: tag.tagId,
      }))
      await createTagInPost(tagsInPostArray)
    }
    
  
  }
    
  console.log(selectedTags)
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
                <select className="input" onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <input className="input" type="text" ref={content} />
              </div>
            </div>

            <div className="field">
              <label className="label">Tags</label>
              <div className="control">
                   {tags.map(tag => {
                      return ( 
                        <div key={tag.id}>
                          <input
                            type="checkbox"
                            id={tag.id}
                            onChange={handleTagsChange}
                          />{tag.label}
                        </div>
                      )
                   })}
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