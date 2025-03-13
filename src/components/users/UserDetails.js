import { useEffect, useState } from "react"
import { AuthorUserDetails } from "./authorUserDetails"
import { getUserById } from "../../services/userServices"
import { useParams } from "react-router-dom"
import Logo from "../nav/rare.jpeg"
import { createSubscriptionEntry, getSubscriptions, deleteSubscription } from "../../services/subscriptionServices"

export const UserDetails = ({token}) => {
    const [currentUser, setCurrentUser] = useState()
    const {userId} = useParams()

    const fetchData = () => {
        getUserById(Number(token)).then(user => {
            setCurrentUser(user)
        })
    }

    useEffect(() => {
        fetchData()
    },[])

    if(currentUser){
        return <>
            <AuthorUserDetails userId={userId}/>
        </>
    }
}