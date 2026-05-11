import React from "react";
import BackButton from "../components/BackButton";

export default function RoleSelect({ t, goStudent, goTutor, goExchange, goBack }) {
  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="role-grid">
        <div className="role-card" onClick={goStudent}>
          <h2>{t.student}</h2>
          <p>{t.studentDesc}</p>
        </div>

        <div className="role-card" onClick={goTutor}>
          <h2>{t.tutor}</h2>
          <p>{t.tutorDesc}</p>
        </div>

        <div className="role-card" onClick={goExchange}>
          <h2>{t.exchange}</h2>
          <p>{t.exchangeDesc}</p>
        </div>
      </div>
    </div>
  );
}