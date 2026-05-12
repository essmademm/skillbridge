import React from "react";
import BackButton from "../components/BackButton";

export default function TutorHome({
  t,
  tutorProfile,
  goEdit,
  goStudent,
  extraReviews = [],
  goBack
}) {
  const reviews = [...(tutorProfile?.reviews || []), ...extraReviews];
  const reviewsCount = reviews.length;

  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="page-grid tutor-home-grid">
        <div className="panel">
          <div className="between-row">
            <div>
              <h2>{t.tutorCabinet}</h2>
              <p className="subtle-text">{t.savedSuccessfully}</p>
            </div>
            <div className="status-badges">
              {tutorProfile?.pro && <span className="badge pro-badge">PRO</span>}
              <span className="badge online-badge">{t.online}</span>
            </div>
          </div>

          <div className="mini-pro-box">
            <h3>{t.proPromoTitle}</h3>
            <p>{t.proBannerText}</p>
          </div>

          <div className="profile-head">
            <div className="avatar big-avatar">
              {tutorProfile?.name?.charAt(0) || "T"}
            </div>
            <div>
              <h2>{tutorProfile?.name}</h2>
              <p className="muted">
                {tutorProfile?.university} • {tutorProfile?.subject}
              </p>
              <p className="muted">{tutorProfile?.bio}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <h3>143</h3>
              <p>Views</p>
            </div>
            <div className="stat-box">
              <h3>12</h3>
              <p>Requests</p>
            </div>
            <div className="stat-box">
              <h3>⭐ 4.9</h3>
              <p>{reviewsCount} {t.reviewsCount}</p>
            </div>
          </div>

          <div className="action-row tutor-home-actions">
            <button className="primary-btn" onClick={goEdit}>
              {t.editProfile}
            </button>
            <button className="secondary-btn" onClick={goStudent}>
              {t.becomeStudent}
            </button>
          </div>
        </div>

        <div className="panel">
          <h2>{t.yourReviews}</h2>

          {reviews.length === 0 ? (
            <div className="empty-box">No reviews yet.</div>
          ) : (
            reviews.map((review, index) => (
              <div className="review-box" key={index}>
                <div>⭐ ⭐ ⭐ ⭐ ⭐</div>
                <p>{review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
