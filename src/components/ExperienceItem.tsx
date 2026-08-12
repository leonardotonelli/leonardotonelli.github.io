interface ExperienceProps {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string[];
  link?: string;
}

export function ExperienceItem({ title, organization, period, location, description, link }: ExperienceProps) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
        <h3 className="text-base font-medium text-ink leading-relaxed">
          <span className="text-accent">{title}</span>
          <span className="mx-2 text-muted font-normal">@</span>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-border underline-offset-4 hover:text-accent transition-colors">
              {organization}
            </a>
          ) : (
            <span className="text-ink">{organization}</span>
          )}
        </h3>
        <span className="text-sm text-muted font-mono">{period}</span>
      </div>
      {location && <div className="text-xs text-muted mb-3 uppercase tracking-widest">{location}</div>}
      <ul className="space-y-2">
        {description.map((item, i) => (
          <li key={i} className="text-sm text-ink/80 flex gap-3">
            <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
