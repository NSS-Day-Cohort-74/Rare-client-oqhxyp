import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPosts } from "../components/posts/AllPosts.js"
import { UserPosts } from "../components/posts/UserPosts.js"
import { AllCategories } from "../components/categories/AllCategories.js"
import { AllTags } from "../components/tags/AllTags.js"
import { PostDetails } from "../components/posts/PostDetails.js"
import { FavoritePosts } from "../components/posts/FavoritePosts.js"
import { NewPost } from "../components/posts/CreatePost.js"
import { UpdatePost } from "../components/posts/UpdatePost.js"
import { AllUsers } from "../components/users/AllUsers.js"
import { UserDetails } from "../components/users/UserDetails.js"
import { NewComment } from "../components/comments/NewComment.js"
import { PostComments } from "../components/comments/PostComments.js"
import { EditComment } from "../components/comments/EditComment.js"
import { EditUserDetails } from "../components/users/EditUserDetails.js"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route path="/*" element={
        <Authorized token={token}/>}>
            <Route index element={<FavoritePosts token={token} />}/>
            <Route path="allPosts">
              <Route index element={<AllPosts token={token}/>}/>
              <Route path=":postId" element={<PostDetails token={token}/>}/>
              <Route path=":postId/newComment" element={<NewComment token={token}/>}/>
              <Route path=":postId/comments" element={<PostComments token={token}/>}/>
              <Route path=":postId/:commentId/edit" element={<EditComment token={token}/>}/>
            </Route>
            <Route path="newPost" element={<NewPost token={token}/>}/>
            <Route path="myPosts">
              <Route index element={<UserPosts token={token}/>}/>
              <Route path=":postId" element={<UpdatePost token={token}/>}/>
            </Route>
            <Route path="categoryManager" element={<AllCategories token={token}/>}/>
            <Route path="tags" element={<AllTags token={token}/>}/> 
            <Route path="users">
              <Route index element= {<AllUsers token={token}/>}/>
              <Route path=":userId" element={<UserDetails token={token}/>}/>
              <Route path=":userId/edit" element={<EditUserDetails token={token} />}/>
            </Route> 
      </Route>
    </Routes>
  </>
}
