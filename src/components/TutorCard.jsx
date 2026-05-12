import React from "react";

export default function TutorCard({ tutor, t, onSelect, onChat }) {
  return (
    <div className="tutor-card">
      <div className="tutor-card-left">
        <div className="avatar">{tutor.name.charAt(0)}</div>
        <div>
          <div className="card-title-row">
            <h3>{tutor.name}</h3>
            {tutor.pro && <span className="badge pro-badge">PRO</span>}
{tutor.online && <span className="badge online-badge">{t.online}</span>}

{tutor.verificationStatus === "verified" && (
  <span className="badge verified-badge">{t.verifiedTutor}</span>
)}

{tutor.verificationStatus === "pending" && (
  <span className="badge pending-badge">{t.pendingVerification}</span>
)}
          </div>

          <p className="muted">
            {tutor.university} • {tutor.subject}
          </p>

          <p className="muted">
            {t.courseYear}: {tutor.courseYear || "-"} • {t.faculty}: {tutor.faculty || "-"}
          </p>

          <p className="muted">
            {t.gpa}: {tutor.gpa || "-"} • ⭐ {tutor.rating} • {tutor.lessons} lessons
          </p>

          <p className="muted">{tutor.bio}</p>
        </div>
      </div>

      <div className="tutor-card-right">
        <div className="price-box">
          <strong>{tutor.priceLesson} KGS</strong>
          <span>/ hour</span>
        </div>
        <button className="secondary-btn" onClick={() => onChat(tutor)}>
          {t.openChat}
        </button>
        <button className="primary-btn" onClick={() => onSelect(tutor)}>
          {t.profile}
        </button>
      </div>
    </div>
  );
}