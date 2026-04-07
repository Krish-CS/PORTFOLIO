// @ts-nocheck

"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact({
  links,
  github,
  contact,
}: {
  links: { name: string; url: string }[];
  github: string;
  contact: { phone: string; email: string };
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [links]);

  return (
    <section ref={containerRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-[#0b0f1a] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(180deg,#0b0f1a_0%,#111827_55%,#0b0f1a_100%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10rem_10rem]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center">
        <p className="contact-item font-mono text-xs uppercase tracking-[0.5em] text-white/35">Contact</p>
        <h2 className="contact-item mt-6 font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[0.95] text-white">Let&apos;s Connect</h2>
        <p className="contact-item mt-6 max-w-2xl text-base leading-8 text-white/55">
          Direct links, GitHub presence, and a clean text hierarchy.
        </p>

        <div className="contact-item mt-14 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">{contact.email}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">{contact.phone}</span>
          <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md transition hover:bg-white hover:text-black">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>

        <div className="contact-item mt-16 flex flex-wrap justify-center gap-5 lg:gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/70 backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              {link.name}
              <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
          ))}
        </div>

        <div className="contact-item mt-20 text-center text-white/30">
          <p className="font-mono text-xs uppercase tracking-[0.45em]">© {new Date().getFullYear()} Krishkanth</p>
        </div>
      </div>
    </section>
  );
}