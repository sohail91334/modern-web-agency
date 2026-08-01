'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-100 bg-white/85 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
            <Globe className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-base font-bold tracking-tight transition-colors ${
                transparent ? 'text-slate-900' : 'text-slate-900'
              }`}
            >
              Modern Web
            </span>
            <span className="text-xs font-medium tracking-widest uppercase text-brand-600">
              Agency
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary">
            Start a project
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ${
          open ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {navLinks.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2">
            <Link href="/contact" className="btn-primary w-full">
              Start a project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
