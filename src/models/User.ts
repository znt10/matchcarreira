import { select } from "@heroui/react";
import mongoose, { Schema, models, model, Document } from "mongoose";

// 1. Defina a Interface (Tipagem)
export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  role: "candidato" | "empresa";


  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  

  password: { type: String, required: true, select: false },
  
  name: { type: String, required: true },
  

  role: { type: String, enum: ["candidato", "empresa"], required: true },

  //para mudar senha
  resetPasswordToken: {type: String, select: false},
  resetPasswordExpires: {type: Date, select: false},
}, { timestamps: true });

// O padrão Singleton para Next.js
const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;