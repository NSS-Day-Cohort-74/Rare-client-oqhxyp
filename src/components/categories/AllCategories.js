import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesService";
import { CreateCategory } from "./CreateCategory";

export const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [refreshedCats, setRefreshedCats] = useState(false)

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
  }, [refreshedCats]);

  return (
    <div className="container">
      <div className="columns mt-4 mb-2">
        <div className="column">
          <h2 className="title is-4">All Categories</h2>
        </div>
        <div className="column is-narrow">
          <CreateCategory setRefreshedCats={setRefreshedCats} refreshedCats={refreshedCats} />
        </div>
      </div>
      
      {allCategories.length === 0 ? (
        <div className="notification is-light">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Category Name</th>
                <th className="has-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.label}</td>
                  <td className="has-text-right">
                    <div className="buttons is-right">
                      <button className="button is-small is-warning">
                        Edit
                      </button>
                      <button className="button is-small is-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};