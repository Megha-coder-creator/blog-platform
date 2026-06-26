function CommentCard({ comment }) {
  return (
    <div className="card shadow-sm mb-3">
        <div className="card-body">
            <h6 className="fw-bold mb-2">
                {comment.author.name}
            </h6>

            <p className="mb-0">
                {comment.content}
            </p>
        </div>
    </div>
);
}

export default CommentCard;