import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import './ChatBot.css';

export default function App() {
    const [bot, setBot] = useState({});
    const navigate = useNavigate(); 

    const callBackend = async () => {
        const token = localStorage.getItem("token");
        const obj = jwtDecode(token);
        console.log("obj", obj);
        const userId = obj.user_id;
        console.log("userId", userId);
    }

    useEffect(() => {
        callBackend();
    }, []);

    const handleSearchClick = () => {
        navigate("/DogsDisplay"); 
    }

    return (
        <main className="chatbot-page">
            <section className="chatbot-container">
                <div className="chatbot-search">
                    <button onClick={handleSearchClick}>Search</button>
                </div>
                <div className="chatbot-board-container">
                    <div className="chatbot-interface">
                        <div className="chatbot-message-container">
                            <p className="chatbot-start-message">Start Chatting</p>
                        </div>
                        <div className="chatbot-mini-container">
                     
                            <div className="chatbot-ai-message-container">
                                <div className="chatbot-ai-logo">
                                    <img src="/images/Logo.png" alt="dog logo" />
                                </div>
                                <div className="chatbot-ai-answer">
                                    <p>How many small animals have you got?</p>
                                </div>
                            </div>

                            <div className="user-question-container">
                                <div className="user-ai-answer">
                                    <p>Yes, I have 2 hamsters</p>
                                </div>
                            </div>

                            <div className="chatbot-ai-message-container">
                                <div className="chatbot-ai-logo">
                                    <img src="/images/Logo.png" alt="dog logo" />
                                </div>
                                <div className="chatbot-ai-answer">
                                    <p>Have you got small children?</p>
                                </div>
                            </div>

                            <div className="user-question-container">
                                <div className="user-ai-answer">
                                    <p>I have a baby girl</p>
                                </div>
                            </div>

                            <div className="chatbot-ai-message-container">
                                <div className="chatbot-ai-logo">
                                    <img src="/images/Logo.png" alt="dog logo" />
                                </div>
                                <div className="chatbot-ai-answer">
                                    <p>Based on your answers, here is what we recommend for dog breeds that would suit your lifestyle and preferences...</p>
                                </div>
                            </div>

                            <div className="user-question-container">
                                <div className="user-ai-answer">
                                    <p>Start</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-text-container">
                    <input type="text" className="user-text-input" placeholder="Type your message..." />
                    <button className="user-text-send">Send</button>
                </div>
            </section>
        </main>
    );
}
