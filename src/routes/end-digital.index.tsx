import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { TutorialCard } from "@/components/shared/Cards";
import { tutorialPaths } from "@/lib/content";

const DESCRIPTION =
  "Tutoriales paso a paso para sacarle provecho a END Digital, el aula virtual de la Escuela Nacional del Deporte: actividades, evaluación, contenidos y seguimiento.";

export const Route = createFileRoute("/end-digital/")({
  head: () => ({
    meta: [
      { title: "Tutoriales de END Digital | Caja de Herramientas END" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Tutoriales de END Digital" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: EndDigitalPage,
});

function EndDigitalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Aula virtual"
        title="Tutoriales de END Digital"
        description={DESCRIPTION}
      />
      <div className="mx-auto max-w-[78rem] space-y-14 px-5 py-12 sm:px-8">
        {tutorialPaths().map(({ category, items }) => (
          <section key={category.id}>
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              {category.name}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">
              {category.description}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
