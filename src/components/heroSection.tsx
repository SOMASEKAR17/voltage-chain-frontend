
import Spline from "@splinetool/react-spline/next";
import {GlassSurface} from "@/components"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full min-h-screen bg-linear-to-tr from-blue-200 to-yellow-300 group">
      <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:brightness-125">
        <Spline scene="https://prod.spline.design/KP2uUWsBiBpantpl/scene.splinecode" />
      </div>

      <img src="gradient.png" alt=""  className="absolute top-0 z-11 right-0 scale-50 translate-x-[25%] -translate-y-[30%]"/>

      <nav className="w-full fixed z-20 pt-8 px-8 flex items-center justify-between">
        <GlassSurface
          width={50}
          height={50}
          borderRadius={100}
          backgroundOpacity={0.5}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={11}
          brightness={50}
          opacity={3}
          mixBlendMode="screen"
        >
          <div className="flex w-15 items-center gap-1">
            <img src="icon.svg" alt="" />
          </div>
          </GlassSurface>
          <div className="flex gap-8">
            <GlassSurface
          width={100}
          height={50}
          borderRadius={100}
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
            <button className="text-white font-medium hover:text-green-400 transition-colors">
              HOME
            </button>
            </GlassSurface>
            <GlassSurface
          width={130}
          height={50}
          borderRadius={100}
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
            <button className="text-white font-medium hover:text-green-400 transition-colors">
              DASHBOARD
            </button>
            </GlassSurface>
            <GlassSurface
          width={150}
          height={50}
          borderRadius={100}
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
            <button className="text-white font-medium hover:text-green-400 transition-colors">
              MARKETPLACE
            </button>
            </GlassSurface>
          </div>
        </nav>

        {/* Left side - Title and Subtitle */}
          <div className="flex absolute z-12 bottom-10 left-10 flex-col justify-center gap-6 max-w-2xl">
            <h1 className="font-avant text-7xl italic text-white leading-tight">
              VoltageChain
            </h1>
            <p className="font-avant text-3xl italic text-white leading-relaxed">
              Giving Automobile Batteries a Second Life
            </p>
          </div>

          {/* Right side - Description */}
          <div className="max-w-xs absolute bottom-20 right-10 z-12 text-right">
            <p className="text-white text-lg font leading-relaxed font-light">
              Combining AI diagnostics to predict voltage, Blockchain to prove
              ownership, Circular Marketplace to ensure no good battery ever
              goes to waste.
            </p>
          </div>
    </section>
  );
}
