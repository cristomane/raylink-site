import { useEffect, useRef, useState, ReactNode, MouseEvent, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Rocket, MessageSquare, ArrowRight, Sparkles, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt эффект при наведении
const TiltCard = ({ 
  children, 
  className = '', 
  intensity = 12 
}: { 
  children: ReactNode; 
  className?: string; 
  intensity?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      } as CSSProperties}
    >
      {children}
    </div>
  );
};

const StepCard = ({ 
  number, 
  icon: Icon, 
  title, 
  description, 
  isLeft, 
  isActive 
}: {
  number: number;
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  isLeft: boolean;
  isActive: boolean;
}) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D появление карточки
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 80, 
          rotateX: 25,
          rotateY: isLeft ? -15 : 15,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Вращение иконки
      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0, 
          rotateY: 180,
        },
        {
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Появление контента
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: isLeft ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Пульсация при активном состоянии
      if (isActive && iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.05,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, [isLeft, isActive]);

  const cardStyle = (hovered: boolean): CSSProperties => ({
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: hovered ? '2px solid rgba(163, 230, 53, 0.5)' : '1px solid var(--glass-border)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 var(--glass-border)',
    transformStyle: 'preserve-3d',
  });

  const iconStyle = (hovered: boolean): CSSProperties => ({
    background: 'linear-gradient(135deg, rgba(163, 230, 53, 0.2) 0%, rgba(163, 230, 53, 0.05) 100%)',
    border: '2px solid rgba(163, 230, 53, 0.4)',
    boxShadow: hovered 
      ? '0 0 40px rgba(163, 230, 53, 0.4), inset 0 0 20px rgba(163, 230, 53, 0.1)'
      : '0 0 20px rgba(163, 230, 53, 0.2)',
  });

  const pointStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #a3e635 0%, #84cc16 100%)',
    boxShadow: '0 0 40px rgba(163, 230, 53, 0.6), 0 0 80px rgba(163, 230, 53, 0.3)',
  };

  return (
    <div 
      ref={stepRef} 
      className={`flex items-center w-full mb-20 lg:mb-32 last:mb-0 ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
      style={{ perspective: '2000px' } as CSSProperties}
    >
      <div className="flex items-center gap-6 lg:gap-12 w-full max-w-6xl">
        {isLeft ? (
          <>
            <TiltCard className="flex-1 group cursor-pointer">
              <div 
                ref={cardRef}
                className="relative p-8 lg:p-10 rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(163,230,53,0.3)]"
                style={cardStyle(isHovered) as CSSProperties}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-4">
                    <div 
                      ref={iconRef}
                      className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={iconStyle(isHovered) as CSSProperties}
                    >
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-lime relative z-10" />
                    </div>
                    
                    <div ref={contentRef}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-syncopate text-xs font-bold text-lime bg-gradient-to-r from-lime/20 to-lime/5 px-4 py-1.5 rounded-full border border-lime/30">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          ШАГ {number}
                        </span>
                        {isActive && (
                          <span className="text-xs text-lime/60 animate-pulse">● Активно</span>
                        )}
                      </div>
                      <h3 className="font-martian text-2xl lg:text-3xl font-bold text-dark dark:text-white uppercase tracking-wide mb-3 group-hover:text-lime transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="font-montserrat text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Центральная точка */}
            <div className="flex flex-col items-center relative" style={{ width: '64px', flexShrink: 0 }}>
              <div 
                className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={pointStyle}
              >
                <span className="font-syncopate text-xl font-bold text-dark relative z-10">
                  {number}
                </span>
              </div>
            </div>

            <div className="flex-1" />
          </>
        ) : (
          <>
            <div className="flex-1" />

            {/* Центральная точка */}
            <div className="flex flex-col items-center relative" style={{ width: '64px', flexShrink: 0 }}>
              <div 
                className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={pointStyle}
              >
                <span className="font-syncopate text-xl font-bold text-dark relative z-10">
                  {number}
                </span>
              </div>
            </div>

            <TiltCard className="flex-1 group cursor-pointer">
              <div 
                ref={cardRef}
                className="relative p-8 lg:p-10 rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(163,230,53,0.3)]"
                style={cardStyle(isHovered) as CSSProperties}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-4">
                    <div 
                      ref={iconRef}
                      className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={iconStyle(isHovered) as CSSProperties}
                    >
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-lime relative z-10" />
                    </div>
                    
                    <div ref={contentRef}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-syncopate text-xs font-bold text-lime bg-gradient-to-r from-lime/20 to-lime/5 px-4 py-1.5 rounded-full border border-lime/30">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          ШАГ {number}
                        </span>
                        {isActive && (
                          <span className="text-xs text-lime/60 animate-pulse">● Активно</span>
                        )}
                      </div>
                      <h3 className="font-martian text-2xl lg:text-3xl font-bold text-dark dark:text-white uppercase tracking-wide mb-3 group-hover:text-lime transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="font-montserrat text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </>
        )}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps: Array<{
    icon: LucideIcon;
    title: string;
    description: ReactNode;
  }> = [
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
          <Link to="/instructions" className="text-lime hover:underline transition-colors inline-flex items-center gap-1 group/link">
            Подробная инструкция
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>.
        </>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D появление заголовка
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: 45, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Появление подзаголовка
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Анимация линии
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      // Parallax для заголовка
      gsap.to(titleRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Отслеживание активного шага
      steps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `[data-step="${index}"]`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ perspective: '2000px' } as CSSProperties}
    >
      {/* Фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'floatBlob 12s ease-in-out infinite',
          } as CSSProperties}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.25) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob 10s ease-in-out infinite reverse',
          } as CSSProperties}
        />
        
        {/* Плавающие фигуры */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 border-2 border-lime/10 rounded-lg"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `floatBlob ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-20 lg:mb-32" style={{ transformStyle: 'preserve-3d' } as CSSProperties}>
          <h2
            ref={titleRef}
            className="font-syncopate text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-dark dark:text-white mb-6 uppercase tracking-wide"
            style={{
              textShadow: '0 0 40px rgba(163, 230, 53, 0.3)',
            } as CSSProperties}
          >
            Как это работает
          </h2>
          <p
            ref={subtitleRef}
            className="font-montserrat text-gray-600 dark:text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto"
          >
            Начните использовать RayLink всего за три простых шага
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" style={{ perspective: '2000px' } as CSSProperties}>
          {/* Центральная линия */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block"
            style={{ transformOrigin: 'top' } as CSSProperties}
          >
            <div
              ref={timelineRef}
              className="w-full h-full rounded-full"
              style={{ 
                background: 'linear-gradient(180deg, rgba(163, 230, 53, 0.8) 0%, rgba(163, 230, 53, 0.4) 50%, rgba(163, 230, 53, 0.1) 100%)',
                transformOrigin: 'top',
                boxShadow: '0 0 20px rgba(163, 230, 53, 0.4)',
              } as CSSProperties}
            />
          </div>

          {/* Мобильная линия */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 lg:hidden">
            <div className="w-full h-full bg-gradient-to-b from-lime/60 via-lime/40 to-lime/20 rounded-full" />
          </div>

          {/* Шаги */}
          <div className="relative">
            {steps.map((step, index) => (
              <div key={index} data-step={index}>
                <StepCard
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isLeft={index % 2 === 0}
                  isActive={activeStep === index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 lg:mt-32 text-center" style={{ transformStyle: 'preserve-3d' } as CSSProperties}>
          <div 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-lime/30 bg-gradient-to-r from-lime/10 via-lime/5 to-lime/10"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 30px rgba(163, 230, 53, 0.2)',
              animation: 'floatBlob 4s ease-in-out infinite',
            } as CSSProperties}
          >
            <div className="w-3 h-3 rounded-full bg-lime animate-pulse" style={{ boxShadow: '0 0 10px rgba(163, 230, 53, 0.6)' } as CSSProperties} />
            <span className="font-montserrat text-base text-gray-600 dark:text-gray-400">
              Первые 72 часа —{' '}
              <span className="text-lime font-bold">бесплатно</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
