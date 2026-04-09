// @ts-nocheck

"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import type { PortfolioData } from '@/lib/getData';

gsap.registerPlugin(ScrollTrigger);

type AssetItem = PortfolioData['awards'][number];

export function Awards({ awards, memberships }: { awards: AssetItem[]; memberships: AssetItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.award-slide').forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [awards.length, memberships.length]);

  return (
    <section ref={containerRef} className="relative bg-[#0b0f1a] text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.05),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.06),transparent_28%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-4 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/35">Awards</p>
          <h2 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1.0] text-white">Honors & Roles</h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            A chronological timeline of awards, competitive events, and significant memberships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awards.length === 0 && memberships.length === 0 ? (
            <p className="rounded-2xl border border-white/5 bg-white/5 px-6 py-8 text-white/40 col-span-full">No honors data available.</p>
          ) : null}

          {awards.map((item, index) => (
            <TimelineSlide key={item.fileName} item={item} index={index} label="Award / Event" />
          ))}

          {memberships.map((item, index) => (
            <TimelineSlide key={item.fileName} item={item} index={index + awards.length} label="Membership" />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSlide({ item, index, label }: { item: AssetItem; index: number; label: string }) {
  const isPdf = item.src.toLowerCase().endsWith('.pdf');

  return (
    <article className="award-slide flex flex-col rounded-3xl border border-white/10 bg-[#111827]/30 backdrop-blur-md overflow-hidden transition-colors hover:border-white/20">
      <div className="p-6 border-b border-white/5 space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a78bfa]">
          <Sparkles className="h-3 w-3" /> {label}
        </div>
        <h3 className="font-serif text-2xl leading-snug text-white line-clamp-2" title={item.name}>{item.name}</h3>
        <p className="font-mono text-[0.65rem] text-white/30 uppercase tracking-widest truncate">{item.fileName}</p>
      </div>

      <div className="relative h-[48vh] min-h-[300px] w-full bg-black/50 p-2">
        <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/5 bg-black">
          {isPdf ? (
            <iframe 
              src={`${item.src}#toolbar=0&navpanes=0&scrollbar=0&view=fitH`} 
              className="absolute inset-0 h-full w-full border-none pointer-events-auto"
              title={item.name}
            />
          ) : (
            <img 
              src={item.src} 
              alt={item.name} 
              className="absolute inset-0 h-full w-full object-contain p-2"
            />
          )}
        </div>
      </div>
    </article>
  );
}