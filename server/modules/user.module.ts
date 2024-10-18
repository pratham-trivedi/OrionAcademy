import mongoose,{Document, Model, Schema} from "mongoose";
import bycrypt from "bcryptjs"

const emailRegexPattern: RegExp = /^[^@]+@[^@]+\.[^@]+$/;


export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean,
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your name"],
    },
    email:{
        type:String,
        required: [true, "Please enter email"],
        validate: {
            validator: function (value: string){
                return emailRegexPattern.test(value);
            },
            message:"Please enter a valid mail",
        },
        unique:true,
    },
    password:{
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be atlest 6 character long"],
        select: false,
    },
    avatar:{
        public_id: String,
        url: String,
    },
    role:{
        type:String,
        default: "user",
    },
    isVerified:{
        type:Boolean, 
        default: false,
    },
    courses:[
        {
            courseId: String,

        }
    ]
},{timestamps: true});

userSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')) next();

    this.password = await bycrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(enteredPass: string): Promise<boolean> {
    return await bycrypt.compare(enteredPass, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
