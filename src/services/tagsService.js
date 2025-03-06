
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
    console.log(tag)
    fetch("http://localhost:8088/tags", post)
    
}