import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ColorRing } from "react-loader-spinner";

const Homepage = () => {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/login"); // Redirect to login page if no authToken
        } else {
            fetchJokes();
        }
    });

    const fetchJokes = async () => {
        try {
            const response = await fetch(
                "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
            );
            const data = await response.json();
            setJokes(data.jokes);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching jokes:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div
            style={{
                padding: "20px",
                minHeight: "100vh",
                backgroundSize: "cover",
                textAlign: "center",
                backgroundImage:
                    "radial-gradient(circle at 13% 47%, rgba(140, 140, 140,0.03) 0%, rgba(140, 140, 140,0.03) 25%,transparent 25%, transparent 100%),radial-gradient(circle at 28% 63%, rgba(143, 143, 143,0.03) 0%, rgba(143, 143, 143,0.03) 16%,transparent 16%, transparent 100%),radial-gradient(circle at 81% 56%, rgba(65, 65, 65,0.03) 0%, rgba(65, 65, 65,0.03) 12%,transparent 12%, transparent 100%),radial-gradient(circle at 26% 48%, rgba(60, 60, 60,0.03) 0%, rgba(60, 60, 60,0.03) 6%,transparent 6%, transparent 100%),radial-gradient(circle at 97% 17%, rgba(150, 150, 150,0.03) 0%, rgba(150, 150, 150,0.03) 56%,transparent 56%, transparent 100%),radial-gradient(circle at 50% 100%, rgba(25, 25, 25,0.03) 0%, rgba(25, 25, 25,0.03) 36%,transparent 36%, transparent 100%),radial-gradient(circle at 55% 52%, rgba(69, 69, 69,0.03) 0%, rgba(69, 69, 69,0.03) 6%,transparent 6%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
            }}
        >
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h2 className="text-danger">Jokes</h2>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                        ]}
                    />
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped shadow p-3 mb-5 bg-white rounded">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Type</th>
                                <th scope="col">Joke</th>
                                <th scope="col">Explicit</th>
                                <th scope="col">Safe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jokes.map((joke) => (
                                <tr key={joke.id}>
                                    <td>{joke.id}</td>
                                    <td>{joke.category}</td>
                                    <td>{joke.type}</td>
                                    <td>{joke.joke}</td>
                                    <td
                                        style={{
                                            color: joke.flags.explicit
                                                ? "red"
                                                : "green",
                                        }}
                                    >
                                        {joke.flags.explicit ? "Yes" : "No"}
                                    </td>
                                    <td
                                        style={{
                                            color: joke.safe ? "green" : "red",
                                        }}
                                    >
                                        {joke.safe ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Homepage;
