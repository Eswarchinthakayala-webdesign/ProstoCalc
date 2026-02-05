import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import mermaid from "mermaid";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast, Toaster } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Menu,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "../components/theme-provider";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import '../markdown.css'
import { DOCS_DATA } from "../data/docs";
import MagneticBackground from '../components/MagneticBackground';
import { BrandIconContainer } from '../components/BrandLogo';

// ------------------------------------------------------------------
// 1. DATA & UTILS
// ------------------------------------------------------------------

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const getNodeText = (node) => {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join("");
  if (typeof node === "object" && node?.props?.children)
    return getNodeText(node.props.children);
  return "";
};

const Mermaid = ({ chart }) => {
  const { theme } = useTheme?.() ?? { theme: "dark" };
  const isDark = theme === "dark";

  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!chart) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      themeVariables: {
        background: isDark ? "#000000" : "#ffffff",
        primaryColor: isDark ? "#27272a" : "#fff",
        primaryBorderColor: isDark ? "#3f3f46" : "#d4d4d8",
        primaryTextColor: isDark ? "#ffffff" : "#000",
        lineColor: isDark ? "#71717a" : "#a1a1aa",
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid error:", error);
        setSvg(`<pre class="text-xs p-3 rounded-lg border text-red-600 bg-red-50 border-red-200">${error.message}</pre>`);
      }
    };

    renderChart();
  }, [chart, isDark]);

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-xl border p-6 bg-white border-zinc-200 dark:bg-black dark:border-zinc-800"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

// ------------------------------------------------------------------
// 2. STYLES
// ------------------------------------------------------------------
const editorStyles = `
  .wmde-markdown { background: transparent !important; color: #a1a1aa !important; font-family: ui-sans-serif, system-ui !important; font-size: 1.05rem; line-height: 1.8; }
  
  /* Remove anchor icons from headings */
  .wmde-markdown h1 .anchor, .wmde-markdown h2 .anchor, .wmde-markdown h3 .anchor,
  .wmde-markdown h4 .anchor, .wmde-markdown h5 .anchor, .wmde-markdown h6 .anchor {
    display: none !important;
  }

  .wmde-markdown h1 { color: white !important; font-size: 2.25rem !important; font-weight: 800; margin-bottom: 2rem; margin-top: 1rem; scroll-margin-top: 100px; }
  .wmde-markdown h2 { color: #f4f4f5 !important; font-size: 1.5rem !important; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; margin-top: 3.5rem; margin-bottom: 1.5rem; scroll-margin-top: 100px; }
  .wmde-markdown h3 { color: #e4e4e7 !important; font-size: 1.25rem !important; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1rem; scroll-margin-top: 100px; }
  
  /* Inline code */
  .wmde-markdown code:not(pre code) { 
    background: rgba(255,255,255,0.08) !important; 
    color: #fff !important; 
    border: 1px solid rgba(255,255,255,0.1); 
    border-radius: 6px; padding: 0.2rem 0.4rem; 
    font-size: 0.85em; 
    font-family: 'JetBrains Mono', monospace; 
  }

  .wmde-markdown pre { 
    background: #0d0d0f !important; 
    border: 1px solid rgba(255,255,255,0.05); 
    border-radius: 12px; 
    margin: 2.5rem 0; 
    padding: 0 !important;
    position: relative;
    overflow: hidden;
  }

  /* tables are now wrapped in a scrollable div in the component mapper */
  .wmde-markdown table { 
    width: 100%; 
    border-collapse: collapse; 
    border-spacing: 0;
    background: transparent;
  }

  .wmde-markdown th { 
    background: rgba(255,255,255,0.03); 
    color: white; 
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 1.25rem;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .wmde-markdown td { 
    padding: 1.25rem; 
    font-size: 0.9rem;
    color: #a1a1aa;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.2s;
  }

  .wmde-markdown tr:hover td {
    background: rgba(255,255,255,0.02);
    color: white;
  }

  .wmde-markdown tr:last-child td {
    border-bottom: none;
  }

  .wmde-markdown blockquote {
    border-left: 2px solid white;
    background: rgba(255,255,255,0.03);
    margin: 2.5rem 0;
    padding: 1.5rem 2rem;
    border-radius: 0 12px 12px 0;
    color: #d4d4d8;
  }
`;

