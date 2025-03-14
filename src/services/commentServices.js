export const createNewComment =async(newCommentObj)=>{
    const response=await fetch("http://localhost:8088/comments",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(newCommentObj)
    })
    return response.json()
}

export const getComments = async () => {
    return fetch(`http://localhost:8088/comments?_expand=post&_expand=author`).then((res) =>
      res.json()
    )
  }

  export const deleteComment=(commentId)=>{
    return fetch(`http://localhost:8088/comments/${commentId}`, {
      method: "DELETE",})
  }

  export const getCommentById = (commentId) => {
    return fetch (`http://localhost:8088/comments/${commentId}`).then(res => res.json())
}

export const updateComment = async (commentId, editedComment) => {
  const response = await fetch(`http://localhost:8088/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedComment),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};