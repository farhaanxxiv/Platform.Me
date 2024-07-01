import { getServerSession } from "next-auth"
import connectDB from "../mongoose/conn"
import User from "../mongoose/models/User"
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req, res) {
    if (req.method == 'GET') {
        await connectDB()   
        const clientUser = await getServerSession()

        const person = new User({
            name: clientUser.user.name,
            email: clientUser.user.email
        })
        await person.save()

        // console.log(a)
        return new Response('Hello User')
    } else {
        return new Response('Hello User')

    }

}

export { handler as GET, handler as POST }
