
export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br dark:from-[#141414] dark:via-[#e7e7e7] dark:to-[#141414]   from-[#e7e7e7] via-[#141414] to-[#e7e7e7] mix-blend-overlay pointer-events-none" />
      <div className="z-10  text-center">
        <h1 className="text-6xl font-bold neon-text">Welcome to TDP21</h1>
        <p className="mt-4 text-xl /70">Join our community</p>
      </div>
    </section>
  );
};

