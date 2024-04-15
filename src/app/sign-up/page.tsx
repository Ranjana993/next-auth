"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false)




  const onSignUpHandle = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/sign-up", user)
      console.log("Sign Up Success ", res);
      router.push("/sign-in")
    } catch (error: any) {
      console.log("Sign up failed ", error);
      toast.error(error.message)

    }
  }


  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  return (
    <div className='flex items-center justify-center h-screen  bg-black'>
      <div className='w-1/2 bg-slate-200 p-12 m-auto  pt-12'>
        {
          loading ? <p className='text-white'>Loading</p>: 
            <div className=''>
              <h2 className='text-4xl py-4 text-center uppercase'>Sign Up </h2>
              <div className='flex flex-col gap-2 '>
                <div className='flex flex-col mt-2'>
                  <label htmlFor="username">Username: </label>
                  <input value={user.username} onChange={(e) => setUser({...user , username:e.target.value})} className='bg-gray-300 p-2 rounded-md outline-none border-none' type="text" placeholder='enter your username' />
                </div>
                <div className='flex flex-col  mt-2'>
                  <label htmlFor="email">Email: </label>
                  <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='bg-gray-300 p-2 rounded-md outline-none border-none' type="text" placeholder='enter your email' />
                </div>
                <div className='flex flex-col mt-2'>
                  <label htmlFor="username">Password: </label>
                  <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='bg-gray-300 p-2 rounded-md outline-none border-none' type="password" placeholder='enter your password' />
                </div>
                <button onClick={onSignUpHandle} className={disabled ? "bg-gray-600 p-2 hover:bg-black text-white":'bg-gray-900 p-2 hover:bg-black text-white'}>Submit</button>
                <Link href={"/sign-in"} className='text-center'> or Login</Link>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Signup