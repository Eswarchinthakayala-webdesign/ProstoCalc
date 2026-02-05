import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Smartphone, ArrowRight, Menu, Sparkles } from 'lucide-react';
import MagneticBackground from '../components/MagneticBackground';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BrandIconContainer, BrandLogo } from '../components/BrandLogo';

const LandingPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Snowfall Background - Fixed & pointer-events-none */}
      <MagneticBackground />
      
      {/* Wrapper for content to sit ABOVE the snow if needed, or let snow fall on top? 
          Usually background is behind. z-0 for bg, z-10 for content. */}
      
      {/* Fixed Responsive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md supports-[backdrop-filter]:bg-black/20 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-white cursor-pointer select-none">
                <BrandIconContainer className="h-10 w-10" />
                <span>ProstoCalc</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#showcase" className="hover:text-white transition-colors">App Showcase</a>
                <a href="#integration" className="hover:text-white transition-colors">Integration</a>
                <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
                <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Sign In
                </a>
                <button className="h-9 px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20">
                    Get App
                </button>
            </div>

            {/* Mobile Actions & Menu */}
            <div className="flex md:hidden items-center gap-4">
                 {/* Mobile Get App (Small) */}
                 <button className="h-8 px-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors">
                    Get App
                </button>

                {/* Mobile Menu Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="p-2 -mr-2 text-white hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95">
                        <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-zinc-950/95 border-l border-white/10 backdrop-blur-2xl w-[320px] sm:w-[380px] p-0 shadow-2xl shadow-black">
                    <div className="flex flex-col h-full">
                        {/* Sheet Header */}
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-white">
                                <BrandIconContainer className="h-10 w-10" />
                                <span>ProstoCalc</span>
                            </div>
                        </div>

                        {/* Sheet Body - Nav Links */}
                        <div className="flex-1 flex flex-col p-6 gap-2 overflow-y-auto">
                           <div className="space-y-1">
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Navigation</p>
                                <SheetLink href="#features">Features</SheetLink>
                                <SheetLink href="#showcase">App Showcase</SheetLink>
                                <SheetLink href="#integration">Integration</SheetLink>
                                <Link to="/demo" className="flex items-center px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    API Demo
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                </Link>
                                <Link to="/docs" className="flex items-center px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    Documentation
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                </Link>
                           </div>
                           
                           <div className="mt-8 space-y-1">
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Account</p>
                                <SheetLink href="#">Sign In</SheetLink>
                                <SheetLink href="#">Support</SheetLink>
                           </div>
                        </div>

                        {/* Sheet Footer - CTA */}
                        <div className="p-6 border-t border-white/5 bg-white/5">
                            <button className="w-full h-12 rounded-xl bg-white text-black font-semibold text-base hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center shadow-lg shadow-white/5">
                                Download App <Smartphone className="ml-2 h-4 w-4" />
                            </button>
                            <p className="text-center text-xs text-zinc-500 mt-4">
                                v1.0.2 • Made with Mistral AI
                            </p>
                        </div>
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative z-10 py-50 sm:py-32 overflow-hidden">
        {/* Gradient overlay - lighter to show particles */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 pl-1 pr-4 py-1 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default">
              <BrandIconContainer className="h-7 w-7 mr-2 rounded-full" />
              <span className="tracking-wide">Next Generation Cost Estimation</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white max-w-4xl">
              Clarify Your Dental Treatment Costs with AI
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              ProstoCalc uses advanced Mistral AI technology to break down complex dental procedures and insurance estimates into clear, understandable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all flex items-center justify-center shadow-lg shadow-white/10">
                Download for iOS <Smartphone className="ml-2 h-4 w-4" />
              </button>
              <Link to="/docs" className="h-12 px-8 rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 font-medium transition-all flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-20 bg-transparent border-y border-white/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Why Choose ProstoCalc</h2>
             <p className="text-zinc-400 text-lg">Everything you need to confidently estimate dental costs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="h-6 w-6 text-white" />}
              title="Instant Analysis"
              description="Get immediate explanations for complex treatment plans. No more waiting for callbacks or confusing billing codes."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-white" />}
              title="Private & Secure"
              description="Your health data stays on your device. We use privacy-focused AI processing to ensure your information is protected."
            />
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-white" />}
              title="Smart Breakdown"
              description="Understand out-of-pocket costs, insurance coverage, and procedure details in plain English, not medical jargon."
            />
          </div>
        </div>
      </section>

      {/* App Showcase / Context */}
      <section id="showcase" className="relative z-10 py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-12 text-center max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Native & Powerful</h2>
             <p className="text-zinc-400 text-lg">Built specifically for the Apple ecosystem to ensure maximum performance and privacy.</p>
          </div>
          <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">Built for Swift Performance</h2>
                <p className="text-muted-foreground text-lg">
                  Designed natively for iOS, ProstoCalc delivers a fluid, responsive experience. Integrates seamlessly with your digital health records.
                </p>
                <div className="space-y-4">
                  {[
                    "Native iOS Experience",
                    "Offline-Ready Mode",
                    "Secure Local Storage",
                    "Real-time Updates"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <div className="h-2 w-2 rounded-full bg-white mr-3" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <a href="#docs" className="text-white hover:underline inline-flex items-center font-semibold transition-colors">
                    View Integration Docs <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              {/* Right Side - Phone Visualization */}
              <div className="bg-white/5 lg:min-h-[500px] flex items-center justify-center p-8 relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <div className="relative w-64 h-[500px] bg-black border-4 border-white/10 rounded-[3rem] shadow-2xl p-4 flex flex-col">
                    <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>
                    <div className="space-y-4 flex-1 opacity-75">
                        <div className="h-24 bg-white/10 rounded-2xl w-full animate-pulse"></div>
                        <div className="h-8 bg-zinc-800 rounded-lg w-3/4"></div>
                        <div className="h-8 bg-zinc-800 rounded-lg w-1/2"></div>
                        <div className="h-32 bg-zinc-900 rounded-lg w-full mt-8"></div>
                    </div>
                    <div className="h-12 bg-white rounded-xl w-full mt-4 flex items-center justify-center text-black text-xs font-bold uppercase tracking-wider">
                        Analyze
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section - MacOS Inspired */}
      <section id="integration" className="relative z-10 py-32 bg-transparent border-y border-white/5 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <h2 className="text-4xl font-bold tracking-tight text-white mb-6">Seamless Integration</h2>
             <p className="text-zinc-400 text-lg">Connect your native applications with surgical precision using our optimized Swift SDK.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
             {/* Left Column: Feature Modules */}
             <div className="flex flex-col justify-center space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <Activity className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-white mb-2">REST API</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">Standardized JSON endpoints with sub-100ms response times.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <Smartphone className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-white mb-2">Swift Native</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">Type-safe models designed for modern Swift concurrency.</p>
                    </div>
                </div>
                
                {/* Descriptive highlight block */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 mt-4">
                    <p className="text-zinc-400 leading-relaxed italic border-l-2 border-white/20 pl-6">
                        "ProstoCalc has redefined how we handle dental billing explanations. The integration was vertical and immediate."
                    </p>
                    <div className="mt-4 flex items-center gap-3 pl-6">
                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10" />
                        <div>
                            <p className="text-sm font-medium text-white">Chief Developer</p>
                            <p className="text-xs text-zinc-600">DentalFlow Solutions</p>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Right Column: MacOS Style Code Window */}
             <div className="relative group">
                {/* Glow effect behind window */}
                <div className="absolute -inset-4 bg-white/[0.02] rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] overflow-hidden h-full flex flex-col">
                    {/* MacOS Title Bar */}
                    <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/[0.02]">
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-inner" />
                            <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                            <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-inner" />
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                            <Smartphone className="h-3.5 w-3.5" />
                            <span>CostEstimator.swift</span>
                        </div>
                        <div className="w-12" /> {/* Spacer for centering */}
                    </div>
                    
                    {/* Code Content */}
                    <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto flex-1">
                <div className="space-y-1">
                            <p><span className="text-zinc-500">01</span> <span className="text-purple-400">import</span> <span className="text-white">Foundation</span></p>
                            <p><span className="text-zinc-500">02</span></p>
                            <p><span className="text-zinc-500">03</span> <span className="text-purple-400">func</span> <span className="text-blue-400">explainTreatment</span>() <span className="text-purple-400">async</span> {'{'}</p>
                            <p><span className="text-zinc-500">04</span>     <span className="text-zinc-600 font-italic">// Prepare production API request</span></p>
                            <p><span className="text-zinc-500">05</span>     <span className="text-purple-400">let</span> url = URL(string: <span className="text-green-400">"https://prostocalc.app/api/explain-cost"</span>)!</p>
                            <p><span className="text-zinc-500">06</span>     <span className="text-purple-400">let</span> body = [<span className="text-green-400">"userPrompt"</span>: <span className="text-white">"D6010 implant cost"</span>]</p>
                            <p><span className="text-zinc-500">07</span></p>
                            <p><span className="text-zinc-500">08</span>     <span className="text-purple-400">do</span> {'{'}</p>
                            <p><span className="text-zinc-500">09</span>         <span className="text-purple-400">let</span> (data, _) = <span className="text-purple-400">try await</span> URLSession.shared.upload(</p>
                            <p><span className="text-zinc-500">10</span>             for: request, from: JSONEncoder().encode(body)</p>
                            <p><span className="text-zinc-500">11</span>         <span className="text-zinc-600 font-italic">// Success: Parse AI response</span></p>
                            <p><span className="text-zinc-500">12</span>     {'}'} <span className="text-purple-400">catch</span> {'{'}</p>
                            <p><span className="text-zinc-500">13</span>         print(<span className="text-green-400">"Network error: \\(error)"</span>)</p>
                            <p><span className="text-zinc-500">14</span>     {'}'}</p>
                            <p><span className="text-zinc-500">15</span> {'}'}</p>
                        </div>
                    </div>
                    
                    {/* Window Footer / Status Bar */}
                    <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">UTF-8</span>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Swift 6.0</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Live Status</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Documentation & Resources - Premium Bento Design */}
      <section id="docs" className="relative z-10 py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center gap-8 mb-16">
            <div className="max-w-8xl">
                <h2 className="text-4xl font-bold tracking-tight text-center text-white mb-6">Learning Resources</h2>
                <p className="text-zinc-400 text-center text-lg">Master the ProstoCalc ecosystem with our comprehensive guides, API documentation, and community resources.</p>
            </div>
     
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { 
                    title: "Getting Started", 
                    desc: "From installation to your first AI cost analysis in under 5 minutes.", 
                    icon: <Activity className="h-5 w-5"/>,
                    tag: "Popular" 
                },
                { 
                    title: "API Reference", 
                    desc: "Explore every endpoint, request parameter, and response model in detail.", 
                    icon: <Smartphone className="h-5 w-5"/> 
                },
                { 
                    title: "iOS SDK Guide", 
                    desc: "Deep dive into native Swift integration and offline-first data sync.", 
                    icon: <ShieldCheck className="h-5 w-5"/>,
                    tag: "New"
                },
                { 
                    title: "Security Core", 
                    desc: "Learn how we protect sensitive health data using local-first AI processing.", 
                    icon: <Sparkles className="h-5 w-5"/> 
                }
            ].map((doc, idx) => (
                <Link key={idx} to="/docs" className="group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-64 overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div>
                        <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                            {doc.icon}
                        </div>
                        {doc.tag && (
                            <span className="absolute top-8 right-8 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                                {doc.tag}
                            </span>
                        )}
                        <h4 className="text-xl font-bold text-white mb-3">{doc.title}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{doc.desc}</p>
                    </div>
                    
                    <div className="flex items-center text-sm font-semibold text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </Link>
            ))}
          </div>


        </div>
      </section>

    </div>
  );
};

// Helper Component for Features
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-black/10 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors shadow-sm hover:shadow-md">
    <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">
      {description}
    </p>
  </div>
);
const SheetLink = ({ href, children }) => (
    <a href={href} className="flex items-center px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
        {children}
        <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
)
export default LandingPage;