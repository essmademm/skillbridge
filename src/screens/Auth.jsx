import React, { useState } from "react";

export default function Auth({
  t,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  next,
  authMessage
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="screen-wrap">
      <div className="auth-card">
        <div className="card-header no-margin-bottom">
          <h2>{t.login}</h2>
          <p>{t.welcome}</p>
        </div>

        {authMessage && <div className="success-box">{authMessage}</div>}

        <input
          className="app-input"
          placeholder={t.fullName}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="app-input"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrap">
          <input
            className="app-input password-input"
            type={showPassword ? "text" : "password"}
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        <button className="primary-btn full-btn" onClick={next}>
          {t.continue}
        </button>
      </div>

      <div className="promo-card">
        <h3>{t.proPromoTitle}</h3>
        <p>{t.proPromoText}</p>
        <ul>
          <li>{t.pro1}</li>
          <li>{t.pro2}</li>
          <li>{t.pro3}</li>
          <li>{t.pro4}</li>
        </ul>

        <div className="promo-sub-card">
          <strong>{t.studentMonthly}</strong>
        </div>
      </div>
    </div>
  );
}