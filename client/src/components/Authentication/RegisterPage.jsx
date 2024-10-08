import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");   
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://flyclubwebsite-backend.vercel.app/api/register", {
        username,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Error while registering: " + (err.response?.data?.message || err.message));
      console.log(err);
    }
  };

  const loginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg, #71b7e6, #9b59b6)",
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "15px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    span: {
      cursor: "pointer",
      color: "#3498db",
      textDecoration: "underline",
    },
    spanHover: {
      color: "#2980b9",
    },
    message: {
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>Register Page</div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
        </form>
        <div id="login-message" style={styles.message}>
          Already have a login?{" "}
          <span
            onClick={loginPage}
            style={styles.span}
            onMouseOver={(e) => (e.target.style.color = styles.spanHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.span.color)}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
