import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export const AuthContext = createContext(
  { token: null, setToken: () => {} }
);

// Обертка для обновления значения токена в контексте
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Используем хук useState для хранения значения токена

  // Функция для обновления значения токена
  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // Состояние режима формы (login или register)
  const navigate = useNavigate();
  const authContext = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    if (mode === "login") {
      axios
        .post("http://localhost:5001/users/login", payload)
        .then((res) => {
          authContext.setToken(res.data.accessToken);
          navigate("/events");
          console.log("Успешный логин");
        })
        .catch((error) => {
          console.error("Ошибка при логине", error);
        });
    } else {
      axios
        .post("http://localhost:5001/users/create", payload)
        .then((res) => {
          console.log("Успешная регистрация");
        })
        .catch((error) => {
          console.error("Ошибка при регистрации", error);
        });
    }
  };

  return (
    <div className="auth-container">
      {" "}
      {/* Применение класса стилей */}
      <h2>{mode === "login" ? "Логин" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="button-container">
          {" "}
          {/* Контейнер для кнопок */}
          {/* Условное отображение кнопок на основе режима */}
          {mode === "login" ? (
            <button type="submit" className="login-button">
              Логин
            </button>
          ) : (
            <button type="submit" className="register-button">
              Регистрация
            </button>
          )}
          {/* Кнопка для смены режима */}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Регистрация" : "Логин"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
