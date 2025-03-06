export const getPosts = async () => {
    return fetch(`http://localhost:8088/posts?_expand=categories&_expand=users`).then((res) =>
      res.json()
    )
  }
