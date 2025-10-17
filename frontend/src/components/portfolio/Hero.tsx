import { BackgroundPaths } from './BackgroundPaths';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const Hero = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getProfile(),
  });

  // Split title into words for dynamic display
  const titleWords = profile?.title?.split(' ') || ['Software', 'Engineer'];
  const firstName = profile?.fullName?.split(' ')[0]?.toUpperCase() || 'SIMEKANI';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Paths */}
      <BackgroundPaths />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-8 font-medium">
            HI, I AM {firstName}
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 tracking-tight">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`block text-white ${index === titleWords.length - 1 ? 'italic -mt-4' : ''}`}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
            {profile?.summary || 'Creating clean, visually stunning, and functional solutions for all your needs.'}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-20 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="group relative inline-block px-12 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 overflow-hidden text-lg font-medium"
          >
            <span className="relative z-10">Let's Talk</span>
          </a>
          {profile?.resumePdfUrl && (
            <a
              href={profile.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-12 py-4 bg-transparent border-2 border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 overflow-hidden text-lg font-medium"
            >
              <span className="relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          )}
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#about" 
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Scroll down to About section"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
