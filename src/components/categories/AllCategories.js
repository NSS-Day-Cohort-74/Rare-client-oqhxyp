import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesService";

export const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

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
    <div className="all-categories-container">
      <h2>All Categories</h2>
      
      {allCategories.length === 0 ? (
        <p>No categories.</p>
      ) : (
        <ul className="posts-list">
          {allCategories.map((category) => (
            <li key={category.id}>
              <p>{category.label}</p>
               <button type="button">
                  DELETE
                </button>
                <button type="button">
                  EDIT
                </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};