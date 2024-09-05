
import {useState, useEffect, useCallback } from "react";
import { useProfileContext } from "../../contexts/UserContext";
import { options, requiredAIKeys } from "../../utils/helpers";
import SyncLoader from "react-spinners/SyncLoader";
import './ChatBot.css';
import {Link} from 'react-router-dom';

export default function App() {
    const { token, userId } = useProfileContext();
    const [preference, setPreference] = useState({});
    const [botAnswer, setBotAnswer] = useState("");
    const [converations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [botHasInteracted, setBotHasInteracted] = useState(false);
    const [userInput, setUserInput] = useState("");

    const updateUserAnswer = async (e) => {
        e.preventDefault();
        const option = options(token, "PATCH");

        if (userInput.length === 0) {
            return;
        }

        const length = converations.length;

        converations[length - 1] = { ...converations[length - 1], userAnswer: userInput };
        setConversations(converations);

        const key = requiredAIKeys[length - 1];
        console.log("Key worked?", key);
        option.body = JSON.stringify({
            [key]: userInput
        });

        const updatePreference = await fetch(`${process.env.REACT_URL}/bot/preferences/${preference.preference_id}`, option);
        
        if (updatePreference.status === 200) {
            const updateJson = await updatePreference.json();
            setPreference(updateJson.data);
            setBotHasInteracted(false);
        }
        setUserInput("");
    }


    const startChatbot = useCallback(async () => {
        const option = options(token, "POST");

        option.body = JSON.stringify({ user_id: userId });

        const startBot = await fetch(`${process.env.REACT_URL}/bot/preferences`, option);
        if (startBot.status === 201) {
            const pref = await startBot.json();
            setPreference(pref.data);
        }

    }, [token, userId]);

    useEffect(() => {
        if (token && userId) {
            startChatbot()
        }
    }, [token, startChatbot, userId]);

    useEffect(() => {
        if (preference && !botHasInteracted) {
            if (preference.preference_id) {
                const botInteraction = async () => {
                    const option = options(token, "GET");
                    
                    setLoading(true);
                    converations.push({ load: true });
                    const length = converations.length;
                    try {
                        const interaction = await fetch(`${process.env.REACT_URL}/bot/preferences/interact-with-bot/${preference.preference_id}`, option);
                        if (interaction.status === 200) {
                            const botQA = await interaction.json();
                            setBotAnswer(botQA.data.answer);
                            converations[length - 1] = { botQa: botQA.data.answer, load: false };
                            // converations.unshift({ botQa: botQA.data.answer });
                            // converations.reverse();
                            setConversations(converations);
                        }
                    } catch (error) {
                        console.error("Error during bot interaction", error)
                    } finally {
                        setLoading(false)
                    }

                }
                botInteraction();
                setBotHasInteracted(true);
            }
        }
    }, [preference, botHasInteracted, converations, token]);

    console.log("bot", preference);
    console.log("BOT ANSWER", botAnswer);
    console.log("user input", userInput);
    console.log("convo", converations);
    console.log("loading", loading);

    return (
        <main className="chatbot-page">
            <section className="chatbot-container">
                {/* <SyncLoader /> */}
                <div className="chatbot-search"><Link to='/DogsDisplay'><button>Search</button></Link></div>
                <div className="chatbot-discover"><button>Discover</button></div>
                <div className="chatbot-board-container">

                    <div className="chatbot-interface">
                        <div className="chatbot-message-container">
                            <p className="chatbot-start-message">Start Chatting</p>
                        </div>

                        <div className="chatbot-mini-container">
                            {/* 1 */}

                            {
                                converations.map((info, index) => {

                                    return (
                                        <>

                                            <>
                                                {
                                                    info ? info.botQa ?

                                                    <div key={"Bot." + index} className="chatbot-ai-message-container">
                                                        <div className="chatbot-ai-logo">
                                                            <img src="/images/Logo.png" alt="dog logo" />
                                                        </div>
                                                        <div className="chatbot-ai-answer">
                                                            <p>{info.botQa}</p>
                                                        </div>
                                                    </div> : null : null
                                                }
                                            </>
                                            <>
                                                {
                                                    info ? info.userAnswer ?
                                                    <div key={"User." + index} className="user-question-container">
                                                        <div className="user-ai-answer">
                                                            <p>{info.userAnswer}</p>
                                                        </div>
                                                    </div> : null : null
                                                }

                                            </>

                                            <>
                                            {
                                                loading && info.load ? 
                                                <div key={"Bot." + index} className="chatbot-ai-message-container">
                                                    <div className="chatbot-ai-logo">
                                                        <img src="/images/Logo.png" alt="dog logo" />
                                                    </div>
                                                    <div className="chatbot-ai-answer-loader">
                                                        <SyncLoader 
                                                            size={13}
                                                            color="#FB8261"
                                                        />
                                                    </div>
                                                </div>                                                    


                                                : null
                                            }
                                            </>
                                        </>
                                    )

                                })
                            }

                        </div>

                        <form onSubmit={updateUserAnswer} className="user-text-container">
                            <input 
                                type="text" 
                                className="user-text-input" 
                                placeholder="Type your message..." 
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}  
                            />
                            <button className="user-text-send">Send</button>
                        </form>



                    </div>                    
                </div>
            </section>
        </main>
    );
}