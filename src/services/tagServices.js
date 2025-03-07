export const getTags = () => {
    return fetch("http://localhost:8088/tags").then((res) => res.json());
  };

export const createTagInPost = async (array) =>{
  for (const tag of array){
    const newTagEntry={
      post_id: tag.post_id,
      tag_id: tag.tag_id,
    }
    await fetch(`http://localhost:8088/posttags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTagEntry),
    });
  }
};
