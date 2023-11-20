import jwt from "jsonwebtoken";


export function authTokenCreate (_id:string | undefined) {
    const token = jwt.sign({id: _id}, process.env.HASHTOKEN ?? 'hasder43qi8', {expiresIn: '8h'})

    return token;
}