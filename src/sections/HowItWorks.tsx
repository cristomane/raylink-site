import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Rocket, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StepProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast: boolean;
}

const Step = ({ number, icon: Icon, title, description, isLast }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle animation
      gsap.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Line animation - grows from top to bottom
      if (lineRef.current && !isLast) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: stepRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isLast]);

  return (
    <div ref={stepRef} className="flex gap-6 lg:gap-8 relative">
      {/* Left column with circle and line */}
      <div className="flex flex-col items-center relative" style={{ width: '56px', flexShrink: 0 }}>
        {/* Circle */}
        <div
          ref={circleRef}
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-lime flex items-center justify-center bg-dark z-10 transition-all duration-300 hover:bg-lime hover:scale-110 group"
        >
          <span className="font-montserrat text-xl lg:text-2xl font-bold text-lime group-hover:text-dark transition-colors duration-300">
            {number}
          </span>
        </div>
        
        {/* Line - positioned to connect circles */}
        {!isLast && (
          <div
            ref={lineRef}
            className="absolute top-12 lg:top-14 left-1/2 w-0.5 bg-gradient-to-b from-lime/60 to-lime/20"
            style={{ 
              height: 'calc(100% - 3rem)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top center'
            }}
          />
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className={`flex-1 ${isLast ? '' : 'pb-12 lg:pb-16'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-dark-card flex items-center justify-center border border-white/5">
            <Icon className="w-5 h-5 text-lime" />
          </div>
          <h3 className="font-montserrat text-lg lg:text-xl font-bold text-white uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <p className="font-montserrat text-gray-light text-sm lg:text-base leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
      description: 'Получите готовую конфигурацию и подключитесь за 1 минуту. Работает на всех устройствах.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-montserrat text-3xl lg:text-4xl font-bold text-center text-white mb-16 lg:mb-20 uppercase tracking-wide"
        >
          Как это работает
        </h2>

        {/* Steps */}
        <div className="relative max-w-xl mx-auto">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <Step
                key={index}
                number={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
