import React from "react";
import TutorCard from "../components/TutorCard";
import BackButton from "../components/BackButton";

export default function StudentFlow({
  t,
  universities,
  selectedUniversity,
  setSelectedUniversity,
  subject,
  setSubject,
  lecturerImportant,
  setLecturerImportant,
  lecturer,
  setLecturer,
  filteredTutors,
  onSelectTutor,
  onOpenChat,
  goBack
}) {
  const featuredPro = filteredTutors.filter((item) => item.pro).slice(0, 2);

  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="page-grid student-grid">
        <div className="panel">
          <h2>{t.chooseUniversity}</h2>
          <div className="uni-grid">
            {universities.map((uni) => (
              <button
                key={uni}
                className={selectedUniversity === uni ? "uni-btn active" : "uni-btn"}
                onClick={() => setSelectedUniversity(uni)}
              >
                {uni}
              </button>
            ))}
          </div>

          <h2>{t.searchSubject}</h2>
          <input
            className="app-input"
            placeholder="Calculus / Programming / Physics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <div className="lecturer-choice">
            <p>{t.lecturerImportant}</p>
            <div className="toggle-row">
              <button
                className={lecturerImportant ? "small-btn active" : "small-btn"}
                onClick={() => setLecturerImportant(true)}
              >
                {t.yes}
              </button>
              <button
                className={!lecturerImportant ? "small-btn active" : "small-btn"}
                onClick={() => setLecturerImportant(false)}
              >
                {t.no}
              </button>
            </div>
          </div>

          {lecturerImportant && (
            <input
              className="app-input"
              placeholder={t.lecturerInput}
              value={lecturer}
              onChange={(e) => setLecturer(e.target.value)}
            />
          )}

          <div className="mini-pro-box">
            <h3>{t.proBannerTitle}</h3>
            <p>{t.proBannerText}</p>
          </div>
        </div>

        <div className="panel">
          <div className="pro-ad-box">
            <div>
              <h3>{t.featuredProTutors}</h3>
              <p>{t.proAdMini}</p>
            </div>
            <span className="pro-pill">PRO</span>
          </div>

          {featuredPro.length > 0 && (
            <div className="featured-pro-list">
              {featuredPro.map((item) => (
                <div key={item.id} className="featured-pro-card">
                  <strong>{item.name}</strong>
                  <span>{item.subject}</span>
                </div>
              ))}
            </div>
          )}

          <div className="results-head">
            <h2>{t.results}</h2>
          </div>

          <div className="results-list">
            {filteredTutors.length === 0 ? (
              <div className="empty-box">No tutors found.</div>
            ) : (
              filteredTutors.map((tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  t={t}
                  onSelect={onSelectTutor}
                  onChat={onOpenChat}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}