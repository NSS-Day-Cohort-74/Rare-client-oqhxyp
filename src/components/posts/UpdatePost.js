import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import { createTagInPost, getPostTags, getTags, updatePostTags } from "../../services/tagServices";

export const UpdatePost = ({token}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                console.log("Fetching post with ID:", postId);
                
            
                const postData = await getPostById(postId);
                console.log("Post data received:", postData);
                const singlePost = postData;

                console.log("post", singlePost)
                
              
                if (singlePost) {
                    setTitle(singlePost.title || "");
                    setImageUrl(singlePost.image_url || "");
                    setContent(singlePost.content || "");
                    setSelectedCategory(singlePost.category_id.toString());
                }
                
    
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
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [postId]);

    const handleSavePost = async (event) => {
        event.preventDefault();
       
        const updatedPost = {
            id: parseInt(postId),
            user_id: token,
            category_id: parseInt(selectedCategory),
            title: title,
            publication_date: new Date().toISOString(),
            image_url: imageUrl,
            content: content,
            approved: 1
        };
    
        console.log("Sending update with data:", updatedPost);
        
        try {
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
        } catch (error) {
            console.error("Error updating post:", error);
        }
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
    
       
        setSelectedTags(newSelectedTags);
        
        try {
            const tagIds = newSelectedTags.map(tag => tag.tag_id);
            await updatePostTags(postId, tagIds);
            
        } catch (error) {
            setSelectedTags(selectedTags);
            console.error('Failed to update tags:', error);
        }
    };

    if (isLoading) {
        return <div className="has-text-centered p-5">Loading post data...</div>;
    }

    return (
        <>
            <section className="columns is-centered">
                <form className="column is-two-thirds" onSubmit={handleSavePost}>
                    <h1 className="title">Update Post</h1>
                    
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
            
                    <div className="field">
                        <label className="label">Image Url</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
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
                            <textarea 
                                className="textarea" 
                                rows="10"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
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