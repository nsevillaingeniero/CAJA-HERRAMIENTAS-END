import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Tag } from "@/components/shared/Cards";
import { searchContent, searchIndex } from "@/lib/content";

const DESCRIPTION =
  "Busca recursos digitales y tutoriales de END Digital dentro de la Caja de Herramientas del docente de la Escuela Nacional del Deporte.";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar | Caja de Herramientas END" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Buscar | Caja de Herramientas END" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => (query.trim().length < 2 ? searchIndex : searchContent(query)),
    [query],
  );

  return (
    <>
      <PageHeader
        eyebrow="Caja de Herramientas"
        title="Buscar en la caja"
        description={DESCRIPTION}
      />

      <div className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
        <label className="flex items-center gap-3 rounded-control border border-line-strong bg-surface px-4 py-3 shadow-card focus-within:border-end-500">
          <Search className="size-5 text-end-500" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escribe una herramienta, tema o necesidad…"
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
            aria-label="Buscar recursos y tutoriales"
          />
        </label>

        <p className="mt-4 text-sm text-ink-muted">
          {results.length} {results.length === 1 ? "resultado" : "resultados"}
        </p>

        <ul className="mt-6 space-y-3">
          {results.map((item) => (
            <li key={`${item.type}-${item.slug}`}>
              <Link
                to={item.to}
                className="flex flex-col gap-1 rounded-card border border-line bg-surface p-5 shadow-card transition-colors hover:border-end-300 hover:bg-end-50"
              >
                <span className="flex items-center gap-2">
                  <Tag tone={item.type === "recurso" ? "brand" : "gold"}>
                    {item.type === "recurso" ? "Recurso" : "Tutorial"}
                  </Tag>
                  <span className="font-display text-base font-bold text-end-800">
                    {item.title}
                  </span>
                </span>
                <span className="text-sm text-ink-soft">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className="mt-8 rounded-card border border-line bg-paper p-6 text-sm text-ink-soft">
            No encontramos coincidencias. Intenta con otra palabra o explora los{" "}
            <Link to="/recursos" className="font-semibold text-end-600 underline">
              recursos
            </Link>{" "}
            y los{" "}
            <Link to="/end-digital" className="font-semibold text-end-600 underline">
              tutoriales
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
