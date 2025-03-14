import { useState, useEffect } from "react"
 import { getUserById } from "../../services/userServices"
import { AdminAllPosts } from "./AdminAllPosts"
import { AuthorAllPost, AuthorAllPosts } from "./AuthorAllPost"


export const AllPosts = ({token}) => {
    const [currentUser, setCurrentUser] = useState()

   const fetchCurrentUser = () => {
         getUserById(Number(token)).then(user => (
             setCurrentUser(user)
         ))
    }
    useEffect(() => {
        fetchCurrentUser()
    },[])

    if (currentUser){
        if (currentUser.is_admin === 1){
            return <>
                <AdminAllPosts currentUser={currentUser}/>
            </>
        }
        else {
            return <>
                <AuthorAllPost />
            </>
        }
    }
}

