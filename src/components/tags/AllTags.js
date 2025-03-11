import { useEffect, useRef, useState } from "react";
import { getAllTags } from "../../services/tagServices";
import { CreateTag } from "./CreateTag.js";

export const AllTags = () => {
  const [allTags, setAllTags] = useState([]);
  const [refreshedTags, setRefreshedTags] = useState(false);

  // const fillAllTags = () => {
  //   pass
  // }

  useEffect(() => {
    getAllTags().then((data) => setAllTags(data));
    console.log(allTags);
  }, [refreshedTags, allTags.length]);

  return (
    <div className="container">
      <div className="columns mt-4 mb-2">
        <div className="column">
          <h2 className="title is-4">All Tags</h2>
        </div>
        <div className="column is-narrow">
          <CreateTag
            setRefreshedTags={setRefreshedTags}
            refreshedTags={refreshedTags}
          />
        </div>
      </div>

      {allTags.length === 0 ? (
        <div className="notification is-light">
          <p>No tags found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Tag name</th>
                <th className="has-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.label}</td>
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
