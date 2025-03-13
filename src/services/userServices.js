export const getUsers = () => {
    return fetch(`http://localhost:8088/users`).then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`).then(res => res.json())
}

export const updateUserById = async (userId, data) => {
    await fetch (`http://localhost:8088/users/${userId}`, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const activateUserById = async (userId, data) => {
    await fetch (`http://localhost:8088/reactivateUsers/${userId}`, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}