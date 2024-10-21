import User from "../models/userSchema";
import connectDB from "../dbConnect";

export async function createUser(user) {
      try {
            await connectDB();
            const newUser = await User.create(user);
            return JSON.parse(JSON.stringify(newUser));
      } catch (error) {
            console.log("Error while user entering: ", error);
            throw new Error("Error while creating user");
      }
}