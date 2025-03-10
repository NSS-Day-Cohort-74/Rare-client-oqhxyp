import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, getPosts, updatePost } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import { createTagInPost, getPostTags, getTags, updatePostTags } from "../../services/tagServices";

export const UpdatePost = ({token}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const title = useRef();
    const imageUrl = useRef();
    const content = useRef();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching post with ID:", postId);
            
            const postData = await getPostById(postId);
            console.log("Post data received:", postData);
            const singlePost = postData[0];
            setPost(singlePost);
            
            const categoriesArray = await getCategories();
            setCategories(categoriesArray);
            
            const tagsArray = await getTags();
            setTags(tagsArray);
            
            const postTags = await getPostTags(postId);
            console.log("Post tags:", postTags);
            const formattedTags = postTags.map(tag => ({
                tag_id: tag.id
            }));
            setSelectedTags(formattedTags);
            
            if (singlePost) {
                console.log("Setting category to:", singlePost.category_id);
                setSelectedCategory(singlePost.category_id.toString());
            }
        };
        
        fetchData();
    }, [postId]);

    useEffect(() => {
        if (post) {
            console.log("Setting form values from post:", post);
            if (title.current) title.current.value = post.title || "";
            if (imageUrl.current) imageUrl.current.value = post.image_url || "";
            if (content.current) content.current.value = post.content || "";
        }
    }, [post]);

    useEffect(() => {
        const fetchPost = async () => {
          if (postId) {
            const fetchedPost = await getPosts(postId);
            setPost(fetchedPost);
          }
        };
        
        fetchPost();
      }, [postId]);

    const handleSavePost = async (event) => {
        event.preventDefault();
        
        // Check if post is loaded
        if (!post) {
            console.error("Post data not loaded yet");
            return; 
        }
        
        const updatedPost = {
            id: parseInt(postId),
            user_id: token,
            category_id: parseInt(selectedCategory),
            title: title.current.value,
            publication_date: post?.publication_date || new Date().toISOString(),
            image_url: imageUrl.current.value,
            content: content.current.value,
            approved: post?.approved || 1
        };
    
        console.log("Sending update with data:", updatedPost);
        
        
        const response = await updatePost(updatedPost.id, updatedPost);
        console.log("Update response:", response);
        
        if (selectedTags.length > 0) {
            const tagsInPostArray = selectedTags.map((tag) => ({
                post_id: parseInt(postId),
                tag_id: tag.tag_id,
            }));
    
            console.log("Updating tags:", tagsInPostArray);
            await createTagInPost(tagsInPostArray);
        }
        
        navigate(`/myPosts`);
    };

    const handleTagsChange = async (e) => {
        const tagId = Number(e.target.id);
        console.log("Tag clicked:", tagId);
    
        let newSelectedTags;
        
        const foundTag = selectedTags.find(selectedTag => selectedTag.tag_id === tagId);
        
        if (foundTag) {
            console.log("Removing tag:", tagId);
            newSelectedTags = selectedTags.filter(selectedTag => selectedTag.tag_id !== tagId);
        } else {
            console.log("Adding tag:", tagId);
            const newTag = { tag_id: tagId };
            newSelectedTags = [...selectedTags, newTag];
        }
    
        // Update the state first for immediate UI response
        setSelectedTags(newSelectedTags);
        
        try {
            // Extract just the tag IDs to send to the service
            const tagIds = newSelectedTags.map(tag => tag.tag_id);
            
            // Call the updatePostTags service
            await updatePostTags(postId, tagIds);
            
            // Success - no need to do anything as state is already updated
        } catch (error) {
            // Handle the error - revert the UI change
            setSelectedTags(selectedTags);
            // Show error notification to the user
            console.error('Failed to update tags:', error);
        }
    };

    return (
        <>
            <section className="columns is-centered">
                <form className="column is-two-thirds" onSubmit={handleSavePost}>
                    <h1 className="title">Update Post</h1>
                    
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
                            <select 
                                className="input" 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
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
                            <textarea className="textarea" ref={content} rows="10"></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Tags</label>
                        <div className="control">
                            {tags.map(tag => {
                        
                                const isChecked = selectedTags.some(selectedTag => 
                                    selectedTag.tag_id === tag.id
                                );

                                return ( 
                                    <div key={tag.id} className="checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                id={tag.id}
                                                checked={isChecked}
                                                onChange={handleTagsChange}
                                            /> {tag.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" type="submit">Update Post</button>
                        </div>
                        <div className="control">
                            <button 
                                type="button"
                                className="button is-link is-light" 
                                onClick={() => navigate('/myPosts')}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};