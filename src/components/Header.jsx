import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  t,
  lang,
  setLang,
  notifications = 2,
  onGoTutorHome,
  onGoStudent,
  onLogout
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <img src="/logo.png" alt="SkillBridge Logo" className="logo" />
        <div>
          <h1>{t.appName}</h1>
          <p>{t.tagline}</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="notif-pill">
          {t.notifications}: {notifications}
        </div>

        <LanguageSwitcher lang={lang} setLang={setLang} />

        <div className="menu-wrap">
          <button
            className="menu-dots-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <button type="button" onClick={() => { setMenuOpen(false); onGoTutorHome?.(); }}>
                {t.tutorCabinet}
              </button>
              <button type="button" onClick={() => { setMenuOpen(false); onGoStudent?.(); }}>
                {t.studentMode}
              </button>
              <button type="button">{t.settings}</button>
              <button type="button">{t.help}</button>
              <button type="button">{t.aboutApp}</button>
              <button type="button" onClick={() => { setMenuOpen(false); onLogout?.(); }}>
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}