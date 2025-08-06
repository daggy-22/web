"use client";

import { useState, useRef, useEffect } from "react";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoArrowUp,
  IoChevronDown,
} from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { RiRobot2Line, RiUser3Line } from "react-icons/ri";
import { CHAT_CONFIG } from "../../config/config";

interface ChatMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    CHAT_CONFIG.DEFAULT_LANGUAGE
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getUserId = (): string => {
    if (typeof window === "undefined") return "";
    let userId = localStorage.getItem("chat_user_id");
    if (!userId) {
      const generateUUID = () => {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      };
      userId = generateUUID();
      localStorage.setItem("chat_user_id", userId);
    }
    return userId;
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading && !isLoadingHistory) {
      scrollToBottom();
    }
  }, [isLoading, isLoadingHistory]);

  const loadChatHistory = async () => {
    if (!CHAT_CONFIG.LOAD_CHAT_HISTORY) return;

    setIsLoadingHistory(true);
    try {
      const response = await fetch(
        `${CHAT_CONFIG.BACKEND_URL}/chat/history?url=${encodeURIComponent(
          CHAT_CONFIG.DEFAULT_GITHUB_URL
        )}&user_id=${getUserId()}`
      );

      if (response.ok) {
        const history = await response.json();

        if (Array.isArray(history) && history.length > 0) {
          const historyMessages: ChatMessage[] = [];

          history.forEach((turn: any, index: number) => {
            if (turn.user) {
              historyMessages.push({
                id: `history-user-${index}`,
                type: "user",
                content: turn.user,
                timestamp: new Date(turn.timestamp || Date.now()),
              });
            }

            if (turn.assistant) {
              historyMessages.push({
                id: `history-assistant-${index}`,
                type: "assistant",
                content: turn.assistant,
                timestamp: new Date(turn.timestamp || Date.now()),
              });
            }
          });

          setMessages(historyMessages);
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        } else {
          addMessage(CHAT_CONFIG.WELCOME_MESSAGE, "assistant");
        }
      } else {
        addMessage(CHAT_CONFIG.WELCOME_MESSAGE, "assistant");
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      addMessage(CHAT_CONFIG.WELCOME_MESSAGE, "assistant");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  const addMessage = (
    content: string,
    type: "user" | "assistant" | "system"
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    addMessage(userMessage, "user");
    setIsLoading(true);

    try {
      const response = await fetch(`${CHAT_CONFIG.BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          url: CHAT_CONFIG.DEFAULT_GITHUB_URL,
          temperature: 0.5,
          max_output_tokens: 2000,
          user_language: selectedLanguage,
          user_id: getUserId(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addMessage(
          data.answer || "Sorry, I couldn't process your request.",
          "assistant"
        );
      } else {
        const errorText = await response.text();
        console.error("Chat error:", errorText);

        if (
          errorText.includes("429") ||
          errorText.includes("quota") ||
          errorText.includes("rate limit")
        ) {
          addMessage(
            "I'm currently experiencing high demand. Please try again in a minute.",
            "assistant"
          );
        } else if (
          errorText.includes("500") ||
          errorText.includes("Internal Server Error")
        ) {
          addMessage(
            "The service is temporarily unavailable. Please try again later.",
            "assistant"
          );
        } else if (
          errorText.includes("503") ||
          errorText.includes("Service Unavailable")
        ) {
          addMessage(
            "The service is temporarily down for maintenance. Please try again later.",
            "assistant"
          );
        } else if (
          errorText.includes("timeout") ||
          errorText.includes("time out")
        ) {
          addMessage(
            "The request took too long to process. Please try again.",
            "assistant"
          );
        } else {
          addMessage(
            "Sorry, there was an error processing your request. Please try again.",
            "assistant"
          );
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      addMessage(
        "Sorry, there was an error connecting to the server. Please check your internet connection and try again.",
        "assistant"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:opacity-90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <IoClose className="w-6 h-6" />
        ) : (
          <IoChatbubbleEllipses className="w-6 h-6" />
        )}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <RiRobot2Line className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Qena DFC AI Assistant</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none w-14 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 text-white focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all cursor-pointer opacity-0"
                >
                  {CHAT_CONFIG.SUPPORTED_LANGUAGES.map((language) => (
                    <option
                      key={language}
                      value={language}
                      className="text-gray-800"
                    >
                      {language}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <span className="text-xs text-white/90 font-medium">
                    {CHAT_CONFIG.LANGUAGE_CODES[
                      selectedLanguage as keyof typeof CHAT_CONFIG.LANGUAGE_CODES
                    ] || "EN"}
                  </span>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                  <IoChevronDown className="w-3 h-3 text-white/70" />
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {isLoadingHistory && (
              <div className="flex justify-start">
                <div className="bg-primary/10 text-primary-800 px-4 py-2 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">
                      {CHAT_CONFIG.HISTORY_LOADING_MESSAGE}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : message.type === "system"
                      ? "bg-primary/10 text-primary-800 border border-primary/20"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "assistant" && (
                      <div className="bg-primary text-white rounded-full p-1 mt-1">
                        <RiRobot2Line className="w-3 h-3" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.type === "user" && (
                      <div className="bg-white/20 text-white rounded-full p-1 mt-1">
                        <RiUser3Line className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3 max-w-[80%] shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary text-white rounded-full p-1">
                      <RiRobot2Line className="w-3 h-3" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-end space-x-2">
              <div className="flex items-center justify-center relative w-full">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-transparent transition-all"
                  rows={1}
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-2 min-h-[40px] w-[40px] flex items-center justify-center transition-all hover:scale-105 -mt-4"
              >
                <IoArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
