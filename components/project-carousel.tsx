"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Project } from "../lib/content";

type ProjectCarouselProps = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = projects[index];

  const next = () => setIndex((value) => (value + 1) % projects.length);
  const previous = () => setIndex((value) => (value - 1 + projects.length) % projects.length);

  return (
    <div className="glassPanel carouselFrame panelInset">
      <div className="projectHeader">
        <div>
          <h3 className="cardTitle">Projects</h3>
        </div>
        <div className="carouselIndex">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
      </div>

      <div className="carouselViewport">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.title}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="projectCard glassPanel"
            style={{ minHeight: 360 }}
          >
            <div className="cardHeader">
              <div>
                <h4 className="cardTitle" style={{ maxWidth: "12ch" }}>
                  {current.title}
                </h4>
              </div>
              <div className="cardMeta" style={{ textAlign: "right", maxWidth: 260 }}>
                {current.description}
              </div>
            </div>

            <div className="tagRow" style={{ marginBottom: 20 }}>
              {current.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="cardActions">
              {current.href ? (
                <a className="button primary" href={current.href} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} />
                  View project
                </a>
              ) : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="carouselControls">
        <button className="buttonAlt navButton" type="button" onClick={previous} aria-label="Previous project">
          <ChevronLeft size={16} />
          Previous
        </button>
        <button className="buttonAlt navButton" type="button" onClick={next} aria-label="Next project">
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
