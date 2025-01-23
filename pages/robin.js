import { model } from "@/util/ai";
import { useState } from "react";

export default function Robin() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const answerText = result.response.text();
    setAnswer(answerText);
    setPrompt("");
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      sendPrompt();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] flex-col">
      <h2 className="mb-5 text-xl">Robin</h2>

      <div class="mb-6">
        <label for="ai-question" class="mr-5 font-medium text-gray-500">
          Ask AI
        </label>
        <div className="flex items-center justify-center">
          <input
            type="text"
            id="ai-question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={keyDown}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  "
          />

          <button
            type="button"
            onClick={sendPrompt}
            class="ml-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Send
          </button>
        </div>
      </div>
      <div className="max-w-[400px]">
        <p>{answer}</p>
      </div>
    </div>
  );
}
