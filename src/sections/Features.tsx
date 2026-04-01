import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Lock, Smartphone, MessageCircle, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      style={{
        borderRadius: '28px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
    >
      {/* iOS-style inner glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.08) 0%, transparent 55%)',
        }}
      />
      
      {/* Top highlight line */}
      <div
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 p-8 lg:p-10">
        <div className="mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.25)]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <Icon className="w-7 h-7 text-gray-400 transition-colors duration-300 group-hover:text-lime" />
          </div>
        </div>
        <h3 className="font-montserrat text-lg font-bold text-white mb-3 uppercase tracking-wide">
          {title}
        </h3>
        <p className="font-montserrat text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const features = [
    {
      icon: Zap,
      title: 'До 1 Гбит/с',
      description: 'Оптимизированные серверы для максимальной скорости соединения без просадок.',
    },
    {
      icon: Shield,
      title: 'Протокол VLESS',
      description: 'Современный протокол с шифрованием и защитой трафика от перехвата.',
    },
    {
      icon: Lock,
      title: 'Приватность',
      description: 'Ваш трафик остаётся конфиденциальным. Мы не храним логи активности.',
    },
    {
      icon: Smartphone,
      title: '1 клик для подключения',
      description: 'Настройка за 2 минуты через Telegram бота. Работает на всех устройствах.',
    },
    {
      icon: MessageCircle,
      title: '24/7 Поддержка',
      description: 'Отвечаем в течение часа в чате Telegram. Помогаем с настройкой.',
    },
    {
      icon: Wallet,
      title: '150₽ в месяц',
      description: 'Никаких скрытых платежей и комиссий. Прозрачная цена навсегда.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden"
    >
      {/* Abstract SVG Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large blurred blob top-right */}
        <svg
          className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-30"
          viewBox="0 0 200 200"
          style={{ filter: 'blur(60px)', animation: 'floatShape1 12s ease-in-out infinite' }}
        >
          <path
            fill="rgba(204,255,0,0.15)"
            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.1,32.6C60,43.7,49.1,53,37.2,60.6C25.3,68.2,12.4,74.1,-1.1,76C-14.6,77.9,-29.2,75.8,-42.6,69.1C-56,62.4,-68.2,51.1,-76.4,37.6C-84.6,24.1,-88.8,8.4,-86.6,-6.1C-84.4,-20.6,-75.8,-33.9,-65.1,-44.8C-54.4,-55.7,-41.6,-64.2,-28.3,-72C-15,-79.8,-1.2,-86.9,12.2,-85.8C25.6,-84.7,39.1,-75.4,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Medium blob bottom-left */}
        <svg
          className="absolute top-1/2 -left-32 w-[500px] h-[500px] opacity-20"
          viewBox="0 0 200 200"
          style={{ filter: 'blur(50px)', animation: 'floatShape2 10s ease-in-out infinite reverse' }}
        >
          <path
            fill="rgba(204,255,0,0.12)"
            d="M39.9,-67.8C52.3,-61.5,63.3,-51.8,71.3,-39.8C79.3,-27.8,84.3,-13.5,83.4,0.5C82.5,14.5,75.7,28.3,66.3,39.8C56.9,51.3,44.9,60.5,31.7,67.3C18.5,74.1,4.1,78.5,-9.7,77.8C-23.5,77.1,-36.7,71.3,-48.2,62.6C-59.7,53.9,-69.5,42.3,-75.8,28.8C-82.1,15.3,-84.9,0,-81.8,-13.8C-78.7,-27.6,-69.7,-39.8,-58.3,-48.2C-46.9,-56.6,-33.1,-61.2,-19.8,-65.1C-6.5,-69,6.3,-72.2,19.1,-72.1C31.9,-72,44.7,-68.6,39.9,-67.8Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Ring shape center-right */}
        <svg
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] opacity-10"
          viewBox="0 0 200 200"
          style={{ filter: 'blur(30px)', animation: 'floatShape3 14s ease-in-out infinite 2s' }}
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="20"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-montserrat text-3xl lg:text-4xl font-bold text-center text-white mb-16 lg:mb-20 uppercase tracking-wide"
        >
          Почему RayLink
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Float animations */}
      <style>{`
        @keyframes floatShape1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-20px, 30px) rotate(10deg) scale(1.05); }
        }
        @keyframes floatShape2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(20px, -20px) rotate(-8deg) scale(1.08); }
        }
        @keyframes floatShape3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 15px) rotate(15deg); }
        }
      `}</style>
    </section>
  );
};

export default Features;
