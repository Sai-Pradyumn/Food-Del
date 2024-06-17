import mongoose from "mongoose" ;

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://food_del:fooodidel@cluster0.ofusgen.mongodb.net/food-del').then(() => console.log("DB Connected"));

}