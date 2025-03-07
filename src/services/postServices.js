
export const getPosts = async () => {
    return fetch(`http://localhost:8088/posts?_expand=categories&_expand=users`).then((res) =>
      res.json()
    )
  }
  
  export const getPostById = (postId) => {
      return fetch (`http://localhost:8088/posts/${postId}`).then(res => res.json())
    }
    
    
    export const getMyPosts = async (userId) => {
        return fetch(`http://localhost:8088/posts?user_id=${userId}&_expand=categories&_expand=users`).then((res) =>
          res.json()
        )
      }