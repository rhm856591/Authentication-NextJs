"use client"

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)

        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
            {error && <p className="text-red-500">{error}</p>}
            {verified && <p className="text-green-500">Email Verified</p>}
            <Link className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href="/login">
                Login
            </Link>
        </div>
    )

}