import { useEffect, useState } from "react"
import { getUserById, updateUserById } from "../../services/userServices"
import { Link, useNavigate, useParams } from "react-router-dom"

export const EditUserDetails = () => {
    const [userToEdit, setUserToEdit] = useState()
    const [adminStatus, setAdminStatus] = useState()
    const navigate = useNavigate()
    const {userId} = useParams()

    const fetchUserToEditData = () => {
        getUserById(Number(userId)).then(user => {
            setUserToEdit(user)
            setAdminStatus(user.is_admin)
        })
    }

    useEffect(() => {
        fetchUserToEditData()
    },[])

    const handleRoleChange = (event) => {
        setAdminStatus(Number(event.target.value))
    }

    const handleSave = (event) => {
        event.preventDefault()
        const userPropsUpdate = {
            id: userToEdit.id,
            is_admin: adminStatus
        }

        updateUserById(Number(userToEdit.id), userPropsUpdate)
        navigate(`/users`)
    }

    if(userToEdit){
        return <>
        <section className="columns is-centered">
            <form className="column is-two-thirds">
                <h1 className="title">Edit User</h1>

                <div className="field">
                    <label className="label">Role</label>
                        <div className="control">
                            <label className="radio mr-4">
                                <input
                                    type="radio"
                                    name="role"
                                    value="0"
                                    defaultChecked={userToEdit.is_admin === 0}
                                    onChange={handleRoleChange}
                                />Author
                            </label>
                            <label classname="radio">
                                <input 
                                    type="radio"
                                    name="role"
                                    value="1"
                                    defaultChecked={userToEdit.is_admin === 1}
                                    onChange={handleRoleChange}
                                />Admin
                            </label>
                            
                        </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={handleSave}>Save</button>
                    </div>
                    <div className="control">
                        <Link to="/users" className="button is-link is-light">Cancel</Link>
                    </div>
                </div>

            </form>
        </section>

    </>
    }
}