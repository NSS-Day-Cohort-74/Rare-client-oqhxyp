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
        <h1>Users</h1>
        <section>
            <div>
                Username
            </div>
            <div>
                First Name
            </div>
            <div>
                Last Name
            </div>
            <div>
                Email
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
                        {user.first_name}
                    </div>
                    <div>
                        {user.last_name}
                    </div>
                    <div>
                        {user.email}
                    </div>
                </>
            })}  
        </section>
    </>
    }
}