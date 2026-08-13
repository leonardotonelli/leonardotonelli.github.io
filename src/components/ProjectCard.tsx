import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, ImageIcon, X } from "lucide-react";

interface ProjectProps {
  title: string;
  role?: string;
  description?: string;
  highlights?: string[];
  problem?: string;
  method?: string;
  result?: string;
  insight?: string;
  takeaway?: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  imageAlt?: string;
}

export function ProjectCard({
  title,
  role,
  description,
  highlights,
  problem,
  method,
  result,
  insight,
  takeaway,
  tags,
  link,
  github,
  image,
  imageAlt,
}: ProjectProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!isImageOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsImageOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isImageOpen]);

  return (
    <>
      <article className="group relative mb-4 p-5 rounded-lg border border-border/60 bg-border/10 last:mb-0">
        <div className="flex items-start gap-4 md:gap-5">
          <div className="self-center shrink-0 w-20 md:w-28 aspect-square rounded-md border border-border/60 bg-bg/60 overflow-hidden flex items-center justify-center">
          {image ? (
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="project-image-button relative w-full h-full cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60"
              aria-label={`Enlarge image for ${title}`}
            >
              <img
                src={image}
                alt={imageAlt || `${title} project image`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/[0.03]" aria-hidden="true" />
            </button>
          ) : (
            <>
              <ImageIcon size={20} className="text-muted/50" aria-hidden="true" />
              <span className="sr-only">Image placeholder for {title}</span>
            </>
          )}
          </div>

          <div className="min-w-0 flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
            <div className="flex items-start gap-2 min-w-0">
              <h3 className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {title} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : title}
              </h3>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} on GitHub`}
                  title="View repository"
                  className="shrink-0 mt-1 text-muted hover:text-ink transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
            {role && <span className="text-sm text-muted font-mono mt-1 md:mt-0 italic">{role}</span>}
          </div>

          {description && (
            <p className="text-ink/80 mb-4 leading-relaxed italic">
              {description}
            </p>
          )}

          {highlights && (
            <ul className="space-y-2 mb-4">
              {highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-ink/80 flex gap-3">
                  <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent/40" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {(problem || method || result || insight) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
              {problem && (
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-muted mb-1">Problem</span>
                  <p className="text-ink/90">{problem}</p>
                </div>
              )}
              {method && (
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-muted mb-1">Method</span>
                  <p className="text-ink/90">{method}</p>
                </div>
              )}
              {result && (
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-muted mb-1">Result</span>
                  <p className="text-ink/90">{result}</p>
                </div>
              )}
              {insight && (
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-muted mb-1">Insight</span>
                  <p className="text-ink/90">{insight}</p>
                </div>
              )}
            </div>
          )}

          {takeaway && (
            <div className="bg-accent/5 border-l-2 border-accent/30 p-3 mb-6">
              <p className="text-sm text-ink/90 italic">
                <span className="font-semibold not-italic">Key Takeaway:</span> {takeaway}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-border/40 text-[10px] font-mono uppercase tracking-tight rounded text-muted">
                {tag}
              </span>
            ))}
          </div>
          </div>
        </div>
      </article>

      {createPortal(
        <AnimatePresence>
          {image && isImageOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4 md:p-8 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setIsImageOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
            >
              <motion.div
                className="relative flex max-h-[76vh] max-w-[88vw] flex-col items-center md:max-w-4xl"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsImageOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Tab") event.preventDefault();
                  }}
                  className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-bg text-ink shadow-md transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close enlarged image"
                  autoFocus
                >
                  <X size={17} />
                </button>
                <img
                  src={image}
                  alt={imageAlt || `${title} project image`}
                  className="max-h-[68vh] max-w-full rounded-md bg-bg object-contain shadow-2xl"
                  decoding="async"
                />
                <p id={dialogTitleId} className="mt-3 max-w-xl text-center text-xs text-white/80">
                  {title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
