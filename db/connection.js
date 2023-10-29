import mongoose from 'mongoose'
const connectDB = async () => {
  return await mongoose.connect(process.env.DB).then(() => {
    console.log("DB Connected");
  }).catch(err => {
    console.log(`Error to connect DB, ${err}`)
  })
}

export default connectDB