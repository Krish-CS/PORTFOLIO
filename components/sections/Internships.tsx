// @ts-nocheck

"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BriefcaseBusiness } from 'lucide-react';
import type { PortfolioData } from '@/lib/getData';

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = PortfolioData['internships'][number];

export function Internships({ internships }: { internships: ExperienceItem[] }) {
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.intern-slide');

      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { autoAlpha: 0, y: 120, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 75%',
              scrub: 1,
            },
          }
        );
      });
    }, comp);

    return () => ctx.revert();
  }, [internships.length]);

  return (
    <section ref={comp} className="relative bg-[#0b0f1a] text-white py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.10),transparent_24%),linear-gradient(180deg,#0b0f1a_0%,#111827_55%,#0b0f1a_100%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10rem_10rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <div className="max-w-3xl space-y-4 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/35">Internships</p>
          <div className="flex items-center gap-4 text-white/45">
            <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
            <h2 className="font-serif text-[clamp(3.2rem,6vw,6.6rem)] leading-[0.95] text-white">Internships & Experience</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/55">Each role is presented with the organization and date range in a clear layout.</p>
        </div>

        <div className="space-y-10">
          {internships.length === 0 ? <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-10 py-12 text-white/45">No internship data available.</div> : null}

          {internships.map((item, index) => (
            <article key={`${item.role}-${index}`} className="intern-slide min-h-[100vh] rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:p-10">
              <div className="flex h-full flex-col gap-8 lg:flex-row lg:items-center">
                <div className="space-y-5 px-2 lg:w-[34%] lg:px-4">
                  <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/35">Role 0{index + 1}</p>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,4.8rem)] leading-[1.02] text-white">{item.role}</h3>
                  <p className="max-w-xl text-base leading-8 text-white/70">{item.organization}</p>
                  <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{item.duration}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Experience</span>
                  </div>
                </div>

                <div className="relative min-h-[60vh] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 shadow-[0_0_90px_rgba(34,211,238,0.08)] lg:flex-1">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_30%)]" />
                  <div className="relative z-10 flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-[#0b1120]/70 px-8 py-10 text-center">
                    <div className="space-y-3">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-white/40">Experience frame</p>
                      <p className="max-w-md text-lg leading-8 text-white/75">{item.note || 'The experience is intentionally minimal, with emphasis on role clarity and duration.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}