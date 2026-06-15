import type { ReactNode } from "react";
import clsx from "clsx";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  children: ReactNode;
  action?: ReactNode;
  hud?: boolean;
  className?: string;
  innerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  body,
  children,
  action,
  hud = false,
  className,
  innerClassName,
  headerClassName,
  titleClassName,
}: SectionShellProps) {
  const hasHeader = eyebrow || title || body || action;

  return (
    <section id={id} className={clsx("relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24", className)}>
      <div className={clsx(hud && "cyber-panel hud-corner rounded-[2rem] p-8 md:p-12", innerClassName)}>
        {hasHeader && (
          <div className={clsx("mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end", headerClassName)}>
            <div>
              {eyebrow && <p className="text-xs font-black uppercase tracking-[.45em] text-acid">{eyebrow}</p>}
              {title && <h2 className={clsx("cyber-title mt-3 text-5xl md:text-7xl", titleClassName)}>{title}</h2>}
              {body && <p className="mt-4 max-w-2xl text-white/60">{body}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
