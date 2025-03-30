import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import multer from "multer";
import path from "path"; 

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "Vishnu",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const __dirname = path.resolve();

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);

const schema = {
  description: "Emergency assistance output based on user symptoms, gender, and age",
  type: SchemaType.OBJECT,
  properties: {
    possibleConditions: {
      type: SchemaType.ARRAY,
      description: "List of possible conditions based on symptoms",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          conditionName: {
            type: SchemaType.STRING,
            description: "Name of the possible medical condition",
            nullable: false,
          },
          severity: {
            type: SchemaType.STRING,
            description: "Severity level of the condition",
            enum: ["Mild", "Moderate", "Severe"],
            nullable: false,
          },
        },
        required: ["conditionName", "severity"],
      },
    },
    recommendedActions: {
      type: SchemaType.ARRAY,
      description: "Suggested actions to take based on symptoms",
      items: {
        type: SchemaType.STRING,
      },
    },
  },
  required: ["possibleConditions", "recommendedActions"],
};

///////////////////////////////////////////////////////////////////////////////////


const medicationSchema = {
  description: "Schema defining the structure of medication recommendations based on user input, including symptoms, medical history, and preferences.",
  type: SchemaType.OBJECT,
  properties: {
    medicinesSuggested: {
      type: SchemaType.ARRAY,
      description: "An array containing details of recommended medicines tailored to the user's symptoms and medical profile in simple terms.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          medicineName: {
            type: SchemaType.STRING,
            description: "The name of the prescribed or recommended medicine in simple terms.",
            nullable: false,
          },
          dosage: {
            type: SchemaType.STRING,
            description: "The recommended dosage of the medicine, including quantity and frequency (e.g., 500mg twice a day) in simple terms.",
            nullable: false,
          },
          sideEffects: {
            type: SchemaType.ARRAY,
            description: "A list of potential side effects that may occur from taking the medicine in simpl terms.",
            items: {
              type: SchemaType.STRING,
            },
          },
        },
        required: ["medicineName", "dosage", "sideEffects"],
      },
    },
    medicationTypeSuggestion: {
      type: SchemaType.OBJECT,
      description: "A structured recommendation on the most suitable type of medication (Allopathy, Homeopathy, or Ayurvedic) for the user, based on their input in simple terms.",
      properties: {
        recommendedType: {
          type: SchemaType.STRING,
          description: "The category of medication that best suits the user's condition and preferences in simple terms. It is not necessary that the user choosen medicine type is the best recommended",
          enum: ["English Medication", "Homeopathy", "Ayurvedic"],
          nullable: false,
        },
        explanation: {
          type: SchemaType.STRING,
          description: "A detailed justification for why the recommended medication type is suitable, considering the user's symptoms, lifestyle, and medical history in simple terms.",
          nullable: false,
        },
      },
      required: ["recommendedType", "explanation"],
    },
  },
  required: ["medicinesSuggested", "medicationTypeSuggestion"],
};



////////////////////////////////////////////////////////////////////////////////////


const medicationSchemaImage = {
  description: "Schema defining the structure of medication recommendations based on user input, including symptoms, medical history, and preferences.",
  type: SchemaType.OBJECT,
  properties: {
    medicinesSuggested: {
      type: SchemaType.ARRAY,
      description: "An array containing details of recommended medicines tailored to the user's symptoms and medical profile in simple terms.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          medicineName: {
            type: SchemaType.STRING,
            description: "The name of the prescribed or recommended medicine in simple terms.",
            nullable: false,
          },
          medicineType: {
            type: SchemaType.STRING,
            description: "The type of medicine (Syrup, Tablet, or Cream).",
            enum: ["Syrup", "Tablet", "Cream"], // ✅ Enum for fixed values
            nullable: false,
          },
          dosage: {
            type: SchemaType.STRING,
            description: "The recommended dosage of the medicine, including quantity and frequency (e.g., 500mg twice a day) in simple terms.",
            nullable: false,
          },
          sideEffects: {
            type: SchemaType.ARRAY,
            description: "A list of potential side effects that may occur from taking the medicine in simple terms.",
            items: {
              type: SchemaType.STRING,
            },
          },
        },
        required: ["medicineName", "medicineType", "dosage", "sideEffects"], // ✅ Added "medicineType" to required fields
      },
    },
  },
  required: ["medicinesSuggested"],
};





/////////////////////////////////////////////////////////////////////////////////////


const healthRiskSchema = {
  description: "Schema defining potential health risks and lifestyle recommendations based on user health data.",
  type: SchemaType.OBJECT,
  properties: {
    potentialRisks: {
      type: SchemaType.ARRAY,
      description: "An array containing potential disease risks based on health data.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          diseaseName: {
            type: SchemaType.STRING,
            description: "The name of the disease that the user may be at risk for.",
            nullable: false,
          },
          riskFactor: {
            type: SchemaType.ARRAY,
            description: "A computes risk score contributing to the user's risk for this disease.",
            items: {
              type: SchemaType.STRING,
            },
          }
        },
        required: ["diseaseName", "riskFactor"],
      }
    },
    lifestyleRecommendations: {
      type: SchemaType.ARRAY,
      description: "An array of lifestyle recommendations to reduce health risks.",
      items: {
        type: SchemaType.STRING,
        description: "A recommended lifestyle change such as diet, exercise, or habits.",
      }
    }
  },
  required: ["potentialRisks", "lifestyleRecommendations"]
};




