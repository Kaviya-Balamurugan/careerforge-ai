import { useState } from "react";
import { toast } from "react-hot-toast";

import useCareer from "../hooks/useCareer";
import { resumeChat } from "../api/resumeApi";

import "../components/chat/Chat.css";

export default function ResumeChat() {

    const { filename, role } = useCareer();

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hi! I'm your CareerForge AI Resume Assistant.\n\nAsk me anything about your resume."
        }
    ]);

    async function sendQuestion() {

        if (!filename) {

            toast.error("Upload a resume first.");

            return;

        }

        if (!question.trim()) return;

        const userMessage = {

            sender: "user",

            text: question

        };

        setMessages(prev => [...prev, userMessage]);

        const currentQuestion = question;

        setQuestion("");

        try {

            setLoading(true);

            const response = await resumeChat(

                filename,

                role,

                currentQuestion

            );

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: response.data.answer

                }

            ]);

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to get AI response.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="chat-page">

            <div className="chat-header">

                <h1>🤖 Resume AI Assistant</h1>

                <p>

                    Ask anything about your resume.

                </p>

            </div>

            <div className="chat-container">

                {

                    messages.map((message, index) => (

                        <div

                            key={index}

                            className={`message ${message.sender}`}

                        >

                            {message.text}

                        </div>

                    ))

                }

                {

                    loading && (

                        <div className="message ai">

                            Thinking...

                        </div>

                    )

                }

            </div>

            <div className="chat-input-area">

                <input

                    value={question}

                    onChange={(e) =>

                        setQuestion(e.target.value)

                    }

                    placeholder="Ask about your resume..."

                />

                <button

                    onClick={sendQuestion}

                >

                    Send

                </button>

            </div>

        </div>

    );

}