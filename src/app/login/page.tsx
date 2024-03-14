'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast';

const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            setError("Invalid email or password."); // Set error message
            toast.error("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length >= 8) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <main className="flex flex-col items-center justify-between py-4 px-5">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <label htmlFor="email">Email</label>
            <input
                className='px-3 py-2 rounded-md mb-2 w-[500px] text-black'
                type="text"
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='Email'
            />
            <label htmlFor="password">Password</label>
            <input
                className='px-3 py-2 rounded-md mb-2 w-[500px] text-black'
                type="password" // Use type="password" for password input
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Password'
            />
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={buttonDisabled} onClick={onLogin}>{buttonDisabled ? "No login" : "Login"}</button>
            <Link href={'/signup'}>Visit Signup page</Link>
        </main>
    )
}

export default Login;
