export const createNewPost =async(newPostObj)=>{
    const response=await fetch("http://localhost:8088/posts",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(newPostObj)
    })
    return response.json()
}

export const getPosts = async () => {
    return fetch(`http://localhost:8088/posts?_expand=categories&_expand=users`).then((res) =>
      res.json()
    )
  }


export const getPostById = (postId) => {
    return fetch (`http://localhost:8088/posts/${postId}`).then(res => res.json())
}

export const updatePost = async (postId, updatedData) => {
    const response = await fetch(`http://localhost:8088/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // return response.json();
  };

  export const deletePost=(postId)=>{
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",})
  }

  // export const deletePostTags=async(postId)=>{
  //   const response = await fetch(
  //     `http://localhost:8088/postTags?postId=${postId}`
  //   );
  //   const tagsInPostArray = await response.json(); //result is array that has objects with eventId
  
  //   for (const tag of tagsInPostArrayy) {
  //     //deleting every object in the array
  //     await fetch(`http://localhost:8088/postTags?postId=${postId}`, {
  //       method: "DELETE",
  //     });
  //   }
  // }
