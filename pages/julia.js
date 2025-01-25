import { model } from "@/util/ai";
import { Button, Spinner, Card, TextInput } from "flowbite-react";
import { useState } from "react";

function AiQuestions() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputVisible, setInputVisible] = useState(true); // To control visibility of the input

  // List of mathematical equation keywords
  const mathKeywords = [
    "equation",
    "algebra",
    "calculus",
    "geometry",
    "math",
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "integer",
    "fraction",
    "function",
    "derivative",
    "integral",
    "limit",
    "matrix",
    "vector",
    "theorem",
    "solve",
    "graph",
    "quadratic",
    "probability",
    "statistics",
    // Add symbols and mathematical terms
    "x", // Multiplication variable
    "y", // Common variable in math
    "z", // Common variable in math
    "%",
    "/",
    "*",
    "+",
    "-",
    "=",
    "<",
    ">",
    "^", // Exponentiation
    "sqrt", // Square root
    "log", // Logarithm
    "ln", // Natural logarithm
    "pi", // Pi constant
    "e", // Euler's number
    "sin", // Sine function
    "cos", // Cosine function
    "tan", // Tangent function
    "log10", // Base-10 logarithm
    "tan^-1", // Inverse tangent (arctan)
    "log2", // Base-2 logarithm
  ];

  // Function to check if the prompt contains mathematical-keywords
  function containsMathKeywords(input) {
    return mathKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );
  }

  // Function to send the prompt to the AI model
  async function sendPrompt() {
    setLoading(true);
    if (!containsMathKeywords(prompt)) {
      setAnswer("Sorry, I can only provide math problems");
      setLoading(false);
      return;
    }

    // If the prompt is mathematicalal, send it to the model
    try {
      const result = await model.generateContent(prompt);
      setAnswer(result.response.text());
    } catch (error) {
      setAnswer("There was an error generating the answere. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  }
  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendPrompt();
    }
  };

  // Reset the input when the user focuses on the input field to type a new question
  const handleFocus = () => {
    setPrompt(""); // Clear the previous prompt
    setInputVisible(true); // Ensure the input is visible if it's hidden
  };

  return (
    <>
      <section className="flex items-center justify-center mt-8 ">
        <div className="w-full max-w-md text-center">
          <h1 className="font-bold text-2xl text-text-color">
            Ask me a mathematical equation
          </h1>
          {inputVisible && (
            <TextInput
              className="mt-4 w-full p-2 rounded"
              type="text"
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={handleFocus} // Reset when the user clicks to type
              value={prompt}
              placeholder="eg. 'Solve for x in the equation 3x + 5 = 11'"
            />
          )}
          <Button
            className="mt-4 w-full"
            gradientDuoTone="purpleToBlue"
            onClick={sendPrompt}
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" className="mr-2" color="pink" />
            ) : (
              "Solve the equation"
            )}
          </Button>
          {answer && (
            <section>
              <Card className="mt-6 w-full m-w-lg bg-bg-color">
                <p className=" text-text-color">{answer}</p>
              </Card>
            </section>
          )}
        </div>
      </section>
    </>
  );
}

const juliaComponent = () => {
  return (
    <>
      <section className=" mt-10 flex flex-col justify-center items-center">
        <AiQuestions />
      </section>
    </>
  );
};

export default juliaComponent;
