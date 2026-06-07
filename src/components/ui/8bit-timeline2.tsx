import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import "./8bit-timeline2.css";

export interface TimelineStep {
  description: string;
  icon: ReactNode;
  title: string;
}

interface Timeline2Props {
  className?: string;
  description?: string;
  showHeader?: boolean;
  steps: TimelineStep[];
  title?: string;
}

export default function Timeline2({
  title,
  description,
  steps,
  showHeader = true,
  className,
}: Timeline2Props) {
  return (
    <section className={cn("bit-timeline2 w-full", className)}>
      <div className="bit-timeline2__inner">
        {showHeader && (title || description) ? (
          <div className="bit-timeline2__header">
            {title ? <h2 className="bit-timeline2__title">{title}</h2> : null}
            {description ? (
              <p className="bit-timeline2__subtitle">{description}</p>
            ) : null}
          </div>
        ) : null}

        <div className="bit-timeline2__track">
          <div className="bit-timeline2__line bit-timeline2__line--h" aria-hidden />
          <div className="bit-timeline2__line bit-timeline2__line--v" aria-hidden />

          <ol className="bit-timeline2__steps">
            {steps.map((step) => (
              <li className="bit-timeline2__step" key={step.title}>
                <div className="bit-timeline2__checkpoint">{step.icon}</div>
                <h3 className="bit-timeline2__step-title">{step.title}</h3>
                <p className="bit-timeline2__step-desc">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
