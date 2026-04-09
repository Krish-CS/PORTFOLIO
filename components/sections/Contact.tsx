// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, ArrowUpRight, Github } from "lucide-react";

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
        ".contact-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 py-20 text-white bg-[#0b0f1a]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#0b0f1a]" />
      
      {/* Dynamic radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_35%)]" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8rem_8rem]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <p className="contact-item font-mono text-xs uppercase tracking-[0.5em] text-white/40">
          Get in Touch
        </p>

        <h2 className="contact-item mt-6 font-serif text-[clamp(4rem,7vw,6.5rem)] leading-[0.95] text-white" style={{ fontStyle: "italic", fontFamily: "var(--font-cormorant)" }}>
          Let's Connect
        </h2>

        <p className="contact-item mt-6 max-w-2xl text-base leading-8 text-white/60 font-sans tracking-wide">
          Reach out through any channel. I respond within 24 hours.
        </p>

        {/* Glassmorphism Cards */}
        <div className="contact-item mt-16 grid w-full max-w-3xl gap-6 md:grid-cols-2">
          {/* Email Card */}
          <a href={`mailto:${contact.email}`}
            className="group relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.06] hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 rounded-full bg-cyan-500/10 p-5 ring-1 ring-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors duration-500">
              <Mail className="h-7 w-7 text-cyan-300" strokeWidth={1.5} />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono mb-2">Email</p>
              <p className="text-xl font-serif text-white/90 group-hover:text-cyan-300 transition-colors" style={{ fontStyle: "italic", fontFamily: "var(--font-cormorant)" }}>{contact.email}</p>
            </div>
          </a>

          {/* Phone Card */}
          <a href={`tel:${contact.phone}`}
            className="group relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/50 hover:bg-white/[0.06] hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 rounded-full bg-violet-500/10 p-5 ring-1 ring-violet-500/30 group-hover:bg-violet-500/20 transition-colors duration-500">
              <Phone className="h-7 w-7 text-violet-300" strokeWidth={1.5} />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono mb-2">Phone</p>
              <p className="text-xl font-serif text-white/90 group-hover:text-violet-300 transition-colors" style={{ fontStyle: "italic", fontFamily: "var(--font-cormorant)" }}>{contact.phone}</p>
            </div>
          </a>
        </div>

        {/* GitHub & Social Links */}
        <div className="contact-item mt-16 flex flex-wrap justify-center gap-4 lg:gap-6">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          {links.map((link, index) => {
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {link.name}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="contact-item mt-24 flex items-center justify-center gap-6 text-white/30">
          <div className="h-[1px] w-12 bg-white/10" />
          <p className="font-mono text-xs uppercase tracking-[0.45em]">
            � {new Date().getFullYear()} Krishkanth
          </p>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
