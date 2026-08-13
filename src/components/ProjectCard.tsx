import { useEffect, useRef, useState } from "react";
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
  previewSize?: "default" | "wide";
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
  previewSize = "default",
}: ProjectProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0, width: 360 });
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isImageOpen) return;

    const updatePreviewPosition = () => {
      const rect = imageButtonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const preferredWidth = window.innerWidth < 768
        ? previewSize === "wide" ? 340 : 280
        : previewSize === "wide" ? 520 : 360;
      const previewWidth = Math.min(preferredWidth, window.innerWidth - 32);
      const horizontalMargin = previewWidth / 2 + 16;
      const verticalMargin = Math.min(window.innerHeight * 0.22, 190);

      setPreviewPosition({
        x: Math.min(Math.max(rect.left + rect.width / 2, horizontalMargin), window.innerWidth - horizontalMargin),
        y: Math.min(Math.max(rect.top + rect.height / 2, verticalMargin), window.innerHeight - verticalMargin),
        width: previewWidth,
      });
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsImageOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!previewRef.current?.contains(target) && !imageButtonRef.current?.contains(target)) {
        setIsImageOpen(false);
      }
    };

    updatePreviewPosition();
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", updatePreviewPosition);
    window.addEventListener("scroll", updatePreviewPosition, true);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", updatePreviewPosition);
      window.removeEventListener("scroll", updatePreviewPosition, true);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isImageOpen, previewSize]);

  return (
    <>
      <article className="group relative mb-4 p-5 rounded-lg border border-border/60 bg-border/10 last:mb-0">
        <div className="flex items-start gap-4 md:gap-5">
          <div className="self-center shrink-0 w-20 md:w-28 aspect-square rounded-md border border-border/60 bg-bg/60 overflow-hidden flex items-center justify-center">
          {image ? (
            <button
              ref={imageButtonRef}
              type="button"
              onClick={() => setIsImageOpen((open) => !open)}
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
            <div
              ref={previewRef}
              className="fixed z-[100] -translate-x-1/2 -translate-y-1/2"
              style={{ left: previewPosition.x, top: previewPosition.y, width: previewPosition.width }}
              role="dialog"
              aria-label={`${title} full image preview`}
            >
              <motion.div
                className="relative flex max-h-[46vh] items-center justify-center rounded-md border border-border/70 bg-bg p-1.5 shadow-xl"
                initial={{ opacity: 0, scale: 0.28 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.45 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              >
                <button
                  type="button"
                  onClick={() => setIsImageOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Tab") event.preventDefault();
                  }}
                  className="absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border/30 bg-bg/40 text-muted/70 opacity-70 shadow-sm backdrop-blur-sm transition-[opacity,background-color,color,transform] duration-200 hover:scale-105 hover:bg-bg/75 hover:text-ink hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close enlarged image"
                  autoFocus
                >
                  <X size={12} strokeWidth={1.75} />
                </button>
                <img
                  src={image}
                  alt={imageAlt || `${title} project image`}
                  className="max-h-[42vh] max-w-full cursor-zoom-out rounded-sm object-contain"
                  decoding="async"
                  onClick={() => setIsImageOpen(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
