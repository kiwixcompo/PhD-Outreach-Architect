"use client";

import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { Loader2, Link as LinkIcon, Sparkles, AlertCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const USER_PROFILE = `
Name: Williams Alfred Onen

Education:
- M.Sc Software Engineering, Nasarawa State University (2025)
- B.Sc Computer Science (Second Class Upper), Adamawa State University (2015)

Thesis & Academic Research:
Title: "Development of an Android App Based on Augmented Reality for Teaching Anatomy of the Human Heart"
- Explored the transformative potential of Augmented Reality (AR) in medical education and spatial comprehension.
- Used Unity Game Engine, Vuforia SDK (for robust marker-based tracking), C#, Blender 3D (for high-poly detailed heart modeling), and Android Studio.
- Addressed the limitations of traditional cadaver-based and 2D textbook learning by providing interactive 3D spatial visualization of the intricate heart structure. Optimized rendering performance and shaders for mobile devices.
- Employed a pragmatic research philosophy, utilizing an experimental design to evaluate the learning outcomes, memory retention, and user engagement amongst medical students.

Professional Summary & Experience:
- Results-driven Full-Stack Developer & Software Engineer with 10+ years of active experience.
- System Analyst at Taraba State University: Architected and deployed the university's flagship systems serving 30,000+ users. Engineered the Staff Profile Portal (PHP/MySQL MVC system allowing 500+ staff self-management).
- Innovative AI & Tooling: Built desktop PDF management apps integrated with GPT-4, quick-budgeting apps utilizing natural language AI-generated insights, and real-time remote job alert PWAs.
- Web3 & Technical Content: Principal writer of Dowcoin's blockchain whitepapers and documentation.
- Technologies: PHP, Node.js, React, Next.js, C++, Java, Kotlin, Python, Git, Linux, WordPress, MongoDB, SQL.

Current Goal:
Seeking a fully funded PhD scholarship to apply my background in software engineering, AI, and AR systems towards innovative medical, educational, or computational research.
`;

export default function PhdAnalyzer() {
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (inputType === "url" && !urlInput.trim()) {
        throw new Error("Please provide a valid URL.");
      }
      if (inputType === "text" && !textInput.trim()) {
        throw new Error("Please paste the project description.");
      }

      // Initialize Gemini Client
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Missing NEXT_PUBLIC_GEMINI_API_KEY. Please set your Gemini API key in the AI Studio Settings -> Secrets."
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an expert academic advisor, grant writer, and technical career coach helping Williams draft an application for a PhD.

Here is Williams's comprehensive profile:
${USER_PROFILE}

Here is the PhD project description that he wants to apply for:
${inputType === "url" ? `Please analyze the project at this URL: ${urlInput.trim()}` : textInput.trim()}

Take a deep breath and provide a polished, detailed response with the following sections precisely formatted in Markdown:

## 1. Project Explanation (ELI10)
Explain the main goals, context, and focus of this PhD project simply, as if you were explaining it to a 10-year-old. Use clear analogies and avoid dense academic jargon here so Williams can grasp the core problem being solved instantly.

## 2. Profile Alignment & Unique Intersections
Critically analyze how Williams's background strongly aligns with this project. 
- You MUST find a creative but grounded way to connect his M.Sc thesis work (Augmented Reality, Unity, 3D evaluation for Human Heart Anatomy) AND/OR his versatile 10+ years of full-stack engineering, AI tooling, and systems architecture experience to the project's goals. 
- Explain how his rare blend of enterprise software engineering and academic AR/Health-tech research makes him an outstanding, lower-risk, highly capable candidate for the supervisory team.
- Frame his skills as direct solutions to the specific challenges the PhD project will face.

## 3. The Perfect Outreach Email
Draft a highly professional, compelling, and academic cold-email to the potential PhD supervisor. 
The email should:
- Have an engaging but professional subject line.
- Express enthusiastic interest in the specific project.
- Briefly but powerfully highlight his specific intersections (mentioning his background in full-stack architecture and his AR anatomy thesis where relevant).
- Present a clear call to action requesting a brief call to discuss the project further.
- Be written natively from Williams Alfred Onen.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: inputType === "url" ? { tools: [{ urlContext: {} }] } : undefined,
      });

      if (!response.text) {
          throw new Error("Received an empty response from the AI model.");
      }

      setResult(response.text);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      // Catch 403 or specific API errors to show a helpful message
      let errorMessage = err.message || "An unexpected error occurred.";
      if (errorMessage.includes("403") || errorMessage.includes("not scrape")) {
        errorMessage = "The website is blocking access to the URL. Please try pasting the text instead.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-6 overflow-hidden">
      {/* Left Column: Input */}
      <div className="w-full md:w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Analyze a PhD Project
          </h2>
          
          <div className="flex bg-slate-100 p-1 rounded-lg w-full mb-4">
            <button
              onClick={() => setInputType("url")}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                inputType === "url"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              FindAPhD Link
            </button>
            <button
              onClick={() => setInputType("text")}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                inputType === "text"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Paste Text
            </button>
          </div>

          {inputType === "url" ? (
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="url"
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
                placeholder="https://www.findaphd.com/phds/project/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
          ) : (
            <div className="relative mb-4">
              <div className="absolute top-2.5 left-2.5 pointer-events-none">
                <FileText className="h-4 w-4 text-slate-400" />
              </div>
              <textarea
                rows={6}
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
                placeholder="Paste project description..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-100 flex items-start text-red-800 gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs">{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (inputType === "url" ? !urlInput : !textInput)}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Project
              </>
            )}
          </button>
        </div>

        {/* Info Card mimicking the ELI10 from design */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[200px]">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Profile Stats</span>
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold">READY</span>
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="text-xs leading-relaxed text-slate-600 mb-4">
              Analysis engine configured to align provided projects against 10+ years of Full-Stack experience and M.Sc thesis on Augmented Reality for Human Heart Anatomy.
            </p>
            <div className="mt-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Key Competencies</h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded">Full-Stack Dev</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded">Augmented Reality</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded">Unity & C#</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded">React & Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Output */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shadow-sm z-10 shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Analysis & Draft</span>
            </div>
            {result && (
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(result)} className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded hover:bg-slate-50 text-slate-700 transition-colors">Copy Text</button>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
            <AnimatePresence>
              {!result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-400 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <Sparkles className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm">Provide a project link to generate a tailored outreach strategy.</p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-500 gap-4"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                  <p className="text-sm animate-pulse">Analyzing project and aligning with your profile...</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="prose prose-sm prose-slate md:prose-base max-w-none prose-headings:text-slate-800 prose-a:text-indigo-600 font-sans">
                    <div className="markdown-body">
                      <Markdown>{result}</Markdown>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
