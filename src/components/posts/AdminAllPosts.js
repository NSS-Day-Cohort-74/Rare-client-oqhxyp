import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPostsWithTagsAttatched,
  updatePost,
} from "../../services/postServices";
import { getCategories } from "../../services/categoriesService";
import {
  activateUserById,
  getAllUsers,
  updateUserById,
} from "../../services/userServices";
import { getAllTags } from "../../services/tagServices";
import { HumanDate } from "../utils/HumanDate";

export const AdminAllPosts = () => {
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
  const [isLoading, setIsLoading] = useState(true);
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
    getPostsWithTagsAttatched().then((p) => setAllPosts(p));
  };

  const togglePostApproval = async (postId, currentStatus) => {
    try {
      const postToUpdate = allPosts.find((post) => post.id === postId);

      if (!postToUpdate) {
        console.error(`Post with ID ${postId} not found`);
        return;
      }

      const updatedPostData = {
        ...postToUpdate,
        approved: !currentStatus,
      };

      const updatedPosts = allPosts.map((post) => {
        if (post.id === postId) {
          return updatedPostData;
        }
        return post;
      });

      setAllPosts(updatedPosts);

      await updatePost(postId, updatedPostData);

      
    } catch (error) {
      console.error("Error updating post approval status:", error);

      const revertedPosts = allPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, approved: currentStatus };
        }
        return post;
      });

      setAllPosts(revertedPosts);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllAuthors();
    fetchAllTags();
    fetchAllPostsWithTagsAttatched();
  }, []);

  useEffect(() => {
    if (selectedCategoryId == 0) {
      setFilteredPostsByCategory(allPosts);
    } else {
      setFilteredPostsByCategory(
        allPosts.filter((p) => p.category_id == selectedCategoryId)
      );
    }
  }, [selectedCategoryId, allPosts]);

  useEffect(() => {
    if (selectedAuthorId == 0) {
      setFilteredPostsByAuthor(allPosts);
    } else {
      setFilteredPostsByAuthor(
        allPosts.filter((p) => p.user_id == selectedAuthorId)
      );
    }
  }, [selectedAuthorId, allPosts]);

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
        filtered.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPosts(
        filtered.filter(
          (p) =>
            p.tags.some((tag) => tag.id === selectedTagId) &&
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [
    filteredPostsByAuthor,
    filteredPostsByCategory,
    searchTerm,
    selectedTagId,
    allPosts,
  ]);

  return (
    <>
      <section className="box ">
        <div className="select has-text-centered is-flex is-justify-content-space-evenly dropdown is-active is-light is-right is-medium mb-6 ">
          <label className="label">
            <label className="label m-auto">📂 {"\t"}</label>
            <select
              className="select is-medium"
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
            <label className="label m-auto">✍️ {"\t"}</label>
            <select
              className="select is-medium"
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
            <label className="label m-auto">🔖 {"\t"}</label>
            <select
              className="select is-medium"
              defaultValue="0"
              onChange={(event) =>
                setSelectedTagId(parseInt(event.target.value))
              }
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="level-left">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <label className="label">Search:</label>
                  <label>
                    {"\t"}
                    <input
                      className="input is-rounded is-small"
                      ref={searchBarInput}
                      type="text"
                      placeholder="Search By Title"
                    />
                  </label>
                  <button
                    className="button is-successful is-rounded is-small"
                    onClick={() => {
                      setSearchTerm(searchBarInput.current.value);
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="title has-text-centered mb-6">All Posts</h1>

          {!isLoading ? (
            <div className="has-text-centered">
              <button className="button is-loading is-large">Loading</button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="notification is-warning is-light">
              <p className="has-text-centered">No posts found.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Content</th>
                    <th>Tags</th>
                    <th>Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <Link
                          to={`/allPosts/${post.id}`}
                          className="has-text-weight-bold has-text-primary"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td>
                        <span className="is-flex is-flex-direction-column">
                          {post.user.first_name} {post.user.last_name}
                        </span>
                      </td>
                      <td>
                        <time dateTime={post.publication_date}>
                          {
                            <HumanDate
                              date={new Date(
                                post.publication_date
                              ).toLocaleDateString()}
                            />
                          }
                        </time>
                      </td>
                      <td>
                        <span className="tag is-primary is-light">
                          {post.categories.label}
                        </span>
                      </td>
                      <td>
                        <p className="content is-small has-text-grey">
                          {post.content.length > 100
                            ? `${post.content.substring(0, 100)}...`
                            : post.content}
                        </p>
                      </td>
                      <td>
                        {post.tags &&
                          post.tags.map((t, i) => (
                            <span key={t.id}>
                              {t.label}
                              {i < post.tags.length - 1 ? ", " : ""}
                            </span>
                          ))}
                      </td>
                      <td>
                        <div className="field mx-auto has-text-centered is-flex is-flex-direction-column">
                          <div className="control">
                            <label className="button has-background-light is-clickable is-rounded">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={Boolean(post.approved)}
                                onChange={() =>
                                  togglePostApproval(post.id, post.approved)
                                }
                              />{" "}
                              Active
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
