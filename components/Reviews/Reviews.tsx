import css from "./Reviews.module.css";
import { Review } from "@/types/psychologists";

interface ReviewProps {
    reviews: Review[];
    onAppointmentClick: () => void;
}
  
const ReviewCard = ({ reviews, onAppointmentClick }: ReviewProps) => {
if (!reviews || reviews.length === 0) return <p className={css.noReviews}>No reviews yet.</p>;

    return (
      <div className={css.reviewsContainer}>
        <ul className={css.reviewsList}>
          {reviews.map((rev, idx) => (
            <li key={idx} className={css.reviewItem}>
              <div className={css.reviewHeader}>
                <div className={css.avatar}>
                  {(rev.reviewer?.[0] || 'U').toUpperCase()}
                </div>
                <div className={css.reviewerInfo}>
                  <p className={css.reviewerName}>{rev.reviewer}</p>
                  <div className={css.starRating}>
                    
                    <svg width="16" height="16" className={css.starIcon}>
                      <use href="/symbol-defs.svg#icon-star" />
                    </svg>
                    <span className={css.ratingText}>{rev.rating}</span>
                  </div>
                </div>
              </div>
              <p className={css.reviewText}>{rev.comment}</p>
            </li>
          ))}
        </ul>
        <button type="button" className={`${css.appointmentBtn} button`} onClick={onAppointmentClick}>
          Make an appointment
        </button>
      </div>
    );
}
  export default ReviewCard;