// ------------------------------------------------------------------
// 3. COMPONENTS
// ------------------------------------------------------------------

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const lang = className?.replace("language-", "") || "code";

  const handleCopy = () => {
    const text = codeRef.current?.innerText || getNodeText(children);
    navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        toast.success("Copied to clipboard", {
            duration: 2000,
            position: 'bottom-center',
            className: "bg-zinc-900 border border-white/10 text-white rounded-full px-6 py-2 shadow-2xl backdrop-blur-xl",
        });
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative group my-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl",
        className
      )}
    >
      {/* Header Bar - More visible */}
      <div className="flex items-center justify-between px-5 h-12 bg-zinc-900 border-b border-white/5 relative z-30">
        <div className="flex items-center gap-4">
            <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                {lang}
            </span>
        </div>
        
        <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all p-1.5 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
        >
            <span className="text-[10px] font-bold uppercase tracking-wider">
                {copied ? "Copied" : "Copy"}
            </span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="relative z-10">
        <pre className="p-8 overflow-x-auto selection:bg-white/20 selection:text-white !m-0 !bg-transparent custom-scrollbar">
            <code ref={codeRef} className="block font-mono text-[0.85rem] leading-[1.7] text-zinc-300">
            {children}
            </code>
        </pre>
      </div>
    </motion.div>
  );
};

