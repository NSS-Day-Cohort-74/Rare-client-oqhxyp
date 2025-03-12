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

export const getAllTags = () => {
  return fetch("http://localhost:8088/tags").then((res) => res.json())
}

export const postTag = (tag) => {
  const post = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
  }
  
  fetch("http://localhost:8088/tags", post)
  
}

export const getAllPostWithTags = () => {
  return fetch("http://localhost:8088/posttags?_expand=tag&_expand=post&_expand=user&_expand=category").then(res => res.json())
}