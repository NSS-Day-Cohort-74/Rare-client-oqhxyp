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
      <p>Subscribe to authors to curate your personal homepage!</p>
    </>
  }
  else{
    return <>
      {filteredPosts.map(post => {
        return (
        <article key={post.post_id}>
          <section>
          <div>
              {post.title}
          </div>
          <div>
            Publication Date{post.publication_date}
          </div>
          </section>
          <section>
          <img src={post.image_url} alt="Post Cover" />
          </section>
          <section>
          <div>
            Author: {post.first_name} {post.last_name}
          </div>
          </section>
      </article>
      )
      })}
  </>
  }
  };