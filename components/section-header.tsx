export function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-3 md:px-10">
      <div className="flex items-center gap-3">
        <span className="mono-label text-accent">{index}</span>
        <span className="mono-label text-muted-foreground">{subtitle ?? title}</span>
      </div>
      <span className="mono-label hidden text-muted-foreground md:inline">
        {title}
      </span>
    </div>
  );
}
