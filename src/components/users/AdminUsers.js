import { useEffect, useState } from "react"
import { getUsers } from "../../services/userServices"
import { Link, useNavigate } from "react-router-dom"

export const AdminUsers = () => {
    const [allUsers, setAllUsers] = useState()
    const navigate = useNavigate()

    const fetchData = () => {
        getUsers().then((usersArray) => {
            setAllUsers(usersArray)
        })
    }

    useEffect(() => {
        fetchData()
    },[])

    if(allUsers){
        return<>
            <h1>Users</h1>
        <section>
            <div>
                Username
            </div>
            <div>
              Full Name
            </div>
            <div>
                Active
            </div>
            <div>
                Role
            </div>
        </section>
            <section>
                {allUsers.map(user => {
                    return <>
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                {user.username}
                            </Link>
                        </div>
                        <div>
                            {user.first_name} {user.last_name}
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                defaultChecked={Boolean(user.active
                                )}
                                disabled
                            />Active
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <button onClick={(event) => {
                                event.preventDefault()
                                navigate(`/users/${user.id}/edit`)
                            }}>Edit</button>
                        </div>
                    </>
                })}
            </section>
        </>
    }
}