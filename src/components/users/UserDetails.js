import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../services/userServices"
import Logo from "../nav/rare.jpeg"
import { createSubscriptionEntry, getSubscriptions, deleteSubscription } from "../../services/subscriptionServices"

export const UserDetails = ({token}) => {
    const [userDetails, setUserDetails] = useState()
    const [subscriptions, setSubscriptions] = useState([])
    const {userId} = useParams()
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
            <section className="section">
                <div className="container">
                    <div className="columns is-vcentered mb-6">
                        <div className="column is-narrow">
                            <figure className="image is-128x128">
                                <img 
                                    className="is-rounded" 
                                    src={userDetails?.profile_image_url ? userDetails.profile_image_url : Logo} 
                                    alt="Profile" 
                                />
                            </figure>
                        </div>
                        <div className="column">
                            <h1 className="title is-3 mb-4">{userDetails.first_name} {userDetails.last_name}</h1>
                            <p className="subtitle is-5 mb-3">@{userDetails.username}</p>
                        </div>
                        <div className="column is-narrow">
                            {Number(userDetails.id) !== Number(token) && (
                                <>
                                    {!didCurrentUserSubscribe() && 
                                        <button 
                                            className="button is-primary is-rounded" 
                                            onClick={handleSubscription}
                                        >
                                            Subscribe
                                        </button>
                                    }
                                    {!!didCurrentUserSubscribe() && 
                                        <button 
                                            className="button is-danger is-rounded" 
                                            onClick={handleUnsubscribe}
                                        >
                                            Unsubscribe
                                        </button>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="box">
                        <h3 className="title is-4 mb-4">User Information</h3>
                        <div className="content">
                            <div className="field">
                                <label className="label">Username:</label>
                                <div className="control">
                                    <p className="subtitle is-6">{userDetails.username}</p>
                                </div>
                            </div>
                            
                            <div className="field">
                                <label className="label">Email:</label>
                                <div className="control">
                                    <p className="subtitle is-6">{userDetails.email}</p>
                                </div>
                            </div>
                            
                            <div className="field">
                                <label className="label">Join Date:</label>
                                <div className="control">
                                    <p className="subtitle is-6">{new Date(userDetails.created_on).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-5">
                            <h3 className="title is-5 mb-3">About:</h3>
                            <div className="content">
                                <p>{userDetails.bio || "No bio available."}</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="title is-5 mb-3">Role:</h3>
                            <div className="content">
                                <p>{userDetails.is_admin ? "admin" : "author"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
    
    return <div className="section">
        <div className="container">
            <p className="has-text-centered">Loading user details...</p>
        </div>
    </div>
}