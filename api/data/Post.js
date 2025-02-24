import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: {
            author: {
                type: ObjectId,
                required: true,
                ref: "User"
            },
            comment: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    }]
})

const Post = model('Post', post)

export default Post