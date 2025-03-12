import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPostsWithTagsAttatched } from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import { getAllUsers } from "../../services/userServices";
import { getAllTags } from "../../services/tagServices";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [filteredPostsByCategory, setFilteredPostsByCategory] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(0);
  const [filteredPostsByAuthor, setFilteredPostsByAuthor] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarInput = useRef("");
  const [allTags, setAllTags] = useState([]); // got all tags
  
  const [selectedTagId, setSelectedTagId] = useState(0); // selected tag id
 

  const fetchAllCategories = async () => {
    try {
      const categoriesArray = await getCategories();
      setAllCategories(categoriesArray);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  
  const fetchAllTags = () => {
    getAllTags().then((t) => setAllTags(t));
  };

  const fetchAllAuthors = async () => {
    try {
      const authorArray = await getAllUsers();
      setAllAuthors(authorArray);
    } catch (error) {
      console.error("Error fetching allAuthors:", error);
    }
  };
  const fetchAllPostsWithTagsAttatched = () => {
    getPostsWithTagsAttatched().then((p) => setAllPosts(p))
  };

  useEffect(() => {
  
    fetchAllCategories();
    fetchAllAuthors();
    
    fetchAllTags();
    fetchAllPostsWithTagsAttatched()
  }, []);

  useEffect(() => {
    if (selectedCategoryId == 0) {
      setFilteredPostsByCategory(allPosts);
    } else {
      setFilteredPostsByCategory(
        allPosts.filter((p) => p.category_id == selectedCategoryId)
      );
    }
  }, [selectedCategoryId]);

  
  useEffect(() => {
      if (selectedAuthorId == 0) {
          setFilteredPostsByAuthor(allPosts);
        } else {
            setFilteredPostsByAuthor(
                allPosts.filter((p) => p.user_id == selectedAuthorId)
            );
        }
    }, [selectedAuthorId]);
    
    useEffect(() => {
        setFilteredPosts(allPosts);
    }, [allPosts]);
    


    
   
    
  // you can filter by category AND by author!!!
  useEffect(() => {
    
    let filtered = allPosts;
     if (selectedAuthorId > 0 && selectedCategoryId > 0) {
      filtered = allPosts.filter(
        (p) =>
          p.user_id == selectedAuthorId && p.category_id == selectedCategoryId
      );
    } else if (selectedAuthorId > 0 && selectedCategoryId == 0) {
      filtered = filteredPostsByAuthor;
    } else if (selectedAuthorId == 0 && selectedCategoryId > 0) {
      filtered = filteredPostsByCategory;
    } else if (
      searchTerm.length == 0 &&
      selectedAuthorId == 0 &&
      selectedCategoryId == 0
    ) {
      filtered = allPosts;
    }

    if (selectedTagId == 0) {
      setFilteredPosts(
          filtered.filter(p =>
              p.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  } else {
      setFilteredPosts(
          filtered.filter(p =>
              p.tags.some(tag => tag.id === selectedTagId) &&
              p.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  
}
  }, [filteredPostsByAuthor, filteredPostsByCategory, searchTerm.length, selectedTagId]);



  return (
    <>
      <label>
        Filter By Category {"\t"}
        <select
          defaultValue="0"
          onChange={(event) =>
            setSelectedCategoryId(parseInt(event.target.value))
          }
        >
          <option value="0">All Categories</option>
          {allCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {" "}
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter By Author {"\t"}
        <select
          defaultValue="0"
          onChange={(event) =>
            setSelectedAuthorId(parseInt(event.target.value))
          }
        >
          <option value="0">All Authors</option>
          {allAuthors.map((c) => (
            <option key={c.id} value={c.id}>
              {" "}
              {c.first_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter By Tag {"\t"}
        <select
          defaultValue="0"
          onChange={(event) => setSelectedTagId(parseInt(event.target.value))}
        >
          <option value="0">All Tags</option>
          {allTags.map((t) => (
            <option key={t.id} value={t.id}>
              {" "}
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {"\t"}
        <input ref={searchBarInput} type="text" placeholder="Search By Title" />
      </label>
      <button
        onClick={() => {
          setSearchTerm(searchBarInput.current.value);
        }}
      >
        enter
      </button>
      <div className="all-post-container">
        <h2>All Posts</h2>

        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul className="posts-list">
            {filteredPosts.map((p) => (
              <li key={p.id}>
                <p>--------------------------------</p>
                <Link to={`/allPosts/${p.id}`}>{p.title}</Link>
                <div className="card-info">
                  <p>{p.content}</p>
                  <p>{p.publication_date}</p>
                  <p>{p.categories.label}</p>
                  <p>{p.user.first_name}</p>
                  <p>{p.user.last_name}</p>
                  <p>=====================</p>
                  { p.tags && p.tags.map(t => (
                    <p key={t.id}>{t.label}</p>
                  ))
                  }
                  <p>--------------------------------</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
