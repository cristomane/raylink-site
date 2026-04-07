import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

type Platform = 'ios' | 'android' | 'windows' | 'macos';

interface StepData {
  number: string;
  title: string;
  description: React.ReactNode;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  extraDescription?: React.ReactNode;
  extraMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
}

interface PlatformData {
  id: Platform;
  name: string;
  icon: React.ElementType;
  steps: StepData[];
  downloadButton?: React.ReactNode;
}

const IOSIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c1.5 0 2.5 1 3 2.5s-.5 3-2 4-3 .5-4-.5-1.5-3-.5-4 2-2 3.5-2z" />
    <path d="M12 8c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7z" />
  </svg>
);

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10v6c0 2 1.5 3 3 3h6c1.5 0 3-1 3-3v-6" />
    <path d="M2 10h20" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
);

const MacOSIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M2 20h20" />
  </svg>
);

const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0225 3.503C15.5902 8.2033 13.8533 7.758 12 7.758c-1.8532 0-3.5901.4453-5.1366 1.1917L4.8409 5.4467a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
  </svg>
);

const platformsData: PlatformData[] = [
  {
    id: 'ios',
    name: 'iOS',
    icon: IOSIcon,
    downloadButton: (
      <a
        href="https://apps.apple.com/ru/app/v2raytun/id6476628951"
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        <AppStoreIcon className="w-10 h-10 flex-shrink-0 text-lime transition-transform duration-300 group-hover:scale-110" />
        <div className="flex flex-col leading-tight">
          <small className="text-[11px] text-gray-500 dark:text-gray-light font-normal uppercase tracking-wide">Загрузить в</small>
          <span className="text-lg font-bold tracking-tight text-dark dark:text-white">App Store</span>
        </div>
      </a>
    ),
    steps: [
      {
        number: '01',
        title: 'Скачайте приложение',
        description: 'Установите официальное приложение V2RayTun из App Store:',
      },
      {
        number: '02',
        title: 'Получите конфигурацию',
        description: <>Скопируйте свой профиль в разделе <strong>👤 Мой профиль &gt; 🔗 Ссылки</strong> в боте RayLink.</>,
        media: { type: 'image', src: 'media/ios/step2.png', alt: 'Копирование профиля' },
      },
      {
        number: '03',
        title: 'Импортируйте профиль',
        description: <>Откройте приложение V2RayTun, нажмите <strong>«+»</strong> и вставьте скопированную ссылку из бота.</>,
        media: { type: 'video', src: 'media/ios/step3.mp4', alt: 'Импорт профиля' },
      },
      {
        number: '04',
        title: 'Подключитесь',
        description: 'Выберите добавленную конфигурацию и нажмите кнопку подключения. Готово!',
        media: { type: 'image', src: 'media/ios/step4.png', alt: 'Подключение' },
      },
    ],
  },
  {
    id: 'android',
    name: 'Android',
    icon: AndroidIcon,
    downloadButton: (
      <a
        href="https://play.google.com/store/apps/details?id=com.v2raytun.android"
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        <GooglePlayIcon className="w-10 h-10 flex-shrink-0 text-lime transition-transform duration-300 group-hover:scale-110" />
        <div className="flex flex-col leading-tight">
          <small className="text-[11px] text-gray-500 dark:text-gray-light font-normal uppercase tracking-wide">Загрузить в</small>
          <span className="text-lg font-bold tracking-tight text-dark dark:text-white">Google Play</span>
        </div>
      </a>
    ),
    steps: [
      {
        number: '01',
        title: 'Скачайте приложение',
        description: 'Установите официальное приложение V2RayTun из Google Play:',
      },
      {
        number: '02',
        title: 'Получите конфигурацию',
        description: <>Скопируйте свой профиль в разделе <strong>👤 Мой профиль &gt; 🔗 Ссылки</strong> в боте RayLink.</>,
        media: { type: 'image', src: 'media/android/step2.png', alt: 'Копирование профиля' },
      },
      {
        number: '03',
        title: 'Импортируйте профиль',
        description: <>Откройте приложение, нажмите <strong>«+»</strong></>,
        media: { type: 'image', src: 'media/android/step3_1.png', alt: 'Нажмите плюс' },
        extraDescription: <><strong>«Импорт из буфера обмена»</strong> и вставьте ссылку из бота.</>,
        extraMedia: { type: 'image', src: 'media/android/step3_2.png', alt: 'Импорт из буфера обмена' },
      },
      {
        number: '04',
        title: 'Подключитесь',
        description: 'Выберите добавленную конфигурацию и нажмите кнопку подключения. Готово!',
        media: { type: 'image', src: 'media/android/step4.png', alt: 'Подключение' },
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: WindowsIcon,
    downloadButton: (
      <a
        href="https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe"
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        <WindowsIcon className="w-10 h-10 flex-shrink-0 text-lime transition-transform duration-300 group-hover:scale-110" />
        <div className="flex flex-col leading-tight">
          <small className="text-[11px] text-gray-500 dark:text-gray-light font-normal uppercase tracking-wide">Скачать</small>
          <span className="text-lg font-bold tracking-tight text-dark dark:text-white">HAPP для Windows</span>
        </div>
      </a>
    ),
    steps: [
      {
        number: '01',
        title: 'Загрузите клиент',
        description: 'Скачайте Happ для Windows:',
      },
      {
        number: '02',
        title: 'Запуск установщика',
        description: 'Запустите скачанный .exe файл и следуйте инструкциям мастера установки.',
      },
      {
        number: '03',
        title: 'Получите конфигурацию',
        description: <>Скопируйте свой профиль в разделе <strong>👤 Мой профиль &gt; 🔗 Ссылки</strong> в боте RayLink.</>,
        media: { type: 'image', src: 'media/windows/step3.png', alt: 'Копирование профиля' },
      },
      {
        number: '04',
        title: 'Настройте подключение',
        description: 'Вставьте конфигурационную ссылку из бота (Ctrl+V)',
        media: { type: 'image', src: 'media/windows/step4_1.png', alt: 'Вставка конфигурации' },
        extraDescription: 'Убедитесь, что у вас включен режим TUN',
        extraMedia: { type: 'image', src: 'media/windows/step4_2.png', alt: 'Режим TUN' },
      },
      {
        number: '05',
        title: 'Подключитесь',
        description: 'Выберите добавленную конфигурацию и нажмите кнопку подключения. Готово!',
        media: { type: 'image', src: 'media/windows/step5.png', alt: 'Подключение' },
      },
    ],
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: MacOSIcon,
    steps: [],
  },
];

const faqs = [
  {
    question: 'Как получить пробный период?',
    answer: (
      <>
        Пробный период составляет <strong>72 часа</strong>. Для активации нужно перейти в{' '}
        <a href="https://t.me/raylink_service_bot" className="text-lime hover:underline font-medium">@raylink_service_bot</a> и нажать кнопку{' '}
        <strong>⚙️ Тестовый период</strong>
      </>
    ),
  },
  {
    question: 'Можно ли использовать на нескольких устройствах?',
    answer: (
      <>
        Да, одна подписка работает на <strong>2 устройствах одновременно</strong>. Вы можете использовать RayLink на телефоне и компьютере. Также профили совместимы с <strong>TV</strong> — подключайте VPN прямо на телевизоре!
      </>
    ),
  },
  {
    question: 'Какая скорость соединения?',
    answer: (
      <>
        Что касается скорости, то скорость вашего VPN зависит только от скорости вашего интернет-соединения. Незначительные падения скорости на <strong>10-20%</strong> совершенно нормальны при использовании VPN, поскольку его главным приоритетом всегда должна быть безопасность и конфиденциальность.
      </>
    ),
  },
  {
    question: 'Как продлить подписку?',
    answer: (
      <>
        Откройте бота <a href="https://t.me/raylink_service_bot" className="text-lime hover:underline font-medium">@raylink_service_bot</a>, выберите раздел{' '}
        <strong>💳 Тарифы (Оплата)</strong> и следуйте инструкциям. Подписка продлится автоматически после оплаты.
      </>
    ),
  },
];

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('ios');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const currentPlatform = platformsData.find((p) => p.id === selectedPlatform);

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseBtn {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--lime) 40%, transparent); }
          70% { box-shadow: 0 0 0 15px color-mix(in srgb, var(--lime) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--lime) 0%, transparent); }
        }
        .animate-float-icon {
          animation: floatIcon 2s ease-in-out infinite;
        }
        .animate-pulse-btn {
          animation: pulseBtn 2s infinite;
        }
        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(145deg, #e5e5e5 0%, #f5f5f5 100%);
          color: inherit;
          padding: 16px 28px;
          border-radius: 16px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 15px;
          margin-top: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.08);
          min-width: 260px;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        .dark .download-btn {
          background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
          border-color: #333;
        }
        .download-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--lime) 10%, transparent), transparent);
          transition: left 0.6s ease;
        }
        .download-btn:hover::before {
          left: 100%;
        }
        .download-btn:hover {
          transform: translateY(-3px);
          border-color: var(--lime);
          box-shadow: 0 8px 25px color-mix(in srgb, var(--lime) 15%, transparent);
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[rgba(10,10,10,0.95)] backdrop-blur-[20px]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-light hover:text-lime transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-montserrat text-sm">Назад</span>
          </button>
          <h1 className="font-syncopate text-lg font-bold text-dark dark:text-white uppercase tracking-wide">Инструкция по подключению</h1>
        </div>
      </header>

      <main ref={contentRef} className="max-w-3xl mx-auto px-4 py-10">
        <div className="glass-card p-6 lg:p-10">
          {/* Hero header */}
          <div className="text-center pt-6 pb-8">
            <div className="font-syncopate text-2xl font-bold tracking-widest text-dark dark:text-white uppercase mb-2">RayLink</div>
            <p className="font-montserrat text-sm text-gray-500 dark:text-gray-light mb-6">Инструкция по настройке</p>
            <a
              href="https://t.me/raylink_service_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 btn-primary py-3.5 px-7 rounded-full text-sm animate-pulse-btn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.38-.49 1.03-.74 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.25z" />
              </svg>
              <span className="font-martian font-semibold">Запустить бота</span>
            </a>
          </div>

          {/* Platform selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {platformsData.map((platform) => {
              const Icon = platform.icon;
              const isActive = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`relative rounded-2xl p-5 text-center transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? 'bg-lime/[0.03] border-lime/50 dark:border-lime'
                      : 'bg-gray-100 dark:bg-[#111] border-black/[0.08] dark:border-white/[0.08] hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-lime transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  <Icon
                    className={`w-10 h-10 mx-auto mb-3 transition-colors duration-300 ${
                      isActive ? 'text-lime animate-float-icon' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                  <span
                    className={`font-martian text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-dark dark:text-white' : 'text-gray-500 dark:text-gray-light'
                    }`}
                  >
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instruction content */}
          <div className="rounded-3xl p-5 lg:p-6 bg-gray-100 dark:bg-[#111] border border-black/[0.08] dark:border-white/[0.08] mb-8">
            {selectedPlatform === 'macos' ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-lime/30 text-lime bg-lime/10">
                  В разработке
                </span>
                <div className="text-5xl mb-4 animate-float-icon">🍏</div>
                <h3 className="font-martian text-lg font-bold text-dark dark:text-white mb-2">Инструкция для macOS скоро</h3>
                <p className="font-montserrat text-sm text-gray-500 dark:text-gray-light max-w-sm leading-relaxed">
                  Мы активно работаем над инструкцией для macOS. Следите за обновлениями в нашем новостном канале!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {currentPlatform?.downloadButton && (
                  <div className="pb-2">{currentPlatform.downloadButton}</div>
                )}
                {currentPlatform?.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-lime to-transparent" />
                    <span className="inline-block bg-lime text-dark font-montserrat text-[11px] font-bold px-2.5 py-1 rounded-full mb-2 tracking-wide">
                      {step.number}
                    </span>
                    <h4 className="font-martian text-base font-semibold text-dark dark:text-white mb-1">{step.title}</h4>
                    <p className="font-montserrat text-sm text-gray-600 dark:text-gray-light leading-relaxed mb-3">
                      {step.description}
                    </p>
                    {step.media && (
                      <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-black">
                        {step.media.type === 'video' ? (
                          <video autoPlay loop muted playsInline controls className="w-full h-auto block">
                            <source src={step.media.src} type="video/mp4" />
                            Ваш браузер не поддерживает видео.
                          </video>
                        ) : (
                          <img src={step.media.src} alt={step.media.alt} className="w-full h-auto block" />
                        )}
                      </div>
                    )}
                    {step.extraDescription && (
                      <p className="font-montserrat text-sm text-gray-600 dark:text-gray-light leading-relaxed mt-4 mb-3">
                        {step.extraDescription}
                      </p>
                    )}
                    {step.extraMedia && (
                      <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-black">
                        {step.extraMedia.type === 'video' ? (
                          <video autoPlay loop muted playsInline controls className="w-full h-auto block">
                            <source src={step.extraMedia.src} type="video/mp4" />
                            Ваш браузер не поддерживает видео.
                          </video>
                        ) : (
                          <img src={step.extraMedia.src} alt={step.extraMedia.alt} className="w-full h-auto block" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h3 className="font-martian text-lg font-bold text-dark dark:text-white mb-5 tracking-tight">Частые вопросы</h3>
            <div className="space-y-0">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border-b border-black/[0.08] dark:border-white/[0.08]"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className="font-martian font-medium text-sm text-dark dark:text-white group-hover:text-lime transition-colors pr-4">
                        {faq.question}
                      </span>
                      <span className="relative w-6 h-6 flex-shrink-0 ml-2">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-0.5 bg-lime rounded-full transition-transform duration-300" />
                        <span
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-lime rounded-full transition-all duration-300 ${
                            isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`pb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                          <p className="font-montserrat text-sm text-gray-600 dark:text-gray-light leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support */}
          <div className="text-center pt-8 border-t border-black/[0.08] dark:border-white/[0.08]">
            <p className="font-syncopate text-[11px] text-gray-500 dark:text-gray-light uppercase tracking-[0.15em] mb-5">Нужна помощь?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://t.me/RayLinkSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/10 text-dark dark:text-white border border-transparent hover:border-lime hover:text-lime transition-all font-martian text-sm font-semibold w-full sm:w-auto"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.38-.49 1.03-.74 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.25z" />
                </svg>
                Написать в поддержку
              </a>
              <a
                href="https://t.me/raylink_news"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-light hover:border-gray-400 dark:hover:border-gray-500 hover:text-dark dark:hover:text-white transition-all font-martian text-sm font-semibold w-full sm:w-auto"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                </svg>
                Новостной канал
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructionsPage;
