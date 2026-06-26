import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import CommentCard from "../components/CommentCard";

function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `http://localhost:5000/api/comments/${id}`,
                {
                    content: text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Comment added successfully!");

            setText("");
            fetchComments();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add comment");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Post deleted successfully!");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    if (!post) return <h2>Loading...</h2>;

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1>{post.title}</h1>

                <p>{post.content}</p>

                <small>Author: {post.author.name}</small>
                <br />
                <br />

                <div className="d-flex gap-2 mt-4">
                    <Link to={`/edit/${post._id}`}>
                        <button className="btn btn-outline-primary">
                            Edit Post
                        </button>
                    </Link>

                    <button
                        className="btn btn-outline-primary"
                        onClick={handleDelete}
                    >
                        Delete Post
                    </button>
                </div>


                <hr />
            </div>

            <h2 className="mt-4">Comments</h2>

            {comments.map((comment) => (
                <CommentCard
                    key={comment._id}
                    comment={comment}
                />
            ))}

            <form onSubmit={handleComment}>
                <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <button
                    className="btn btn-primary"
                    onClick={handleComment}
                >
                    Add Comment
                </button>
                <br />
                <br />
            </form>
        </div>
    );
}

export default PostDetails;