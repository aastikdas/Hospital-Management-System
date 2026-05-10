import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiHeadphones, FiX, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { Context } from "../main";
import { toast } from "react-toastify";

const AmbulanceDispatchToast = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-start gap-2">
      <FiCheckCircle size={20} className="mt-0.5 text-emerald-600" />
      <div>
        <strong className="block text-sm font-semibold text-slate-800">Ambulance Call Confirmed</strong>
        <p className="text-xs text-slate-600">Call is being made and dispatch will start shortly.</p>
        <small className="text-xs text-slate-500">Dispatch starts in {secondsLeft}s</small>
      </div>
    </div>
  );
};

const QUESTION_OPTIONS = [
  { value: "ambulance", label: "I need an ambulance immediately" },
  { value: "severe_pain", label: "Severe pain or breathing issue" },
  { value: "book_appointment", label: "How do I book an appointment?" },
  { value: "reschedule", label: "How can I reschedule my appointment?" },
  { value: "reports", label: "How do I get my medical reports?" },
  { value: "billing", label: "Billing and payment support" },
  { value: "doctor_availability", label: "Check doctor availability" },
];

const EMERGENCY_ACTIONS = [
  { value: "call_ambulance", label: "Call Ambulance" },
  { value: "critical_alert", label: "Send Critical Alert" },
  { value: "first_aid", label: "Quick First Aid Steps" },
];

const getAnswerForQuestion = (questionValue) => {
  if (questionValue === "ambulance") {
    return "Call emergency services now. Keep patient details ready and share exact location. Use the emergency buttons below for immediate actions.";
  } else if (questionValue === "severe_pain") {
    return "For severe pain, breathing difficulty, or chest discomfort, do not wait. Use emergency care immediately and avoid self-medication.";
  } else if (questionValue === "book_appointment") {
    return "Go to Appointment page, fill patient details, pick department and doctor, then submit. You will receive confirmation shortly.";
  } else if (questionValue === "reschedule") {
    return "Open your appointment details and contact support with your registered phone and appointment date to reschedule quickly.";
  } else if (questionValue === "reports") {
    return "Medical reports are available after verification. Contact the hospital desk or support and share your registered email/phone.";
  } else if (questionValue === "billing") {
    return "For billing help, keep invoice number ready and contact billing support through hospital reception or phone helpline.";
  } else if (questionValue === "doctor_availability") {
    return "Doctor availability changes daily. You can check department slots while booking an appointment or contact front desk.";
  }

  return "Please choose a topic to get instant help.";
};

const getEmergencyResponse = (actionValue) => {
  if (actionValue === "call_ambulance") {
    return "Emergency ambulance requested. Call your local emergency number now and keep someone at the entrance for faster access.";
  } else if (actionValue === "critical_alert") {
    return "Critical alert created. Keep the patient monitored and prepare allergy/medication details for the emergency team.";
  } else if (actionValue === "first_aid") {
    return "First aid: keep airway clear, lay patient safely, avoid food/water during distress, and monitor breathing till help arrives.";
  }

  return "Emergency support is ready.";
};

