import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Auth from "./screens/Auth";
import RoleSelect from "./screens/RoleSelect";
import StudentFlow from "./screens/StudentFlow";
import TutorSetup from "./screens/TutorSetup";
//import TutorHome from "./screens/TutorHome";
import TutorHome from "./screens/Tutorhome.jsx";
import Chat from "./screens/Chat";
import Lesson from "./screens/Lesson";
import Review from "./screens/Review";
import Exchange from "./screens/Exchange";

import { translations } from "./i18n/translations";
import { tutors as baseTutors, exchangeUsers as seedExchangeUsers } from "./data/tutors";
import { universities } from "./data/universities";

const STORAGE_KEY = "skillbridge_accounts";
const CURRENT_ACCOUNT_KEY = "skillbridge_current_account";
const EXCHANGE_STORAGE_KEY = "skillbridge_exchange_users";

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = translations[lang];

  const [screen, setScreen] = useState("auth");
  const [notifications, setNotifications] = useState(2);
  const [authMessage, setAuthMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [studentUniversity, setStudentUniversity] = useState("AIU");
  const [tutorUniversity, setTutorUniversity] = useState("AIU");

  const [subject, setSubject] = useState("Calculus");
  const [lecturerImportant, setLecturerImportant] = useState(true);
  const [lecturer, setLecturer] = useState("Ivanov");

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedExchangeUser, setSelectedExchangeUser] = useState(null);

  const [chatMessage, setChatMessage] = useState(
    "Здравствуйте! Мне нужна помощь по Calculus."
  );
  const [reviewText, setReviewText] = useState(
    "Очень понятное объяснение, помогло подготовиться к экзамену."
  );
  const [extraReviews, setExtraReviews] = useState([]);

  const [exchangeForm, setExchangeForm] = useState({
    teach: "",
    need: ""
  });

  const [exchangeUsers, setExchangeUsers] = useState([]);
  const [exchangeResults, setExchangeResults] = useState([]);
  const [exchangeSavedMessage, setExchangeSavedMessage] = useState("");

 const [tutorForm, setTutorForm] = useState({
  about: "",
  subjects: "",
  courseYear: "",
  faculty: "",
  gpa: "",
  portfolioText: "",
  lecturerExperience: "",
  lessonPrice: "",
  dayPrice: "",
  weekPrice: "",
  monthPrice: "",
  plan: "pro",
  multipleProfiles: true,
  instantRequests: true
});

  const [accounts, setAccounts] = useState([]);

useEffect(() => {
  const savedAccounts = localStorage.getItem(STORAGE_KEY);
  const parsedAccounts = savedAccounts ? JSON.parse(savedAccounts) : [];
  setAccounts(parsedAccounts);

  const currentEmail = localStorage.getItem(CURRENT_ACCOUNT_KEY);
  if (currentEmail) {
    const currentAccount = parsedAccounts.find((acc) => acc.email === currentEmail);
    if (currentAccount) {
      hydrateAccount(currentAccount);
    }
  }

  setScreen("auth");
}, []);

  useEffect(() => {
    const savedExchange = localStorage.getItem(EXCHANGE_STORAGE_KEY);
    if (savedExchange) {
      const parsed = JSON.parse(savedExchange);
      setExchangeUsers(parsed);
      setExchangeResults(parsed);
    } else {
      setExchangeUsers(seedExchangeUsers);
      setExchangeResults(seedExchangeUsers);
      localStorage.setItem(EXCHANGE_STORAGE_KEY, JSON.stringify(seedExchangeUsers));
    }
  }, []);

  const hydrateAccount = (account) => {
    setFullName(account.fullName || "");
    setEmail(account.email || "");
    setPassword(account.password || "");
    setTutorUniversity(account.tutorUniversity || "AIU");
    setStudentUniversity(account.studentUniversity || "AIU");

    if (account.tutorProfile) {
      const tp = account.tutorProfile;
      setTutorForm({
        about: tp.bio || "",
        subjects: tp.subject || "",
        courseYear: tp.courseYear || "",
faculty: tp.faculty || "",
gpa: tp.gpa || "",
portfolioText: Array.isArray(tp.portfolio) ? tp.portfolio.join(", ") : "",
        lecturerExperience: (tp.lecturerNames || []).join(", "),
        lessonPrice: String(tp.priceLesson || ""),
        dayPrice: String(tp.priceDay || ""),
        weekPrice: String(tp.priceWeek || ""),
        monthPrice: String(tp.priceMonth || ""),
        plan: tp.pro ? "pro" : "standard",
        multipleProfiles: tp.multipleProfiles ?? false,
        instantRequests: tp.instantRequests ?? false
        
      });
    }
  };

  const saveAccounts = (updatedAccounts) => {
    setAccounts(updatedAccounts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts));
  };

 const currentAccount = useMemo(() => {
  return accounts.find((acc) => acc.email === email) || null;
}, [accounts, email]);

