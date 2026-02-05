import React, { useState } from 'react';
import { toast } from 'sonner';

const LandingPage = () => {
  const [treatmentDetails, setTreatmentDetails] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!treatmentDetails) {
        toast.error('Please enter treatment details');
        return;
    }
    setLoading(true);
    setResponse('');

    try {
      // In development, this might not work without 'vercel dev'. 
      // But for production/deployed vercel app, it points to /api/explain-cost
      const res = await fetch('/api/explain-cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: treatmentDetails }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResponse(data.result);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      // Fallback message for local dev without Vercel functions running
      if (error.message.includes('Unexpected token')) {
          setResponse("Error: API not accessible. If you are running locally 'npm run dev', the API function won't be available unless you use 'vercel dev'. Please deploy to Vercel to test the endpoint.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">Treatment Cost AI</h1>
          <p className="text-muted-foreground text-lg">
            Enter your treatment details below to get a detailed cost explanation and breakdown.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium">
                Treatment Scenario
              </label>
              <textarea
                id="details"
                value={treatmentDetails}
                onChange={(e) => setTreatmentDetails(e.target.value)}
                placeholder="e.g. I need a root canal on a molar and I have Delta Dental insurance..."
                className="w-full min-h-[120px] p-3 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Costs'}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-muted/50 rounded-xl p-6 border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;