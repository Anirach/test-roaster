import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { startChat } from '../services/geminiService';
import { MessageIcon, CloseIcon, SendIcon, BotIcon, UserIcon, LoadingIcon } from './icons';

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chat) {
            setChat(startChat());
            setMessages([{ role: 'model', text: "Hello! How can I help you with your staffing questions today?" }]);
        }
    }, [isOpen, chat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chat || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-blue text-white rounded-full p-4 shadow-lg hover:bg-brand-blue-light transition-transform transform hover:scale-110 z-50"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <CloseIcon className="w-8 h-8" /> : <MessageIcon className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-brand-surface dark:bg-dark-brand-surface rounded-xl shadow-2xl flex flex-col z-40 animate-fade-in-up">
                    <header className="bg-brand-blue text-white p-4 rounded-t-xl">
                        <h3 className="font-bold text-lg">AI Staffing Assistant</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'model' && <BotIcon className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />}
                                    <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-brand-blue-light text-white' : 'bg-gray-200 text-brand-text-primary dark:bg-slate-700 dark:text-dark-brand-text-primary'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.role === 'user' && <UserIcon className="w-6 h-6 text-brand-blue-light flex-shrink-0 mt-1" />}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 items-start">
                                    <BotIcon className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                                    <div className="p-3 rounded-xl bg-gray-200 dark:bg-slate-700">
                                        <LoadingIcon className="w-5 h-5 text-brand-text-secondary dark:text-dark-brand-text-secondary" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-brand-text-primary dark:text-dark-brand-text-primary rounded-lg focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light transition"
                            disabled={isLoading}
                        />
                        <button type="submit" className="p-2 bg-brand-blue text-white rounded-lg disabled:bg-gray-400" disabled={isLoading || !userInput.trim()}>
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};