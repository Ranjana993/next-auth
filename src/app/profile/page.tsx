"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const page = () => {
  const router = useRouter()
  const [data, setData] = useState("")


  const getUserDetail = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/profile")
      console.log(res.data.data.username);

      setData(res.data.data.username)
    }
    catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/users/logout")
      toast.success("Successfully logged out")
      router.push("/sign-up")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getUserDetail()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-slate-900'>
      <h2 className='text-white font-bold text-4xl'>Profile page</h2>
      <div className='flex gap-3 mt-4'>
        <button onClick={logout} className='bg-green-500 px-4 m-2 p-2'>Logout</button>
      </div>
    </div>
  )
}

export default page