import React from "react";
import BackButton from "../components/BackButton";

export default function Chat({
  t,
  selectedTutor,
  chatMessage,
  setChatMessage,
  goLesson,
  goBack
}) {
  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="single-panel-page">
        <div className="panel">
          <div className="between-row">
            <h2>{t.openChat}</h2>
          </div>

          <p className="muted">
            {t.selectedTutor}: <strong>{selectedTutor?.name}</strong>
          </p>

          <div className="chat-box">
            <div className="msg tutor-msg">
              Hello! I can help you prepare for this course and lecturer.
            </div>
            <div className="msg student-msg">{chatMessage}</div>
            <div className="msg tutor-msg">
              Great. Let’s begin with a trial lesson and discuss exam questions.
            </div>
          </div>

          <div className="chat-input-row">
            <input
              className="app-input"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button className="primary-btn">{t.send}</button>
          </div>

          <div className="action-row">
            <button className="primary-btn" onClick={goLesson}>
              {t.startLesson}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}=