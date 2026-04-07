// @ts-nocheck

"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, Github } from 'lucide-react';
import type { PortfolioData } from '@/lib/getData';

gsap.registerPlugin(ScrollTrigger);

type ProjectItem = PortfolioData['projects'][number];

export function ProjectExperience({ projects, github }: { projects: ProjectItem[]; github: PortfolioData['github']; }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.project-panel');

      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 0, y: 50 },
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
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section ref={containerRef} className="relative bg-[#0b0f1a] text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.04),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.06),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-4 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/35">Projects</p>
          <h2 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1.0] text-white">Selected Projects</h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            A selection of engineering builds and technical systems.
          </p>
                            Details <ArrowRight className="h-3 w-3" />
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-panel group relative flex flex-col gap-8 rounded-3xl border border-white/5 bg-[#111827]/30 p-6 lg:flex-row lg:items-center lg:gap-12 lg:p-10 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none" style={{ backgroundImage: project.accent }} />
              
              <div className={`w-full space-y-6 lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-3">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#22d3ee]">0{index + 1} / Featured</p>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] text-white">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-white/70">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-white/60">Python</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-white/60">Backend</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-white/60">AI</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-widest text-black transition hover:bg-gray-200"
                    >
                      <Github className="h-4 w-4" />
                      View project
                    </a>
                  ) : null}

                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-white/15 hover:text-white"
                  >
                    Details <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className={`relative h-[50vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black lg:h-[60vh] lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {project.imageSrc ? (
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 mix-blend-lighten transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_50%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.1),transparent_50%)]" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.05),transparent_40%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.05),transparent_40%)]" />
          
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#111827]/80 p-8 shadow-2xl lg:p-12">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="space-y-8">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-[#22d3ee]">Story / Detail</p>
              <h3 className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[1.0] text-white">{activeProject.title}</h3>
              <p className="text-lg leading-relaxed text-white/80">{activeProject.description}</p>
              
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              
              <div className="space-y-4">
                <p className="font-mono text-sm text-white/50">Technical constraints & details:</p>
                <p className="text-base text-white/70 leading-relaxed max-w-2xl">
                  The experience was structured to feel decisive and calm, engineered for clarity under motion. 
                  Minimal controls, soft contrast, and a focused hierarchy keep the scene seamless.
                </p>
              </div>

              {activeProject.repoUrl ? (
                <div className="pt-4">
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
                  >
                    <Github className="h-4 w-4" /> Reference Source
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}