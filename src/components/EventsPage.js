import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthForm";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/events", {
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
        });
        setEvents(response.data.events);
        console.log("Успешно загружены ивенты", response.data.events);
      } catch (error) {
        console.error("Ошибка при загрузке ивентов", error);
      }
    };

    fetchEvents();
  }, [authContext.token]);

  return (
    <div>
      <h1>Events Page</h1>
      <p>Events:</p>
      <ul style={{ listStyle: "none", padding: 0, display: "inline-block" }}>
        {events.map((event) => (
          <li
            key={event.id}
            style={{
              border: "1px solid #267f14",
              borderRadius: "5px",
              margin: "10px",
              padding: "5px",
            }}
          >
            <p style={{ margin: "5px 0" }}>ID: {event.id}</p>
            <p style={{ margin: "5px 0" }}>Title: {event.title}</p>
            <p style={{ margin: "5px 0" }}>Description: {event.description}</p>
            <p style={{ margin: "5px 0" }}>StartDate: {event.startDate}</p>
            <p style={{ margin: "5px 0" }}>EndDate: {event.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
