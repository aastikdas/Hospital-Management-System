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
    <div className="ambulance-toast-wrap">
      <FiCheckCircle size={20} className="ambulance-toast-icon" />
      <div>
        <strong>Ambulance Call Confirmed</strong>
        <p>Call is being made and dispatch will start shortly.</p>
        <small>Dispatch starts in {secondsLeft}s</small>
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
        className="ai-help-fab"
        type="button"
        aria-label="Open AI help center"
        onClick={() => setIsOpen(true)}
      >
        <FiHeadphones size={24} />
      </button>

      <aside className={`ai-help-panel ${isOpen ? "open" : ""}`}>
        <div className="ai-help-header">
          <div>
            <h4>FAQ</h4>
            <p>Emergency support and quick answers</p>
          </div>
          <button
            className="ai-help-close"
            type="button"
            aria-label="Close help center"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="ai-help-body">
          <label htmlFor="help-question">Choose your question</label>
              <select
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

              <div className="ai-answer-box">
                <FiAlertCircle size={18} />
                <p>{currentAnswer}</p>
              </div>

              <div className="ai-emergency-actions">
                {EMERGENCY_ACTIONS.map((action) => (
                  <button
                    key={action.value}
                    type="button"
                    onClick={() => handleEmergencyAction(action.value, action.label)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>



          <div className="ai-history-header">
            <h5>Recent Help History</h5>
            <button type="button" onClick={clearHistory} disabled={!userHistoryKey}>
              Clear
            </button>
          </div>

          {!userHistoryKey && (
            <p className="ai-login-note">
              Log in to save your help history.
            </p>
          )}

          {userHistoryKey && history.length === 0 && (
            <p className="ai-login-note">No history yet. Your latest help actions will appear here.</p>
          )}

          {userHistoryKey && history.length > 0 && (
            <div className="ai-history-list">
              {history.map((entry) => (
                <div key={entry.id} className="ai-history-item">
                  <span>{entry.type === "emergency" ? "Emergency" : "FAQ"}</span>
                  <h6>{entry.question}</h6>
                  <p>{entry.answer}</p>
                  <small>{entry.time}</small>
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
