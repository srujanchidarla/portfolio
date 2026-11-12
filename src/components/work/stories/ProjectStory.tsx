"use client";

import type { ComponentType } from "react";
import { STORY_TITLES } from "@/lib/case-stories";
import ScrollStory, { type StoryStep } from "./ScrollStory";
import AlgoOutage from "./AlgoOutage";
import WildmatePaste from "./WildmatePaste";
import JobHuntFlow from "./JobHuntFlow";
import NeocortexChain from "./NeocortexChain";
import AgriSeason from "./AgriSeason";
import StudyShortlist from "./StudyShortlist";

type Story = { steps: StoryStep[]; Visual: ComponentType };

/** One scroll story per project, each built around what that project is actually about. */
const STORIES: Record<string, Story> = {
  algochronicle: {
    Visual: AlgoOutage,
    steps: [
      {
        title: "Every visit hit the server",
        text: "Pages rendered on every request, every open tab held a live listener, and a cron job ran its full pass four times an hour.",
      },
      {
        title: "Paused by Vercel",
        text: "Server CPU crossed the free plan's 4-hour limit and the site went offline.",
      },
      {
        title: "Cache the page, personalise after",
        text: "Everyone gets the same cached page; streaks, due reviews and plan status fill in in the browser.",
      },
      {
        title: "~2 ms from the edge",
        text: "Jobs became idempotent and the leaderboard one document. Repeat views went from ~290 ms of server work to ~2 ms.",
      },
    ],
  },
  campfirechai: {
    Visual: WildmatePaste,
    steps: [
      {
        title: "Paste the mess",
        text: "A trip usually starts as half a sentence in a group chat. Magic Paste takes it exactly as written.",
      },
      {
        title: "Pull out the plan",
        text: "A model turns it into stops, times and to-dos. If one provider fails, the next in the chain answers.",
      },
      {
        title: "Put it on the map",
        text: "Each stop is geocoded, so the itinerary becomes a route instead of a paragraph.",
      },
      {
        title: "Hand it to the crew",
        text: "Chat, gear, carpools and permits all hang off the same trip, live over Socket.io.",
      },
    ],
  },
  jobhuntos: {
    Visual: JobHuntFlow,
    steps: [
      {
        title: "Read the posting",
        text: "Fit analysis streams back over SSE while you are still reading, not after a full report.",
      },
      {
        title: "Shape the resume",
        text: "The experience that matches the role moves to the top before anything is sent.",
      },
      {
        title: "Fill the form",
        text: "Content scripts scan the page, shadow DOM included, and fill LinkedIn, Greenhouse, Workday or Lever fields.",
      },
      {
        title: "Done, privately",
        text: "Bring-your-own-key: the model account stays with the person applying, not with me.",
      },
    ],
  },
  neocortex: {
    Visual: NeocortexChain,
    steps: [
      {
        title: "Jarvis asks for the morning brief",
        text: "One request to plan the day from sleep, training, calendar and job search.",
      },
      {
        title: "The first provider fails",
        text: "A timeout or a rate limit. In most apps, that is an error screen.",
      },
      {
        title: "The chain answers anyway",
        text: "The request falls to the next of six providers, and the plan still arrives.",
      },
      {
        title: "Each agent takes its part",
        text: "Every agent owns one domain and has its own kill switch, so one can be paused without stopping the rest.",
      },
    ],
  },
  agriwise: {
    Visual: AgriSeason,
    steps: [
      {
        title: "Start with the soil",
        text: "Soil and crop guidance says what is worth growing on this field.",
      },
      {
        title: "Plan the season",
        text: "A cultivation calendar with weather alerts turns that choice into dated work.",
      },
      {
        title: "Know when to sell",
        text: "Prices and 30-day forecasts across 2,500+ mandis show where and when the harvest is worth most.",
      },
      {
        title: "Find the money",
        text: "Loan and government-scheme navigation, in 22 Indian languages, closes the loop.",
      },
    ],
  },
  studyglobal: {
    Visual: StudyShortlist,
    steps: [
      {
        title: "Start from the subject",
        text: "Not from a country. What you want to study narrows the field first.",
      },
      {
        title: "Then the budget",
        text: "Destinations outside what you can pay for drop away.",
      },
      {
        title: "Then what matters to you",
        text: "Work rights, language, climate. The result is a shortlist, not a verdict.",
      },
      {
        title: "Cost the first year",
        text: "Living, net tuition and the first-month setup bill, so the number is more than rent.",
      },
    ],
  },
};

export default function ProjectStory({ id }: { id: string }) {
  const story = STORIES[id];
  if (!story) return null;
  const { Visual } = story;
  return (
    <ScrollStory label={STORY_TITLES[id] ?? "In motion"} steps={story.steps}>
      <Visual />
    </ScrollStory>
  );
}
