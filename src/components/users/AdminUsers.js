import { useEffect, useState } from "react"
import { activateUserById, getUsers, } from "../../services/userServices"
import { Link, useNavigate } from "react-router-dom"

export const AdminUsers = () => {
    const [allUsers, setAllUsers] = useState()

    const navigate = useNavigate()

    const fetchData = () => {
        getUsers().then((usersArray) => {
            setAllUsers(usersArray)
        })
    }

    const handleViewDeactivated = () => {
        const foundDeactivatedUsers = allUsers.filter(users => users?.active === 0)
        setAllUsers(foundDeactivatedUsers)
    }

    useEffect(() => {
        fetchData()
    },[])

    if(allUsers){
        return<>
            <section>
                <button onClick={handleViewDeactivated}>View Deactivated</button>
            </section>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered mb-6">Users</h1>
                    <div className ="table-container">
                        <table className="table is-full-width is-hoverable">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                    <th>Active</th>
                                    <th>Role</th>
                                    <th></th>
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
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td><input
                                            type="checkbox"
                                            defaultChecked={Boolean(user.active
                                                )}
                                            disabled
                                        />Active
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`role-${user.id}`}
                                            value="Author"
                                            defaultChecked={user.is_admin === 0}
                                            disabled
                                        />Author
                                        <input 
                                            type="radio"
                                            name={`role-${user.id}`}
                                            value="Admin"
                                            defaultChecked={user.is_admin === 1}
                                            disabled
                                        />Admin
                                    </td>
                                    <td>
                                        <button onClick={(event) => {
                                            event.preventDefault()
                                            navigate(`/users/${user.id}/edit`)
                                        }}>Edit</button>
                                        {user.active === 0 &&
                                            <button onClick={async (event) => {
                                                event.preventDefault()
                                                const updatedActive = {
                                                    "id": user.id,
                                                    "active": 1
                                                }
                                                await activateUserById(Number(user.id), updatedActive)
                                                fetchData()
                                            }}>Reactivate User</button>
                                        }
                                    </td>
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