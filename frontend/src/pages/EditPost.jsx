import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
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

      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="card shadow-lg border-0 rounded-4 p-4">

          <h2 className="text-center mb-4">Edit Post</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control rounded-3"
                rows="8"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-primary btn-lg w-100">
              Update Post
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
);
}

export default EditPost;