import { ExternalLink, Github, ImageIcon } from "lucide-react";

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
  return (
    <article className="group relative mb-4 p-5 rounded-lg border border-border/60 bg-border/10 last:mb-0">
      <div className="flex items-stretch gap-4 md:gap-5">
        <div className="shrink-0 w-20 md:w-28 rounded-md border border-border/60 bg-bg/60 overflow-hidden flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={imageAlt || `${title} project image`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
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
            <ul className="space-y-2 mb-6">
              {highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-ink/80 flex gap-3">
                  <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent/40" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

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
  );
}
