import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Example } from "../models/example.model.js";

// function to get all the examples from the database
// sends the examples as a response in json format
const getExample = asyncHandler(async (req, res) => {
  Example.find()
    .then((example) => res.json(example))
    .catch((err) => res.status(400).json("Error: " + err));
});

// function to register an example in the database and send a response back to the frontend
const registerExample = asyncHandler(async (req, res) => {
  // get details from frontend (req.body)
  // validation - not empty
  // create example object - crete entry in db
  // check for example cretion
  // return res

  const { example } = req.body;
  console.log(example);
  if (example.trim() === "") {
    throw new ApiError(400, "example is required");
  }

  const newExample = await Example.create({
    example: example.toLowerCase(),
  });

  const createdExample = await Example.findById(newExample._id);

  if (!createdExample) {
    throw new ApiError(500, "Something went wrong, example not created");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdExample, "Example registered Successfully")
    );

  // Redirect to another website or page
  // res.redirect("https://noteify-xi.vercel.app/");
});

export { getExample, registerExample };
