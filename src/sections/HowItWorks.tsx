import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Rocket, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface StepProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
  isLast: boolean;
  delay: number;
}

const Step = ({ number, icon: Icon, title, description, isLast, delay }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Icon bounce animation
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: delay + 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Line draw animation
      if (lineRef.current && !isLast) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.8,
            delay: delay + 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Pulse animation for the connector
      if (pulseRef.current && !isLast) {
        gsap.to(pulseRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.5,
          delay: delay + 0.6,
          repeat: -1,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, [isLast, delay]);

  return (
    <div ref={stepRef} className="step-item relative">
      <div
        ref={cardRef}
        className="relative group cursor-pointer transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-[28px] bg-white/60 dark:bg-[rgba(255,255,255,0.01)] border border-black/[0.08] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(0,0,0,0.03),0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.1)]"
        style={{
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none hidden dark:block"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none block dark:hidden"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          }}
        />

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--lime) 10%, transparent) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 p-6 lg:p-8">
          <div className="flex items-start gap-5">
            {/* Icon with number badge */}
            <div className="relative flex-shrink-0">
              <div
                ref={iconRef}
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-lime/20 to-lime/5 dark:from-lime/10 dark:to-transparent border border-lime/30 dark:border-lime/20"
                style={{
                  boxShadow: '0 0 20px color-mix(in srgb, var(--lime) 15%, transparent), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <Icon className="w-6 h-6 text-lime" />
              </div>
              {/* Step number badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-lime flex items-center justify-center">
                <span className="font-syncopate text-xs font-bold text-dark">
                  {number}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-martian text-lg lg:text-xl font-bold text-dark dark:text-white uppercase tracking-wide mb-2 group-hover:text-lime transition-colors duration-300">
                {title}
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Arrow indicator */}
            {!isLast && (
              <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-lime" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom connector line */}
        {!isLast && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-8 overflow-hidden">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-lime/60 to-lime/20 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
            {/* Pulse dot */}
            <div
              ref={pulseRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 rounded-full bg-lime opacity-0"
              style={{
                boxShadow: '0 0 10px var(--lime), 0 0 20px var(--lime)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: MessageSquare,
      title: 'Перейдите в бота',
      description: 'Выберите удобную для вас сеть — Telegram или VK (скоро). Тестовый период 72 часа доступен сразу.',
    },
    {
      icon: CreditCard,
      title: 'Оплатите',
      description: 'Выберите удобный способ оплаты — банковская карта или криптовалюта. Всего 150₽ в месяц.',
    },
    {
      icon: Rocket,
      title: 'Подключитесь',
      description: (
        <>
          Получите готовую конфигурацию и подключитесь за 1 минуту. Работает на всех устройствах.{' '}
          <Link to="/instructions" className="text-lime hover:underline transition-colors inline-flex items-center gap-1">
            Подробная инструкция
            <ArrowRight className="w-3 h-3" />
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Decorative elements parallax
      if (decorRef.current) {
        const blobs = decorRef.current.querySelectorAll('.decor-blob');
        blobs.forEach((blob, index) => {
          gsap.to(blob, {
            y: -30 * (index + 1),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Abstract Background */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating blobs */}
        <div
          className="decor-blob absolute top-20 left-[10%] w-72 h-72 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--lime) 35%, transparent) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'floatBlob1 10s ease-in-out infinite',
          }}
        />
        <div
          className="decor-blob absolute bottom-20 right-[10%] w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--lime) 30%, transparent) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'floatBlob2 12s ease-in-out infinite reverse',
          }}
        />
        <div
          className="decor-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--lime) 20%, transparent) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Connection lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.12]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M0 400 Q 300 200, 600 400 T 1200 400"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="dark:stroke-white stroke-black"
          />
          <path
            d="M0 500 Q 300 300, 600 500 T 1200 500"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="dark:stroke-white stroke-black"
          />
          <circle cx="200" cy="300" r="100" className="dark:stroke-white/30 stroke-black/20" strokeWidth="0.5" fill="none" />
          <circle cx="1000" cy="500" r="150" className="dark:stroke-white/30 stroke-black/20" strokeWidth="0.5" fill="none" />
        </svg>

        {/* Sparkle decorations */}
        <div className="absolute top-32 right-[20%] animate-pulse">
          <Sparkles className="w-5 h-5 text-lime/40" />
        </div>
        <div className="absolute bottom-40 left-[15%] animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-4 h-4 text-lime/30" />
        </div>
        <div className="absolute top-1/2 right-[8%] animate-pulse" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-3 h-3 text-lime/50" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            ref={titleRef}
            className="font-syncopate text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 uppercase tracking-wide"
          >
            Как это работает
          </h2>
          <p
            ref={subtitleRef}
            className="font-montserrat text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-lg mx-auto"
          >
            Начните использовать RayLink всего за три простых шага
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsContainerRef}
          className="relative max-w-xl mx-auto space-y-6"
          style={{ perspective: '1000px' }}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime/10 border border-lime/20">
            <Sparkles className="w-4 h-4 text-lime" />
            <span className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
              Первые 72 часа — <span className="text-lime font-semibold">бесплатно</span>
            </span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 10px) scale(0.95); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(1.05); }
          66% { transform: translate(15px, -15px) scale(0.98); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
