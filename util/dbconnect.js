import mongoose from 'mongoose'

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI

if (!MONGO_URI) {
    throw new Error(
        '[404] MONGO_URI NOT FOUND .env.local'
    )
}

const dbConnect = async () => mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

export default dbConnect