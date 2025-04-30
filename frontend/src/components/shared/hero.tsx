
export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141414] via-[#e7e7e7] to-[#141414] mix-blend-overlay pointer-events-none" />
      <div className="z-10 text-white text-center">
        <h1 className="text-6xl font-bold neon-text">Welcome to TDP21</h1>
        <p className="mt-4 text-xl text-white/70">Join our community</p>
      </div>
    </section>
  );
};

