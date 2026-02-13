
import Spline from '@splinetool/react-spline/next';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full min-h-screen">
      <div className="absolute flex scale-130 inset-0 z-10">
        <Spline
        scene="https://prod.spline.design/DtYSEpzTLp9uB0D7/scene.splinecode" 
      />
      </div>
      

      <div className="container mx-auto px-6 pt-32">
        {/* Your text content here */}
      </div>
    </section>
  );
}