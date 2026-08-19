import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, GraduationCap } from "lucide-react";

import {
  formatDuration,
  LEVEL_LABELS,
  MODALITY_LABELS,
  PRICING_LABELS,
  type Resource,
  type Tutorial,
} from "@/lib/content";

export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "gold";
}) {
  const tones = {
    neutral: "bg-paper text-ink-soft border-line-strong",
    brand: "bg-end-50 text-end-700 border-end-200",
    gold: "bg-gold-50 text-gold-700 border-gold-200",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-end-300 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-end-800">
          <Link
            to="/recursos/$slug"
            params={{ slug: resource.slug }}
            className="after:absolute after:inset-0"
          >
            {resource.name}
          </Link>
        </h3>
        <ArrowUpRight className="size-5 shrink-0 text-end-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {resource.shortDescription}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Tag tone="brand">
          {MODALITY_LABELS[resource.modality] ?? resource.modality}
        </Tag>
        <Tag tone="gold">{PRICING_LABELS[resource.pricing] ?? resource.pricing}</Tag>
      </div>
    </article>
  );
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-end-300 hover:shadow-card-hover">
      <div className="flex items-center gap-2 text-xs font-semibold text-end-600">
        <GraduationCap className="size-4" aria-hidden />
        {LEVEL_LABELS[tutorial.level] ?? tutorial.level}
        <span className="text-line-strong">·</span>
        <Clock className="size-4" aria-hidden />
        {formatDuration(tutorial.duration)}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-end-800">
        <Link to="/end-digital/$slug" params={{ slug: tutorial.slug }}>
          {tutorial.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {tutorial.description}
      </p>
      <p className="mt-4 text-sm font-semibold text-end-600 group-hover:text-end-700">
        Ver paso a paso →
      </p>
    </article>
  );
}
