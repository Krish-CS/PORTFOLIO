// @ts-nocheck

"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';
import type { PortfolioData } from '@/lib/getData';

gsap.registerPlugin(ScrollTrigger);

type EducationItem = PortfolioData['education'][number];

export function Education({ education }: { education: EducationItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.education-card');

      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [education.length]);

  return (
    <section ref={containerRef} className="relative bg-[#0b0f1a] text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_25%),radial-gradient(circle_at_80%_25%,rgba(139,92,246,0.05),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-4 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/35">Education</p>
          <h2 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1.0] text-white">Academic Journey</h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            Educational milestones and academic progression.
          </p>
        </div>

        <div className="space-y-8">
          {education.length === 0 ? (
             <div className="rounded-2xl border border-white/5 bg-white/5 px-6 py-8 text-white/40">No education data available.</div>
          ) : education.map((item, index) => (
            <article key={`${item.title}-${index}`} className="education-card flex flex-col md:flex-row gap-6 md:gap-12 rounded-3xl border border-white/5 bg-[#111827]/40 p-8 lg:p-12 backdrop-blur-sm transition hover:border-white/10">
              <div className="flex-shrink-0 md:w-32 lg:w-48 pt-2">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#22d3ee]">
                  <GraduationCap className="h-4 w-4" /> 0{index + 1}
                </div>
                <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-wider text-white/40">{item.duration}</p>
              </div>

              <div className="space-y-4 flex-1 border-l border-white/5 pl-0 md:pl-8 lg:pl-12">
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight text-white">{item.title}</h3>
                <p className="text-lg leading-relaxed text-white/70">{item.institution}</p>
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/60">
                  {item.metric}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}