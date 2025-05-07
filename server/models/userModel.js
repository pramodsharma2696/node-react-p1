import mongoose, { model } from "mongoose";
import userModelSchema from './schema/userModelSchema.js'

const userModel = mongoose.model('user', userModelSchema);

export default userModel;