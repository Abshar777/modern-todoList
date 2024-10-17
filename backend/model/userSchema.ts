import mongoose,{Schema,Document} from "mongoose";
import userType from "../types/userType";
import bcrypt from "bcryptjs"

interface userDocument extends userType,Document {}

const userSchema:Schema<userDocument>=new Schema({
    name:{
        type:String,
        required:[true,"name must be required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email must be required"]
    },
    password:{
        type:String,
        required:[true,"password must be required"]
    },
    img:{
        type:String
    }
})

userSchema.pre<userDocument>('save',async function (next) {
    if(!this.isModified("password")) return next();

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()

})

export default mongoose.model('User',userSchema)
