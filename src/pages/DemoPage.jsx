import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import { 
  Terminal, 
  CheckCircle2, 
  Loader2, 
  Globe, 
  Code2, 
  Sparkles, 
  Play,
  RefreshCcw
} from 'lucide-react';
import { toast } from 'sonner';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MagneticBackground from '../components/MagneticBackground';

const API_RESPONSE = {
  result: `Dental crowns are a common restorative treatment used to repair damaged, decayed, or weakened teeth. The cost of a dental crown can vary significantly based on several factors, including the type of material used, geographic location, the dentist's experience, and insurance coverage. Below is a detailed breakdown of potential costs, insurance considerations, and out-of-pocket expenses.

---

### **1. Types of Dental Crowns and Their Costs**
The material used for the crown directly impacts the cost. Here's a general range for **one crown** (per tooth):

| **Crown Type**               | **Material**               | **Average Cost (USD)** | **Notes**                                                                                     |
|------------------------------|----------------------------|------------------------|-----------------------------------------------------------------------------------------------|
| **Metal (Stainless Steel)**  | Stainless steel            | $50–$150               | Temporary crowns for children; durable but not aesthetic.                                    |
| **Metal (Base Metal Alloy)** | Nickel-chromium alloy      | $300–$800              | Strong and durable; less aesthetic (grayish color).                                           |
| **PFM (Porcelain-Fused-to-Metal)** | Metal + porcelain | $800–$1,500          | Balances strength and aesthetics; metal shows through porcelain at the gum line.              |
| **All-Ceramic/All-Porcelain** | Zirconia, lithium disilicate | $1,000–$2,500+       | Most aesthetic; natural tooth color; less durable for back teeth (but zirconia is strong).    |
| **E-Max (Lithium Disilicate)** | High-strength ceramic | $1,200–$2,800        | Premium aesthetic and strength; often used for front teeth.                                   |
| **Zirconia Crown**           | Zirconia ceramic           | $1,200–$3,500+         | Highly durable and aesthetic; ideal for back teeth or patients with bruxism (teeth grinding). |

---
**Note:** Costs for **multiple crowns** (e.g., for a full mouth reconstruction) may include discounts or bulk pricing, but this is not guaranteed.

---

### **2. Additional Costs to Consider**
- **Preparation Appointments**:
  - **Diagnostic Work (X-rays, exams)**: $50–$200
  - **Root Canal (if needed)**: $1,000–$1,500 (if the tooth requires endodontic treatment before crowning)
  - **Tooth Extraction (if needed)**: $75–$300 (simple extraction) or $200–$600 (surgical extraction)

- **Impressions and Lab Fees**:
  - Digital scans or traditional impressions: $100–$300
  - Lab fees (if not included in dentist's fee): $100–$500

- **Follow-Up Appointments**:
  - Adjustments or touch-ups: $50–$200

- **Anesthesia**:
  - Local anesthetic (included in most crown procedures) or sedation (if needed): $100–$500

---
**Total Estimated Cost Range (for one crown, including prep and follow-up):**
- **Low-end (metal)**: $500–$1,200
- **Mid-range (PFM or all-ceramic)**: $1,000–$2,500
- **High-end (E-Max/Zirconia)**: $1,500–$4,000+

---

### **3. Insurance Considerations**
Dental insurance typically covers **partial** costs for crowns, depending on the plan. Here's what to expect:

#### **A. Insurance Coverage Breakdown**
Most plans categorize crowns as a **"Major Work"** service, often covered at **50–80%** after a **deductible** (e.g., $50–$100 per year). Example:
- **Insurance Pays**: 60% of $1,200 (all-ceramic crown) = **$720**
- **Your Out-of-Pocket**: $1,200 – $720 – deductible ($100) = **$380**

#### **B. Common Insurance Scenarios**
1. **No Insurance**:
   - You pay the full cost (e.g., $1,500–$3,000 for a high-end crown).

2. **Basic Dental Plan (e.g., Delta Dental, UnitedHealthcare)**:
   - Covers **$100–$500 per year** for major work (e.g., 50% of $1,200 = $600, but annual max may apply).
   - You pay the remaining **$600–$1,000** (plus deductible).

3. **Premium Plan (e.g., high-end PPO)**:
   - May cover **80% of $1,200 = $960**, leaving you with **$240 + deductible**.

4. **Medicare/Medicaid**:
   - **Medicare** does **not** cover routine dental crowns (only medically necessary cases, e.g., trauma).
   - **Medicaid** varies by state; some cover partial costs for children or low-income adults.

#### **C. Out-of-Network vs. In-Network**
- **In-Network Dentist**: Lower out-of-pocket costs (e.g., $200–$500 after insurance).
- **Out-of-Network Dentist**: Higher costs (e.g., $1,000+ after insurance, if covered at all).

---
### **4. Financing and Payment Options**
Many dental offices offer:
- **Payment Plans**: $50–$150/month (e.g., CareCredit, LendingClub).
- **Discounts**: Some offices offer **10–20% off** for full payment upfront.
- **Flexible Spending Accounts (FSA)/Health Savings Accounts (HSA)**: Pre-tax dollars can cover costs.

---
### **5. Ways to Reduce Costs**
1. **Choose a Less Expensive Material**: PFM crowns are often a balance of cost and aesthetics.
2. **Ask About Dental Schools**: Some dental schools offer **discounted crowns** (supervised by professors).
3. **Negotiate**: Some dentists reduce fees for long-term patients or bulk treatments.
4. **Check for Promotions**: Offices sometimes run **crown specials** (e.g., $500 for a PFM crown).
5. **Preventative Care**: Avoid crowns by maintaining good oral hygiene (insurance may cover preventive care at 100%).

---
### **6. Example Cost Scenarios**
#### **Scenario 1: Metal Crown (Back Tooth)**
- **Cost**: $600 (dentist fee) + $100 (lab) = **$700 total**
- **Insurance**: Covers 60% of $700 = $420
- **Your Cost**: $700 – $420 – $100 (deductible) = **$180**

#### **Scenario 2: All-Ceramic Crown (Front Tooth)**
- **Cost**: $2,000 (dentist fee) + $200 (lab) = **$2,200 total**
- **Insurance**: Covers 50% of $2,200 = $1,100 (but annual max is $1,500)
- **Your Cost**: $2,200 – $1,500 (max coverage) – $100 (deductible) = **$600**

#### **Scenario 3: No Insurance**
- **Cost**: $2,500 (E-Max crown)
- **Payment Plan**: $200/month for 12 months = **$2,400 total**

---
### **7. What Affects the Final Cost?**
- **Location**: Urban areas (e.g., NYC, LA) cost **20–50% more** than rural areas.
- **Dentist's Experience**: Specialists (e.g., prosthodontists) may charge **30–100% more** than general dentists.
- **Emergency vs. Elective**: Emergency crowns (e.g., after trauma) may have **higher fees**.
- **Additional Procedures**: If you need a root canal or gum treatment, costs add up.

---
### **8. Questions to Ask Your Dentist**
1. **"What type of crown do you recommend, and why?"**
2. **"Is there a less expensive alternative that's still durable?"**
3. **"What's the total cost upfront, including prep and follow-up?"**
4. **"Do you accept my insurance, and what's my expected out-of-pocket?"**
5. **"Are there payment plans or financing options?"**
6. **"Do you offer discounts for cash payments?"**

---
### **9. Empathetic Note**
Crowns can be a significant investment, and the cost can feel overwhelming. If you're concerned about affordability:
- **Explore financing** to spread out payments.
- **Check with your dentist** about payment assistance programs.
- **Prioritize oral health**—delaying treatment can lead to more expensive issues (e.g., infections, extractions).

---
### **Disclaimer**
These are **estimates** based on average U.S. dental fees (2024). Actual costs vary by:
- Geographic location,
- Dentist's fee schedule,
- Insurance plan specifics,
- Additional procedures required,
- Material choices, and
- Office policies.

For the most accurate quote, **contact your dentist's office directly** and confirm coverage with your insurance provider.`
};

