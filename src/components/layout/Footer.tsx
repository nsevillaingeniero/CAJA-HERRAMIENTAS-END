import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/logo-end.jpg.asset.json";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="border-t-4 border-gold-400 bg-paper">
        <div className="mx-auto grid max-w-[78rem] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="Escuela Nacional del Deporte"
              className="h-12 w-auto"
              width={150}
              height={48}
            />
            <p className="mt-4 font-display text-base font-bold text-end-800">
              {SITE.institution}
            </p>
            <dl className="mt-4 space-y-2 text-sm text-ink-soft">
              <div>
                <dt className="font-semibold text-end-700">Sede principal</dt>
                <dd>{SITE.contact.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-end-700">Horario de atención</dt>
                <dd>{SITE.contact.schedule}</dd>
              </div>
              <div>
                <dt className="font-semibold text-end-700">Teléfono</dt>
                <dd>{SITE.contact.phone}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="eyebrow text-end-600">Navegación</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-ink-soft underline-offset-4 hover:text-end-600 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-end-600">Enlaces institucionales</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={SITE.portal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft underline-offset-4 hover:text-end-600 hover:underline"
                >
                  Portal institucional END
                </a>
              </li>
              <li>
                <a
                  href="https://endigital.endeporte.edu.co"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft underline-offset-4 hover:text-end-600 hover:underline"
                >
                  END Digital (aula virtual)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-ink-soft underline-offset-4 hover:text-end-600 hover:underline"
                >
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-end-950">
        <div className="mx-auto flex max-w-[78rem] flex-wrap items-center justify-between gap-2 px-5 py-4 text-xs text-end-200 sm:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.institution}. Institución de educación
            superior vigilada por el Ministerio de Educación Nacional.
          </p>
          <p>{SITE.name} · Acompañamiento docente</p>
        </div>
      </div>
    </footer>
  );
}
