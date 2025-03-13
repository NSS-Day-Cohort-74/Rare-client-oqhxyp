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

  console.log(filteredPosts)
  
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
      <div className="columns is-centered">
        <div className="column is-10">
      {filteredPosts.map(post => {
        return (
          <div className="box mb-3 py-3 px-4" key={post.post_id}>
            <article>
            <section className="mb-4">
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <div className="field">
                          <label className="label">Title:</label>
                          <div className="control">
                            <p className="subtitle is-6">{post.title}</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="level-right">
                      <div className="level-item">
                        <div className="field">
                          <label className="label">Publication Date:</label>
                          <div className="control">
                            <span className="has-text-grey">{post.publication_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              <section className="mb-4 justify-center">
                <div style={{ 
                  maxWidth: "400px", 
                  maxHeight: "200px", 
                  overflow: "hidden", 
                  margin: "0 auto"
                  }}>
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
              
              <div className="buttons mt-4 is-flex is-justify-content-flex-end mt-auto">
                <div className="level-right">
                  <div className="level-item">
                <a href={`/allPosts/${post.post_id}`} className="button is-link is-light">Read More</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      })}

        </div>
      </div>
    </>
  }
};