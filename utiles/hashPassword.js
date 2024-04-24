import bcrypt from "bcryptjs"

const hashPassword = async(pwd)=>{
    const hashedPassword = await bcrypt.hash(pwd, 10)
    return hashedPassword 
}


export default hashPassword