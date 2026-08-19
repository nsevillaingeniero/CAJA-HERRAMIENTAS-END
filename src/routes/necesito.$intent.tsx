import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceCard, TutorialCard } from "@/components/shared/Cards";
import { getIntent, intents, matchesIntent } from "@/lib/content";

export const Route = createFileRoute("/necesito/$intent")({
  loader: ({ params }) => {
    const intent = getIntent(params.intent);
    if (!intent) throw notFound();
    return { intent, ...matchesIntent(intent) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Página no disponible | Caja de Herramientas END" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.intent.pageTitle} | Caja de Herramientas END`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intent.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intent.description },
      ],
    };
  },
  component: IntentPage,
});

function IntentPage() {
  const { intent, matchedResources, matchedTutorials } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow="Rutas rápidas"
        title={intent.pageTitle}
        description={intent.description}
      />

      <div className="mx-auto max-w-[78rem] space-y-14 px-5 py-12 sm:px-8">
        {matchedResources.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              Recursos que te sirven
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matchedResources.map((resource) => (
                <div key={resource.slug} className="relative">
                  <ResourceCard resource={resource} />
                </div>
              ))}
            </div>
          </section>
        )}

        {matchedTutorials.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              Tutoriales de END Digital
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matchedTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-card bg-end-50 p-6">
          <h2 className="eyebrow text-end-600">Otras rutas</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {intents
              .filter((item) => item.id !== intent.id)
              .map((item) => (
                <li key={item.id}>
                  <Link
                    to="/necesito/$intent"
                    params={{ intent: item.id }}
                    className="inline-flex rounded-full border border-end-200 bg-surface px-3.5 py-1.5 text-sm font-semibold text-end-700 hover:border-end-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}
