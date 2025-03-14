import { useEffect, useState } from "react"
import { activateUserById, deactivateUser, getUsers, } from "../../services/userServices"
import { Link, useNavigate } from "react-router-dom"

export const AdminUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState(null); // New state for filtered users
    const navigate = useNavigate()

    const fetchData = async () => {
        const usersArray = await getUsers();
        setAllUsers(usersArray);
        setFilteredUsers(null); // Reset filtering after fetching fresh data
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleViewDeactivated = () => {
        const foundDeactivatedUsers = allUsers.filter(user => user?.active === 0);
        setFilteredUsers(foundDeactivatedUsers);
    };

    const confirmDeactivation = async (userId) => {
        const userConfirmed = window.confirm("Are you sure you want to deactivate this user?");
        if (userConfirmed) {
            await deactivateUser(userId, { id: userId, active: 0 });
            fetchData(); // Re-fetch the updated user list
        } else {
            alert("User deactivation canceled.");
        }
    };

    if (allUsers.length === 0) {
        return (
            <div className="section">
                <div className="container">
                    <p className="has-text-centered">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <section>
                <button onClick={handleViewDeactivated}>View Deactivated</button>
            </section>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered mb-6">Users</h1>
                    <div className="table-container">
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
                                {(filteredUsers ?? allUsers).map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <Link to={`/users/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                defaultChecked={Boolean(user.active)}
                                                disabled
                                            />
                                            Active
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
                                                event.preventDefault();
                                                navigate(`/users/${user.id}/edit`);
                                            }}>Edit</button>
                                            {user.active === 0 &&
                                                <button onClick={async (event) => {
                                                    event.preventDefault();
                                                    await activateUserById(user.id, { id: user.id, active: 1 });
                                                    fetchData();
                                                }}>Reactivate User</button>
                                            }
                                            {user.active === 1 && 
                                                <button onClick={() => confirmDeactivation(user.id)}>Deactivate</button>
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
    );
};