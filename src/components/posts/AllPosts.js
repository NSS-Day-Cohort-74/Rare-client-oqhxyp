import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
export const AllPosts = () => {
  const [ allPosts, setAllPosts] = useState([]);
  const [ allCategories, setAllCategories] = useState([])
  const [ selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [ filteredPostsByCategory, setFilteredPostsByCategory] = useState([])

  const fetchAllPosts = async () => {
    try {
      const postArray = await getPosts();
      setAllPosts(postArray);
    } catch (error) {
      console.error("Error fetching allPosts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (selectedCategoryId == 0) {
        setFilteredPostsByCategory(allPosts);
    }
    else {
        setFilteredPostsByCategory(allPosts.filter(p => p.category_id == selectedCategoryId))

    }
    
  },[selectedCategoryId])

  const fetchAllCategories = async () => {
    try {
      const categoriesArray = await getCategories();
      setAllCategories(categoriesArray);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

 

  return (
    <>
    <label>Filter By Category {'\t'}   

      <select defaultValue="0" onChange={(event) => setSelectedCategoryId(parseInt(event.target.value))
}>
        <option value="0">All Categories</option>
        {allCategories.map(c => <option key={c.id} value={c.id}> {c.label}</option>)}
      </select>
        </label>
      <div className="all-post-container">
        <h2>All Posts</h2>

        {filteredPostsByCategory.length === 0 ? (
            <p>No posts found.</p>
        ) : (
            <ul className="posts-list">
            {filteredPostsByCategory.map((post) => (
              <li key={post.id}>
                <Link to={`/allPosts/${post.id}`}>{post.title}</Link>
                <div className="card-info">
                  <p>{post.content}</p>
                  <p>{post.publication_date}</p>
                  <p>{post.categories.label}</p>
                  <p>{post.user.first_name}</p>
                  <p>{post.user.last_name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