const DemoPage = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    setStatus('loading');
    setProgress(0);
    
    const duration = 5000;
    const interval = 50; 
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    setTimeout(() => {
      setStatus('success');
      toast.success('Analysis Complete');
    }, duration);
  };

  const codeSnippet = `{
  "prompt": "Explain dental crown costs",
  "model": "prosto-calc-v1",
  "stream": false
}`;

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 p-6 md:p-12 font-sans overflow-x-hidden selection:bg-purple-500/30">
      <MagneticBackground />
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-12 py-12">
        {/* Simplified Header */}
        <header className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-medium backdrop-blur-md"
          >
            <Sparkles size={14} className="text-purple-400" />
            <span>Interactive API Sandbox</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent"
          >
            API Playground
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Test our cost analysis engine in a few clicks. 
            Automated simulation with real production response metadata.
          </motion.p>
        </header>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <Globe size={14} />
              <span>API Endpoint</span>
            </div>
            <code className="block p-3 rounded-xl bg-black/40 border border-white/5 text-sm text-purple-300 font-mono break-all font-medium">
              https://prosto-calc.vercelapp/api/explain-cost
            </code>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <Code2 size={14} />
              <span>Query Cargo</span>
            </div>
            <pre className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-zinc-400">
              {codeSnippet}
            </pre>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center py-4">
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.button
                        key="run"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={handleRun}
                        className="px-10 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-lg cursor-pointer"
                    >
                        <Play size={18} fill="currentColor" />
                        <span>Run Simulation</span>
                    </motion.button>
                )}

                {status === 'loading' && (
                    <div className="w-full max-w-lg space-y-4 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="animate-spin text-white" size={32} strokeWidth={2} />
                            <p className="text-zinc-500 text-sm font-medium">Synthesizing clinical data...</p>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Result Area */}
        <AnimatePresence>
            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden shadow-2xl backdrop-blur-2xl"
                >
                    <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                           <Terminal size={14} className="text-zinc-500" />
                           <span className="text-xs font-bold text-zinc-500">response_data.md</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">200 OK</span>
                        </div>
                    </div>
                    <div className="p-6 md:p-10 overflow-y-auto max-h-[600px] custom-scrollbar prose prose-invert max-w-none" data-color-mode="dark">
                        <MDEditor.Markdown 
                            source={API_RESPONSE.result} 
                            style={{ 
                                background: 'transparent', 
                                color: '#d4d4d8',
                                fontSize: '0.95rem',
                                lineHeight: '1.7'
                            }} 
                        />
                    </div>
                    <div className="p-4 border-t border-white/5 flex justify-center">
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                            Reset Demo <RefreshCcw size={12} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        .wmde-markdown {
          font-family: inherit !important;
          background: transparent !important;
        }
        
        .wmde-markdown .anchor { display: none !important; }

        .wmde-markdown h3 {
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          padding-bottom: 0.5rem !important;
          margin-top: 2rem !important;
          color: #fff !important;
        }

        .wmde-markdown table {
          background: rgba(0,0,0,0.2) !important;
          border-collapse: separate !important;
          border-spacing: 0 !important;
          border: 1px solid rgba(255,255,255,0.05) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          margin: 2rem 0 !important;
          width: 100% !important;
        }

        .wmde-markdown th {
          background: rgba(255,255,255,0.02) !important;
          color: #71717a !important;
          padding: 12px !important;
          font-size: 0.75rem !important;
          text-align: left !important;
        }

        .wmde-markdown td {
          border-top: 1px solid rgba(255,255,255,0.05) !important;
          padding: 12px !important;
          font-size: 0.9rem !important;
          color: #a1a1aa !important;
        }

        .wmde-markdown hr {
            border: 0;
            border-top: 1px solid rgba(255,255,255,0.05);
            margin: 3rem 0;
        }
      `}</style>
    </div>
  );
};

export default DemoPage;
