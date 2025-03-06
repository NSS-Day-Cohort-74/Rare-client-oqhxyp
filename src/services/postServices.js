export const getPostById = (postId) => {
    return fetch (`http://localhost:8088/posts/${postId}`).then(res => res.json())
}