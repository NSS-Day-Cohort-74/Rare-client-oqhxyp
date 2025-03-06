export const getCategories = async () => {
    return fetch(`http://localhost:8088/categories`).then((res) =>
      res.json()
    )
  }
