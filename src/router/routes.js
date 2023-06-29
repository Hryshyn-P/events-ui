import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "../components/AuthForm";

import AuthForm from "../components/AuthForm";
import EventsPage from "../components/EventsPage";

const AppRoutes = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default AppRoutes;
