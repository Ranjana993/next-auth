"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const VerifyEmail = () => {
  const [token, setToken] = useState("")
  const [error, setError] = useState(false)
  const [isVerified, setIsVerified] = useState(false)


  const verifyEmail = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/verifyemail", { token })
      setIsVerified(true)
      console.log(token);
      
      console.log("Email verified successfully");

    }
    catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail()
    }
  }, [])
  return (
    <>
      <div className='bg-black flex items-center  justify-center text-white h-screen '>
        <div className='text-center'>
          <h2 className='text-3xl py-3'>Verify email </h2>
          <button className=' p-2 px-6 text-white'>{token ? <p>{"token verified "}</p> : "no token"}  </button>
          {
            isVerified && (<>
              <h3>Verified </h3>
              <Link href={"/sign-in"}>Login</Link>
            </>

            )
          }
          {
            error && (<>
              <h3> Error</h3>

            </>

            )
          }
        </div>

      </div>
    </>

  )
}

export default VerifyEmail 