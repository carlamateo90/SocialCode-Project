import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const createPostComment = (userId, postId, comment) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 100)

    return User.findById(userId)
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new NotFoundError('❌ User not found')

            return Post.findById(postId)
                .catch(() => { throw new SystemError('server error') })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('❌ Post not found')

                    return Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, date: new Date, comment: comment } } }).populate('comments.author', 'username').lean()

                        .catch(() => { throw new SystemError('server error') })
                        .then(() => { })
                })
        })
}

export default createPostComment