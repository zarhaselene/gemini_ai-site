import { model } from "@/util/ai";
import { useState } from "react";
import { Button, Label, TextInput, Spinner, Card, List } from "flowbite-react";

const startPrompt =
  "Ge mig ett recept på en maträtt, gärna olika varje gång, på svenska, som JSON. Svaret ska alltid ha exakt följande struktur: " +
  '{ "namn": "<Maträttens namn>", "ingredienser": ["<Ingrediens 1>", "<Ingrediens 2>", "..."], "tid": "<Tillagningstid>", "steg": ["<Steg 1>", "<Steg 2>", "..."] }. ' +
  "Anpassa receptet baserat på följande input: ";

export default function Robin() {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim()) {
      return;
    }
    setLoading(true);
    try {
      const result = await model.generateContent(startPrompt + prompt);

      let responseText = result.response.text();
      console.log("Raw response:", responseText);

      responseText = responseText
        .trim()
        .replace(/^```json/, "")
        .replace(/```$/, "");
      console.log("Raw response from API:", responseText);
      const recipeData = JSON.parse(responseText);

      setRecipe(recipeData);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe({
        namn: "Fel",
        ingredienser: [],
        tid: "Fel",
        steg: ["Kunde inte hämta recept. Försök igen."],
      });
    } finally {
      setLoading(false);
    }
    setPrompt("");
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      sendPrompt();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] flex-col">
      <div className="mb-4">
        <Label
          htmlFor="ai-question"
          value="Vad är du sugen på att laga?"
          className="ml-1 font-semibold text-xl text-teal-400"
        />
        <div className="flex gap-4 mt-2">
          <TextInput
            id="ai-question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={keyDown}
            type="text"
            placeholder="Skriv något, t.ex. kyckling, Japanskt..."
            className="w-[300px]"
          />
          <Button onClick={sendPrompt} gradientMonochrome="teal">
            Skicka
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <Spinner size="lg" color="info" aria-label="Loading spinner" />
        </div>
      )}

      {!loading && recipe && (
        <div className="flex w-full max-w-4xl gap-6">
          <div className="w-2/4 mb-20">
            <Card className="bg-gradient-to-br from-teal-700 to-teal-300 text-white border-cyan-700">
              <h2 className="text-xl font-bold text-gray-900">{recipe.namn}</h2>
              <p className="text-gray-900">Tid: {recipe.tid}</p>
              <h3 className="text-lg font-semibold mt-2 text-gray-900">
                Ingredienser:
              </h3>
              <List className="text-gray-900 font-semibold list-outside px-3">
                {recipe.ingredienser.map((item, index) => (
                  <List.Item key={index} className="px-2 py-1">
                    {item}
                  </List.Item>
                ))}
              </List>
            </Card>
          </div>

          <div className="w-4/5">
            <Card className="bg-gradient-to-br from-teal-300 to-teal-700 text-white border-cyan-700">
              <h3 className="text-lg font-semibold text-gray-900">Steg:</h3>
              <List
                ordered
                className="text-gray-900 font-semibold list-outside px-3"
              >
                {recipe.steg.map((step, index) => (
                  <List.Item key={index} className="px-2 py-1">
                    {step}
                  </List.Item>
                ))}
              </List>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