const savedTutorProfile = currentAccount?.tutorProfile || null;

const registeredTutorProfiles = useMemo(() => {
  return accounts
    .map((acc) => acc.tutorProfile)
    .filter(Boolean);
}, [accounts]);

const allTutors = useMemo(() => {
  const merged = [...registeredTutorProfiles, ...baseTutors];

  const uniqueTutors = merged.filter((tutor, index, arr) => {
    return index === arr.findIndex((item) =>
      item.name === tutor.name &&
      item.university === tutor.university &&
      item.subject === tutor.subject
    );
  });

  return uniqueTutors;
}, [registeredTutorProfiles]);

  const filteredTutors = useMemo(() => {
    let list = allTutors.filter((item) => item.university === studentUniversity);

    if (subject.trim()) {
      list = list.filter((item) =>
        item.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    if (lecturerImportant && lecturer.trim()) {
      list = list.filter((item) =>
        item.lecturerNames.some((name) =>
          name.toLowerCase().includes(lecturer.toLowerCase())
        )
      );
    }

    list.sort((a, b) => {
      if (a.pro !== b.pro) return a.pro ? -1 : 1;
      return b.rating - a.rating;
    });

    return list;
  }, [allTutors, studentUniversity, subject, lecturerImportant, lecturer]);

  const handleAuthNext = () => {
    const existing = accounts.find((acc) => acc.email === email);

    if (existing) {
      hydrateAccount(existing);
      localStorage.setItem(CURRENT_ACCOUNT_KEY, existing.email);
      setAuthMessage(t.accountFound);
      setTimeout(() => setAuthMessage(""), 2000);
      setScreen(existing.tutorProfile ? "tutorHome" : "role");
      return;
    }

    const newAccount = {
      email,
      password,
      fullName,
      tutorUniversity: "AIU",
      studentUniversity: "AIU",
      tutorProfile: null
    };

    const updated = [...accounts, newAccount];
    saveAccounts(updated);
    localStorage.setItem(CURRENT_ACCOUNT_KEY, email);
    setAuthMessage(t.accountCreated);
    setTimeout(() => setAuthMessage(""), 2000);
    setScreen("role");
  };

  const openTutorProfile = (tutor) => {
    setSelectedTutor(tutor);
    setSelectedExchangeUser(null);
    setScreen("tutorProfile");
  };

  const openTutorChat = (tutor) => {
    setSelectedTutor(tutor);
    setSelectedExchangeUser(null);
    setChatMessage(`Здравствуйте! Мне нужна помощь по ${subject}.`);
    setNotifications((prev) => prev + 1);
    setScreen("chat");
  };

  const openExchangeChat = (user) => {
    setSelectedExchangeUser(user);
    setSelectedTutor(null);
    setChatMessage(
      `Привет! Я могу помочь с "${exchangeForm.teach || "my skill"}", а мне нужна помощь с "${exchangeForm.need || user.teach}".`
    );
    setNotifications((prev) => prev + 1);
    setScreen("exchangeChat");
  };

  const saveExchangeUsers = (users) => {
    setExchangeUsers(users);
    localStorage.setItem(EXCHANGE_STORAGE_KEY, JSON.stringify(users));
  };

  const handleAddExchangeCard = () => {
    const teachValue = exchangeForm.teach.trim();
    const needValue = exchangeForm.need.trim();

    if (!teachValue || !needValue) return;

    const newCard = {
      id: Date.now(),
      name: fullName || "New User",
      teach: teachValue,
      need: needValue
    };

    const withoutSameUser = exchangeUsers.filter(
      (user) => user.name.toLowerCase() !== (fullName || "").toLowerCase()
    );

    const updatedUsers = [newCard, ...withoutSameUser];
    saveExchangeUsers(updatedUsers);
    setExchangeSavedMessage(t.exchangeSaved);
    setTimeout(() => setExchangeSavedMessage(""), 2500);
    setExchangeResults(updatedUsers);
  };

  const handleFindExchangeMatches = () => {
    const teachValue = exchangeForm.teach.trim().toLowerCase();
    const needValue = exchangeForm.need.trim().toLowerCase();

    const results = exchangeUsers.filter((user) => {
      const userTeach = user.teach.toLowerCase();
      const userNeed = user.need.toLowerCase();

      const canHelpYou = needValue ? userTeach.includes(needValue) : true;
      const youCanHelpThem = teachValue ? userNeed.includes(teachValue) : true;
      const notSamePerson =
        user.name.toLowerCase() !== (fullName || "").toLowerCase();

      return canHelpYou && youCanHelpThem && notSamePerson;
    });

    setExchangeResults(results);
  };

  const handleResetExchange = () => {
    setExchangeForm({ teach: "", need: "" });
    setExchangeResults(exchangeUsers);
    setExchangeSavedMessage("");
  };

  const submitReview = () => {
    if (reviewText.trim()) {
      setExtraReviews((prev) => [reviewText, ...prev]);
    }
    setScreen("student");
  };

  const saveTutorProfile = () => {
    const profile = {
      id: Date.now(),
      name: fullName,
      university: tutorUniversity,
      subject: tutorForm.subjects.split(",")[0]?.trim() || "Calculus",
      lecturerNames: tutorForm.lecturerExperience
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      rating: 4.9,
      lessons: 12,
      priceLesson: Number(tutorForm.lessonPrice || 500),
      priceDay: Number(tutorForm.dayPrice || 900),
      priceWeek: Number(tutorForm.weekPrice || 2200),
      priceMonth: Number(tutorForm.monthPrice || 6800),
      online: true,
      pro: tutorForm.plan === "pro",
      courseYear: tutorForm.courseYear || "1st year",
faculty: tutorForm.faculty || "General",
gpa: tutorForm.gpa || "3.5",
      bio: tutorForm.about,

      portfolio: tutorForm.portfolioText
  ? tutorForm.portfolioText.split(",").map((item) => item.trim()).filter(Boolean)
  : [
      "Updated tutor profile",
      "Exam preparation support",
      tutorForm.plan === "pro" ? "PRO badge active" : "Standard access"
    ],
      reviews: [
        "Очень понятно объясняет сложные темы.",
        "Хорошо готовит именно под экзамен.",
        "Уроки структурированные и полезные."
      ],
      multipleProfiles: tutorForm.multipleProfiles,
      instantRequests: tutorForm.instantRequests
    };

    const updatedAccounts = accounts.map((acc) =>
      acc.email === email
        ? {
            ...acc,
            fullName,
            tutorUniversity,
            studentUniversity,
            tutorProfile: profile
          }
        : acc
    );

    saveAccounts(updatedAccounts);
    localStorage.setItem(CURRENT_ACCOUNT_KEY, email);
    setNotifications((prev) => prev + 1);
    setScreen("tutorHome");
  };

  const logout = () => {
  localStorage.removeItem(CURRENT_ACCOUNT_KEY);
  setScreen("auth");
  setAuthMessage("");
  setFullName("");
  setEmail("");
  setPassword("");
  setSelectedTutor(null);
  setSelectedExchangeUser(null);
};

  return (
    <div className="app-shell">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        notifications={notifications}
        onGoTutorHome={() => savedTutorProfile && setScreen("tutorHome")}
        onGoStudent={() => setScreen("student")}
        onLogout={logout}
      />

      <main className="main-content">
        {screen === "auth" && (
          <Auth
            t={t}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            next={handleAuthNext}
            authMessage={authMessage}
          />
        )}

        {screen === "role" && (
          <RoleSelect
            t={t}
            goStudent={() => setScreen("student")}
            goTutor={() => {
              if (savedTutorProfile) {
                setScreen("tutorHome");
              } else {
                setScreen("tutorSetup");
              }
            }}
            goExchange={() => setScreen("exchange")}
          />
        )}

        {screen === "student" && (
          <StudentFlow
            t={t}
            universities={universities}
            selectedUniversity={studentUniversity}
            setSelectedUniversity={setStudentUniversity}
            subject={subject}
            setSubject={setSubject}
            lecturerImportant={lecturerImportant}
            setLecturerImportant={setLecturerImportant}
            lecturer={lecturer}
            setLecturer={setLecturer}
            filteredTutors={filteredTutors}
            onSelectTutor={openTutorProfile}
            onOpenChat={openTutorChat}
            goBack={() => setScreen("role")}
          />
        )}

        {screen === "tutorProfile" && selectedTutor && (
          <div className="page-with-back">
            <div className="page-topbar">
              <button
                type="button"
                className="back-icon-btn"
                onClick={() => setScreen("student")}
              >
                ←
              </button>
            </div>

            <div className="page-grid">
              <div className="panel">
                <div className="between-row">
                  <h2>{t.profile}</h2>
                </div>

                <div className="profile-head">
                  <div className="avatar big-avatar">
                    {selectedTutor.name.charAt(0)}
                  </div>
                  <div>
                    <h2>{selectedTutor.name}</h2>
                   <p className="muted">
  {selectedTutor.university} • {selectedTutor.subject}
</p>
<p className="muted">
  {t.courseYear}: {selectedTutor.courseYear || "-"} • {t.faculty}: {selectedTutor.faculty || "-"}
</p>
<p className="muted">
  {t.gpa}: {selectedTutor.gpa || "-"} • ⭐ {selectedTutor.rating} • {selectedTutor.lessons} lessons
</p>
                  </div>
                </div>

                <div className="info-card">
                  <h3>{t.profile}</h3>
                  <p>{selectedTutor.bio}</p>
                </div>

                <div className="info-card">
                  <h3>{t.portfolio}</h3>
                  <ul>
                    {selectedTutor.portfolio.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="panel">
                <h2>{t.reviews}</h2>
                {[...(selectedTutor.reviews || []), ...extraReviews].map((review, index) => (
                  <div className="review-box" key={index}>
                    <div>⭐ ⭐ ⭐ ⭐ ⭐</div>
                    <p>{review}</p>
                  </div>
                ))}

                <div className="pricing-box">
                  <h3>{t.bookLesson}</h3>
                  <p>{selectedTutor.priceLesson} KGS / hour</p>
                  <p>{selectedTutor.priceDay} KGS / 2 hours</p>
                  <p>{selectedTutor.priceWeek} KGS / weekly package</p>
                  <p>{selectedTutor.priceMonth} KGS / monthly package</p>
                </div>

                <div className="action-row">
                  <button className="secondary-btn" onClick={() => openTutorChat(selectedTutor)}>
                    {t.openChat}
                  </button>
                  <button className="primary-btn" onClick={() => setScreen("lesson")}>
                    {t.freeTrial}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "chat" && selectedTutor && (
          <Chat
            t={t}
            selectedTutor={selectedTutor}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            goLesson={() => setScreen("lesson")}
            goBack={() => setScreen("tutorProfile")}
          />
        )}

        {screen === "exchangeChat" && selectedExchangeUser && (
          <Chat
            t={t}
            selectedTutor={{ name: selectedExchangeUser.name }}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            goLesson={() => setScreen("exchange")}
            goBack={() => setScreen("exchange")}
          />
        )}

        {screen === "lesson" && selectedTutor && (
          <Lesson
            t={t}
            selectedTutor={selectedTutor}
            goReview={() => setScreen("review")}
            goBack={() => setScreen("chat")}
          />
        )}

        {screen === "review" && (
          <Review
            t={t}
            reviewText={reviewText}
            setReviewText={setReviewText}
            submitReview={submitReview}
            restart={() => setScreen("auth")}
            goBack={() => setScreen("lesson")}
          />
        )}

        {screen === "tutorSetup" && (
          <TutorSetup
            t={t}
            tutorForm={tutorForm}
            setTutorForm={setTutorForm}
            tutorUniversity={tutorUniversity}
            setTutorUniversity={setTutorUniversity}
            universities={universities}
            fullName={fullName}
            saveTutorProfile={saveTutorProfile}
            goBack={() => savedTutorProfile ? setScreen("tutorHome") : setScreen("role")}
          />
        )}

        {screen === "tutorHome" && savedTutorProfile && (
          <TutorHome
            t={t}
            tutorProfile={savedTutorProfile}
            goEdit={() => setScreen("tutorSetup")}
            goStudent={() => setScreen("student")}
            extraReviews={extraReviews}
            goBack={() => setScreen("role")}
          />
        )}

        {screen === "exchange" && (
          <Exchange
            t={t}
            exchangeForm={exchangeForm}
            setExchangeForm={setExchangeForm}
            exchangeUsers={exchangeResults}
            goBack={() => setScreen("role")}
            onFindMatch={handleFindExchangeMatches}
            onAddMyCard={handleAddExchangeCard}
            onReset={handleResetExchange}
            onOpenChat={openExchangeChat}
            savedMessage={exchangeSavedMessage}
          />
        )}
      </main>
    </div>
  );
}