import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { FaSquare } from "react-icons/fa";
import { AiOutlineAudio } from "react-icons/ai";
import FramedImage from "./FrameImage";



type Message = {
  role: "user" | "assistant";
  content: string;
};

function App() {
  const {
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [history, setHistory] = useState<Message[]>([]);

  const handleClickStart = () => {
    SpeechRecognition.startListening();
  };

  const handleClickStop = () => {
    SpeechRecognition.stopListening;
    resetTranscript();
    sendGPT(transcript); // ChatGPTに送る
  };

  const sendGPT = async (message: string) => {
    const body = JSON.stringify({
      messages: [...history, { role: "user", content: message }],
      model: "gpt-4o", // GPT-4oを使用
    });
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body,
    });

    const playVoice = async (message: string) => {
      const response = await fetch(
        `https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${
          import.meta.env.VITE_VOICEVOX_API_KEY
        }&speaker=0&pitch=0&intonationScale=1&speed=1&text=${message}`
      );

      const blob = await response.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();
    };

    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }

    const data = await response.json();
    const choice = data.choices[0].message.content;

    setHistory([...history, { role: "assistant", content: choice }]);
    playVoice(choice);
  };

  const buttonClasses = `mt-4 w-[60px] h-[60px] flex items-center justify-center text-2xl ${
    listening ? "bg-red-500" : "bg-blue-500"
  } rounded-full text-white`;
  const iconClass = listening ? <FaSquare /> : <AiOutlineAudio />;

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-screen">
        <img
          src="https://ucarecdn.com/b6b3f827-c521-4835-a7d4-5db0c87c9818/-/format/auto/"
          alt="キャラクターの画像"
          className="w-full h-auto sm:w-full object-cover"
        />
        <div className="w-full max-w-[400px] sm:max-w-full sm:px-4 mt-4">
          <FramedImage
            characterName="ずんだもん"
            dialogueText={
              history[history.length - 1]
                ? history[history.length - 1].content
                : ""
            }
          />
        </div>
        {listening ? (
          <button onClick={handleClickStop} className={buttonClasses}>
            <i>{iconClass}</i>
          </button>
        ) : (
          <button onClick={handleClickStart} className={buttonClasses}>
            <i>{iconClass}</i>
          </button>
        )}
      </div>
    </>
  );
}

export default App;