const AIHelpCenter = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("Please choose a topic to get instant help.");
  const [history, setHistory] = useState([]);

  const userHistoryKey = useMemo(() => {
    if (!isAuthenticated) {
      return "";
    }

    const userIdentifier = user?._id || user?.id || user?.email;
    if (!userIdentifier) {
      return "";
    }

    return `help_center_history_${userIdentifier}`;
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!userHistoryKey) {
      setHistory([]);
      return;
    }

    try {
      const rawHistory = localStorage.getItem(userHistoryKey);
      const parsed = rawHistory ? JSON.parse(rawHistory) : [];
      if (Array.isArray(parsed)) {
        setHistory(parsed);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Failed to load help history", error);
      setHistory([]);
    }
  }, [userHistoryKey]);

  useEffect(() => {
    if (!userHistoryKey) {
      return;
    }

    localStorage.setItem(userHistoryKey, JSON.stringify(history));
  }, [history, userHistoryKey]);

  const addHistoryEntry = (question, answer, type = "faq") => {
    if (!userHistoryKey) {
      return;
    }

    const entry = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      type,
      question,
      answer,
    };

    setHistory((prevHistory) => [entry, ...prevHistory].slice(0, 25));
  };

  const handleQuestionChange = (event) => {
    const value = event.target.value;
    setSelectedQuestion(value);

    const selectedOption = QUESTION_OPTIONS.find((item) => item.value === value);
    const answer = getAnswerForQuestion(value);

    setCurrentAnswer(answer);

    if (selectedOption) {
      addHistoryEntry(selectedOption.label, answer, "faq");
    }
  };

  const handleEmergencyAction = (actionValue, actionLabel) => {
    const response = getEmergencyResponse(actionValue);
    setCurrentAnswer(response);
    addHistoryEntry(actionLabel, response, "emergency");

    if (actionValue === "call_ambulance") {
      toast.success(<AmbulanceDispatchToast />, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "ambulance-dispatch-alert",
      });
    }
  };

  const clearHistory = () => {
    if (!userHistoryKey) {
      return;
    }

    setHistory([]);
    localStorage.removeItem(userHistoryKey);
  };



  return (
    <>
      <button
        className="fixed bottom-5 right-5 z-[1050] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1 dark:shadow-blue-900"
        type="button"
        aria-label="Open AI help center"
        onClick={() => setIsOpen(true)}
      >
        <FiHeadphones size={24} />
      </button>

      <aside
        className={`fixed bottom-4 right-4 top-20 z-[1040] flex w-[calc(100%-1.5rem)] max-w-sm flex-col rounded-2xl border border-sky-100 bg-white shadow-2xl shadow-slate-300/30 transition-all duration-300 dark:border-sky-900/40 dark:bg-slate-900 dark:shadow-slate-900/50 sm:w-full ${
          isOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-[110%] opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-700">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">FAQ</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Emergency support and quick answers</p>
          </div>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            type="button"
            aria-label="Close help center"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="help-question">Choose your question</label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-950"
                id="help-question"
                value={selectedQuestion}
                onChange={handleQuestionChange}
              >
                <option value="">Select an option</option>
                {QUESTION_OPTIONS.map((question) => (
                  <option key={question.value} value={question.value}>
                    {question.label}
                  </option>
                ))}
              </select>

              <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950">
                <FiAlertCircle size={18} className="mt-0.5 text-emerald-700 dark:text-emerald-400" />
                <p className="text-sm leading-6 text-emerald-900 dark:text-emerald-200">{currentAnswer}</p>
              </div>

              <div className="grid gap-2">
                {EMERGENCY_ACTIONS.map((action) => (
                  <button
                    className="rounded-lg bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900"
                    key={action.value}
                    type="button"
                    onClick={() => handleEmergencyAction(action.value, action.label)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>



          <div className="mt-1 flex items-center justify-between">
            <h5 className="text-sm font-bold text-slate-800 dark:text-white">Recent Help History</h5>
            <button
              className="rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 transition disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-950 dark:text-sky-300"
              type="button"
              onClick={clearHistory}
              disabled={!userHistoryKey}
            >
              Clear
            </button>
          </div>

          {!userHistoryKey && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Log in to save your help history.
            </p>
          )}

          {userHistoryKey && history.length === 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">No history yet. Your latest help actions will appear here.</p>
          )}

          {userHistoryKey && history.length > 0 && (
            <div className="space-y-2">
              {history.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <span className="mb-1 inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {entry.type === "emergency" ? "Emergency" : "FAQ"}
                  </span>
                  <h6 className="text-sm font-semibold text-slate-800 dark:text-white">{entry.question}</h6>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{entry.answer}</p>
                  <small className="mt-1 block text-[11px] text-slate-500 dark:text-slate-500">{entry.time}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AIHelpCenter;
