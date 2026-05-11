import React from "react";
import BackButton from "../components/BackButton";

export default function Lesson({ t, selectedTutor, goReview, goBack }) {
  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="page-grid">
        <div className="panel dark-panel">
          <div className="between-row">
            <h2>{t.liveLesson}</h2>
          </div>

          <div className="video-box">
            <h3>{selectedTutor?.name}</h3>
            <p>Google Meet Demo + Whiteboard</p>
          </div>

          <button className="danger-btn" onClick={goReview}>
            {t.finishLesson}
          </button>
        </div>

        <div className="panel">
          <h2>Lesson Notes</h2>
          <ul className="notes-list">
            <li>Limits and derivatives</li>
            <li>Exam-style problems</li>
            <li>Questions likely asked by lecturer</li>
            <li>Final revision tasks</li>
          </ul>

          <div className="success-box">{t.trialBooked}</div>
        </div>
      </div>
    </div>
  );
}
