import { useEffect, useRef, useState } from "react";
import { getAllTags } from "../../services/tagServices";
import { CreateTag } from "./CreateTag.js"

export const AllTags = () => {
  const [allTags, setAllTags] = useState([])
  const [refreshedTags, setRefreshedTags] = useState(false)

  // const fillAllTags = () => {
  //   pass
  // }
  
  useEffect(() => {
    getAllTags()
    .then((data) => setAllTags(data))
    console.log(allTags)
    
    
  },[refreshedTags])

    return (
        <>

      <div>AllTags</div>
          {allTags.map(t => ( 
            <div key={t.id}> {t.label} </div>
          ))}

          <div> {<CreateTag setRefreshedTags={setRefreshedTags} refreshedTags={refreshedTags}/>} </div>
        </>
    );
  };