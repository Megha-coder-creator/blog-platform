import { useState } from "react";
import axios from "axios";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/posts",
                {
                    title,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Post created successfully!");

            setTitle("");
            setContent("");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create post");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4 border-0 rounded-4">

                            <h2 className="mb-4 text-center">Create New Post</h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <textarea
                                        className="form-control rounded-3"
                                        rows="8"
                                        placeholder="Write your post..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>

                                <button className="btn btn-primary btn-lg w-100">
                                    Create Post
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
            }


        export default CreatePost;