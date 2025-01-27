import { model } from "@/util/ai";
import { useState } from "react";
import { Button, Label, TextInput, Spinner, Card, List } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

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
    <div className="flex justify-center items-center min-h-[60vh] flex-col px-4 sm:px-6">
      <div className="mb-4">
        <h1 className="text-text-color font-bold ml-0.5 text-2xl sm:text-3xl my-2">
          Matinspiration
        </h1>
        <Label
          htmlFor="ai-question"
          value="Vad är du sugen på att laga?"
          className="ml-1 font-semibold text-base sm:text-lg text-teal-500"
        />
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full">
          <TextInput
            id="ai-question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={keyDown}
            type="text"
            placeholder="Skriv något, t.ex. kyckling, Japanskt..."
            className="w-full sm:w-[400px]"
          />
          <Button
            onClick={sendPrompt}
            gradientMonochrome="teal"
            className="w-full sm:w-auto px-3"
          >
            <HiOutlineArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <Spinner size="lg" color="info" aria-label="Loading spinner" />
        </div>
      )}

      {!loading && recipe && (
        <div className="flex flex-col lg:flex-row w-full max-w-4xl gap-4 lg:gap-6">
          <div className="w-full lg:w-2/4 mb-6 lg:mb-20">
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

          <div className="w-full lg:w-4/5 mb-20">
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
