export const getPostById = (postId) => {
    return fetch (`http://localhost:8088/posts/${postId}`).then(res => res.json())
}
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