import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        delay: delay + 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(Math.round(obj.val));
        },
      });
    });

    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={itemRef}
      className="relative group cursor-pointer transition-all duration-500 hover:scale-105 overflow-hidden text-center"
      style={{
        borderRadius: '28px',
        background: 'rgba(255,255,255,0.01)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%)',
        }}
      />
      <div className="relative z-10 px-6 py-8">
        <div className="font-syncopate text-4xl lg:text-5xl font-bold text-lime mb-2">
          {displayValue}{suffix}
        </div>
        <div className="font-montserrat text-sm text-gray-400">
          {label}
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 100, suffix: '+', label: 'Активных пользователей' },
    { value: 99, suffix: '%', label: 'Аптайм серверов' },
    { value: 150, suffix: '₽', label: 'Стоимость в месяц' },
  ];

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(204, 255, 0, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
