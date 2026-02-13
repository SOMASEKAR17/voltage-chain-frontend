import { GlassSurface } from "@/components";

export default function AboutCards() {
  const cards = [
    {
      title: "Instant Identity",
      description:
        "Upload a photo of your label.\n\nOur OCR engine extracts Brand, Serial Code, and Voltage Instantly.\n\nYou can use manual entry if required.",
    },
    {
      title: "AI Truth Check",
      description:
        "Our Dual-AI predicts theoretical voltage based on history.\n\nIf your battery deviates, our LLM auditor investigates the anomaly.",
    },
    {
      title: "Mint & Monetize",
      description:
        'Verified batteries get a "Digital Passport" on Polygon.\n\nList it on the marketplace with proof of ownership attached.',
    },
  ];

  return (
    <section className="w-full h-screen relative py-20 px-30 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative z-20">
          <h2 className="font-avant text-4xl italic text-white mb-4">
            From Waste to Worth in 3 Steps.
          </h2>
          <p className="font-avant text-2xl italic text-white/80">
            We've automated the trust process. You just scan, verify, and trade.
          </p>
        </div>

        <img src="gradient.png" alt=""  className="absolute top-0 z-11 right-0"/>
        <img src="gradient.png" alt=""  className="absolute bottom-0 z-11 left-0 rotate-180"/>
        <div className="grid z-20 relative grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <GlassSurface
              key={index}
              width={250}
              height={280}
              borderRadius={20}
              backgroundOpacity={0.2}
              saturation={1}
              borderWidth={0.07}
              displace={2}
              distortionScale={-180}
              blur={5}
              brightness={50}
              opacity={0.1}
              mixBlendMode="screen"
            >
              <div className="flex flex-col gap-4 p-6 h-full justify-between">
                <h3 className="font-avant text-xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-white/90 font-avant text-[13px] leading-relaxed whitespace-pre-line">
                  {card.description}
                </p>
              </div>
            </GlassSurface>
          ))}
        </div>
      </div>
    </section>
  );
}
