import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Преимущества', href: '#features' },
    { label: 'Тариф', href: '#pricing' },
    { label: 'Как работает', href: '#how-it-works' },
    { label: 'Инструкция', href: '#instructions' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an anchor link (starts with #), handle smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For router links (like /instructions), allow normal navigation
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToPricing = () => {
    const target = document.querySelector('#pricing');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group" onClick={(e) => handleLinkClick(e, '#hero')}>
              <span className="font-syncopate text-lg font-bold tracking-wider text-white uppercase">
                RayLink
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative font-montserrat text-sm text-gray-light hover:text-lime transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              onClick={scrollToPricing}
              className="btn-primary py-2.5 px-5 text-sm"
            >
              Подключить
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '#hero')}>
              <span className="font-syncopate text-lg font-bold tracking-wider text-white uppercase">
                RayLink
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="border-t border-white/5"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col py-4 px-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-montserrat text-gray-light hover:text-lime transition-colors duration-200 py-3"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={scrollToPricing}
                className="btn-primary py-3 mt-4 text-center"
              >
                Подключить
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
