import { useState } from "react";
import { model } from "@/util/ai";
import { Button, Card, Spinner, TextInput, Label } from "flowbite-react";

const zarha = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateRecipe() {
    setLoading(true);
    const prompt = `Create a recipe with these ingredients: ${ingredients}. Return only plain text without markdown or code blocks.`;
    try {
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      setRecipe(aiResponse);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Could not fetch recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      generateRecipe();
    }
  }

  return (
    <>
      <section className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-text-color">
          Recipe Generator
        </h1>
        <div className="w-full max-w-md">
          <Label
            htmlFor="ingredients"
            value="Enter ingredients (separate with commas):"
            className="text-text-color"
          />
          <TextInput
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={keyDown}
            placeholder="e.g tomato, pasta, cheese"
            className="mt-2"
          />
          <Button
            onClick={generateRecipe}
            gradientDuoTone="purpleToPink"
            className="mt-4 w-full"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              "Generate Recipe"
            )}
          </Button>
        </div>
        {recipe && (
          <Card className="mt-6 w-full max-w-lg bg-white shadow-lg p-6 border border-pink-200 text-center">
            <h2 className="text-xl font-semibold text-pink-600">Recipe</h2>
            <p className="text-gray-700 whitespace-pre-wrap text-left">
              {recipe}
            </p>
          </Card>
        )}
      </section>
    </>
  );
};

export default zarha;
