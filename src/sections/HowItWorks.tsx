import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Rocket, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface StepCardProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
  isLeft: boolean;
}

const StepCard = ({ number, icon: Icon, title, description, isLeft }: StepCardProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация карточки
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: isLeft ? -60 : 60, 
          x: isLeft ? -40 : 40,
          scale: 0.9,
          rotateY: isLeft ? -8 : 8,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Анимация иконки
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Анимация контента
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Пульсация номера при появлении
      gsap.to(iconRef.current, {
        boxShadow: '0 0 30px rgba(163, 230, 53, 0.6)',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: stepRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [isLeft]);

  return (
    <div 
      ref={stepRef} 
      className={`flex items-center w-full mb-16 lg:mb-24 last:mb-0 ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className="flex items-center gap-4 lg:gap-8 w-full max-w-5xl">
        {/* Левая карточка */}
        {isLeft ? (
          <>
            <div 
              ref={cardRef}
              className="flex-1 group cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div className="relative p-6 lg:p-8 rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 var(--glass-border)',
                }}
              >
                {/* Glow эффект при hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--lime) 15%, transparent) 0%, transparent 60%)',
                  }}
                />
                
                <div className="relative z-10">
                  {/* Иконка и заголовок */}
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      ref={iconRef}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-lime/10 border-2 border-lime/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-lime/20 group-hover:border-lime/50"
                    >
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-lime" />
                    </div>
                    
                    <div ref={contentRef}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-syncopate text-sm font-bold text-lime bg-lime/10 px-3 py-1 rounded-full">
                          Шаг {number}
                        </span>
                      </div>
                      <h3 className="font-martian text-xl lg:text-2xl font-bold text-dark dark:text-white uppercase tracking-wide mb-3">
                        {title}
                      </h3>
                      <p className="font-montserrat text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Центральная точка */}
            <div className="flex flex-col items-center" style={{ width: '48px', flexShrink: 0 }}>
              <div className="w-12 h-12 rounded-full bg-lime border-4 border-background dark:border-dark flex items-center justify-center z-10 shadow-glow-sm">
                <span className="font-syncopate text-lg font-bold text-dark">
                  {number}
                </span>
              </div>
            </div>

            {/* Пустая правая часть */}
            <div className="flex-1" />
          </>
        ) : (
          <>
            {/* Пустая левая часть */}
            <div className="flex-1" />

            {/* Центральная точка */}
            <div className="flex flex-col items-center" style={{ width: '48px', flexShrink: 0 }}>
              <div className="w-12 h-12 rounded-full bg-lime border-4 border-background dark:border-dark flex items-center justify-center z-10 shadow-glow-sm">
                <span className="font-syncopate text-lg font-bold text-dark">
                  {number}
                </span>
              </div>
            </div>

            {/* Правая карточка */}
            <div 
              ref={cardRef}
              className="flex-1 group cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div className="relative p-6 lg:p-8 rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 var(--glass-border)',
                }}
              >
                {/* Glow эффект при hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--lime) 15%, transparent) 0%, transparent 60%)',
                  }}
                />
                
                <div className="relative z-10">
                  {/* Иконка и заголовок */}
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      ref={iconRef}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-lime/10 border-2 border-lime/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-lime/20 group-hover:border-lime/50"
                    >
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-lime" />
                    </div>
                    
                    <div ref={contentRef}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-syncopate text-sm font-bold text-lime bg-lime/10 px-3 py-1 rounded-full">
                          Шаг {number}
                        </span>
                      </div>
                      <h3 className="font-martian text-xl lg:text-2xl font-bold text-dark dark:text-white uppercase tracking-wide mb-3">
                        {title}
                      </h3>
                      <p className="font-montserrat text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      // Анимация заголовка
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Анимация подзаголовка
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

      // Анимация линии timeline
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Parallax эффект для заголовка при скролле
      gsap.to(titleRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--lime) 30%, transparent) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'floatBlob 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--lime) 25%, transparent) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16 lg:mb-24">
          <h2
            ref={titleRef}
            className="font-syncopate text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-dark dark:text-white mb-4 lg:mb-6 uppercase tracking-wide"
          >
            Как это работает
          </h2>
          <p
            ref={subtitleRef}
            className="font-montserrat text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-2xl mx-auto"
          >
            Начните использовать RayLink всего за три простых шага
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Центральная линия */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block"
            style={{ transformOrigin: 'top' }}
          >
            <div
              ref={timelineRef}
              className="w-full h-full bg-gradient-to-b from-lime/60 via-lime/40 to-lime/20 rounded-full"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Мобильная линия */}
          <div className="absolute left-6 top-0 bottom-0 w-1 lg:hidden">
            <div className="w-full h-full bg-gradient-to-b from-lime/60 via-lime/40 to-lime/20 rounded-full" />
          </div>

          {/* Шаги */}
          <div className="relative">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA внизу */}
        <div className="mt-16 lg:mt-24 text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-lime/30 bg-lime/5"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
              Первые 72 часа —{' '}
              <span className="text-lime font-bold">бесплатно</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
