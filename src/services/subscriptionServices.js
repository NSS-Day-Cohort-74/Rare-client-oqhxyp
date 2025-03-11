export const getSubscriptions = () => {
    return fetch(`http://localhost:8088/subscriptions`).then(res => res.json())
}

export const createSubscriptionEntry = (subscriptionEntry) => {
    return fetch(`http://localhost:8088/subscriptions`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscriptionEntry)
    }).then((res) => res.json())
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
        method: "DELETE"
    }).then(res => res.json())
}

export const getSubscriptionPosts = (follower_id) => {
    return fetch(`http://localhost:8088/favoriteSubscriptions?follower_id=${follower_id}`).then(res => res.json())
}