///////////////////////////////////////////////////////////////////////////////////////////////


app.post("/api/generate", async (req, res) => {
  try {
    const { symptoms, gender, age ,healthCondition} = req.body;

    if (!symptoms || !gender || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const prompt = `Patient Details: Gender: ${gender}, Age: ${age}. Symptoms: ${symptoms},Previous Health Conditions : ${healthCondition}.
                    Provide a possible emergency assistance based on these details in easy understanding language in JSON format only.`;

    const result = await model.generateContent(prompt);

    // ✅ Ensure Correct Extraction from AI Response
    const rawResponse = result.response.candidates[0]?.content?.parts[0]?.text;

    if (!rawResponse) {
      return res.status(500).json({ error: "No response received from AI" });
    }

    // ✅ Ensure it is parsed correctly into JSON
    let aiResponse;
    try {
      aiResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return res.status(500).json({ error: "Invalid JSON received from AI" });
    }

    console.log(aiResponse);
    res.json({ diagnosis: aiResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate diagnosis" });
  }
});


////////////////////////////////////////////////////////////////////////////////////

app.post("/api/generateMedication",async (req,res) => {
  try {
    const {symptoms, age, weight, medicalAllergy, lifestyle, medicationType} = req.body;
    if(! symptoms || ! age || ! lifestyle || ! medicationType) {
      return res.status(400).json({error : "Symptoms, Age, LifeStyle, medicationType are Required"});
    }
    const model = genAI.getGenerativeModel({
      model : "gemini-1.5-pro",
      generationConfig : {
        responseMimeType : "application/json",
        responseSchema : medicationSchema,
      },
    });
    const prompt = `Patient Details : Age : ${age}, Weight : ${weight}, Symptoms : ${symptoms}, Medical History and Allergies : ${medicalAllergy}. Provide a detailed Medication Report for the respective patient in ${medicationType} only who lives a ${lifestyle} life. Additionally provide which is the best suggestable medication type that can be used. Give in JSON Format only. `
    const result = await model.generateContent(prompt);
    console.log(result);

    const rawResponse = result.response.candidates[0]?.content?.parts[0]?.text;
    if(!rawResponse) {
      return res.status(500).json({error : "No Response received from AI"});
    }
    let aiResponse;
    try {
      aiResponse = JSON.parse(rawResponse);
    } catch (parseErrorrror) {
      console.log("JSON Parse Error : ",parseError);
      return res.status(500).json({error : "Invalid JSON Received from AI"});
    }
    console.log(aiResponse);
    res.json({diagnosis : aiResponse});
  } catch (error) {
    console.log("Error : ",error.message);
    return res.status(500).json({
      error : "Invalid JSON Format"
    })
  }
})

//////////////////////////////////////////////////////////////////////////////////

app.post("/api/generateMedicationFromImage", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.file || !description) {
      return res.status(400).json({ error: "Both Image File and Description are Required" });
    }

    // Convert Image to Base64 Format
    const base64Image = req.file.buffer.toString("base64");

    console.log("Received description:", description);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: medicationSchemaImage,
      },
    });

    const prompt = `Analyze the given Medical Image and the Description which is as follows: ${description}. Generate a Structured Medication Report in JSON Format`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType: req.file.mimetype, data: base64Image } },
    ]);

    // Handle AI Response
    const rawResponse = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawResponse) {
      return res.status(500).json({ error: "No Response received from AI" });
    }

    let aiResponse;
    try {
      aiResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.log("JSON Parse Error:", parseError);
      return res.status(500).json({ error: "Invalid JSON Received from AI" });
    }

    console.log("AI Diagnosis Response:", aiResponse);
    res.json({ diagnosis: aiResponse });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



////////////////////////////////////////////////////////////////////////////////////



app.post("/api/generateHealthRisk", async (req, res) => {
  try {
    const {qrText} = req.body

    console.log(qrText);

    if (!qrText) {
      return res.status(400).json({ error: "QR could not be scanned" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: healthRiskSchema,
      },
    });

    const prompt = `Analyze the following patient details:
    ${qrText}

    Return a structured JSON report with:
    1. **Potential health risks** (disease names and associated risk factors)
    2. **Lifestyle recommendations** (suggestions for better health)

    Strictly return the response in JSON format adhering to this schema:
    ${JSON.stringify(healthRiskSchema, null, 2)}
    `;


    console.log(prompt);

    const result = await model.generateContent(prompt);

    //console.log(result);

    // ✅ Ensure Correct Extraction from AI Response
    const rawResponse = result.response.candidates[0]?.content?.parts[0]?.text;

    console.log();

    if (!rawResponse) {
      return res.status(500).json({ error: "No response received from AI" });
    }

    // ✅ Ensure it is parsed correctly into JSON
    let aiResponse;
    try {
      aiResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return res.status(500).json({ error: "Invalid JSON received from AI" });
    }

    //console.log(aiResponse);
    res.json({ diagnosis: aiResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate diagnosis" });
  }
});


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
  app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  });
}








///////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`${port} Listening here`);
});









/*


  */
