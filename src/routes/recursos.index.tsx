import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceCard } from "@/components/shared/Cards";
import { resourceCategoriesWithCount, resources } from "@/lib/content";

const DESCRIPTION =
  "Catálogo de recursos digitales seleccionados para el trabajo docente en la Escuela Nacional del Deporte: qué hace cada herramienta, cómo se usa y cómo se conecta con END Digital.";

export const Route = createFileRoute("/recursos/")({
  head: () => ({
    meta: [
      { title: "Recursos digitales | Caja de Herramientas END" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Recursos digitales | Caja de Herramientas END" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: RecursosPage,
});

function RecursosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Caja de Herramientas"
        title="Recursos digitales para tus clases"
        description={DESCRIPTION}
      />

      <section className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
        <h2 className="eyebrow text-end-600">Filtrar por categoría</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {resourceCategoriesWithCount().map(({ category, count }) => (
            <li key={category.id}>
              <Link
                to="/recursos/categoria/$categoria"
                params={{ categoria: category.id }}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm font-semibold text-end-700 transition-colors hover:border-end-400 hover:bg-end-50"
              >
                {category.name}
                <span className="text-xs text-ink-muted">{count}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.slug} className="relative">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
