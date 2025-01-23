import { model } from "@/util/ai";
import { useState } from "react";

export default function Robin() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const answerText = result.response.text();
    setAnswer(answerText);
  }

  return (
    <div>
      <h2>Robin</h2>

      <input
        className="border border-gray-500"
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={sendPrompt}>Send</button>
      <p>{answer}</p>
    </div>
  );
}
