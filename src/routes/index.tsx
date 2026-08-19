import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";

import heroAsset from "@/assets/estudiantes-end.webp.asset.json";

import { ResourceCard, TutorialCard } from "@/components/shared/Cards";
import {
  featuredResources,
  intents,
  resourceCategoriesWithCount,
  trainings,
  tutorials,
  isPastTraining,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caja de Herramientas | Escuela Nacional del Deporte" },
      { name: "description", content: SITE.description },
      { property: "og:title", content: "Caja de Herramientas | Escuela Nacional del Deporte" },
      { property: "og:description", content: SITE.description },
    ],
  }),
  component: Index,
});

function Index() {
  const nextTrainings = trainings.filter((t) => !isPastTraining(t)).slice(0, 3);
  const categories = resourceCategoriesWithCount().slice(0, 8);

  return (
    <>
      {/* Hero institucional */}
      <section className="relative overflow-hidden bg-end-800">
        <img
          src={heroAsset.url}
          alt="Estudiantes de la Escuela Nacional del Deporte en el campus"
          className="absolute inset-0 size-full object-cover opacity-25"
          loading="eager"
        />
        <div className="relative mx-auto max-w-[78rem] px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-gold-400">Acompañamiento docente · IUEND</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Caja de Herramientas para el docente END
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {SITE.tagline} Recursos digitales, tutoriales de END Digital y
            capacitaciones para llevar tus clases más lejos.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/recursos"
              className="inline-flex items-center gap-2 rounded-control bg-gold-400 px-5 py-2.5 text-sm font-bold text-end-900 transition-colors hover:bg-gold-300"
            >
              Explorar recursos <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/end-digital"
              className="inline-flex items-center gap-2 rounded-control border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Tutoriales de END Digital
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
            {[
              { n: featuredResources(99).length, l: "Recursos" },
              { n: tutorials.length, l: "Tutoriales" },
              { n: trainings.length, l: "Capacitaciones" },
            ].map((stat) => (
              <div key={stat.l}>
                <dt className="font-display text-2xl font-extrabold text-white">
                  {stat.n}
                </dt>
                <dd className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {stat.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      {/* Accesos rápidos por intención */}
      <section className="bg-paper py-12">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
          <h2 className="font-display text-2xl font-extrabold text-end-800">
            ¿Qué necesitas hacer hoy?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intents.map((intent) => (
              <li key={intent.id}>
                <Link
                  to="/necesito/$intent"
                  params={{ intent: intent.id }}
                  className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-colors hover:border-end-400 hover:bg-end-50/40"
                >
                  <span className="font-display text-base font-bold text-end-700">
                    {intent.label}
                  </span>
                  <span className="mt-1.5 text-sm text-ink-soft">
                    {intent.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categorías de recursos */}
      <section className="mx-auto max-w-[78rem] px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-end-600">Recursos digitales</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-end-800">
              Explora por categoría
            </h2>
          </div>
          <Link
            to="/recursos"
            className="text-sm font-bold text-end-600 hover:text-end-700"
          >
            Ver todos los recursos →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ category, count }) => (
            <li key={category.id}>
              <Link
                to="/recursos/categoria/$categoria"
                params={{ categoria: category.id }}
                className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-colors hover:border-end-400 hover:bg-end-50/40"
              >
                <span className="font-display text-base font-bold text-end-800">
                  {category.name}
                </span>
                <span className="mt-1.5 flex-1 text-sm text-ink-soft">
                  {category.description}
                </span>
                <span className="mt-3 text-xs font-bold uppercase tracking-wider text-end-500">
                  {count} {count === 1 ? "recurso" : "recursos"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recursos destacados */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
          <h2 className="font-display text-2xl font-extrabold text-end-800">
            Recursos destacados
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredResources(4).map((resource) => (
              <div key={resource.slug} className="relative">
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoriales + capacitación */}
      <section className="mx-auto grid max-w-[78rem] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              Tutoriales de END Digital
            </h2>
            <Link
              to="/end-digital"
              className="text-sm font-bold text-end-600 hover:text-end-700"
            >
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {tutorials.slice(0, 4).map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} />
            ))}
          </div>
        </div>

        <aside>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              Próximas capacitaciones
            </h2>
          </div>
          <ul className="mt-6 space-y-3">
            {nextTrainings.map((training) => (
              <li
                key={training.slug}
                className="rounded-card border-l-4 border-gold-400 bg-surface p-4 shadow-card"
              >
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-end-600">
                  <CalendarDays className="size-4" aria-hidden />
                  {training.dateLabel}
                </p>
                <p className="mt-2 font-display text-sm font-bold text-end-800">
                  {training.topic}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{training.categoryLabel}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/capacitacion"
            className="mt-5 inline-flex text-sm font-bold text-end-600 hover:text-end-700"
          >
            Ver el cronograma completo →
          </Link>
        </aside>
      </section>

    </>

  );
}
