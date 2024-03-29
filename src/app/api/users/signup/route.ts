import { connect } from "@/db/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export default async function POST(request: NextRequest) {
    try {
        const resBody = await request.json()
        const { username, email, password } = resBody

        // Check for empty fields
        if (!username || !email || !password) {
            return NextResponse.json({
                error: "All fields are required.",
            }, { status: 400 });
        }

        console.log(resBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: 'User already exists.'
            }, { status: 409 })
        } 

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        console.log(savedUser)

        await sendEmail({email, emailType:"VERIFY", userId: savedUser._id})
        

        return NextResponse.json({
            message: "User create successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }),
            { status: 500 }
    }
}