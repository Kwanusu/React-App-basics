import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const EmployeeDashboard = () => {
  const [application, setApplication] = useState("");
  const [message, setMessage] = useState("");

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "applications"), {
        application,
        submittedAt: new Date(),
      });
      setMessage("Application submitted successfully!");
      setApplication("");
    } catch (error) {
      console.error("Error submitting application", error);
      setMessage("Error submitting application");
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <form onSubmit={handleApplicationSubmit}>
        <div>
          <label>Job Application:</label>
          <textarea
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            required />
        </div>
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmployeeDashboard;
