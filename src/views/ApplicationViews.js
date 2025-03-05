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
            </Route>
            <Route path="myPosts" element={<UserPosts token={token}/>}/>
            <Route path="categoryManager" element={<AllCategories token={token}/>}/>
            <Route path="tagManager" element={<AllTags token={token}/>}/> 
       
      </Route>
    </Routes>
  </>
}
