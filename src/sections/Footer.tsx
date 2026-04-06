import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Newspaper, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allLinks = [
    {
      icon: Send,
      title: 'Бот в Telegram',
      description: '@raylink_service_bot',
      href: 'https://t.me/raylink_service_bot',
    },
    {
      icon: Newspaper,
      title: 'Канал с новостями',
      description: '@raylink_news',
      href: 'https://t.me/raylink_news',
    },
    {
      icon: MessageCircle,
      title: 'Поддержка',
      description: '@RayLinkSupport',
      href: 'https://t.me/RayLinkSupport',
    },
    {
      icon: 'vk',
      title: 'Бот в VK',
      description: 'vk.com/raylinkvpn',
      href: 'https://vk.com/raylinkvpn',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 lg:pt-24 pb-8"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <span className="font-syncopate text-2xl font-bold text-dark dark:text-white uppercase" style={{ letterSpacing: '-0.04em' }}>
              RayLink
            </span>
          </div>

          <p className="font-montserrat text-gray-600 dark:text-gray-light text-sm max-w-md mx-auto mb-10">
            Быстрый VPN на протоколе VLESS. Безопасный доступ к интернету без ограничений.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {allLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between h-full items-start text-left p-4 rounded-xl bg-white/70 dark:bg-[rgba(26,26,26,0.6)] backdrop-blur-[20px] border border-black/[0.08] dark:border-white/[0.08] text-dark dark:text-white transition-all duration-200 hover:border-lime/40 hover:-translate-y-0.5 group"
              >
                <div className="flex items-start gap-2 w-full">
                  {link.icon === 'vk' ? (
                    <svg className="w-5 h-5 text-lime mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.033-1.49-1.171-1.744-1.171-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.673 4 8.231c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.744-.576.744z"/>
                    </svg>
                  ) : (
                    <link.icon className="w-5 h-5 text-lime mt-0.5 shrink-0" />
                  )}
                  <span className="font-martian font-medium text-dark dark:text-white text-sm leading-snug">
                    {link.title}
                  </span>
                </div>
                <span className="font-montserrat text-xs text-gray-600 dark:text-gray-light mt-3">
                  {link.description}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-montserrat text-xs text-gray-600 dark:text-gray-light">
              © 2026 RayLink. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/offer" 
                className="font-montserrat text-xs text-gray-600 dark:text-gray-light hover:text-lime transition-colors duration-300"
              >
                Публичная оферта
              </Link>
              <Link 
                to="/privacy" 
                className="font-montserrat text-xs text-gray-600 dark:text-gray-light hover:text-lime transition-colors duration-300"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
