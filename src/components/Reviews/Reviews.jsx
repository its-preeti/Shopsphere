import { useState } from "react";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      name: "Rahul",
      rating: 5,
      comment: "Amazing Product 🔥",
    },
  ]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
    };

    setReviews([...reviews, newReview]);
    setName("");
    setRating(5);
    setComment("");
  };

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  return (
    <div className="reviews">
      <div className="review-header">
        <div className="review-heading">
          <span className="review-label">CUSTOMER FEEDBACK</span>
          <h2>Customer Reviews</h2>
          <p>See what our customers think about this product.</p>
        </div>

        <div className="rating-summary">
          <span className="rating-stars">★★★★★</span>
          <strong>{avgRating.toFixed(1)}</strong>
          <span className="rating-count">
            Based on {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      <div className="review-form-card">
        <div className="form-title">
          <h3>Share your experience</h3>
          <p>Your feedback helps other customers make better choices.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="5">★★★★★ Excellent</option>
              <option value="4">★★★★ Very Good</option>
              <option value="3">★★★ Good</option>
              <option value="2">★★ Fair</option>
              <option value="1">★ Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="review-submit">
            Add Review
          </button>
        </form>
      </div>

      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-card-top">
              <div className="review-user">
                <div className="user-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{review.name}</h3>
                  <span>Verified Customer</span>
                </div>
              </div>

              <span className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>

            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;