import { NextResponse } from "next/server";
import {
  AVATAR_CHAT_MODEL,
  buildSystemPrompt,
  getFallbackResponse,
  type VisitorType,
} from "@/lib/avatar-chat";

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  visitorType?: VisitorType;
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages, visitorType = "visitor" } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages required" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return NextResponse.json({ error: "User message required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      content: getFallbackResponse(lastUser.content, visitorType),
      fallback: true,
    });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: AVATAR_CHAT_MODEL,
        max_tokens: 1024,
        system: buildSystemPrompt(visitorType),
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json({
        content: getFallbackResponse(lastUser.content, visitorType),
        fallback: true,
      });
    }

    const data = await res.json();
    const content =
      data.content?.find((block: { type: string }) => block.type === "text")?.text ??
      getFallbackResponse(lastUser.content, visitorType);

    return NextResponse.json({ content, fallback: false });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      content: getFallbackResponse(lastUser.content, visitorType),
      fallback: true,
    });
  }
}
