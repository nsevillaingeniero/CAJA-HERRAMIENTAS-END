import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Tag } from "@/components/shared/Cards";
import {
  getCategory,
  getResource,
  MODALITY_LABELS,
  MOODLE_LABELS,
  PRICING_LABELS,
  resources,
  tutorials,
} from "@/lib/content";

export const Route = createFileRoute("/recursos/$slug")({
  loader: ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Recurso no disponible | Caja de Herramientas END" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { resource } = loaderData;
    const title = `${resource.name} | Recursos END`;
    return {
      meta: [
        { title },
        { name: "description", content: resource.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: resource.shortDescription },
      ],
    };
  },
  component: ResourceDetail,
});

function ResourceDetail() {
  const { resource } = Route.useLoaderData();
  const related = tutorials.filter((t) => t.relatedResources?.includes(resource.slug));
  const similar = resources
    .filter(
      (r) =>
        r.slug !== resource.slug &&
        r.categories.some((c) => resource.categories.includes(c)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-end-800">
        <div className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
          <Link
            to="/recursos"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-end-100 hover:text-gold-300"
          >
            <ArrowLeft className="size-4" /> Volver a recursos
          </Link>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
            {resource.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-end-100">
            {resource.shortDescription}
          </p>
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-control bg-gold-400 px-5 py-3 text-sm font-bold text-end-950 transition-colors hover:bg-gold-300"
          >
            Ir al sitio oficial <ExternalLink className="size-4" />
          </a>
        </div>
      </section>

      <div className="mx-auto grid max-w-[78rem] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-end-800">
              De qué se trata
            </h2>
            <div className="mt-3 space-y-3">
              {resource.description.split("\n").filter(Boolean).map((p, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {resource.activities && resource.activities.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-end-800">
                Qué puedes hacer con esta herramienta
              </h2>
              <ul className="mt-3 ml-5 list-disc space-y-2 text-ink-soft">
                {resource.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </section>
          )}

          {resource.moodleUsage && (
            <section className="rounded-card border-l-4 border-end-600 bg-end-50 p-5">
              <h2 className="font-display text-lg font-bold text-end-800">
                Uso en END Digital
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{resource.moodleUsage}</p>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-end-800">
                Tutoriales relacionados
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((tutorial) => (
                  <li key={tutorial.slug}>
                    <Link
                      to="/end-digital/$slug"
                      params={{ slug: tutorial.slug }}
                      className="font-semibold text-end-600 underline-offset-4 hover:underline"
                    >
                      {tutorial.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <h2 className="eyebrow text-end-600">Ficha técnica</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-end-700">Modalidad</dt>
                <dd className="text-ink-soft">
                  {MODALITY_LABELS[resource.modality] ?? resource.modality}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-end-700">Costo</dt>
                <dd className="text-ink-soft">
                  {PRICING_LABELS[resource.pricing] ?? resource.pricing}
                  {resource.pricingNote ? ` — ${resource.pricingNote}` : ""}
                </dd>
              </div>
              {resource.moodleIntegration && (
                <div>
                  <dt className="font-semibold text-end-700">Integración con Moodle</dt>
                  <dd className="text-ink-soft">
                    {MOODLE_LABELS[resource.moodleIntegration] ??
                      resource.moodleIntegration}
                  </dd>
                </div>
              )}
              {resource.languages && resource.languages.length > 0 && (
                <div>
                  <dt className="font-semibold text-end-700">Idiomas</dt>
                  <dd className="text-ink-soft">{resource.languages.join(", ")}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <h2 className="eyebrow text-end-600">Categorías</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {resource.categories.map((id) => (
                <li key={id}>
                  <Link to="/recursos/categoria/$categoria" params={{ categoria: id }}>
                    <Tag tone="brand">{getCategory(id)?.name ?? id}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {similar.length > 0 && (
            <div className="rounded-card border border-line bg-surface p-5 shadow-card">
              <h2 className="eyebrow text-end-600">Recursos similares</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {similar.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/recursos/$slug"
                      params={{ slug: item.slug }}
                      className="font-semibold text-end-600 underline-offset-4 hover:underline"
                    >
                      {item.name}
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
