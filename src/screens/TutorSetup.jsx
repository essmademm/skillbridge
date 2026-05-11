import React from "react";
import BackButton from "../components/BackButton";

export default function TutorSetup({
  t,
  tutorForm,
  setTutorForm,
  tutorUniversity,
  setTutorUniversity,
  universities,
  fullName,
  saveTutorProfile,
  goBack
}) {
  const isPro = tutorForm.plan === "pro";

  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="page-grid tutor-setup-grid">
        <div className="panel tutor-form-panel">
          <h2>{t.tutorSetup}</h2>

          <div className="pricing-info-box">
            <div className="pricing-line">
              <strong>{t.firstMonthFree}</strong>
            </div>
            <div className="pricing-line">{t.tutorMonthly}</div>
            <div className="pricing-line">{t.proMonthly}</div>
          </div>

          <input
            className="app-input"
            value={fullName}
            readOnly
            placeholder={t.fullName}
          />

          <select
            className="app-input"
            value={tutorUniversity}
            onChange={(e) => setTutorUniversity(e.target.value)}
          >
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>

          <textarea
            className="app-textarea"
            placeholder={t.about}
            value={tutorForm.about}
            onChange={(e) =>
              setTutorForm({ ...tutorForm, about: e.target.value })
            }
          />

          <input
            className="app-input"
            placeholder={t.subjects}
            value={tutorForm.subjects}
            onChange={(e) =>
              setTutorForm({ ...tutorForm, subjects: e.target.value })
            }
          />
<input
  className="app-input"
  placeholder={t.yearOfStudy}
  value={tutorForm.courseYear || ""}
  onChange={(e) =>
    setTutorForm({ ...tutorForm, courseYear: e.target.value })
  }
/>

<input
  className="app-input"
  placeholder={t.facultyPlaceholder}
  value={tutorForm.faculty || ""}
  onChange={(e) =>
    setTutorForm({ ...tutorForm, faculty: e.target.value })
  }
/>

<input
  className="app-input"
  placeholder={t.gpaPlaceholder}
  value={tutorForm.gpa || ""}
  onChange={(e) =>
    setTutorForm({ ...tutorForm, gpa: e.target.value })
  }
/>

<textarea
  className="app-textarea"
  placeholder={t.portfolioPlaceholder}
  value={tutorForm.portfolioText || ""}
  onChange={(e) =>
    setTutorForm({ ...tutorForm, portfolioText: e.target.value })
  }
/>
          <input
            className="app-input"
            placeholder={t.lecturerExperience}
            value={tutorForm.lecturerExperience}
            onChange={(e) =>
              setTutorForm({ ...tutorForm, lecturerExperience: e.target.value })
            }
          />

          <div className="two-col">
            <input
              className="app-input"
              placeholder={t.hourPrice}
              value={tutorForm.lessonPrice}
              onChange={(e) =>
                setTutorForm({ ...tutorForm, lessonPrice: e.target.value })
              }
            />
            <input
              className="app-input"
              placeholder={t.twoHourPrice}
              value={tutorForm.dayPrice}
              onChange={(e) =>
                setTutorForm({ ...tutorForm, dayPrice: e.target.value })
              }
            />
          </div>

          <div className="two-col">
            <input
              className="app-input"
              placeholder={t.weeklyPrepPrice}
              value={tutorForm.weekPrice}
              onChange={(e) =>
                setTutorForm({ ...tutorForm, weekPrice: e.target.value })
              }
            />
            <input
              className="app-input"
              placeholder={t.monthlyPrepPrice}
              value={tutorForm.monthPrice}
              onChange={(e) =>
                setTutorForm({ ...tutorForm, monthPrice: e.target.value })
              }
            />
          </div>

          <div className="switch-row switch-row-better">
            <label className={`check-card ${tutorForm.multipleProfiles ? "checked-card" : ""}`}>
              <input
                type="checkbox"
                checked={tutorForm.multipleProfiles}
                disabled={!isPro}
                onChange={(e) =>
                  setTutorForm({
                    ...tutorForm,
                    multipleProfiles: e.target.checked
                  })
                }
              />
              <span>{t.multipleProfiles}</span>
            </label>

            <label className={`check-card ${tutorForm.instantRequests ? "checked-card" : ""}`}>
              <input
                type="checkbox"
                checked={tutorForm.instantRequests}
                disabled={!isPro}
                onChange={(e) =>
                  setTutorForm({
                    ...tutorForm,
                    instantRequests: e.target.checked
                  })
                }
              />
              <span>{t.instantRequests}</span>
            </label>
          </div>

          <div className="plan-row better-plan-row radio-plan-row">
            <button
              type="button"
              className={tutorForm.plan === "standard" ? "plan-card active-plan-card" : "plan-card"}
              onClick={() =>
                setTutorForm({
                  ...tutorForm,
                  plan: "standard",
                  multipleProfiles: false,
                  instantRequests: false
                })
              }
            >
              <span className="radio-dot">{tutorForm.plan === "standard" ? "●" : "○"}</span>
              <span>{t.standard}</span>
            </button>

            <button
              type="button"
              className={tutorForm.plan === "pro" ? "plan-card active-plan-card" : "plan-card"}
              onClick={() =>
                setTutorForm({
                  ...tutorForm,
                  plan: "pro",
                  multipleProfiles: true,
                  instantRequests: true
                })
              }
            >
              <span className="radio-dot">{tutorForm.plan === "pro" ? "●" : "○"}</span>
              <span>{t.pro}</span>
            </button>
          </div>

          <button className="primary-btn full-btn save-btn-spaced" onClick={saveTutorProfile}>
            {t.save}
          </button>
        </div>

        <div className="panel gradient-panel pro-benefits-panel">
          {isPro ? (
            <>
              <h2>{t.proBenefits}</h2>
              <ul className="pro-list">
                <li>{t.pro1}</li>
                <li>{t.pro2}</li>
                <li>{t.pro3}</li>
                <li>{t.pro4}</li>
                <li>{t.pro5}</li>
                <li>{t.pro6}</li>
              </ul>
            </>
          ) : (
            <>
              <h2>{t.standardBenefits}</h2>
              <ul className="pro-list">
                <li>{t.standard1}</li>
                <li>{t.standard2}</li>
                <li>{t.standard3}</li>
                <li>{t.standard4}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}