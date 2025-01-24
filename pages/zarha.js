import { useState } from "react";
import { model } from "@/util/ai";
import { Button, Card, Spinner, TextInput, Label } from "flowbite-react";

const zarha = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateRecipe() {
    // show loading spinner
    setLoading(true);

    // prompt to generate a recipe using the user's input
    const prompt = `Create a recipe using these ingredients: ${ingredients}`;

    // fetch the response
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // update state and hide loading spinner
    setRecipe(aiResponse);
    setLoading(false);
  }
  // "Enter" key press to trigger generation
  function keyDown(e) {
    if (e.key === "Enter") {
      generateRecipe();
    }
  }
  return (
    <>
      <section className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-text-color">
          AI-Powered Recipe Generator
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
            {/* show a spinner while loading, or text otherwise */}
            {loading ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              "Generate Recipe"
            )}
          </Button>
        </div>
        {recipe && (
          <Card className="mt-6 w-full m-w-lg bg-bg-color">
            <h2 className="text-xl font-semibold text-text-color">
              Your AI-Generated Recipe
            </h2>
            <p className="text-text-color whitespace-pre-wrap">{recipe}</p>
          </Card>
        )}
      </section>
    </>
  );
};

export default zarha;
