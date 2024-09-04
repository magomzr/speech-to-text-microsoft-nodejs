import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [recognizer, setRecognizer] = useState(null);

  const config = {
    key: "", // a1b2c3d4e5f6g7h8i9j0
    region: "", // westus, eastus, westus2, eastus2
    speechRecognitionLanguage: "", // en-US, es-ES, fr-FR, es-CO
  };
  const { key, region, speechRecognitionLanguage } = config;

  const startRecognition = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = speechRecognitionLanguage;

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizeOnceAsync(async (result) => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        console.log("Recognized Speech:", result.text);
        setTranscript(result.text);
      } else {
        console.error("Speech recognition error: ", result.errorDetails);
      }
      recognizer.close();
    });

    setRecognizer(recognizer);
  };

  const stopRecognition = () => {
    if (recognizer) {
      recognizer.close();
      setRecognizer(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Speech to Text</h1>
      <button onClick={startRecognition}>Start Recognition</button>
      <button onClick={stopRecognition} style={{ marginLeft: "10px" }}>
        Stop Recognition
      </button>
      <div style={{ marginTop: "20px", fontSize: "20px" }}>
        <strong>Transcript:</strong> {transcript}
      </div>
    </div>
  );
};

export default App;
