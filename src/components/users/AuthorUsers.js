import { useEffect, useState } from "react"
import { getUsers } from "../../services/userServices"
import { Link } from "react-router-dom"


export const AuthorUsers = () => {
    const [allUsers, setAllUsers] = useState()

    const fetchData = () => {
        getUsers().then((usersArray) => {
            setAllUsers(usersArray)
        })
    }

    useEffect(() => {
        fetchData()
    },[])

    if(allUsers){
        return <>
       <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered mb-6">Users</h1>
                    
                    <div className="table-container">
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>Username</th> 
                                    <th>First Name</th> 
                                    <th>Last Name</th> 
                                    <th>Email</th> 
                                    <th>Is Admin</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {allUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <Link to={`/users/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_admin ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    }
    
    return <div className="section">
        <div className="container">
            <p className="has-text-centered">Loading users...</p>
        </div>
    </div>
}
