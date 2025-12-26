"use client"
import Image from "next/image";
import { useState } from "react";
import QuoteCard from "./components/QuoteCard";
import Tone from "./components/Tone";


// Simple quote data organized by tone
const quotes = {
  motivational: [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Your limitation—it's only your imagination.",
    "Dream big and dare to fail.",
  ],
  funny: [
    "I'm not lazy, I'm on energy-saving mode.",
    "Life is short. Smile while you still have teeth.",
    "I followed my heart and it led me to the fridge.",
    "I'm not arguing, I'm just explaining why I'm right.",
    "Coffee: because adulting is hard.",
  ],
  inspirational: [
    "Every moment is a fresh beginning.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In the middle of difficulty lies opportunity.",
    "What we think, we become.",
    "The journey of a thousand miles begins with one step.",
  ],
};

// Function to get a random quote based on tone
function getRandomQuote(tone: string): string {
  const quoteList = quotes[tone as keyof typeof quotes];
  const randomIndex = Math.floor(Math.random() * quoteList.length);
  return quoteList[randomIndex];
}

export default function Home() {
  const [quote, setQuote] = useState("");
  const [tone, setTone] = useState("motivational");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleGenerateQuote = async () => {

    try {
      setError("");
      setQuote("");
      setIsLoading(true);
      const res = await fetch("/api/genrateQuote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tone }),
      });
      const data = await res.json();
      setQuote(data.quote);
      setIsLoading(false);

      if (!res.ok) {
        throw new Error(data.error);
      }
      setIsLoading(false);
      setQuote(data.quote);
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      {/* Main heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        ✨ AI Quote Generator
      </h1>

      {/* Tone selector dropdown */}

      <Tone tone={tone} setTone={setTone} />
      {/* Generate button */}
      <button
        onClick={handleGenerateQuote}
        disabled={isLoading}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors mb-8"
      >
        {isLoading ? "Loading..." : "Generate Quote"}
      </button>

      {/* Quote display area */}
      <QuoteCard quote={quote} error={error} />

      {/* Footer */}
      <p className="mt-8 text-gray-500 text-sm">
        AI Quote generator built with Next.js and OpenAI API.
      </p>
    </div>
  );
}
