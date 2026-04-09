// @ts-nocheck

"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, CircleDot } from 'lucide-react';
import type { PortfolioData } from '@/lib/getData';

gsap.registerPlugin(ScrollTrigger);

type CertificationItem = PortfolioData['certifications']['global'][number];

export function Certifications({ certs }: { certs: PortfolioData['certifications'] }) {
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cert-item').forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 85%',
            },
          }
        );
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative bg-[#0b0f1a] text-white overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.05),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.06),transparent_28%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-4 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/35">Certifications</p>
          <h2 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1.0] text-white">Certifications</h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            Global certifications and additional learning achievements are displayed through their original documents.
          </p>
        </div>

        {/* GLOBAL CERTIFICATIONS - Single Full-Width Cards */}
        <div className="mb-20">
          <SectionLabel title="Global Certifications" icon={<BadgeCheck className="h-5 w-5" />} />
          <div className="space-y-12 mt-8">
            {certs.global.length > 0 ? (
              certs.global.map((cert) => <GlobalCertificateCard key={cert.fileName} item={cert} />)
            ) : (
              <EmptyState label="No global certifications found." />
            )}
          </div>
        </div>

        {/* OTHER CERTIFICATIONS - Grid Layout */}
        <div>
          <SectionLabel title="Other Certifications" icon={<CircleDot className="h-5 w-5" />} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {certs.other.length > 0 ? (
              certs.other.map((cert) => <OtherCertificateCard key={cert.fileName} item={cert} />)
            ) : (
              <EmptyState label="No other certifications found." />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-white/70 border-b border-white/5 pb-4">
      <span className="p-2 backdrop-blur-md rounded-full bg-white/5 border border-white/10">{icon}</span>
      <h3 className="font-mono text-sm uppercase tracking-[0.3em] font-medium">{title}</h3>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="rounded-2xl border border-white/5 bg-white/5 px-6 py-8 text-white/40">{label}</p>;
}

function GlobalCertificateCard({ item }: { item: CertificationItem }) {
  const isPdf = item.src.toLowerCase().endsWith('.pdf');

  return (
    <article className="cert-item rounded-3xl border border-white/10 bg-[#111827]/50 p-6 lg:p-8 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col justify-center space-y-4 lg:w-1/3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#22d3ee]">
            <BadgeCheck className="h-4 w-4" /> Global
          </div>
          <h4 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-white">{item.name}</h4>
          <p className="font-mono text-[0.65rem] text-white/30 uppercase tracking-widest break-all">
            {item.fileName}
          </p>
        </div>

        <div className="relative h-[48vh] min-h-[300px] lg:h-[58vh] w-full lg:flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          {isPdf ? (
            <iframe 
              src={`${item.src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
              className="absolute inset-0 h-full w-full border-none"
              title={item.name}
            />
          ) : (
            <img 
              src={item.src} 
              alt={item.name} 
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
          )}
        </div>
      </div>
    </article>
  );
}

function OtherCertificateCard({ item }: { item: CertificationItem }) {
  const isPdf = item.src.toLowerCase().endsWith('.pdf');

  return (
    <article className="cert-item flex flex-col rounded-3xl border border-white/10 bg-[#111827]/30 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-white/5 space-y-3 flex-shrink-0">
        <p className="font-mono text-[clamp(0.9rem,1vw,1.1rem)] text-[#22d3ee] uppercase tracking-[0.35em] truncate font-bold mb-1">{item.issuer || 'Certification'}</p>
        <h4 className="font-serif text-[clamp(1.15rem,1.5vw,1.9rem)] leading-[1.08] text-white" title={item.name}>{item.name}</h4>
        <p className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest truncate mt-2">{item.fileName}</p>
      </div>
      <div className="relative h-[42vh] min-h-[300px] w-full bg-black/50 p-2">
        <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/5 bg-black">
          {isPdf ? (
            <iframe 
              src={`${item.src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
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