import { useEffect, useState } from "react";
import { getSubscriptionPosts } from "../../services/subscriptionServices";

export const FavoritePosts = ({token}) => {
  const [filteredPosts, setFilteredPosts] = useState([])

  const fetchSubscriptionPosts = () => {
    getSubscriptionPosts(Number(token)).then(post => {
      setFilteredPosts(post)
    })
  }

  useEffect(()=> {
    fetchSubscriptionPosts()
  },[])
  
  if(filteredPosts.length === 0){
    return <>
      <div className="notification is-info is-light">
        <p className="has-text-centered">Subscribe to authors to curate your personal homepage!</p>
      </div>
    </>
  }
  else{
    return <>
      <h2 className="title is-4 mb-4">Your Subscribed Posts</h2>
      {filteredPosts.map(post => {
        return (
          <div className="box mb-4" key={post.post_id}>
            <article>
              <section className="mb-4">
                <div className="field">
                  <label className="label">Title:</label>
                  <div className="control">
                    <p className="subtitle is-6">{post.title}</p> 
                  </div>
                </div>

                <div className="field">
                  <label className="label">Publication Date:</label>
                  <div className="control">
                    <span className="has-text-grey">{post.publication_date}</span>
                  </div>
                </div>
              </section>

              <section className="mb-4">
                <div style={{ maxWidth: "400px", maxHeight: "200px", overflow: "hidden" }}>
                  <img 
                    src={post.image_url} 
                    alt="Post Cover" 
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
              </section>

              <section>
                <div className="field">
                  <label className="label">Author:</label>
                  <div className="control">
                    <span className="has-text-weight-semibold">{post.first_name} {post.last_name}</span>
                  </div>
                </div>
              </section>
              
              <div className="buttons mt-4">
                <a href={`/posts/${post.post_id}`} className="button is-link is-light">Read More</a>
              </div>
            </article>
          </div>
        )
      })}
    </>
  }
};