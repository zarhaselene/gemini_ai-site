import { model } from "@/util/ai";
import { useState } from "react";

export default function SimpleAIChat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const answerText = await result.response.text();
    setAnswer(answerText);
    setPrompt("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">AI Chat</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question..."
        className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={sendPrompt}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
      {answer && (
        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50">
          <h2 className="font-bold">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
