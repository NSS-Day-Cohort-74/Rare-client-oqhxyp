import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../services/userServices"
import Logo from "../nav/rare.jpeg"
import { createSubscriptionEntry, getSubscriptions,deleteSubscription } from "../../services/subscriptionServices"

export const AuthorUserDetails = ({token, userId}) => {
    const [userDetails, setUserDetails] = useState()
    const [subscriptions, setSubscriptions] = useState([])
    const navigate = useNavigate()

    const fetchUserDetails = () => {
        getUserById(Number(userId)).then(user => {
            setUserDetails(user)
        })
        getSubscriptions().then(subscription => {
            setSubscriptions(subscription)
        })
    }

    useEffect(() => {
        fetchUserDetails()
    },[])

    useEffect(() => {
        getSubscriptions().then(subscription => {
            setSubscriptions(subscription)            
        })
    },[subscriptions])

    //evaluates user length and if it is greater than 0, it has found that the current user subscribed to this author
    const didCurrentUserSubscribe = () => {
        if (subscriptions) {
            const userSubscribedToAuthor = subscriptions.find((userSubscription) => userSubscription.follower_id === Number(token) && userSubscription.author_id === userDetails.id)
            return userSubscribedToAuthor
        }
    }

    const handleSubscription = async(event) => {
        event.preventDefault()
        const subscriptionEntry = {
            follower_id: Number(token),
            author_id: userDetails.id,
            created_on: new Date()
        }
        createSubscriptionEntry(subscriptionEntry)
        navigate("/")
    }
    
    const handleUnsubscribe = (event) => {
        event.preventDefault()
        const findUserSubscription = subscriptions.find((subscription) => subscription.follower_id === Number(token) && subscription.author_id === userDetails.id)
        deleteSubscription(findUserSubscription.id)
    }

    if(userDetails){
        return <>
        <section>
            <div>
                <div>
                    <img src={userDetails?.profile_image_url ? userDetails.profile_image_url : Logo} alt="Profile" />
                </div>
                <div>
                    <p>{userDetails.first_name} {userDetails.last_name}</p>
                </div>
            </div>
            <div>
                <h3>{userDetails.username}</h3>
                <h3>{userDetails.email}</h3>
                <h3>{userDetails.created_on}</h3>
                <h3>About:</h3>
                <p>{userDetails.bio}</p>
            </div>
        </section>
        <section>
            {Number(userDetails.id) !== Number(token) && (
                <>
                    {!didCurrentUserSubscribe() && <button onClick={handleSubscription}>Subscribe</button>}
                    {!!didCurrentUserSubscribe() && <button onClick={handleUnsubscribe}>Unsubscribe</button>}
                </>
            )}
        </section>
    </>
    }
}