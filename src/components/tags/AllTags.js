import { useEffect, useState } from "react";
import { getAllTags } from "../../services/tagsService";

export const AllTags = () => {
  const [allTags, setAllTags] = useState([])

  const fillAllTags = () => {
    getAllTags()
    .then((data) => setAllTags(data))
    console.log(allTags)
  }

  useEffect(() => {
    fillAllTags()
  },[])

    return (
        <>

      <div>AllTags</div>
          {allTags.map(t => ( 
            <div key={t.id}> {t.label} </div>
          ))}
        </>
    );
  };