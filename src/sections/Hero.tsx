import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    const target = document.querySelector('#pricing');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="p-8 sm:p-12 lg:p-16 text-center rounded-[40px]"
          style={{
            background: 'rgba(26, 26, 26, 0.35)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            touchAction: 'pan-y',
          }}
        >
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-syncopate text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-wider"
          >
            RayLink
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-syncopate text-base sm:text-lg text-lime tracking-[0.2em] font-bold mb-6 uppercase"
          >
            Свобода в каждом клике
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="font-montserrat text-lg text-gray-light max-w-xl mx-auto mb-10"
          >
            Откройте для себя интернет без границ. Быстро, безопасно, свободно.
          </p>

          {/* CTA Button */}
          <button
            ref={buttonRef}
            onClick={scrollToPricing}
            className="btn-primary group"
          >
            <span>Начать бесплатно</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
