import { useEffect, useRef, useState } from "react";
import { createTagInPost, getTags } from "../../services/tagServices";
import { createNewPost } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userServices";

export const NewPost = ({token}) => {
    const title=useRef()
    const imageUrl=useRef()
    const content=useRef()
    const [selectedCategory, setSelectedCategory] = useState({})
    const [selectedTags, setSelectedTags] = useState([])
    const [categories, setCategories]=useState([])
    const [userDetails, setUserDetails] = useState()
    const [tags, setTags]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        getCategories().then((categoriesArray)=>{
            setCategories(categoriesArray)
        });
        getTags().then((tagsArray)=>{
            setTags(tagsArray)
        });
        getUserById(Number(token)).then(user => {
                    setUserDetails(user)
                })
    },[])
    console.log(userDetails)

    const handleTagsChange = (e) => {
      const foundTag = selectedTags.find(selectedTag => {
        return selectedTag.tag_id === Number(e.target.id)
      })
      if(foundTag){
        console.log("Found Tags:" + foundTag)
        const newCurrentTag = selectedTags.filter(selectedTag => {
          return selectedTag.id !== foundTag.id
        })
        setSelectedTags(newCurrentTag)
      }else{
        const newTag = {
          tag_id:Number(e.target.id)
        }
        const addedTags = [...selectedTags, newTag]
        setSelectedTags(addedTags)
      }
    }

    const handleSavePost=async(event)=>{
        event.preventDefault()
        
        const createdPost={
          user_id: token,
          category_id: selectedCategory,
          title: title.current.value,
          publication_date: new Date(),
          image_url: imageUrl.current.value,
          content: content.current.value,
    }

    if (userDetails.is_admin ===1){
      createdPost.approved=1}
    else{createdPost.approved=0}
    
    console.log(createdPost)
    const NewPost= await createNewPost(createdPost)
    console.log(NewPost)
    if (selectedTags.length > 0 && NewPost.id){
      const tagsInPostArray = selectedTags.map((tag) =>({
        post_id: NewPost.id,
        tag_id: tag.tag_id,
      }))
      await createTagInPost(tagsInPostArray)
    }navigate(`/myPosts`)
  }
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
                    <option value="Select Category">Select Category</option>
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
                <textarea className="textarea" ref={content}  style={{width:'100%' , height: '100px'}}/>
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