"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
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
  otherCertificates,
  profileStats,
} from "../lib/content";
import { certificatePdfUrl, profilePhotoUrl } from "../lib/asset";

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
}: Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <motion.section
      id={id}
      data-scene
      className={`sectionShell ${className}`.trim()}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sectionInner">
        <div className="sectionHeader">
          <div className="sectionEyebrow">{eyebrow}</div>
          <h2 className="sectionTitle">{title}</h2>
          <p className="sectionLead">{lead}</p>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

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
          title="Selected projects"
          lead="One project is shown at a time with clear context and direct links."
          className="projectsSection"
        >
          <div className="sectionGrid">
            <ProjectCarousel projects={featuredProjects} />
            <div className="glassPanel panelInset">
              <div className="sectionEyebrow">GitHub</div>
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                Public repositories and live demos.
              </h3>
              <p className="sectionLead" style={{ marginTop: 12 }}>
                GitHub and selected live projects are available for review.
              </p>
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
          id="certifications"
          eyebrow="Certifications"
          title="Certifications"
          lead="Global certificates are shown one at a time. Other certificates are grouped in a compact grid."
          className="certificationsSection"
        >
          <div className="dualGrid">
            <CertificateCarousel
              certificates={globalCertificates}
              onOpen={(certificate) => {
                setLightbox({
                  title: certificate.title,
                  subtitle: certificate.summary,
                  src: certificatePdfUrl(certificate.fileName),
                });
              }}
            />

            <div className="glassPanel panelInset">
              <div className="projectHeader">
                <div>
                  <div className="sectionEyebrow">Other certifications</div>
                  <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                    Additional certificates.
                  </h3>
                </div>
                <div className="carouselIndex">{String(otherCertificates.length).padStart(2, "0")}</div>
              </div>

              <div className="certGrid">
                {otherCertificates.map((certificate) => {
                  const src = certificatePdfUrl(certificate.fileName);
                  return (
                    <button
                      key={certificate.fileName}
                      type="button"
                      className="certTile"
                      onClick={() => setLightbox({ title: certificate.title, subtitle: certificate.issuer, src })}
                    >
                      <PdfPreview src={src} alt={certificate.title} className="certTilePreview" scale={0.95} />
                      <div className="certTileContent">
                        <div className="sequenceBadge">{certificate.issuer}</div>
                        <h4 className="certTileTitle">{certificate.title}</h4>
                        <div className="certTileIssuer">Click to preview</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="awards"
          eyebrow="Awards / Events"
          title="Awards and events"
          lead="Recognition and event participation are presented in a simple timeline."
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
              <div className="sectionEyebrow">Highlights</div>
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                A clear record of achievement.
              </h3>
              <p className="sectionLead" style={{ marginTop: 12 }}>
                Awards are kept concise so the information stays easy to scan.
              </p>
              <div className="tagRow" style={{ marginTop: 18 }}>
                <span className="tag">NPTEL</span>
                <span className="tag">Discipline star</span>
                <span className="tag">Jul-Dec 2025</span>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="education"
          eyebrow="Education"
          title="Education"
          lead="Academic history is arranged in a concise timeline for quick review."
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
              <div className="sectionEyebrow">Academic summary</div>
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
          lead="Practical experience is presented with clear hierarchy and spacing."
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
              <div className="sectionEyebrow">Experience summary</div>
              <h3 className="cardTitle" style={{ fontSize: "clamp(1.9rem, 2.6vw, 2.7rem)" }}>
                Applied AI, delivery, and collaboration.
              </h3>
              <p className="sectionLead" style={{ marginTop: 12 }}>
                The internship record covers ML work, AI programs, and event coordination.
              </p>
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
          lead="Direct links and contact details are grouped in one place."
          className="contactSection"
        >
          <div className="glassPanel panelInset">
            <div className="contactGrid">
              <div>
                <h3 className="contactTitle">Let&apos;s build the next serious interface.</h3>
                <p className="contactLead">
                  Available for collaborations, portfolio reviews, backend work, and AI-focused projects.
                </p>
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
