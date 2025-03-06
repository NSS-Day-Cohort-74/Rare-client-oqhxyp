import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postServices";

export const PostDetails = ({token}) => {
  const [post, setPost] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [category, setCategory] = useState([])
  const [tags, setTags] = useState([])
  const [reactions, setReactions] = useState([])
  const {postId} = useParams()

  const fetchAndSetPostData = () => {
    getPostById(postId).then((postDataArray) => {
      setPost(postDataArray)
    })
  }

  useEffect(() => {
    fetchAndSetPostData()
  },[current])

    return (
        <>

      <div>Post Details</div>
        
        </>
    );
  };