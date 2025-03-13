import { useState, useEffect } from "react"
import { AuthorUsers } from "./AuthorUsers"
import { getUserById } from "../../services/userServices"
import { AdminUsers } from "./AdminUsers"


export const AllUsers = ({token}) => {
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
                <AdminUsers currentUser={currentUser}/>
            </>
        }
        else {
            return <>
                <AuthorUsers />
            </>
        }
    }
}