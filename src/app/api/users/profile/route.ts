import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model"
import { getDataFromToken } from "@/helpers/getDataFromToken";


connect()

export async function POST(req: NextRequest) {
  const userId = await getDataFromToken(req)
  const user = await User.findOne({ _id: userId }).select("-password")
  return NextResponse.json({
    msg: "User found",
    data: user
  })
}