const TableOfContents = ({ content, containerRef }) => {
  const [activeId, setActiveId] = useState("");
  
  const headings = useMemo(() => {
    if (!content) return [];
    const lines = content.split("\n");
    const regex = /^(#{1,3})\s+(.*)$/;
    return lines.map((line) => {
        const match = line.match(regex);
        if (match) {
          return { level: match[1].length, text: match[2], id: slugify(match[2]) };
        }
        return null;
      }).filter(Boolean);
  }, [content]);

  useEffect(() => {
    if (!containerRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: containerRef.current, rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, containerRef]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:flex flex-col w-72 h-full p-8 pl-0 border-l border-white/5 bg-zinc-950/30 backdrop-blur-sm">
      <div className="pl-6">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-500">On This Page</h4>
        <div className="relative flex flex-col pl-4 space-y-4 border-l border-zinc-200 dark:border-white/5">
          {headings.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={cn(
                "relative block text-left cursor-pointer transition-colors focus:outline-none text-sm",
                activeId === item.id ? "text-zinc-900 font-medium dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300",
                item.level === 3 && "pl-4 text-xs"
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="toc-active-indicator"
                  className="absolute -left-[17px] top-0 bottom-0 w-[2px] rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DocsSidebar = ({
  activeTrack,
  currentLessonId,
  onNavigate
}) => {
  return (
    <aside className="flex flex-col h-screen min-h-0 bg-white text-zinc-900 dark:bg-transparent dark:text-white">
      <div className="shrink-0 p-8 border-b border-zinc-200 dark:border-white/5">
        <Link to="/" className="flex items-center gap-3 mb-8 group">
            <BrandIconContainer className="h-10 w-10 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl tracking-tight">ProstoCalc</span>
        </Link>
        
        <Link to="/" className="flex items-center gap-2 mb-6 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Site
        </Link>

        <h2 className="font-bold text-lg leading-tight truncate">{activeTrack.title}</h2>
      </div>

      <ScrollArea className="flex-1 pb-20 min-h-0">
        <div className="px-6 py-8 space-y-10">
          {activeTrack.modules.map((module, idx) => (
            <div key={module.id}>
              <h3 className="px-2 mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {module.title}
              </h3>

              <div className="relative ml-2 pl-4 space-y-2 border-l border-zinc-200 dark:border-white/10">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === currentLessonId;
                  return (
                    <div key={lesson.id} className="relative">
                      <Link
                        to={`/docs/${activeTrack.id}/${module.id}/${lesson.id}`}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-start gap-4 p-2.5 rounded-xl text-sm transition-all relative",
                          isActive ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5"
                        )}
                      >
                        {isActive && (
                          <motion.div layoutId="active-lesson-glow" className="absolute -left-[18px] top-2 bottom-2 w-[3px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        )}
                        <span className="leading-snug">{lesson.title}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default function DocsPage() {
  const { trackId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const { theme } = useTheme?.() ?? { theme: "dark" };  
  const isDark = theme === "dark";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTrack = DOCS_DATA.find(t => t.id === trackId) || DOCS_DATA[0];
  const activeModule = activeTrack?.modules.find(m => m.id === moduleId) || activeTrack?.modules[0];
  const activeLesson = activeModule?.lessons.find(l => l.id === lessonId) || activeModule?.lessons[0];

  useEffect(() => {
    if (!trackId || !moduleId || !lessonId) {
      const first = DOCS_DATA[0];
      navigate(`/docs/${first.id}/${first.modules[0].id}/${first.modules[0].lessons[0].id}`, { replace: true });
    }
  }, [trackId, moduleId, lessonId, navigate]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lessonId]);

  const flatLessons = useMemo(() => {
    if (!activeTrack) return [];
    return activeTrack.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));
  }, [activeTrack]);

  const currentIndex = flatLessons.findIndex(l => l.id === lessonId);
  const prevLesson = flatLessons[currentIndex - 1];
  const nextLesson = flatLessons[currentIndex + 1];

  if (!activeTrack || !activeLesson) return null;

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden selection:bg-white/10 selection:text-white">
      <style>{editorStyles}</style>
      <MagneticBackground />
      
      {/* 1. FIXED LEFT SIDEBAR (Desktop) */}
      <aside className="w-80 border-r border-white/5 hidden xl:flex z-30 flex-col relative bg-zinc-900/40 backdrop-blur-xl">
        <DocsSidebar 
          activeTrack={activeTrack} 
          currentLessonId={lessonId} 
        />
      </aside>

      {/* 2. MIDDLE CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 bg-transparent">
            {/* Sticky Header */}
            <header className="sticky top-0 z-20 shrink-0 h-20 flex items-center justify-between px-8 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="xl:hidden text-zinc-400 hover:text-white">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80 bg-black text-white border-white/5">
                    <DocsSidebar
                        activeTrack={activeTrack}
                        currentLessonId={lessonId}
                        onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                </SheetContent>
                </Sheet>

                <div className="flex items-center gap-3 text-sm truncate min-w-0 text-zinc-400">
                    <span className="hidden sm:block shrink-0">{activeTrack.title}</span>
                    <ChevronRight className="hidden sm:block w-4 h-4 text-zinc-700" />
                    <span className="hidden sm:block shrink-0">{activeModule.title}</span>
                    <ChevronRight className="hidden sm:block w-4 h-4 text-zinc-700" />
                    <span className="truncate font-medium text-white">{activeLesson.title}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    size="sm"
                    asChild
                    className="h-10 px-6 rounded-full cursor-pointer font-semibold transition-all bg-white text-black hover:bg-zinc-200"
                >
                    <Link to="/">Back to Site</Link>
                </Button>
            </div>
            </header>

            <div className="flex-1 flex min-h-0 overflow-hidden">
                <div ref={contentRef} className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
                    <div className="max-w-4xl p-8 md:p-16 lg:pr-16">
                        <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">{activeLesson.title}</h1>
                                <div className="h-1 w-20 bg-white/10 rounded-full" />
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <MDEditor.Markdown 
                                   source={activeLesson.content}
                                   components={{
                                      code: ({ inline, children, className, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || "");
                                        const lang = match ? match[1] : "";
                                        
                                        if (inline) {
                                          return <code className={cn("bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-xs text-white", className)} {...props}>{children}</code>;
                                        }

                                        if (lang === "mermaid") {
                                          return <Mermaid chart={getNodeText(children)} />;
                                        }

                                        // For block code, we use CodeBlock but wrap it to prevent MDEditor recursion
                                        return (
                                          <CodeBlock className={className} noinner>
                                            {children}
                                          </CodeBlock>
                                        );
                                      },
                                      pre: ({ children }) => <>{children}</>,
                                      table: ({ children, ...props }) => (
                                        <div className="my-12 overflow-x-auto rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-md shadow-2xl custom-scrollbar">
                                            <table className="min-w-full divide-y divide-white/5" {...props}>
                                                {children}
                                            </table>
                                        </div>
                                      ),
                                      img: ({ src, alt, ...props }) => (
                                        <div className="my-12 relative group">
                                          <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                          <img 
                                            src={src} 
                                            alt={alt} 
                                            className="relative rounded-2xl border border-white/10 shadow-2xl w-full object-cover max-h-[500px]" 
                                            {...props} 
                                          />
                                          {alt && <p className="mt-4 text-center text-xs font-medium text-zinc-500 uppercase tracking-widest">{alt}</p>}
                                        </div>
                                      )
                                    }}
                                    style={{ background: 'transparent' }}
                                />
                            </div>

                            <div className="mt-24 pt-12 pb-32 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5">
                                {prevLesson ? (
                                    <Link to={`/docs/${activeTrack.id}/${prevLesson.moduleId}/${prevLesson.id}`}>
                                        <button className="w-full group flex flex-col items-start text-left p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer">
                                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-500"><ChevronLeft className="w-3" /> Previous</span>
                                            <span className="text-lg font-semibold text-white group-hover:underline">{prevLesson.title}</span>
                                        </button>
                                    </Link>
                                ) : <div />}

                                {nextLesson ? (
                                    <Link to={`/docs/${activeTrack.id}/${nextLesson.moduleId}/${nextLesson.id}`}>
                                        <button className="w-full group flex flex-col items-end text-right p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer">
                                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-500 text-zinc-500">Next <ChevronRight className="w-3" /></span>
                                            <span className="text-lg font-semibold text-white group-hover:underline">{nextLesson.title}</span>
                                        </button>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col items-end justify-center text-right p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] text-zinc-500">
                                        <span className="text-xs mb-1">End of Section</span>
                                        <span className="font-bold text-white">All caught up! 🎉</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <TableOfContents content={activeLesson.content} containerRef={contentRef} />
            </div>
      </main>

      <Toaster />
    </div>
  );
}
