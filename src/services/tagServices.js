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

/*def create_posttag(posttag_data):
    with sqlite3.connect("./db.sqlite3") as conn:
        conn.row_factory = sqlite3.Row
        db_cursor = conn.cursor()

        db_cursor.execute("""
        INSERT INTO PostTags (post_id, tag_id)
            VALUES (?, ?)
        """,
        (posttag_data["post_id"],posttag_data["tag_id"]),)
        return {"message": "created post tags successfully!"}

        elif url["requested_resource"] == "posttags":
          response_body = create_posttag(data)
          if response_body:                                   
            return self.response(json.dumps(response_body), status.HTTP_201_SUCCESS_CREATED.value)
          return self.response("Resource not found", status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value) */