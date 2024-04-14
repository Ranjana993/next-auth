import User from "@/models/user.model"
import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect();


export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    const { email, password } = res // getting email and password from user 
    console.log(res);
    const user = await User.findOne({ email })  // finding user into database
    if (!user) {
      return NextResponse.json({ error: "User not found " }, { status: 400 })
    }
    console.log("User exist....");
    const newPass = await bcrypt.compare(password, user.password)   // encrypting password
    if (!newPass) {
      return NextResponse.json({ error: "Invalid credential " }, { status: 400 })
    }
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1d' }) // generating token 

    const response = NextResponse.json({ msg: "Logged in successfully ", success: true, status: 200 })
    response.cookies.set("token", token, { httpOnly: true })
    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

