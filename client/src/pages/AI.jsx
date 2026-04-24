import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { Layout } from '../components/Layout';
import { LoadingSpinner } from '../components/Common';

// Parse markdown formatting in text
const parseMarkdown = (text) => {
  // Split by newlines first
  const lines = text.split('\n');
  const elements = [];

  lines.forEach((line, lineIndex) => {
    let lastIndex = 0;
    const regex = /\*\*(.*?)\*\*/g;
    let match;

    const lineElements = [];

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        lineElements.push(line.substring(lastIndex, match.index));
      }
      lineElements.push(
        <strong key={`${lineIndex}-${match.index}`}>{match[1]}</strong>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      lineElements.push(line.substring(lastIndex));
    }

    if (lineElements.length > 0) {
      elements.push(...lineElements);
    }
    
    if (lineIndex < lines.length - 1) {
      elements.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return elements.length > 0 ? elements : text;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestions = [
    'What products are low on stock?',
    'Show this month\'s total revenue',
    'How many orders are pending?',
    'Which department has the most employees?',
  ];

  const handleSendMessage = async (question) => {
    if (!question.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/ai/query', { question });
      const aiMessage = { type: 'ai', text: response.data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Check if error response has an answer (fallback response)
      const answer = error.response?.data?.answer || 'Sorry, I encountered an error. Please try again.';
      const errorMessage = {
        type: 'ai',
        text: answer,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto h-[calc(100vh-150px)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
          <p className="text-slate-600 text-sm mt-1">Ask questions about your business</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-lg border border-slate-200 p-6 mb-6 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-4xl mb-4">⬢</div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">Start a conversation</h2>
              <p className="text-slate-600 mb-8">
                Ask questions about inventory, orders, revenue, employees, and more.
              </p>

              {/* Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="p-4 text-left bg-slate-50 hover:bg-teal-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg leading-relaxed ${
                  message.type === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                {parseMarkdown(message.text)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg">
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleSendMessage(input);
                }
              }}
              placeholder="Ask about your business..."
              disabled={loading}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none disabled:bg-slate-100"
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={loading || !input.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
