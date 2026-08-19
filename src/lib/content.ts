import categoriesJson from "@/data/categories.json";
import intentsJson from "@/data/intents.json";
import resourcesJson from "@/data/resources.json";
import tutorialsJson from "@/data/tutorials.json";
import trainingsJson from "@/data/trainings.json";
import facultiesJson from "@/data/faculties.json";
import institutionalJson from "@/data/institutional-links.json";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  appliesTo: string[];
  order: number;
}

export interface Intent {
  id: string;
  label: string;
  pageTitle: string;
  icon: string;
  description: string;
  matchCategories: string[];
  matchTags: string[];
  accent: string;
  order: number;
}

export interface Resource {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  activities?: string[];
  modality: string;
  pricing: string;
  pricingNote?: string;
  categories: string[];
  moodleIntegration?: string;
  moodleUsage?: string;
  languages?: string[];
  url: string;
  externalGuide?: string;
  intents?: string[];
  tags?: string[];
  featured?: boolean;
  order?: number;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  video?: string;
  steps: string[];
  relatedResources?: string[];
  intents?: string[];
  tags?: string[];
  date: string;
  featured?: boolean;
  order?: number;
  body: string;
}

export interface Training {
  slug: string;
  topic: string;
  track: string;
  categoryLabel: string;
  tools?: string[];
  covers?: string[];
  date?: string;
  dateLabel: string;
  groups?: { label?: string; start: string; end: string }[];
  facilitators: string[];
  audience?: string;
  support?: { start?: string; end?: string; host?: string; note?: string };
  order?: number;
}

export interface Faculty {
  id: string;
  name: string;
  shortName?: string;
  order: number;
}

export interface InstitutionalLink {
  id: string;
  label: string;
  description: string;
  url: string;
  group: string;
  icon: string;
  kind?: string;
  order: number;
}

const byOrder = <T extends { order?: number }>(a: T, b: T) =>
  (a.order ?? 99) - (b.order ?? 99);

export const categories = (categoriesJson as Category[]).slice().sort(byOrder);
export const intents = (intentsJson as Intent[]).slice().sort(byOrder);
export const faculties = (facultiesJson as Faculty[]).slice().sort(byOrder);
export const institutionalLinks = (institutionalJson as InstitutionalLink[])
  .slice()
  .sort(byOrder);

export const resources = (resourcesJson as Resource[])
  .slice()
  .sort((a, b) => byOrder(a, b) || a.name.localeCompare(b.name, "es"));

export const tutorials = (tutorialsJson as Tutorial[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const trainings = (trainingsJson as Training[]).slice().sort((a, b) => {
  if (a.date && b.date && a.date !== b.date) return a.date.localeCompare(b.date);
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return byOrder(a, b);
});

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getIntent = (id: string) => intents.find((i) => i.id === id);
export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
export const getTutorial = (slug: string) => tutorials.find((t) => t.slug === slug);

export const resourceCategories = categories.filter((c) =>
  c.appliesTo.includes("resource"),
);
export const tutorialCategories = categories.filter((c) =>
  c.appliesTo.includes("tutorial"),
);

export const featuredResources = (limit = 4) => {
  const featured = resources.filter((r) => r.featured);
  const rest = resources.filter((r) => !r.featured);
  return [...featured, ...rest].slice(0, limit);
};

export const featuredTutorial = () =>
  tutorials.find((t) => t.featured) ?? tutorials[0];

export const resourcesByCategory = (categoryId: string) =>
  resources.filter((r) => r.categories.includes(categoryId));

export const tutorialsByCategory = (categoryId: string) =>
  tutorials
    .filter((t) => t.category === categoryId)
    .slice()
    .sort(byOrder);

export const resourceCategoriesWithCount = () =>
  resourceCategories
    .map((category) => ({
      category,
      count: resourcesByCategory(category.id).length,
    }))
    .filter((entry) => entry.count > 0);

export const tutorialPaths = () =>
  tutorialCategories
    .map((category) => ({ category, items: tutorialsByCategory(category.id) }))
    .filter((path) => path.items.length > 0);

export const tutorialNeighbors = (tutorial: Tutorial) => {
  const siblings = tutorialsByCategory(tutorial.category);
  const index = siblings.findIndex((t) => t.slug === tutorial.slug);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
};

export const matchesIntent = (intent: Intent) => {
  const matchedResources = resources.filter(
    (r) =>
      r.intents?.includes(intent.id) ||
      r.categories.some((c) => intent.matchCategories.includes(c)) ||
      r.tags?.some((t) => intent.matchTags.includes(t.toLowerCase())),
  );
  const matchedTutorials = tutorials.filter(
    (t) =>
      t.intents?.includes(intent.id) ||
      intent.matchCategories.includes(t.category) ||
      t.tags?.some((tag) => intent.matchTags.includes(tag.toLowerCase())),
  );
  return { matchedResources, matchedTutorials };
};

export const INSTITUTIONAL_GROUP_LABELS: Record<string, string> = {
  docencia: "Docencia y vida académica",
  normativa: "Normativa y gobierno",
  servicios: "Servicios y atención",
};

export const institutionalGroups = () =>
  Object.entries(INSTITUTIONAL_GROUP_LABELS)
    .map(([id, label]) => ({
      id,
      label,
      links: institutionalLinks.filter((l) => l.group === id),
    }))
    .filter((g) => g.links.length > 0);

export const MODALITY_LABELS: Record<string, string> = {
  web: "En el navegador",
  escritorio: "Se instala",
  movil: "Móvil",
  multiplataforma: "Multiplataforma",
};

export const PRICING_LABELS: Record<string, string> = {
  gratis: "Gratis",
  freemium: "Plan gratuito",
  pago: "De pago",
  "licencia-institucional": "Licencia END",
};

export const MOODLE_LABELS: Record<string, string> = {
  nativa: "Integración nativa",
  lti: "Conexión LTI",
  embed: "Se incrusta",
  enlace: "Se enlaza",
  ninguna: "Sin integración",
};

export const LEVEL_LABELS: Record<string, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const TRACK_LABELS: Record<string, string> = {
  "google-workspace": "Google Workspace",
  moodle: "Moodle",
  "recursos-digitales": "Recursos digitales",
};

export const AUDIENCE_LABELS: Record<string, string> = {
  facultades: "Por facultades y áreas",
  abierta: "Invitación abierta",
};

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1)));
}

export function isPastTraining(training: Training, today = new Date()): boolean {
  if (!training.date) return false;
  const [y, m, d] = training.date.split("-").map(Number);
  const key = y * 10000 + m * 100 + d;
  const todayKey =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return key < todayKey;
}

export interface SearchItem {
  type: "recurso" | "tutorial";
  slug: string;
  title: string;
  description: string;
  to: string;
  tags: string[];
}

export const searchIndex: SearchItem[] = [
  ...resources.map((r) => ({
    type: "recurso" as const,
    slug: r.slug,
    title: r.name,
    description: r.shortDescription,
    to: `/recursos/${r.slug}`,
    tags: [...(r.tags ?? []), ...r.categories],
  })),
  ...tutorials.map((t) => ({
    type: "tutorial" as const,
    slug: t.slug,
    title: t.title,
    description: t.description,
    to: `/end-digital/${t.slug}`,
    tags: [...(t.tags ?? []), t.category],
  })),
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchContent(query: string): SearchItem[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  return searchIndex.filter((item) =>
    normalize(`${item.title} ${item.description} ${item.tags.join(" ")}`).includes(q),
  );
}
