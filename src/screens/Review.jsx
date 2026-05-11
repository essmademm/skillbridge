import React from "react";
import BackButton from "../components/BackButton";

export default function Review({
  t,
  reviewText,
  setReviewText,
  submitReview,
  restart,
  goBack
}) {
  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="single-panel-page">
        <div className="panel">
          <h2>{t.leaveReview}</h2>

          <div className="stars">⭐ ⭐ ⭐ ⭐ ⭐</div>

          <textarea
            className="app-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <div className="action-row">
            <button className="primary-btn" onClick={submitReview}>
              {t.send}
            </button>
            <button className="secondary-btn" onClick={restart}>
              {t.restart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}