import { useState, useEffect } from "react"
import { AuthorUsers } from "./AuthorUsers"
import { getUserById } from "../../services/userServices"
import { AdminUsers } from "./AdminUsers"
import { useEffect, useState } from "react"
import { getUsers } from "../../services/userServices"
import { Link } from "react-router-dom"

export const AllUsers = ({token}) => {
    const [currentUser, setCurrentUser] = useState()

    const fetchCurrentUser = () => {
        getUserById(Number(token)).then(user => (
            setCurrentUser(user)
        ))
    }

    useEffect(() => {
        fetchCurrentUser()
    },[])

    if (currentUser){
        if (currentUser.is_admin === 1){
            return <>
                <AdminUsers currentUser={currentUser}/>
            </>
        }
        else {
            return <>
                <AuthorUsers />
            </>
        }
    }