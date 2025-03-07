
export const getCategories = async () => {
    return fetch(`http://localhost:8088/categories`).then((res) =>
      res.json()
    )
  }
  export const postCategory = (cat) => {
    const post = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    }
    
    fetch("http://localhost:8088/categories", post)
    
}