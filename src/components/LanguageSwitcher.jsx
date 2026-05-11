import React from "react";

export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="lang-switcher">
      <button
        className={lang === "en" ? "lang-btn active" : "lang-btn"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        className={lang === "ru" ? "lang-btn active" : "lang-btn"}
        onClick={() => setLang("ru")}
      >
        RU
      </button>
      <button
        className={lang === "kg" ? "lang-btn active" : "lang-btn"}
        onClick={() => setLang("kg")}
      >
        KG
      </button>
    </div>
  );
}