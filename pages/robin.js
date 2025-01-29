import { model } from "@/util/ai";
import { useState } from "react";
import { Button, Label, TextInput, Spinner, Card, List } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

const startPrompt =
  "Give me a recipe for a dish, preferably a different one each time, measurements in metric , as JSON. The answer must always have the following exact structure: " +
  '{ "name": "<Dish name>", "ingredients": ["<Ingredient 1>", "<Ingredient 2>", "..."], "time": "<Cooking time>", "steps": ["<Step 1>", "<Step 2>", "..."] }.' +
  "Adapt the recipe based on the following input: ";

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
        name: "Error",
        ingredients: [],
        time: "Error",
        steps: ["Could not get recipe. Try again."],
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
      <div className="mb-8">
        <h1 className="text-text-color font-bold ml-0.5 text-2xl sm:text-3xl my-2">
          Meal Inspiration
        </h1>
        <Label
          htmlFor="ai-question"
          value="What do you feel like cooking?"
          className="ml-1 font-semibold text-base sm:text-lg text-teal-500"
        />
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full">
          <TextInput
            id="ai-question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={keyDown}
            type="text"
            placeholder="Write something, e.g., chicken, Japanese..."
            className="w-full sm:w-[370px] min-w-[300px]"
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
            <Card className="bg-gradient-to-br from-teal-700 to-teal-300 text-white border-none">
              <h2 className="text-xl font-bold text-gray-900">{recipe.name}</h2>
              <p className="text-gray-900">Time: {recipe.time}</p>
              <h3 className="text-lg font-semibold mt-2 text-gray-900">
                Ingredients:
              </h3>
              <List className="text-gray-900 font-semibold list-outside px-3">
                {recipe.ingredients.map((item, index) => (
                  <List.Item key={index} className="px-2 py-1">
                    {item}
                  </List.Item>
                ))}
              </List>
            </Card>
          </div>

          <div className="w-full lg:w-4/5 mb-20">
            <Card className="bg-gradient-to-br from-teal-300 to-teal-700 text-white border-none">
              <h3 className="text-lg font-semibold text-gray-900">Steps:</h3>
              <List
                ordered
                className="text-gray-900 font-semibold list-outside px-3"
              >
                {recipe.steps.map((step, index) => (
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
