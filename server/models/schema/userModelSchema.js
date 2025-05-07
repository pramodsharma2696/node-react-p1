import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
},
  {
    timestamps:{}
  }
);

export default userModelSchema;