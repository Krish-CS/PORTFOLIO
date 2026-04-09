"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { TransformTemplate } from "motion-dom";
import {
  ArrowRight,
  BookOpen,
  Code2,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiHackerrank, SiLeetcode } from "react-icons/si";
import SequenceBackdrop from "../components/sequence-backdrop";
import PdfPreview from "../components/pdf-preview";
import PdfLightbox from "../components/pdf-lightbox";
import CertificateCarousel from "../components/certificate-carousel";
import {
  awards,
  contactLinks,
  education,
  featuredProjects,
  globalCertificates,
  heroCopy,
  internships,
  membership,
  otherCertificates,
  profileStats,
  type CertificateItem,
  type Project,
} from "../lib/content";
import {
  assetUrl,
  certificatePdfUrl,
  globalCertificatePdfUrl,
  membershipPdfUrl,
  profilePhotoUrl,
} from "../lib/asset";

type LightboxState = {
  title: string;
  subtitle?: string;
  src: string;
} | null;

type NavItem = {
  id: string;
  target: string;
  label: string;
};

const projectMotionPresets = [
  { x: 56, y: 10, rotate: -2.2, scale: 0.985 },
  { x: -56, y: -8, rotate: 2.2, scale: 0.985 },
  { x: 0, y: 48, rotate: -1.4, scale: 0.98 },
  { x: 0, y: -44, rotate: 1.4, scale: 0.98 },
  { x: 42, y: 30, rotate: -1.7, scale: 0.985 },
  { x: -42, y: -28, rotate: 1.7, scale: 0.985 },
];

const tiltTransformTemplate: TransformTemplate = (_transform, generatedTransform) =>
  `${generatedTransform} perspective(1300px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(var(--tilt-lift, 0px))`;

function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      data-scene
      className={`sectionShell ${className}`.trim()}
      initial={{ opacity: 0, x: 28, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.28, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sectionInner">
        <div className="sectionHeader">
          <div className="sectionEyebrow">{eyebrow}</div>
          <h2 className="sectionTitle">{title}</h2>
          {lead ? <p className="sectionLead">{lead}</p> : null}
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function getContactIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) return <FaGithub size={18} />;
  if (normalized.includes("linkedin")) return <FaLinkedinIn size={18} />;
  if (normalized.includes("leetcode")) return <SiLeetcode size={18} />;
  if (normalized.includes("hackerrank")) return <SiHackerrank size={18} />;
  if (normalized.includes("resume")) return <FileText size={18} />;

  return <ExternalLink size={18} />;
}

