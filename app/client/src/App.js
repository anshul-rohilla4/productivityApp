import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [activity, setActivity] = useState("");
    const [time, setTime] = useState("");
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/activities`);
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newActivity = { name: activity, time: time };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newActivity),
            });

            if (response.ok) {
                console.log("Activity added successfully");
                setActivity("");
                setTime("");
                const addedActivity = await response.json();
                setActivities([...activities, addedActivity]);
            } else {
                console.error("Failed to add activity");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Productivity Tracker</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="activity">Activity:</label>
                        <input
                            type="text"
                            id="activity"
                            name="activity"
                            autoComplete="off"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time Taken:</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            autoComplete="off"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </header>
            <main className="app-main">
                <h2>Today</h2>
                <ol>
                    {activities.map((activity) => (
                        <li key={activity._id}>
                            {activity.name} - {activity.time}
                        </li>
                    ))}
                </ol>
            </main>
        </div>
    );
};

export default App;