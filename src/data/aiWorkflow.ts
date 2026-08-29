export type AITool = {
  id: string;
  name: string;
  shortLabel: string;
  color: string;
  icon: string;
};

export type WorkflowStage = {
  title: string;
  toolIds: string[];
  outputs: string[];
};

export const aiTools: AITool[] = [
  { id: "miro", name: "Miro", shortLabel: "M", color: "#ffd633", icon: "" },
  { id: "openai", name: "OpenAI", shortLabel: "AI", color: "#e8ecea", icon: "" },
  { id: "n8n", name: "n8n", shortLabel: "N", color: "#ff6d5a", icon: "" },
  { id: "figma", name: "Figma", shortLabel: "F", color: "#a259ff", icon: "" },
  { id: "framer", name: "Framer", shortLabel: "Fr", color: "#ff3158", icon: "" },
  { id: "webflow", name: "Webflow", shortLabel: "W", color: "#146ef5", icon: "" },
  { id: "relume", name: "Relume", shortLabel: "R", color: "#8f63ff", icon: "" },
  { id: "claude", name: "Claude", shortLabel: "C", color: "#d97757", icon: "" },
  { id: "squarespace", name: "Squarespace", shortLabel: "S", color: "#f2f2f2", icon: "" },
  { id: "midjourney", name: "Midjourney", shortLabel: "MJ", color: "#d8e8f2", icon: "" },
  { id: "gemini", name: "Gemini", shortLabel: "G", color: "#5aa7ff", icon: "" },
  { id: "cursor", name: "Cursor", shortLabel: "Cu", color: "#eeeeee", icon: "" },
  { id: "bolt", name: "Bolt", shortLabel: "B", color: "#46e78d", icon: "" },
  { id: "v0", name: "v0", shortLabel: "v0", color: "#f3f3f3", icon: "" },
  { id: "zapier", name: "Zapier", shortLabel: "Z", color: "#ff5a00", icon: "" },
  { id: "linear", name: "Linear", shortLabel: "L", color: "#8c8cff", icon: "" },
];

export const topMarqueeTools = [
  "squarespace", "miro", "openai", "n8n", "cursor", "figma", "framer", "webflow",
  "claude", "relume", "midjourney", "gemini", "zapier", "linear", "bolt", "v0",
];

export const bottomMarqueeTools = [
  "bolt", "linear", "v0", "cursor", "relume", "midjourney", "gemini", "zapier",
  "webflow", "claude", "framer", "figma", "openai", "miro", "n8n", "squarespace",
];

export const workflowStages: WorkflowStage[] = [
  {
    title: "Discover & Strategy",
    toolIds: ["claude", "miro", "openai"],
    outputs: ["Discovery Report", "User Personas", "Content Hierarchy"],
  },
  {
    title: "Design",
    toolIds: ["figma", "cursor", "framer", "openai"],
    outputs: ["Visual Direction", "UI Screens", "Design System"],
  },
  {
    title: "Build",
    toolIds: ["webflow", "bolt", "relume", "v0"],
    outputs: ["Codebase", "CMS Integration", "Component Docs"],
  },
  {
    title: "Optimise",
    toolIds: ["zapier", "claude", "openai"],
    outputs: ["CRO Recommendations", "A/B Test Plan", "Launch Report"],
  },
];
