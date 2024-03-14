"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation'

export default function ProfilePage(){

    // const router = useReducer()
    const router = useRouter();

    const logout = async ()=>{

        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Success")
            router.push("/login")

        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }

    }

    return(
        <div>
            <h1>Profile</h1>
            <hr />
            <p>profile</p>
            <hr />
            <button onClick={logout}>Logout</button>
        </div>
    )
}