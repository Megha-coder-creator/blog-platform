const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:postId", authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const comment = await Comment.create({
            content,
            author: req.user.id,
            post: req.params.postId,
        });

        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/:postId", async (req, res) => {
    try {

        const comments = await Comment.find({
            post: req.params.postId,
        })
        .populate("author", "name email")
        .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.delete("/:commentId", authMiddleware, async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await Comment.findByIdAndDelete(req.params.commentId);

        res.status(200).json({
            message: "Comment deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;