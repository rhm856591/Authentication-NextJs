// Domain.com/verifytoken/token?kjnnjnjfhrjnj
import nodemailer from 'nodemailer';
import User from '@/model/user.model';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 36000000 }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 36000000 }
            )
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "adb0424cacc4ca",
                pass: "591d8238ca59fa"
            }
        });

        const mailOptions = {
            from: "sheikh856591@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailresponse = await transport.sendMail
            (mailOptions);
        console.log(mailresponse);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }


}
