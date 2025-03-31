// Full site wizard experience restored with interactive 4-step flow
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, ShoppingCart, Zap, Timer, ArrowRight, Wand2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function ProductShotOS() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgColor = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1],["#F9FAFB", "#F3F4F6", "#E5E7EB", "#D1D5DB", "#E5E7EB"]);

  const [timeLeft, setTimeLeft] = useState("");
  const [step, setStep] = useState(0);
  const [uploaded, setUploaded] = useState(null);
  const [complete, setComplete] = useState(false);

  const steps = [
    {
      title: "Upload Your Label",
      desc: "Drop in your product label to kick off the process.",
      icon: <Wand2 className="w-6 h-6 text-black" />
    },
    {
      title: "Choose Shot Type",
      desc: "Hero, lifestyle, bundle, or animated 360°.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      title: "Configure Output",
      desc: "Choose background, shadow logic, and crop type.",
      icon: <Sparkles className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Purchase + Render",
      desc: "Pay and generate your fully deployable Offer Card.",
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />
    }
  ];

  useEffect(() => {
    const launchDate = new Date("2024-12-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("We're live!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="w-full min-h-screen text-black px-6 py-24 flex flex-col items-center transition-colors duration-700"
    >
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-xs py-2 text-center tracking-wide uppercase">
        Launching In: {timeLeft}
      </div>

      <div className="w-full max-w-xl mb-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Offer Card Config Wizard</h2>
        <p className="text-sm text-gray-600 mb-6">Walk through the 4-step process to generate a deployable offer card.</p>

        <div className="border rounded-xl overflow-hidden shadow-md bg-white p-6 text-center">
          {complete ? (
            <>
              <CheckCircle2 className="w-8 h-8 text-green-600 mb-3 mx-auto" />
              <h3 className="text-md font-semibold mb-1">Done!</h3>
              <p className="text-xs text-gray-500">Your Offer Card has been rendered successfully.</p>
            </>
          ) : (
            <>
              {steps[step].icon}
              <h3 className="text-md font-semibold mt-2 mb-1">{steps[step].title}</h3>
              <p className="text-xs text-gray-500 mb-4">{steps[step].desc}</p>

              {step === 0 && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploaded(URL.createObjectURL(e.target.files[0]))}
                  className="text-sm mb-4 mx-auto"
                />
              )}

              {step === 3 && (
                <>
                  <img src={uploaded} alt="preview" className="max-h-48 rounded border mx-auto mb-4" />
                  <button
                    onClick={() => {
                      setComplete(true);
                      setTimeout(() => {
                        alert('Offer Card Rendered. Sent to your inbox.');
                      }, 1000);
                    }}
                    className="bg-black text-white text-sm px-6 py-2 rounded-full hover:opacity-90"
                  >
                    Pay & Render
                  </button>
                </>
              )}
            </>
          )}

          {!complete && (
            <div className="flex justify-between items-center border-t mt-6 pt-4">
              <button
                onClick={() => setStep(Math.max(step - 1, 0))}
                disabled={step === 0}
                className="text-xs text-gray-400 hover:text-black disabled:opacity-30"
              >
                Back
              </button>
              <button
                onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
                disabled={step === steps.length - 1}
                className="text-xs text-white bg-black px-4 py-2 rounded-full hover:opacity-90"
              >
                Next <ArrowRight className="inline w-3 h-3 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
