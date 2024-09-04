import {useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import './ChatBot.css';

export default function App() {
    const [bot, setBot] = useState({});

    const callBackend = async () => {
        const token = localStorage.getItem("token");
        const obj = jwtDecode(token);
        console.log("obj", obj)
        const userId = obj.user_id
        console.log("userId", userId)


    }

    useEffect(() => {
        callBackend()
    }, []);

    return (
        <main className="chatbot-page">
            <section className="chatbot-container">
                <div className="chatbot-search"><button>Search</button></div>
                <div className="chatbot-discover"><button>Discover</button></div>
                <div className="chatbot-board-container">
                    <div className="chatbot-interface">
                        <div className="chatbot-message-container">
                            <p className="chatbot-start-message">Start Chatting</p>
                        </div>
                        <div className="chatbot-mini-container">
                            {/* 1 */}
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
                                    <p>Yes I have 2 hamsters</p>
                                </div>
                            </div>

                            {/* 2 */}
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

                            {/* 3 */}
                            <div className="chatbot-ai-message-container">
                                <div className="chatbot-ai-logo">
                                    <img src="/images/Logo.png" alt="dog logo" />
                                </div>
                                <div className="chatbot-ai-answer">
                                    <p>Based on your answers, here is what we recommend for dog breeds that would suit your lifestyle and preferences:
                                        
                                        1. **Goldendoodle**: This breed is known for its friendly disposition and hypoallergenic coat, making it a great choice for families with allergies. Goldendoodles are also great with children and other pets, and they enjoy being active.
                                        
                                        2. **Labradoodle**: Similar to the Goldendoodle, Labradoodles are intelligent, friendly, and hypoallergenic. They are excellent with children and can thrive in an active environment, making them a wonderful choice for your household.
                                        
                                        3. **Bernese Mountain Dog**: These gentle giants are known for their friendly nature and love for children. They are also quite social and can get along well with other animals. Their size and temperament make them suitable for families with plenty of space.
                                        
                                        4. **Standard Poodle**: Highly intelligent and easily trainable, Standard Poodles are another hypoallergenic option. They are energetic and love to engage in various activities, making them perfect for an active family.
                                        
                                        5. **Collie**: Collies are known for their gentle nature and protective instinct, which makes them good family dogs. They adapt well to living with other pets and need plenty of exercise, aligning with your active lifestyle.
                                        
                                        All these breeds have a friendly disposition, are good with children, and can accommodate your allergy concerns while being suitable for living with other animals.</p>
                                </div>
                            </div>

                            <div className="user-question-container">
                                <div className="user-ai-answer">
                                    <p>Start </p>
                                </div>
                            </div>

                        </div>
                        <div className="user-text-container">
                            <input type="text" className="user-text-input" placeholder="Type your message..." />
                            <button className="user-text-send">Send</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}