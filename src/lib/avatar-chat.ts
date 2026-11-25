/**
 * Client-safe pieces of the avatar chat (types, suggestions, greeting).
 * The prompt, knowledge base and offline answers live in `avatar-chat-server.ts`,
 * so they never ship in the browser bundle.
 */

export type VisitorType = "recruiter" | "visitor";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const RECRUITER_SUGGESTIONS = [
  "What's your background?",
  "Tell me about AlgoChronicle",
  "What's your tech stack?",
  "How do I reach you?",
] as const;

export const VISITOR_SUGGESTIONS = [
  "Show me your best projects",
  "What's your story?",
  "What are you building now?",
  "What do you do off the keyboard?",
] as const;

export function getSuggestions(visitorType: VisitorType): readonly string[] {
  return visitorType === "recruiter" ? RECRUITER_SUGGESTIONS : VISITOR_SUGGESTIONS;
}

export const WELCOME_MESSAGES: Record<VisitorType, string> = {
  recruiter: `Hi, I'm **Code Avatar Srujan**, Srujan's AI guide. He's a **software engineer** (MS CS, Aug 2026, **4.0 GPA**) with three years at Cognizant on systems handling **2M+ requests a day**, and the founder of **AlgoChronicle**, now on the App Store.

Ask about his projects, experience, skills, or how to reach him.`,
  visitor: `Hey! I'm **Code Avatar Srujan**, here to show you around Srujan's work.

Ask about his projects, his story, his stack, or what he does off the keyboard.`,
};

export function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
