import { Link } from "react-router-dom";
function PostCard({ post }) {
    return (
        <div className="card shadow-sm border-0 rounded-4 h-100 post-card">
            <div className="card-body">
            <h4 className="card-title fw-bold text-primary">
                {post.title}
            </h4>
            <p className="card-text">
                {post.content.substring(0, 120)}...
            </p>
            <p className="mb-3">
                <strong>Author:</strong> {post.author?.name}
            </p>
            <Link
                to={`/post/${post._id}`}
                className="btn btn-primary rounded-3"
            >
                Read More
            </Link>
        </div>
        </div>
    );
}

export default PostCard;