function chunkItems<T>(items: T[], chunkSize: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function ProjectVisual({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.photoName ? assetUrl(["project-photos", project.photoName]) : "";

  return (
    <div className="projectPhotoFrame">
      {!failed && src ? (
        <img
          src={src}
          alt={project.title}
          className="projectPhoto"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="projectPhotoPlaceholder" aria-label="Project image placeholder" />
      )}
    </div>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [certChunkSize, setCertChunkSize] = useState(6);

  const otherCertificateChunks = useMemo(() => chunkItems(otherCertificates, certChunkSize), [certChunkSize]);

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "hero", target: "hero", label: "Home" },
      { id: "projects", target: "project-1", label: "Projects" },
      { id: "global-certs", target: "global-cert-1", label: "Global certifications" },
      { id: "other-certs", target: "other-certs-1", label: "Other certifications" },
      { id: "awards", target: "awards", label: "Awards" },
      { id: "education", target: "education", label: "Education" },
      { id: "internships", target: "internship-1", label: "Internships" },
      { id: "contact", target: "contact", label: "Contact" },
    ],
    [],
  );

  const activeNav = useMemo(() => {
    if (activeSection.startsWith("project-")) return "projects";
    if (activeSection.startsWith("global-cert-")) return "global-certs";
    if (activeSection.startsWith("other-certs-")) return "other-certs";
    if (activeSection.startsWith("internship-")) return "internships";
    return activeSection;
  }, [activeSection]);

  useEffect(() => {
    const updateChunkSize = () => {
      const width = window.innerWidth;
      if (width <= 760) {
        setCertChunkSize(1);
        return;
      }
      if (width <= 1260) {
        setCertChunkSize(2);
        return;
      }
      setCertChunkSize(4);
    };

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize, { passive: true });

    return () => {
      window.removeEventListener("resize", updateChunkSize);
    };
  }, []);

  useEffect(() => {
    const observed = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.45, 0.62, 0.75],
        rootMargin: "-18% 0px -18% 0px",
      },
    );

    observed.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const applyViewportVars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const longEdge = Math.max(width, height);
      const shortEdge = Math.min(width, height);
      const aspectRatio = width / Math.max(height, 1);
      const baseScale = Math.min(width / 1920, height / 1080);
      const tvBoost = longEdge >= 2200 && shortEdge >= 1100 ? 1.08 : 1;
      const compactPenalty = aspectRatio < 1.45 ? 0.96 : 1;
      const sceneScale = clamp(baseScale * tvBoost * compactPenalty, 0.82, 1.18);
      const nav = document.querySelector<HTMLElement>(".navRail");
      const navOffset = Math.ceil((nav?.getBoundingClientRect().height ?? 0) + 20);
      const contentMax = Math.round(clamp(width * 0.9, 980, 1780));
      const gutter = Math.round(clamp(width * 0.018, 10, 42));

      root.style.setProperty("--app-vh", `${height * 0.01}px`);
      root.style.setProperty("--app-vw", `${width * 0.01}px`);
      root.style.setProperty("--scene-scale", sceneScale.toFixed(4));
      root.style.setProperty("--scene-nav-offset", `${navOffset}px`);
      root.style.setProperty("--scene-content-max", `${contentMax}px`);
      root.style.setProperty("--scene-gutter", `${gutter}px`);
    };

    const scheduleUpdate = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        applyViewportVars();
      });
    };

    applyViewportVars();
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate, { passive: true });

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".glassPanel"));
    const cleanups: Array<() => void> = [];

    const updateTilt = (element: HTMLElement, clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const tiltX = ((0.5 - y) * 11).toFixed(2);
      const tiltY = ((x - 0.5) * 11).toFixed(2);

      element.style.setProperty("--tilt-x", `${tiltX}deg`);
      element.style.setProperty("--tilt-y", `${tiltY}deg`);
      element.style.setProperty("--sheen-x", `${(x * 100).toFixed(2)}%`);
      element.style.setProperty("--sheen-y", `${(y * 100).toFixed(2)}%`);
    };

    const clearTilt = (element: HTMLElement) => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--sheen-x", "50%");
      element.style.setProperty("--sheen-y", "50%");
    };

    cards.forEach((element) => {
      const onPointerMove = (event: PointerEvent) => updateTilt(element, event.clientX, event.clientY);
      const onPointerLeave = () => clearTilt(element);

      clearTilt(element);
      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerleave", onPointerLeave);

      cleanups.push(() => {
        element.removeEventListener("pointermove", onPointerMove);
        element.removeEventListener("pointerleave", onPointerLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main className="appShell">
      <SequenceBackdrop />

      <nav className="navRail" aria-label="Portfolio sections">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.target}`}
            className={`navItemDot ${activeNav === item.id ? "active" : ""}`}
            aria-label={item.label}
          />
        ))}
      </nav>

      <div className="pageContent">
        <motion.section
          id="hero"
          data-scene
          className="sectionShell heroSection"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="heroGrid">
            <motion.div
              className="glassPanel heroCopy"
              transformTemplate={tiltTransformTemplate}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <h1 className="heroTitle">
                {heroCopy.name}
                <span>Computer science student.</span>
              </h1>
              <p className="heroSubtitle">{heroCopy.subtitle}</p>
              <p className="heroDescription">{heroCopy.description}</p>
              <div className="heroActions" style={{ marginTop: 14 }}>
                <a className="button primary" href="#project-1">
                  Explore work
                  <ArrowRight size={16} />
                </a>
                <a className="buttonAlt" href="#contact">
                  Contact
                </a>
              </div>
              <div className="heroMeta">
                <div className="statGrid">
                  {profileStats.map((stat) => (
                    <div key={stat.label} className="statCard">
                      <strong className="statValue">{stat.value}</strong>
                      <span className="statLabel">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="smallCaption">{heroCopy.location}</div>
              </div>
            </motion.div>

            <motion.div
              className="glassPanel heroPortrait"
              transformTemplate={tiltTransformTemplate}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <div className="profileCard">
                <div className="profileHalo" />
                <div className="profileImageWrap">
                  <img src={profilePhotoUrl()} alt="Krishkanth profile portrait" />
                </div>
                <div className="profileFooter">
                  <span>Computer Science and Engineering</span>
                  <span>2023 - 2027</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {featuredProjects.map((project, index) => {
          const motionPreset = projectMotionPresets[index % projectMotionPresets.length];

          return (
            <SectionShell
              key={project.title}
              id={`project-${index + 1}`}
              eyebrow={`Project ${index + 1}`}
              title={project.title}
              lead={project.description}
              className="projectSceneSection"
            >
              <motion.div
                className={`glassPanel panelInset projectSceneGrid ${index % 2 === 1 ? "reverse" : ""}`}
                transformTemplate={tiltTransformTemplate}
                initial={{
                  opacity: 0,
                  x: motionPreset.x,
                  y: motionPreset.y,
                  rotate: motionPreset.rotate,
                  scale: motionPreset.scale,
                  filter: "blur(10px)",
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.18, margin: "-8% 0px -8% 0px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="projectSceneInfo">
                  <div className="tagRow">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.href ? (
                    <a className="button primary" href={project.href} target="_blank" rel="noreferrer" style={{ marginTop: 16 }}>
                      View project
                      <ExternalLink size={16} />
                    </a>
                  ) : null}
                </div>
                <ProjectVisual project={project} />
              </motion.div>
            </SectionShell>
          );
        })}

        <SectionShell
          id="global-cert-1"
          eyebrow="Certifications"
          title="Global certifications"
          className="globalCertSceneSection"
        >
          <CertificateCarousel
            certificates={globalCertificates}
            onOpen={(certificate) => {
              setLightbox({
                title: certificate.title,
                subtitle: certificate.summary,
                src: globalCertificatePdfUrl(certificate.fileName),
              });
            }}
          />
        </SectionShell>

        {otherCertificateChunks.map((chunk, chunkIndex) => (
          <SectionShell
            key={`other-certs-${chunkIndex + 1}`}
            id={`other-certs-${chunkIndex + 1}`}
            eyebrow="Other certifications"
            title={`Other certifications ${chunkIndex + 1}/${otherCertificateChunks.length}`}
            className="otherCertSceneSection"
          >
            <div className="glassPanel panelInset certGridScene">
              <div className={`certGrid certGridSceneGrid ${chunk.length >= 3 ? "grid-2" : "grid-1"}`}>
                {chunk.map((certificate: CertificateItem, certIndex) => {
                  const src = certificatePdfUrl(certificate.fileName);
                  const motionPreset = projectMotionPresets[
                    (chunkIndex * certChunkSize + certIndex) % projectMotionPresets.length
                  ];
                  return (
                    <motion.button
                      key={certificate.fileName}
                      type="button"
                      className="certTile"
                      transformTemplate={tiltTransformTemplate}
                      initial={{
                        opacity: 0,
                        x: motionPreset.x * 0.18,
                        y: motionPreset.y * 0.18,
                        rotate: motionPreset.rotate * 0.45,
                        scale: 0.96,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      viewport={{ once: false, amount: 0.14, margin: "-8% 0px -8% 0px" }}
                      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: certIndex * 0.04 }}
                      onClick={() => setLightbox({ title: certificate.title, subtitle: certificate.issuer, src })}
                    >
                      <div className="certTileContent">
                        <h4 className="certTileTitle">{certificate.title}</h4>
                        <div className="certTileIssuer">{certificate.issuer}</div>
                      </div>
                      <PdfPreview src={src} alt={certificate.title} className="certTilePreview" scale={1.2} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </SectionShell>
        ))}

        <SectionShell id="awards" eyebrow="Awards" title="Awards and membership" className="awardsSection">
          <div className="sectionGrid">
            <div className="glassPanel panelInset">
              <div className="timelineList">
                {awards.map((item) => (
                  <article key={item.title} className="timelineItem">
                    <div className="timelinePeriod">{item.period}</div>
                    <h3 className="timelineTitle">{item.title}</h3>
                    <div className="timelineOrg">{item.organization}</div>
                    <div className="timelineBody">{item.details}</div>
                  </article>
                ))}
              </div>
            </div>
            <div className="glassPanel panelInset">
              <div className="sectionEyebrow">Membership</div>
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)" }}>
                {membership.title}
              </h3>
              <div className="smallCaption" style={{ marginTop: 10 }}>
                {membership.organization}
              </div>
              <div style={{ marginTop: 10 }}>
                <PdfPreview
                  src={membershipPdfUrl(membership.fileName)}
                  alt={membership.title}
                  className="panelInset certificatePreviewShell membershipCertificateShell"
                  scale={1.8}
                />
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="education" eyebrow="Education" title="Education" className="educationSection">
          <div className="sectionGrid">
            <div className="glassPanel panelInset">
              <div className="timelineList">
                {education.map((item) => (
                  <article key={item.title} className="timelineItem">
                    <div className="timelinePeriod">{item.period}</div>
                    <h3 className="timelineTitle">{item.title}</h3>
                    <div className="timelineOrg">{item.organization}</div>
                    <div className="timelineBody">{item.details}</div>
                  </article>
                ))}
              </div>
            </div>
            <div className="glassPanel panelInset educationMetricsPanel">
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)" }}>
                Consistent academic performance.
              </h3>
              <div className="metricGrid educationMetricGrid">
                <div className="metricChip">
                  <span>
                    <GraduationCap size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                    BE CSE
                  </span>
                  <strong>9.41 CGPA</strong>
                </div>
                <div className="metricChip">
                  <span>
                    <BookOpen size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                    School
                  </span>
                  <strong>86% / 72%</strong>
                </div>
                <div className="metricChip">
                  <span>
                    <Users size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                    Collaboration
                  </span>
                  <strong>Strong</strong>
                </div>
                <div className="metricChip">
                  <span>
                    <Sparkles size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                    Focus
                  </span>
                  <strong>AI / Backend</strong>
                </div>
              </div>
              <div className="educationNote">Focused on AI, backend systems, and applied software engineering.</div>
            </div>
          </div>
        </SectionShell>

        {internships.map((item, index) => (
          <SectionShell
            key={item.title}
            id={`internship-${index + 1}`}
            eyebrow={`Internship ${index + 1}`}
            title={item.title}
            lead={item.organization}
            className="internshipSceneSection"
          >
            <div className="glassPanel panelInset">
              <div className="timelineList">
                <article className="timelineItem">
                  <div className="timelinePeriod">{item.period}</div>
                  <div className="timelineBody">{item.details}</div>
                </article>
              </div>
            </div>
          </SectionShell>
        ))}

        <SectionShell id="contact" eyebrow="Contact" title="Contact" className="contactSection">
          <div className="glassPanel panelInset">
            <div className="contactGrid">
              <div>
                <h3 className="contactTitle">Let&apos;s build the next serious interface.</h3>
                <div className="contactLogoRow" style={{ marginTop: 20 }}>
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      className="contactLogoLink"
                      href={link.href}
                      target={link.href.startsWith("/") ? undefined : "_blank"}
                      rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                      aria-label={link.label}
                      title={link.label}
                    >
                      {getContactIcon(link.label)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="contactInfo">
                <div className="infoRow">
                  <div>
                    <div className="infoLabel">Email</div>
                    <div className="infoValue">krishkanthkrce@gmail.com</div>
                  </div>
                  <Mail size={18} />
                </div>
                <div className="infoRow">
                  <div>
                    <div className="infoLabel">Phone</div>
                    <div className="infoValue">+91 8148294145</div>
                  </div>
                  <Phone size={18} />
                </div>
                <div className="infoRow">
                  <div>
                    <div className="infoLabel">Location</div>
                    <div className="infoValue">{heroCopy.location}</div>
                  </div>
                  <MapPin size={18} />
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      </div>

      <PdfLightbox
        open={Boolean(lightbox)}
        title={lightbox?.title ?? ""}
        subtitle={lightbox?.subtitle}
        src={lightbox?.src ?? ""}
        onClose={() => setLightbox(null)}
      />
    </main>
  );
}
