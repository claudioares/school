import jwt from "jsonwebtoken";


export function authTokenCreate (_id:string | undefined) {
    const token = jwt.sign({id: _id}, process.env.HASHTOKEN ?? '', {expiresIn: '8h'})

    return token;
}