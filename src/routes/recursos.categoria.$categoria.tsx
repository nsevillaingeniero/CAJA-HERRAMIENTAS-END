import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceCard } from "@/components/shared/Cards";
import { getCategory, resourcesByCategory } from "@/lib/content";

export const Route = createFileRoute("/recursos/categoria/$categoria")({
  loader: ({ params }) => {
    const category = getCategory(params.categoria);
    if (!category) throw notFound();
    return { category, items: resourcesByCategory(category.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Categoría no disponible | Caja de Herramientas END" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.category.name} | Recursos END`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow="Recursos digitales"
        title={category.name}
        description={category.description}
      />
      <section className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
        <Link to="/recursos" className="text-sm font-bold text-end-600 hover:text-end-700">
          ← Todos los recursos
        </Link>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((resource) => (
            <div key={resource.slug} className="relative">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
