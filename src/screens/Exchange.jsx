import React from "react";
import BackButton from "../components/BackButton";

export default function Exchange({
  t,
  exchangeForm,
  setExchangeForm,
  exchangeUsers,
  goBack,
  onFindMatch,
  onAddMyCard,
  onReset,
  onOpenChat,
  savedMessage
}) {
  return (
    <div className="page-with-back">
      <div className="page-topbar">
        <BackButton onClick={goBack} />
      </div>

      <div className="page-grid exchange-grid">
        <div className="panel">
          <h2>{t.exchangeTitle}</h2>
          <p className="subtle-text">{t.exchangeHint}</p>

          <input
            className="app-input"
            placeholder={t.iCanTeach}
            value={exchangeForm.teach}
            onChange={(e) =>
              setExchangeForm({ ...exchangeForm, teach: e.target.value })
            }
          />

          <input
            className="app-input"
            placeholder={t.iNeedHelp}
            value={exchangeForm.need}
            onChange={(e) =>
              setExchangeForm({ ...exchangeForm, need: e.target.value })
            }
          />

          {savedMessage && <div className="success-box">{savedMessage}</div>}

          <div className="action-row">
            <button className="primary-btn" onClick={onFindMatch}>
              {t.findMatch}
            </button>
            <button className="secondary-btn" onClick={onAddMyCard}>
              {t.addMyCard}
            </button>
            <button className="secondary-btn" onClick={onReset}>
              {t.reset}
            </button>
          </div>
        </div>

        <div className="panel">
          <h2>{t.results}</h2>

          <div className="exchange-results-grid">
            {(exchangeUsers || []).length === 0 ? (
              <div className="empty-box">{t.noMatches}</div>
            ) : (
              (exchangeUsers || []).map((user) => (
                <div key={user.id} className="exchange-card better-exchange-card">
                  <div className="exchange-avatar">{user.name.charAt(0)}</div>
                  <h3>{user.name}</h3>
                  <p><strong>{t.iCanTeach}:</strong> {user.teach}</p>
                  <p><strong>{t.iNeedHelp}:</strong> {user.need}</p>
                  <button
                    className="secondary-btn"
                    onClick={() => onOpenChat(user)}
                  >
                    {t.openExchangeChat}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}