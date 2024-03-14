import {connect} from "@/db/dbConfig"
import { NextRequest, NextResponse, userAgent } from "next/server"
import User from "@/model/user.model"

connect()

export async function POST(request: NextRequest) {

    try {
        const resBody = await request.json()
        const {token} = resBody
        console.log(token)
        const user = await User.findOne({verifyToken: token,   verifyTokenExpiry: {$gt: Date.now()}})

        if(!User){
            return NextResponse.json({error: 'Invalid Token'}, {status: 400})

        }
        console.log(user)

        user.isVerify = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();
        return NextResponse.json({
            mesaaage: "Email verify successfully",
            success: true,
        })

    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        }, {status: 500});
        
    }


}