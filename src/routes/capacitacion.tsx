import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Users } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Tag } from "@/components/shared/Cards";
import {
  AUDIENCE_LABELS,
  isPastTraining,
  TRACK_LABELS,
  trainings,
  type Training,
} from "@/lib/content";

const DESCRIPTION =
  "Cronograma de capacitaciones docentes de la Escuela Nacional del Deporte: Google Workspace, END Digital y recursos digitales, con grupos, horarios y facilitadores.";

export const Route = createFileRoute("/capacitacion")({
  head: () => ({
    meta: [
      { title: "Capacitación docente | Caja de Herramientas END" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Capacitación docente | Caja de Herramientas END" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CapacitacionPage,
});

function TrainingCard({ training, past }: { training: Training; past: boolean }) {
  return (
    <article
      className={`rounded-card border border-line bg-surface p-6 shadow-card ${
        past ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="brand">{TRACK_LABELS[training.track] ?? training.track}</Tag>
        {training.audience && (
          <Tag>{AUDIENCE_LABELS[training.audience] ?? training.audience}</Tag>
        )}
        {past && <Tag>Realizada</Tag>}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-end-800">
        {training.topic}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{training.categoryLabel}</p>

      <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-end-600">
        <CalendarDays className="size-4" aria-hidden />
        {training.dateLabel}
      </p>

      {training.groups && training.groups.length > 0 && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {training.groups.map((group, index) => (
            <li
              key={index}
              className="rounded-control border border-line bg-paper px-3 py-2 text-xs"
            >
              <span className="block font-semibold text-end-700">
                {group.label ?? `Grupo ${index + 1}`}
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-ink-soft">
                <Clock className="size-3.5" aria-hidden />
                {group.start} – {group.end}
              </span>
            </li>
          ))}
        </ul>
      )}

      {training.tools && training.tools.length > 0 && (
        <p className="mt-4 text-sm text-ink-soft">
          <span className="font-semibold text-end-700">Herramientas: </span>
          {training.tools.join(", ")}
        </p>
      )}

      {training.covers && training.covers.length > 0 && (
        <ul className="mt-3 ml-5 list-disc space-y-1 text-sm text-ink-soft">
          {training.covers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <p className="mt-4 inline-flex items-start gap-2 text-sm text-ink-soft">
        <Users className="mt-0.5 size-4 shrink-0 text-end-500" aria-hidden />
        <span>
          <span className="font-semibold text-end-700">Facilitan: </span>
          {training.facilitators.join(", ")}
        </span>
      </p>

      {training.support && (training.support.start || training.support.note) && (
        <p className="mt-4 rounded-control border-l-4 border-gold-400 bg-gold-50 px-3 py-2 text-sm text-ink-soft">
          <span className="font-semibold text-end-700">Acompañamiento: </span>
          {training.support.start && training.support.end
            ? `${training.support.start} – ${training.support.end}`
            : ""}
          {training.support.host ? ` · ${training.support.host}` : ""}
          {training.support.note ? ` · ${training.support.note}` : ""}
        </p>
      )}
    </article>
  );
}

function CapacitacionPage() {
  const upcoming = trainings.filter((t) => !isPastTraining(t));
  const past = trainings.filter((t) => isPastTraining(t));

  return (
    <>
      <PageHeader
        eyebrow="Acompañamiento docente"
        title="Capacitación docente 2026"
        description={DESCRIPTION}
      />
      <div className="mx-auto max-w-[78rem] space-y-14 px-5 py-12 sm:px-8">
        <section>
          <h2 className="font-display text-2xl font-extrabold text-end-800">
            Próximas sesiones
          </h2>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">
              No hay sesiones programadas por ahora. Consulta pronto el nuevo cronograma.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {upcoming.map((training) => (
                <TrainingCard key={training.slug} training={training} past={false} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-extrabold text-end-800">
              Sesiones realizadas
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {past.map((training) => (
                <TrainingCard key={training.slug} training={training} past />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
