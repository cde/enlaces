const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/',
    [ auth,
        [ check('text', 'Text is required').not().isEmpty(), ]
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()})
            }

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.first_name + ' ' + user.last_name,
                avatar: user.avatar,
                user: req.user.id
            });
            const post = await newPost.save();
            console.log('post ', post);
            res.json(post);
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/posts/:id
// @desc     Get post by Id
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({msg: 'Post no found'});
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post no found'});
        }
        res.status(500).send('Server Error');
    }
});


// @route    DELETE api/posts/:id
// @desc     Delete post by Id
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id);
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await  post.remove();

        res.json({msg: 'Post deleted'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post no found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Checking by using filter
        // if (post.filter(like => like.user.toString() === req.user.id).length > 0) {
        //     return res.status(400).json( { msg: 'Post already liked'})
        // }

        // Check if the post has already been liked
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Checking by using filter
        // if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        //     return res.status(400).json( { msg: 'Post has not yet been  liked'})
        // }

        // Check if the post has not yet been liked
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked by signed in user' });
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1)

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/posts/comment/:post_id
// @desc     Add comment to a post
// @access   Private
router.post('/comment/:post_id',
    [ auth,
        [ check('text', 'Text is required').not().isEmpty() ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.post_id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            post.comments.unshift(newComment);
            post.save()
            res.json(post)
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server error');
        }
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/:id/comment/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        if(!comment) {
            return res.status(404).json({msg: 'Comment not found'});
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        post.comments = post.comments.filter(({id}) => id !== req.params.comment_id)
        await post.save();

        return res.json(post.comments)

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;