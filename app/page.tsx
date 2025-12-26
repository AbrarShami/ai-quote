"use client"

import { useState } from "react";
import QuoteCard from "./components/QuoteCard";
import Tone from "./components/Tone";
import Button from "./components/Button";

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
      setError((err as Error).message || "Something went wrong!");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        ✨ AI Quote Generator
      </h1>

      <Tone tone={tone} setTone={setTone} />

      <Button handleGenerateQuote={handleGenerateQuote} isLoading={isLoading} />

      <QuoteCard quote={quote} error={error} />

      <p className="mt-8 text-gray-500 text-sm">
        AI Quote generator built with Next.js and OpenAI API | Developed by {''}
        <a
          href="https://github.com/AbrarShami"
          className="text-purple-600 hover:underline"
        >
          Abrar Shami
        </a>
      </p>
    </div>
  );
}
