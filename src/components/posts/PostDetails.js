
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postServices";
import { HumanDate } from "../utils/HumanDate";

export const PostDetails = ({token}) => {
  const [post, setPost] = useState()
  const [currentUser, setCurrentUser] = useState()
  const {postId} = useParams()
  const navigate=useNavigate()

  const fetchAndSetPostData = () => {
    getPostById(Number(postId)).then((postDataArray) => {
      setPost(postDataArray)
    })
  }

  useEffect(() => {
    fetchAndSetPostData()
  },[])

  if(postId && post){
    return <>
      <section>
        <h1>{post.title}</h1>
        <section>
            <div>
              Delete and Settings Placeholder
            </div>
            <div>
              {post.categories.label}
            </div>
        </section>
        <img src={post.image_url} alt="description here"></img>
        <section>
          <div>
             Published on {post.publication_date} by {post.user.first_name} {post.user.last_name}
          </div>
          <div>
            <Link to={`/allPosts/${post.id}/newComment`}><button>Add Comment</button></Link>
            <Link to={`/allPosts/${post.id}/comments`}><button>View Comments</button></Link>
          </div>
        </section>
        <section>
          {post.content}
        </section>
      </section>
    </>
  

  }}