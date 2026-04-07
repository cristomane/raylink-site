import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const vkButtonRef = useRef<HTMLAnchorElement>(null);

  const features = [
    'Бесплатный тестовый период на 72 часа',
    'Неограниченный трафик',
    'До 3 устройств',
    'Сервер в Риге, Латвия',
    'Поддержка 24/7',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('li');
        gsap.fromTo(
          items,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        buttonRef.current,
        { y: 30, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        vkButtonRef.current,
        { y: 30, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.7,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: vkButtonRef.current,
            start: 'top 95%',
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
      id="pricing"
      className="relative py-24 lg:py-32"
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(204, 255, 0, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="font-syncopate text-4xl lg:text-5xl font-bold text-center text-dark dark:text-white mb-12 lg:mb-16"
        >
          Тариф
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {/* Годовая */}
          <div className="glass-card w-full p-6 lg:p-8 text-center flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="font-martian text-sm text-gray-400 tracking-wider mb-2 uppercase font-semibold">
                Годовая подписка
              </div>
              <div className="mb-4">
                <span className="font-syncopate text-5xl lg:text-6xl font-bold text-dark dark:text-white">
                  1490₽
                </span>
                <span className="font-montserrat text-gray-500 dark:text-gray-light text-sm block mt-1">
                  / год
                </span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-lime/10 text-lime text-xs font-mart font-medium mb-6">
                Экономия 17%
              </div>
            </div>
            <a
              href="https://t.me/raylink_service_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-sm font-martian"
            >
              <Send className="w-4 h-4" />
              Подключить
            </a>
          </div>

          {/* Единый тариф — центральный */}
          <div
            ref={cardRef}
            className="glass-card-premium w-full p-8 lg:p-10 text-center flex flex-col justify-between group transition-all duration-500 hover:scale-[1.02]"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(204, 255, 0, 0.05)',
            }}
          >
            <div>
              <div className="font-martian text-lg text-lime tracking-wider mb-4 uppercase font-semibold">
                Единый тариф
              </div>
              <div className="mb-6">
                <span className="font-syncopate text-6xl lg:text-7xl font-bold text-dark dark:text-white">
                  150₽
                </span>
                <span className="font-montserrat text-gray-600 dark:text-gray-light text-lg ml-2">
                  / месяц
                </span>
              </div>

              <ul ref={featuresRef} className="space-y-3 mb-8 text-left">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-lime" />
                    </div>
                    <span className="font-montserrat text-dark dark:text-white text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <a
                ref={buttonRef}
                href="https://t.me/raylink_service_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full group font-martian"
              >
                <Send className="w-5 h-5" />
                <span>Подключить через Telegram</span>
              </a>

              <a
                ref={vkButtonRef}
                href="https://vk.com/raylinkvpn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-vk w-full group text-base font-martian"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.033-1.49-1.171-1.744-1.171-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.673 4 8.231c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.744-.576.744z"/>
                </svg>
                <span>Подключить через VK</span>
              </a>
            </div>
          </div>

          {/* 3 месяца */}
          <div className="glass-card w-full p-6 lg:p-8 text-center flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-lime text-dark text-xs font-bold font-martian">
              В тренде
            </div>
            <div>
              <div className="font-martian text-sm text-gray-400 tracking-wider mb-2 uppercase font-semibold">
                3 месяца
              </div>
              <div className="mb-4">
                <span className="font-syncopate text-5xl lg:text-6xl font-bold text-dark dark:text-white">
                  400₽
                </span>
                <span className="font-montserrat text-gray-500 dark:text-gray-light text-sm block mt-1">
                  разовый платёж
                </span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-lime/10 text-lime text-xs font-montserrat font-medium mb-6">
                Экономия 12%
              </div>
            </div>
            <a
              href="https://t.me/raylink_service_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-sm font-martian"
            >
              <Send className="w-4 h-4" />
              Подключить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
