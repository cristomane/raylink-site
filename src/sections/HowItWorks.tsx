import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Rocket, MessageSquare, ArrowRight } from 'lucide-react';
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
        className="relative group transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex items-start gap-5 lg:gap-8">
          {/* Left side: Icon with vertical connector */}
          <div className="relative flex flex-col items-center flex-shrink-0">
            {/* Icon container */}
            <div
              ref={iconRef}
              className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-white dark:bg-dark-card border-2 border-lime/30 dark:border-lime/20 group-hover:border-lime/60 dark:group-hover:border-lime/40"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(22,163,74,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-lime" />
              
              {/* Step number badge */}
              <div 
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-lime flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: '0 2px 8px rgba(22,163,74,0.4)',
                }}
              >
                <span className="font-syncopate text-sm font-bold text-dark">
                  {number}
                </span>
              </div>
            </div>

            {/* Vertical connector line */}
            {!isLast && (
              <div className="relative w-px h-16 lg:h-20 mt-2 overflow-hidden">
                <div
                  ref={lineRef}
                  className="absolute inset-0 w-full bg-gradient-to-b from-lime/60 via-lime/30 to-transparent origin-top"
                  style={{ transform: 'scaleY(0)' }}
                />
                {/* Pulse dot */}
                <div
                  ref={pulseRef}
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-1.5 rounded-full bg-lime opacity-0"
                  style={{
                    boxShadow: '0 0 8px var(--lime), 0 0 16px var(--lime)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Right side: Content */}
          <div className="flex-1 pt-2 lg:pt-3">
            <h3 className="font-martian text-lg lg:text-xl font-bold text-dark dark:text-white uppercase tracking-wide mb-2 group-hover:text-lime transition-colors duration-300">
              {title}
            </h3>
            <p className="font-montserrat text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--lime) 4%, transparent) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="relative max-w-xl mx-auto space-y-8 lg:space-y-10"
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
            <span className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
              Первые 72 часа — <span className="text-lime font-semibold">бесплатно</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
