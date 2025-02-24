import { useState, useEffect } from 'react'

import './PostList.css'

import View from '../../components/library/View'
import Post from './Post'

import logic from '../../logic'

function PostList({ refreshStamp
}) {
    console.log('PostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getAllPosts()
                .then((posts) => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handleCommentPostSubmitted = () => loadPosts()

    const handleEditPostSubmitted = () => loadPosts()


    return <View tag="section" className="PostList">
        {posts.map(post =>
            <Post key={post.id}
                post={post}
                onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} onCommentPostSubmitted={handleCommentPostSubmitted}
                onPostEditted={handleEditPostSubmitted} />)}
    </View>
}

export default PostList