import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, GraduationCap } from "lucide-react";

import { Markdown } from "@/components/shared/Markdown";
import {
  formatDuration,
  getCategory,
  getResource,
  getTutorial,
  LEVEL_LABELS,
  tutorialNeighbors,
} from "@/lib/content";

export const Route = createFileRoute("/end-digital/$slug")({
  loader: ({ params }) => {
    const tutorial = getTutorial(params.slug);
    if (!tutorial) throw notFound();
    return { tutorial };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Tutorial no disponible | Caja de Herramientas END" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.tutorial.title} | END Digital`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.tutorial.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.tutorial.description },
      ],
    };
  },
  component: TutorialDetail,
});

function TutorialDetail() {
  const { tutorial } = Route.useLoaderData();
  const { previous, next } = tutorialNeighbors(tutorial);
  const category = getCategory(tutorial.category);
  const related = (tutorial.relatedResources ?? [])
    .map((slug) => getResource(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <section className="bg-end-800">
        <div className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
          <Link
            to="/end-digital"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-end-100 hover:text-gold-300"
          >
            <ArrowLeft className="size-4" /> Volver a tutoriales
          </Link>
          {category && <p className="eyebrow mt-4 text-gold-300">{category.name}</p>}
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-extrabold text-white sm:text-4xl">
            {tutorial.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-end-100">{tutorial.description}</p>
          <p className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-end-100">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="size-4" />
              {LEVEL_LABELS[tutorial.level] ?? tutorial.level}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {formatDuration(tutorial.duration)}
            </span>
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[78rem] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.6fr_1fr]">
        <article>
          <Markdown content={tutorial.body} />

          <nav className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
            {previous ? (
              <Link
                to="/end-digital/$slug"
                params={{ slug: previous.slug }}
                className="text-sm font-bold text-end-600 hover:text-end-700"
              >
                ← {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to="/end-digital/$slug"
                params={{ slug: next.slug }}
                className="text-sm font-bold text-end-600 hover:text-end-700"
              >
                {next.title} →
              </Link>
            )}
          </nav>
        </article>

        <aside className="space-y-6">
          {tutorial.steps.length > 0 && (
            <div className="rounded-card border border-line bg-surface p-5 shadow-card">
              <h2 className="eyebrow text-end-600">Pasos del tutorial</h2>
              <ol className="mt-4 ml-4 list-decimal space-y-2 text-sm text-ink-soft">
                {tutorial.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {related.length > 0 && (
            <div className="rounded-card border border-line bg-surface p-5 shadow-card">
              <h2 className="eyebrow text-end-600">Recursos relacionados</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {related.map((resource) => (
                  <li key={resource.slug}>
                    <Link
                      to="/recursos/$slug"
                      params={{ slug: resource.slug }}
                      className="font-semibold text-end-600 underline-offset-4 hover:underline"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
