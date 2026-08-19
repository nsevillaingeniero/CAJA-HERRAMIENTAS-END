import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

import logoAsset from "@/assets/logo-end.jpg.asset.json";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Franja institucional superior */}
      <div className="bg-end-950 text-end-100">
        <div className="mx-auto flex h-9 max-w-[78rem] items-center justify-between px-5 text-xs sm:px-8">
          <a
            href={SITE.portal.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold tracking-wide hover:text-gold-300"
          >
            endeporte.edu.co
          </a>
          <span className="hidden sm:block">{SITE.institution}</span>
        </div>
      </div>

      {/* Encabezado blanco con marca y buscador */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[78rem] items-center gap-4 px-5 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Escuela Nacional del Deporte"
              className="h-11 w-auto"
              width={140}
              height={44}
            />
            <span className="hidden border-l border-line pl-3 sm:block">
              <span className="block font-display text-sm font-bold leading-tight text-end-800">
                {SITE.name}
              </span>
              <span className="block text-xs text-ink-muted">
                Apoyo al docente · {SITE.institutionAcronym}
              </span>
            </span>
          </Link>

          <Link
            to="/buscar"
            className="ml-auto flex items-center gap-2 rounded-control border border-line-strong bg-paper px-3 py-2 text-sm text-ink-muted transition-colors hover:border-end-400 hover:text-end-700"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden sm:inline">Buscar en la caja</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir navegación"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-control text-end-800 hover:bg-paper lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Banda azul de navegación */}
      <nav aria-label="Navegación principal" className="hidden bg-end-800 lg:block">
        <ul className="mx-auto flex max-w-[78rem] items-stretch gap-1 px-5 sm:px-8">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="block px-4 py-3 text-sm font-semibold text-end-100 transition-colors hover:bg-end-700 hover:text-white"
                activeProps={{
                  className:
                    "block px-4 py-3 text-sm font-semibold bg-end-700 text-white border-b-[3px] border-gold-400",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav aria-label="Navegación principal" className="bg-end-800 lg:hidden">
          <ul className="mx-auto max-w-[78rem] px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-control px-3 py-2.5 text-sm font-semibold text-end-100 hover:bg-end-700 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
