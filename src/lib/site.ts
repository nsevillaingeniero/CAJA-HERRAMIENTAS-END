export const SITE = {
  name: "Caja de Herramientas",
  institution: "Institución Universitaria Escuela Nacional del Deporte",
  institutionShort: "Escuela Nacional del Deporte",
  institutionAcronym: "IUEND",
  description:
    "Espacio digital de apoyo al docente de la Escuela Nacional del Deporte. Recursos digitales, tutoriales de END Digital y contenidos institucionales de interés.",
  tagline: "Todo lo que necesitas para enseñar mejor.",
  portal: {
    name: "Portal institucional END",
    url: "https://endeporte.edu.co",
  },
  contact: {
    address: "Calle 9 #34-01 Santiago de Cali, Valle del Cauca — Colombia",
    schedule: "Lunes a viernes, 8:00 a. m. – 12:00 m. y 1:00 p. m. – 5:00 p. m.",
    phone: "+57 (602) 5540404",
    email: "acompanamientodocente@endeporte.edu.co",
  },
} as const;

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/recursos", label: "Recursos" },
  { to: "/end-digital", label: "END Digital" },
  { to: "/capacitacion", label: "Capacitación" },
  { to: "/buscar", label: "Buscar" },
] as const;
