'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import User from '@/model/user.model'

const SignUp = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [signupError, setSignupError] = useState(""); // State for signup error message

    const validateForm = () => {
        const errors = {};
        if (!user.username.trim()) {
            errors.username = "Username is required";
        }
        if (!user.email.trim()) {
            errors.email = "Email is required";
        }
        if (!user.password.trim()) {
            errors.password = "Password is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSignup = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('Signup success', response.data);
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            setSignupError("User already exists. Please use a different email.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-col items-center justify-between py-4 px-5">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing..." : "Signup"}</h1>
            <label htmlFor="username">Username</label>
            <input
                className={`border ${formErrors.username ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md mb-2 w-[500px] text-black`}
                type="text"
                id='username'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='Username'
            />
            {formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
            <label htmlFor="email">Email</label>
            <input
                className={`border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md mb-2 w-[500px] text-black`}
                type="text"
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='Email'
            />
            {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
            <label htmlFor="password">Password</label>
            <input
                className={`border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md mb-2 w-[500px] text-black`}
                type="password"
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Password'
            />
            {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
            {signupError && <span className="text-red-500">{signupError}</span>}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={onSignup}>Signup</button>
            <Link className="text-blue-500 hover:text-blue-700" href={'/login'}>Visit login page</Link>
        </main>
    )
}

export default SignUp
