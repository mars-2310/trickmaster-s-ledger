import WebSocket, { WebSocketServer } from "ws";
import fetch from "node-fetch";

interface ClientEvent {
  event: string;
}

interface TranscriptEvent {
  event: string;
  text: string;
  isFinal: boolean;
}

const HF_API_KEY = process.env.HF_API_KEY!;
const MODEL = "openai/whisper-small";

const wss = new WebSocketServer({ port: 8765, maxPayload: 32 * 1024 * 1024 });

console.log("Hugging Face WS running ws://localhost:8765");

wss.on("connection", (ws: WebSocket) => {
  let buffer: Buffer[] = [];

  ws.on("message", async (message: WebSocket.RawData) => {
    if (Buffer.isBuffer(message)) {
      buffer.push(message);
    } else {
      try {
        const event: ClientEvent = JSON.parse(message.toString());
        if (event.event === "end") {
          const audioBuffer = Buffer.concat(buffer);
          const transcript = await transcribeAudio(audioBuffer);

          const response: TranscriptEvent = {
            event: "transcript",
            text: transcript,
            isFinal: true,
          };
          ws.send(JSON.stringify(response));

          buffer = [];
        }
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }
    }
  });

  ws.on("close", () => {
    buffer = [];
  });
});

async function transcribeAudio(audio: Buffer): Promise<string> {
  
  const uint8Array = new Uint8Array(audio);

  const blob = new Blob([uint8Array], { type: "audio/wav" });

  const formData = new FormData();
  formData.append("file", blob, "audio.wav");

  const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
    },
    body: formData as any,
  });

  const data: any = await response.json().catch(() => ({}));

  if (data?.error) {
    console.error("Hugging Face error:", data.error);
    return "";
  }

  if (Array.isArray(data)) return data[0]?.text ?? "";
  if (typeof data.text === "string") return data.text;
  return "";
}

