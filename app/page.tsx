"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  FileText,
  Trophy,
  Users,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import SequenceBackdrop from "../components/sequence-backdrop";
import ProjectCarousel from "../components/project-carousel";
import CertificateCarousel from "../components/certificate-carousel";
import PdfPreview from "../components/pdf-preview";
import PdfLightbox from "../components/pdf-lightbox";
import {
  aboutBullets,
  awards,
  codingProfiles,
  contactLinks,
  education,
  featuredProjects,
  globalCertificates,
  heroCopy,
  internships,
  navigation,
  membership,
  otherCertificates,
  profileStats,
  type CertificateItem,
} from "../lib/content";
import { certificatePdfUrl, globalCertificatePdfUrl, membershipPdfUrl, profilePhotoUrl } from "../lib/asset";

type LightboxState = {
  title: string;
  subtitle?: string;
  src: string;
} | null;

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
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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

function getProfileIcon(label: string) {
  if (label === "GitHub") return FaGithub;
  if (label === "LinkedIn") return FaLinkedinIn;
  if (label === "LeetCode") return Code2;
  if (label === "HackerRank") return Trophy;
  return FileText;
}

function chunkItems<T>(items: T[], chunkSize: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [otherCertPage, setOtherCertPage] = useState(0);

  const otherCertificatePages = chunkItems(otherCertificates, 4);

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
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-28% 0px -34% 0px",
      },
    );

    observed.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".glassPanel"));
    const cleanups: Array<() => void> = [];

    const updateTilt = (element: HTMLElement, clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const tiltX = ((0.5 - y) * 12).toFixed(2);
      const tiltY = ((x - 0.5) * 12).toFixed(2);

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

      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--sheen-x", "50%");
      element.style.setProperty("--sheen-y", "50%");
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
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="navItem" style={{ position: "relative" }}>
            <span className={`navDot ${activeSection === item.id ? "active" : ""}`} aria-hidden="true" />
            <span className="navLabel">{item.label}</span>
          </a>
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
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div className="heroKicker">Portfolio / projects / experience</div>
              <h1 className="heroTitle">
                {heroCopy.name}
                <span>Computer science student.</span>
              </h1>
              <p className="heroSubtitle">{heroCopy.subtitle}</p>
              <p className="heroDescription">{heroCopy.description}</p>
              <div className="heroActions" style={{ marginTop: 26 }}>
                <a className="button primary" href="#projects">
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
                <div className="tagRow">
                  {aboutBullets.map((bullet) => (
                    <span key={bullet} className="tag">
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glassPanel heroPortrait"
              initial={{ opacity: 0, x: 28, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
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

        <SectionShell
          id="projects"
          eyebrow="Projects"
          title="Selected work"
          className="projectsSection"
        >
          <div className="sectionGrid">
            <ProjectCarousel projects={featuredProjects} />
            <div className="glassPanel panelInset">
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                GitHub / live demos
              </h3>
              <div className="buttonRow" style={{ marginTop: 20 }}>
                <a className="button primary" href="https://github.com/Krish-CS" target="_blank" rel="noreferrer">
                  GitHub profile
                  <ExternalLink size={16} />
                </a>
                <a className="buttonAlt" href="https://krish-cs.github.io/krish-repox-frontend/" target="_blank" rel="noreferrer">
                  Live project
                </a>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="global-certifications"
          eyebrow="Certifications"
          title={`Global certificates (${globalCertificates.length})`}
          className="certificationsSection globalCertSection"
        >
          <CertificateCarousel
            certificates={globalCertificates}
            onOpen={(certificate: CertificateItem) => {
              setLightbox({
                title: certificate.title,
                subtitle: certificate.summary,
                src: certificatePdfUrl(certificate.fileName),
              });
            }}
          />
        </SectionShell>

        <SectionShell
          id="other-certifications"
          eyebrow="Certifications"
          title={`Other certificates (${otherCertificates.length})`}
          className="otherCertSection"
        >
          <div className="glassPanel panelInset otherCertPager">
            <div className="projectHeader">
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                {String(otherCertPage + 1).padStart(2, "0")} / {String(Math.max(otherCertificatePages.length, 1)).padStart(2, "0")}
              </h3>
              <div className="carouselIndex">{otherCertificates.length}</div>
            </div>

            <div className="certGrid certGridPaged">
              {(otherCertificatePages[otherCertPage] ?? []).map((certificate) => {
                const src = certificatePdfUrl(certificate.fileName);
                return (
                  <button
                    key={certificate.fileName}
                    type="button"
                    className="certTile"
                    onClick={() => setLightbox({ title: certificate.title, subtitle: certificate.issuer, src })}
                  >
                    <PdfPreview src={src} alt={certificate.title} className="certTilePreview" scale={1.05} />
                    <div className="certTileContent">
                      <h4 className="certTileTitle">{certificate.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="carouselControls">
              <button
                className="buttonAlt navButton"
                type="button"
                onClick={() => setOtherCertPage((value) => (value - 1 + otherCertificatePages.length) % otherCertificatePages.length)}
                aria-label="Previous certificate page"
                disabled={otherCertificatePages.length <= 1}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <button
                className="buttonAlt navButton"
                type="button"
                onClick={() => setOtherCertPage((value) => (value + 1) % otherCertificatePages.length)}
                aria-label="Next certificate page"
                disabled={otherCertificatePages.length <= 1}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="awards"
          eyebrow="Awards"
          title="Awards and membership"
        >
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
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                {membership.title}
              </h3>
              <div className="smallCaption" style={{ marginTop: 10 }}>{membership.organization}</div>
              <div style={{ marginTop: 16 }}>
                <PdfPreview src={membershipPdfUrl(membership.fileName)} alt={membership.title} className="panelInset certificatePreviewShell" scale={1.7} />
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="education"
          eyebrow="Education"
          title="Education"
        >
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
            <div className="glassPanel panelInset">
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                Consistent academic performance.
              </h3>
              <div className="metricGrid" style={{ marginTop: 18 }}>
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
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="internships"
          eyebrow="Internships"
          title="Internships"
        >
          <div className="sectionGrid">
            <div className="glassPanel panelInset">
              <div className="timelineList">
                {internships.map((item) => (
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
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                Applied AI, delivery, and collaboration.
              </h3>
              <div className="tagRow" style={{ marginTop: 18 }}>
                <span className="tag">AICTE</span>
                <span className="tag">IBM SkillsBuild</span>
                <span className="tag">Microsoft</span>
                <span className="tag">SAP</span>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="contact"
          eyebrow="Contact"
          title="Contact"
          className="contactSection"
        >
          <div className="glassPanel panelInset">
            <div className="contactGrid">
              <div>
                <h3 className="contactTitle">Let&apos;s build the next serious interface.</h3>
                <div className="buttonRow" style={{ marginTop: 22 }}>
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      className="buttonAlt"
                      href={link.href}
                      target={link.href.startsWith("/") ? undefined : "_blank"}
                      rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                    >
                      {link.label}
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
                <div className="infoRow">
                  <div>
                    <div className="infoLabel">Resume</div>
                    <div className="infoValue">Education, internships, and certifications</div>
                  </div>
                  <a className="button primary" href="/api/assets/my/RESUME.pdf" target="_blank" rel="noreferrer">
                    Open PDF
                    <ExternalLink size={16} />
                  </a>
                </div>
                <div className="profileLinkSection">
                  <div className="sectionEyebrow">Coding Profiles</div>
                  <div className="profileLinkGrid">
                    {codingProfiles.map((profile) => (
                      <a key={profile.label} className="profileLinkCard" href={profile.href} target="_blank" rel="noreferrer">
                        {(() => {
                          const Icon = getProfileIcon(profile.label);
                          return <Icon size={18} />;
                        })()}
                        <span className="profileLinkLabel">{profile.label}</span>
                        <strong className="profileLinkValue">{profile.value}</strong>
                      </a>
                    ))}
                  </div>
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
