import { useState, useEffect, useRef, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
type Lang = 'es' | 'en'

const C = {
  dark: {
    bg: '#0F1018',
    surface: '#181A27',
    surface2: '#1F2235',
    accent1: '#5FE38B',
    accent2: '#4DD8E8',
    text: '#F2F2F7',
    text2: '#9699AA',
    border: 'rgba(255,255,255,0.07)',
    headerBg: 'rgba(15,16,24,0.88)',
    timelineBg: 'rgba(255,255,255,0.018)',
  },
  light: {
    bg: '#F5F7FA',
    surface: '#FFFFFF',
    surface2: '#ECEEF3',
    accent1: '#1FA35E',
    accent2: '#0E8FA6',
    text: '#0F1018',
    text2: '#5C5F6E',
    border: 'rgba(0,0,0,0.08)',
    headerBg: 'rgba(245,247,250,0.88)',
    timelineBg: 'rgba(0,0,0,0.018)',
  },
}

const TR = {
  es: {
    nav: ['Sobre mí', 'Experiencia', 'Proyectos', 'Educación', 'Certificaciones', 'Habilidades', 'Contacto'],
    navIds: ['about', 'experience', 'projects', 'education', 'certifications', 'skills', 'contact'],
    available: 'Disponible para trabajar',
    subtitle: 'Ingeniero en Informática · Full Stack Developer · Técnico en Telecomunicaciones',
    tagline: 'Del cableado y las faenas mineras al código — con paso por São Paulo.',
    aboutTitle: 'Sobre mí',
    aboutText: 'Ingeniero en Informática y Analista Programador con perfil híbrido que conecta el desarrollo full-stack con la infraestructura de telecomunicaciones. Tengo experiencia real en terreno, resolviendo problemas tanto a nivel de código como de hardware y conectividad, asegurando la continuidad de servicios TI en entornos críticos como la minería. Disponible para trabajar en terreno o de forma remota/internacional.',
    projectsTitle: 'Proyectos',
    projectsIntro: 'Aplicaciones que diseñé y desarrollé de punta a punta, varias de ellas en uso real por equipos en terreno.',
    demo: 'Ver sitio',
    code: 'Código',
    footerKicker: 'hablemos',
    menu: 'Abrir menú',
    themeLabel: 'Cambiar tema claro / oscuro',
    langLabel: 'Switch to English',
    expTitle: 'Experiencia',
    eduTitle: 'Educación',
    certsTitle: 'Certificaciones',
    skillsTitle: 'Habilidades Técnicas',
    langTitle: 'Idiomas',
    footerText: 'Abierto a nuevas oportunidades en TI, telecomunicaciones y desarrollo de software, en Chile o a nivel internacional.',
    location: 'Chile',
    license: 'Licencia Clase B',
    native: 'Nativo',
    advanced: 'Bilingüe / Avanzado',
    graduated: 'Titulado',
    skillCats: ['Redes y Telecomunicaciones', 'Infraestructura y Soporte', 'Desarrollo', 'Cloud & IA', 'Seguridad'],
  },
  en: {
    nav: ['About', 'Experience', 'Projects', 'Education', 'Certifications', 'Skills', 'Contact'],
    navIds: ['about', 'experience', 'projects', 'education', 'certifications', 'skills', 'contact'],
    available: 'Available for work',
    subtitle: 'Computer Engineer · Full Stack Developer · Telecommunications Technician',
    tagline: 'From cabling and mining sites to code — by way of São Paulo.',
    aboutTitle: 'About Me',
    aboutText: 'Computer Engineer and Systems Analyst with a hybrid profile bridging full-stack development and telecommunications infrastructure. I bring real field experience solving problems at code, hardware, and connectivity levels, ensuring IT service continuity in critical environments like mining operations. Open to on-site or remote/international roles.',
    projectsTitle: 'Projects',
    projectsIntro: 'Applications I designed and built end to end — several of them used daily by field teams.',
    demo: 'Live site',
    code: 'Code',
    footerKicker: "let's talk",
    menu: 'Open menu',
    themeLabel: 'Toggle light / dark theme',
    langLabel: 'Cambiar a español',
    expTitle: 'Experience',
    eduTitle: 'Education',
    certsTitle: 'Certifications',
    skillsTitle: 'Technical Skills',
    langTitle: 'Languages',
    footerText: 'Open to new opportunities in IT, telecommunications, and software development — in Chile or internationally.',
    location: 'Chile',
    license: "Class B Driver's License",
    native: 'Native',
    advanced: 'Bilingual / Advanced',
    graduated: 'Graduated',
    skillCats: ['Networks & Telecommunications', 'Infrastructure & Support', 'Development', 'Cloud & AI', 'Security'],
  },
}

const EXPERIENCE = [
  {
    role: { es: 'Técnico en Telecomunicaciones', en: 'Telecommunications Technician' },
    company: 'PSINet | Codelco, DSAL',
    period: { es: 'Mayo 2026 – Presente', en: 'May 2026 – Present' },
    desc: { es: 'Atención técnica de requerimientos sobre sistema LTE 4G, instalación y mantención de CPE y dispositivos de comunicación en equipos mineros.', en: 'Technical support for 4G LTE system requirements; installation and maintenance of CPE and communication devices on mining equipment.' },
    dot: '#4DD8E8',
    featured: false,
  },
  {
    role: { es: 'Intercambio Internacional — IA y Transformación Digital', en: 'International Exchange — AI & Digital Transformation' },
    company: 'Centro Paula Souza / Fatec Sebrae · São Paulo, Brasil',
    period: { es: 'Julio 2026 · 65 hrs académicas', en: 'July 2026 · 65 academic hours' },
    desc: {
      es: 'Seleccionado por INACAP para participar en programa internacional dictado en inglés: inmersión cultural, portugués intensivo, formación en IA y Transformación Digital, y una visita técnica a Mercado Libre. Certificado oficial del Gobierno del Estado de São Paulo.',
      en: 'Selected by INACAP to join an international program taught in English: cultural immersion, intensive Portuguese, AI & Digital Transformation training, and a technical visit to Mercado Libre. Official certificate from the São Paulo State Government.',
    },
    dot: '#F59E0B',
    featured: true,
  },
  {
    role: { es: 'Técnico Senior IT', en: 'Senior IT Technician' },
    company: 'TRES60 | Faena Manto Verde, Capstone Copper',
    period: { es: 'Oct 2024 – Feb 2026', en: 'Oct 2024 – Feb 2026' },
    desc: { es: 'Gestión y soporte de sistemas críticos de TI y telecomunicaciones: redes, radiocomunicación VHF, tecnologías de flota, fibra óptica, data center y CCTV.', en: 'Management and support of critical IT and telecom systems: networks, VHF radio, fleet technology, fiber optics, data center, and CCTV.' },
    dot: '#5FE38B',
    featured: false,
  },
  {
    role: { es: 'Operador de Procesos', en: 'Process Operator' },
    company: 'SGS | Faena Manto Verde, Capstone Copper',
    period: { es: 'Ago – Oct 2024', en: 'Aug – Oct 2024' },
    desc: { es: 'Toma de muestras de concentrado de cobre, control de humedad y logística de camiones en operación minera.', en: 'Copper concentrate sampling, moisture control, and truck logistics in mining operations.' },
    dot: '#9699AA',
    featured: false,
  },
  {
    role: { es: 'Auditoría TI, Depto. de Salud', en: 'IT Audit, Health Department' },
    company: 'Ilustre Municipalidad de Diego de Almagro',
    period: { es: 'Jul – Sep 2023', en: 'Jul – Sep 2023' },
    desc: { es: 'Evaluación de procesos TI e infraestructura tecnológica del Departamento de Salud Municipal.', en: 'Evaluation of IT processes and technology infrastructure for the Municipal Health Department.' },
    dot: '#5FE38B',
    featured: false,
  },
  {
    role: { es: 'Técnico Ayudante TI', en: 'IT Assistant Technician' },
    company: 'Ilustre Municipalidad de Diego de Almagro',
    period: { es: 'Ago 2022 – Jul 2023', en: 'Aug 2022 – Jul 2023' },
    desc: { es: 'Reparación e instalación de equipos, soporte informático, servidor municipal, bases de datos y cableado estructurado.', en: 'Equipment repair and installation, IT support, server maintenance, database management, and structured cabling.' },
    dot: '#4DD8E8',
    featured: false,
  },
  {
    role: { es: 'Práctica Montaje Industrial', en: 'Industrial Assembly Internship' },
    company: 'Ferronor S.A.',
    period: { es: 'Dic 2019 – Mar 2020', en: 'Dec 2019 – Mar 2020' },
    desc: { es: 'Práctica profesional en montaje industrial ferroviario.', en: 'Professional internship in railway industrial assembly.' },
    dot: '#9699AA',
    featured: false,
  },
]

const EDUCATION = [
  { degree: { es: 'Ingeniería en Informática', en: 'Computer Engineering' }, school: 'INACAP', year: '2025 – 2026' },
  { degree: { es: 'Analista Programador (CFT)', en: 'Systems Analyst (CFT)' }, school: 'INACAP', year: '2020 – 2023' },
]

const CERTS = [
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco' },
  { name: 'Networking Basics', issuer: 'Cisco' },
  { name: 'Network Addressing & Troubleshooting', issuer: 'Cisco' },
  { name: 'Computer Hardware Basics', issuer: 'Cisco' },
  { name: 'Operating Systems Basics', issuer: 'Cisco' },
  { name: 'Networking Academy Learn-A-Thon 2023', issuer: 'Cisco' },
  { name: 'AI Fundamentals', issuer: 'IBM SkillsBuild' },
  { name: 'Cloud Foundations Training Badge', issuer: 'AWS Academy' },
  { name: 'Scrum Foundation Professional (SFPC)', issuer: 'CertiProf' },
  { name: 'Arquitectura Cloud', issuer: 'INACAP' },
  { name: 'Intro to Web Development: HTML, CSS, JS', issuer: 'IBM / Coursera' },
]

type L = { es: string; en: string }
const same = (s: string): L => ({ es: s, en: s })

const PROJECTS: {
  name: string; desc: L; tags: string[]; demo?: string; repo: string; accent: string
}[] = [
  {
    name: 'PSINet · Informe Diario',
    desc: {
      es: 'Plataforma del equipo LTE de Codelco DSAL para generar informes de turno, cierre semanal, mantenimiento y fallas en Word. Borradores sincronizados en tiempo real, respaldo offline y control de acceso por aprobación de administrador.',
      en: "Platform used by Codelco DSAL's LTE team to generate shift, weekly, maintenance and failure reports in Word. Real-time synced drafts, offline backup, and admin-approved access control.",
    },
    tags: ['React', 'TypeScript', 'Supabase', 'Realtime', 'IndexedDB', 'OpenCV'],
    demo: 'https://informediario-psinet.vercel.app',
    repo: 'https://github.com/nediakX/InformeDiario',
    accent: '#4DD8E8',
  },
  {
    name: 'Informe Eléctrico',
    desc: {
      es: 'Asistente paso a paso para inspecciones eléctricas según normativa RIC / DS 8: mediciones, cargas, fotos y firma digital. Exporta informes en Word, PDF y Excel con gráficos, y gestiona cotizaciones y clientes.',
      en: 'Step-by-step wizard for electrical inspections under Chilean RIC / DS 8 standards: measurements, loads, photos and digital signature. Exports Word, PDF and Excel reports with charts, plus quotes and client management.',
    },
    tags: ['React', 'TypeScript', 'Supabase', 'docx', 'jsPDF', 'Leaflet'],
    demo: 'https://informe-electrico.vercel.app',
    repo: 'https://github.com/nediakX/InformeElectrico',
    accent: '#F59E0B',
  },
  {
    name: 'CM Cursos Online',
    desc: {
      es: 'Plataforma e-learning para la preparación de la Licencia SEC Clase D + fotovoltaica: 10 módulos, más de 590 preguntas de práctica, simuladores de examen, calculadoras y certificados verificables. Incluye panel de administración y landing editable.',
      en: 'E-learning platform for the Chilean SEC Class D electrician license + solar: 10 modules, 590+ practice questions, exam simulators, calculators and verifiable certificates. Includes an admin panel and editable landing page.',
    },
    tags: ['React', 'TypeScript', 'Neon Postgres', 'Vercel Blob', 'Recharts'],
    demo: 'https://cm-cursos-online.vercel.app',
    repo: 'https://github.com/nediakX/CM-Cursos-Online',
    accent: '#5FE38B',
  },
  {
    name: 'BitaHouse',
    desc: {
      es: 'SaaS de administración inmobiliaria con roles para corredora, arrendatarios y propietarios: dashboard financiero, validación de pagos, órdenes de trabajo e incidencias con evidencia.',
      en: 'Property-management SaaS with roles for brokers, tenants and owners: financial dashboard, payment validation, work orders and incident tracking with evidence.',
    },
    tags: ['React', 'TypeScript', 'Supabase', 'Prisma', 'RBAC'],
    demo: 'https://bitahouse.vercel.app',
    repo: 'https://github.com/nediakX/Bitahouse',
    accent: '#A78BFA',
  },
  {
    name: 'CineMidda',
    desc: {
      es: 'Sistema de reservas para el cine del Museo Interactivo Digital de Diego de Almagro: cartelera mensual, reservas de usuarios y CRUD de funciones con validación por administrador.',
      en: 'Booking system for the Diego de Almagro Interactive Digital Museum cinema: monthly listings, user bookings, and admin CRUD and validation of screenings.',
    },
    tags: ['Laravel', 'PHP', 'Blade', 'Bootstrap', 'MySQL'],
    repo: 'https://github.com/nediakX/CineMidda',
    accent: '#E84040',
  },
]

const SKILLS: L[][] = [
  [{ es: 'Red 4G / LTE', en: '4G / LTE Networks' }, { es: 'Radiocomunicación VHF', en: 'VHF Radio' }, { es: 'Fibra Óptica', en: 'Fiber Optics' }, { es: 'Instalación de CPE', en: 'CPE Installation' }, { es: 'Cableado Estructurado', en: 'Structured Cabling' }],
  [same('Data Center'), { es: 'Servidores', en: 'Servers' }, same('CCTV'), { es: 'Soporte Técnico', en: 'Technical Support' }, { es: 'Bases de Datos', en: 'Databases' }],
  [same('React + TypeScript'), same('Supabase / PostgreSQL'), same('HTML / CSS / JS'), same('PHP / Laravel'), same('SQL'), same('Git'), same('Scrum / Agile')],
  [same('AWS Cloud Foundations'), { es: 'Arquitectura Cloud', en: 'Cloud Architecture' }, same('Vercel'), { es: 'Fundamentos de IA', en: 'AI Fundamentals' }],
  [{ es: 'Ciberseguridad', en: 'Cybersecurity' }, { es: 'Seguridad de Redes', en: 'Network Security' }],
]

const CERT_COLORS: Record<string, string> = {
  'Cisco': '#1BA0D7',
  'IBM SkillsBuild': '#006699',
  'AWS Academy': '#FF9900',
  'CertiProf': '#E84040',
  'INACAP': '#5FE38B',
  'IBM / Coursera': '#0062FF',
}

// ─── Hooks ───────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Reveal wrapper ──────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────

function SectionTag({ num, c }: { num: string; c: typeof C.dark }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: c.accent2,
      letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem', opacity: 0.7,
    }}>
      [{num}]
    </span>
  )
}

function Pill({ icon, label, c }: { icon: string; label: string; c: typeof C.dark }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20,
      padding: '5px 14px', fontSize: '0.78rem', color: c.text2,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {icon} {label}
    </span>
  )
}

function ContactButton({
  href, bg, color, border, children,
}: {
  href: string; bg: string; color: string; border?: string; children: ReactNode
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: bg, color, border: border ? `1px solid ${border}` : 'none',
        borderRadius: 10, padding: '0.6rem 1.2rem',
        fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
        transition: 'all 200ms ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 6px 20px rgba(0,0,0,0.25)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  )
}

function SkillChip({ label, accent, c }: { label: string; accent: string; c: typeof C.dark }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      style={{
        display: 'inline-block', background: hov ? `${accent}1A` : c.surface,
        border: `1px solid ${hov ? accent + '55' : c.border}`, borderRadius: 8,
        padding: '5px 13px', fontSize: '0.82rem', color: hov ? accent : c.text2,
        transition: 'all 200ms ease', cursor: 'default',
        transform: hov ? 'scale(1.04)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </span>
  )
}

function CertCard({ cert, c }: { cert: typeof CERTS[0]; c: typeof C.dark }) {
  const [hov, setHov] = useState(false)
  const accent = CERT_COLORS[cert.issuer] || c.accent1
  return (
    <div
      style={{
        background: c.surface, border: `1px solid ${hov ? accent + '55' : c.border}`,
        borderRadius: 12, padding: '1rem 1.25rem', height: '100%',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        transition: 'all 250ms ease', cursor: 'default',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 10px 28px ${accent}18` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.63rem',
        fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent,
      }}>
        {cert.issuer}
      </span>
      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: c.text, lineHeight: 1.45 }}>
        {cert.name}
      </p>
    </div>
  )
}

function LangBar({ label, sublabel, pct, accent, c }: {
  label: string; sublabel: string; pct: number; accent: string; c: typeof C.dark
}) {
  const { ref, visible } = useReveal(0.2)
  return (
    <div
      ref={ref}
      style={{
        background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
        padding: '1.25rem 1.5rem', flex: 1, minWidth: 180, maxWidth: 260,
      }}
    >
      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{label}</p>
      <p style={{ fontSize: '0.78rem', color: c.text2, marginBottom: '0.75rem' }}>{sublabel}</p>
      <div style={{ height: 3, background: c.surface2, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: visible ? `${pct}%` : '0%',
          background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
          borderRadius: 2, transition: 'width 1.1s ease 0.2s',
        }} />
      </div>
    </div>
  )
}

function TimelineConnector({ c }: { c: typeof C.dark }) {
  const { ref, visible } = useReveal(0.05)
  return (
    <div
      ref={ref}
      style={{ position: 'absolute', left: 21, top: 14, bottom: 0, width: 2, overflow: 'hidden' }}
    >
      <div style={{
        width: '100%', height: visible ? '100%' : '0%',
        background: `linear-gradient(to bottom, ${c.accent1}55, ${c.accent2}33)`,
        transition: 'height 2.5s ease 0.2s',
      }} />
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = readPref('wbg-theme')
    if (saved === 'dark' || saved === 'light') return saved
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [lang, setLang] = useState<Lang>(() => {
    const saved = readPref('wbg-lang')
    if (saved === 'es' || saved === 'en') return saved
    return typeof navigator !== 'undefined' && !navigator.language?.toLowerCase().startsWith('es') ? 'en' : 'es'
  })
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeRotating, setThemeRotating] = useState(false)
  const c = C[theme]
  const tr = TR[lang]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    writePref('wbg-theme', theme)
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', c.bg)
  }, [theme, c.bg])

  useEffect(() => {
    writePref('wbg-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleTheme = () => {
    setThemeRotating(true)
    setTimeout(() => setThemeRotating(false), 400)
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: '100vh', transition: 'background 300ms ease, color 300ms ease' }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? c.headerBg : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? `1px solid ${c.border}` : 'none',
        transition: 'all 300ms ease',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem',
          height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#hero" aria-label="Williams Barraza Gallardo" style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1rem',
            color: c.accent1, letterSpacing: '-0.02em', cursor: 'pointer', textDecoration: 'none',
          }} onClick={e => { e.preventDefault(); scrollTo('hero') }}>
            WBG<span style={{ color: c.accent2 }}>.</span>
          </a>

          <nav className="desktop-nav" aria-label={lang === 'es' ? 'Secciones' : 'Sections'} style={{ display: 'flex', gap: '1.1rem', alignItems: 'center' }}>
            {tr.nav.slice(0, -1).map((label, i) => (
              <NavLink key={i} label={label} onClick={() => scrollTo(tr.navIds[i])} c={c} />
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
            <button
              aria-label={tr.langLabel}
              onClick={() => setLang(l => (l === 'es' ? 'en' : 'es'))}
              style={{
                background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20,
                padding: '4px 13px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                color: c.text2, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.05em', transition: 'all 200ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.accent1; (e.currentTarget as HTMLButtonElement).style.color = c.accent1 }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.border; (e.currentTarget as HTMLButtonElement).style.color = c.text2 }}
            >
              {lang === 'es' ? 'ES · EN' : 'EN · ES'}
            </button>

            <button
              aria-label={tr.themeLabel}
              title={tr.themeLabel}
              onClick={toggleTheme}
              style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', background: c.surface,
                border: `1px solid ${c.border}`, cursor: 'pointer', fontSize: '1rem',
                transition: 'all 300ms ease',
                transform: themeRotating ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            <button
              className="mobile-only"
              aria-label={tr.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                background: c.surface, border: `1px solid ${c.border}`, cursor: 'pointer', color: c.text,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {menuOpen
                  ? <path d="M6 6l12 12M18 6L6 18" />
                  : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="mobile-only" aria-label={lang === 'es' ? 'Secciones' : 'Sections'} style={{
            flexDirection: 'column', padding: '0.5rem 1.5rem 1rem', gap: '0.25rem',
          }}>
            {tr.nav.map((label, i) => (
              <button key={i} onClick={() => scrollTo(tr.navIds[i])} style={{
                background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer',
                color: c.text, fontSize: '1rem', fontFamily: 'inherit', padding: '0.6rem 0',
                borderBottom: `1px solid ${c.border}`,
              }}>
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section id="hero" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Circuit bg */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: theme === 'dark' ? 0.055 : 0.04, pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circ" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 L20 40 L20 20 L40 20 L40 40 L60 40 L60 60 L80 60" stroke={c.accent1} strokeWidth="0.8" fill="none" />
              <circle cx="20" cy="40" r="2" fill={c.accent1} />
              <circle cx="40" cy="40" r="2" fill={c.accent2} />
              <circle cx="60" cy="60" r="2" fill={c.accent1} />
              <path d="M80 0 L80 20 L60 20" stroke={c.accent2} strokeWidth="0.8" fill="none" />
              <path d="M0 0 L10 0 L10 10" stroke={c.accent2} strokeWidth="0.6" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circ)" />
        </svg>

        {/* Glow orbs */}
        <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(95,227,139,0.07)' : 'rgba(31,163,94,0.05)'} 0%, transparent 70%)`, top: '5%', right: '8%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(77,216,232,0.07)' : 'rgba(14,143,166,0.05)'} 0%, transparent 70%)`, bottom: '15%', left: '5%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 740, width: '100%', textAlign: 'center', position: 'relative' }}>
          {/* Avatar */}
          <div className="hero-avatar" style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: `linear-gradient(135deg, ${c.accent1}25, ${c.accent2}25)`,
              border: `2px solid ${c.accent1}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '2.4rem',
                color: c.accent1,
              }}>WB</span>
            </div>
            <div style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              border: `1px solid ${c.accent1}28`, animation: 'pulseRing 2.2s ease-in-out infinite',
            }} />
          </div>

          {/* Available badge */}
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `${c.accent1}14`, border: `1px solid ${c.accent1}38`,
            borderRadius: 20, padding: '5px 15px 5px 10px', marginBottom: '1.25rem',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: c.accent1,
              display: 'inline-block', animation: 'pulseDot 1.8s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '0.78rem', fontWeight: 600, color: c.accent1,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{tr.available}</span>
          </div>

          {/* Name */}
          <h1 className="hero-name" style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 5.5vw, 3.6rem)', lineHeight: 1.1,
            letterSpacing: '-0.03em', marginBottom: '0.75rem',
          }}>
            Williams Barraza{' '}
            <span style={{ color: c.accent1 }}>
              Gallardo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: c.text2,
            lineHeight: 1.7, marginBottom: '0.875rem',
            transition: 'opacity 250ms ease',
          }}>
            {tr.subtitle}
          </p>

          {/* Tagline */}
          <p className="hero-tag" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem',
            color: c.accent2, marginBottom: '2.25rem', opacity: 0.85,
          }}>
            <span style={{ color: c.accent1, marginRight: '0.5rem' }}>//</span>
            {tr.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="hero-btns" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ContactButton href="https://wa.me/56953219670" bg={c.accent1} color="#0F1018">
              <WhatsAppIcon /> WhatsApp
            </ContactButton>
            <ContactButton href="mailto:vicentebarraza17@outlook.com" bg={c.surface} color={c.text} border={c.border}>
              <MailIcon c={c} /> Email
            </ContactButton>
            <ContactButton href="https://www.linkedin.com/in/williams-barraza-gallardo-919197271" bg={c.surface} color={c.text} border={c.border}>
              <LinkedInIcon c={c} /> LinkedIn
            </ContactButton>
            <ContactButton href="https://github.com/nediakX/" bg={c.surface} color={c.text} border={c.border}>
              <GithubIcon c={c} /> GitHub
            </ContactButton>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="01" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '1.5rem',
            }}>
              {tr.aboutTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: c.text2, maxWidth: 640, marginBottom: '1.75rem' }}>
              {tr.aboutText}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Pill icon="📍" label={tr.location} c={c} />
              <Pill icon="🌐" label={lang === 'es' ? 'Disponible presencial / remoto' : 'On-site / remote available'} c={c} />
              <Pill icon="🚗" label={tr.license} c={c} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────── */}
      <section id="experience" style={{ padding: '5rem 1.5rem', background: c.timelineBg, transition: 'background 300ms ease' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="02" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '3rem',
            }}>
              {tr.expTitle}
            </h2>
          </Reveal>

          <div style={{ position: 'relative', paddingLeft: 52 }}>
            <TimelineConnector c={c} />

            {EXPERIENCE.map((exp, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  {/* Node */}
                  <div style={{
                    position: 'absolute', left: -52, top: 16, width: 22, height: 22,
                    borderRadius: '50%', background: c.bg, border: `2px solid ${exp.dot}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                    boxShadow: `0 0 12px ${exp.dot}44`,
                    transition: 'background 300ms',
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: exp.dot }} />
                  </div>

                  <ExpCard exp={exp} lang={lang} c={c} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────── */}
      <section id="projects" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="03" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '0.75rem',
            }}>
              {tr.projectsTitle}
            </h2>
            <p style={{ color: c.text2, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 620, marginBottom: '2rem' }}>
              {tr.projectsIntro}
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 290px), 1fr))', gap: '1rem' }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <ProjectCard p={p} lang={lang} tr={tr} c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ──────────────────────────────────────────── */}
      <section id="education" style={{ padding: '5rem 1.5rem', background: c.timelineBg, transition: 'background 300ms ease' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="04" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '2rem',
            }}>
              {tr.eduTitle}
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {EDUCATION.map((edu, i) => (
              <Reveal key={i} delay={i * 100}>
                <EduCard edu={edu} lang={lang} label={tr.graduated} c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
      <section id="certifications" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="05" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '2rem',
            }}>
              {tr.certsTitle}
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.875rem' }}>
            {CERTS.map((cert, i) => (
              <Reveal key={i} delay={i * 55}>
                <CertCard cert={cert} c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: '5rem 1.5rem', background: c.timelineBg, transition: 'background 300ms ease' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="06" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '2.25rem',
            }}>
              {tr.skillsTitle}
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {SKILLS.map((group, i) => (
              <Reveal key={i} delay={i * 80}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i % 2 === 0 ? c.accent1 : c.accent2, marginBottom: '0.625rem',
                }}>
                  {tr.skillCats[i]}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.map((skill, j) => (
                    <SkillChip key={j} label={skill[lang]} accent={i % 2 === 0 ? c.accent1 : c.accent2} c={c} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ──────────────────────────────────────────── */}
      <section id="languages" style={{ padding: '3rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="07" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.35rem',
              letterSpacing: '-0.02em', marginBottom: '1.25rem',
            }}>
              {tr.langTitle}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <LangBar label="Español" sublabel={tr.native} pct={100} accent={c.accent1} c={c} />
              <LangBar label="English" sublabel={tr.advanced} pct={87} accent={c.accent2} c={c} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ───────────────────────────────────── */}
      <footer id="contact" style={{ padding: '5rem 1.5rem', borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", color: c.accent2,
              fontSize: '0.75rem', marginBottom: '0.75rem', opacity: 0.7,
            }}>
              // {tr.footerKicker}
            </p>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.03em', marginBottom: '1rem',
            }}>
              Williams Barraza{' '}
              <span style={{ color: c.accent1 }}>
                Gallardo
              </span>
            </h2>
            <p style={{ color: c.text2, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 2.25rem' }}>
              {tr.footerText}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <ContactButton href="https://wa.me/56953219670" bg={c.accent1} color="#0F1018">
                <WhatsAppIcon /> WhatsApp
              </ContactButton>
              <ContactButton href="mailto:vicentebarraza17@outlook.com" bg={c.surface} color={c.text} border={c.border}>
                <MailIcon c={c} /> Email
              </ContactButton>
              <ContactButton href="https://www.linkedin.com/in/williams-barraza-gallardo-919197271" bg={c.surface} color={c.text} border={c.border}>
                <LinkedInIcon c={c} /> LinkedIn
              </ContactButton>
              <ContactButton href="https://github.com/nediakX/" bg={c.surface} color={c.text} border={c.border}>
                <GithubIcon c={c} /> GitHub
              </ContactButton>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', color: c.text2, fontSize: '0.8rem', marginBottom: '2.5rem' }}>
              <span>📍 Chile</span>
              <span>📞 +56 9 5321 9670</span>
              <span>✉️ vicentebarraza17@outlook.com</span>
              <span>🚗 {tr.license}</span>
            </div>

            <div style={{
              paddingTop: '1.5rem', borderTop: `1px solid ${c.border}`,
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: c.text2,
            }}>
              <span style={{ color: c.accent1 }}>Williams Barraza Gallardo</span>
              {' '}· {new Date().getFullYear()} · Región de Atacama, Chile
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  )
}

// ─── Inline small components ─────────────────────────────────────

function NavLink({ label, onClick, c }: { label: string; onClick: () => void; c: typeof C.dark }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: hov ? c.accent1 : c.text2, fontSize: '0.86rem',
        transition: 'color 200ms ease', fontFamily: 'inherit', padding: '4px 2px',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

function ExpCard({ exp, lang, c }: { exp: typeof EXPERIENCE[0]; lang: Lang; c: typeof C.dark }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        background: exp.featured ? `linear-gradient(135deg, ${exp.dot}0E, ${c.surface})` : c.surface,
        border: `1px solid ${hov ? exp.dot + '60' : exp.featured ? exp.dot + '35' : c.border}`,
        borderRadius: 12, padding: '1.25rem 1.5rem',
        transition: 'all 240ms ease', cursor: 'default',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? `0 8px 24px ${exp.dot}20` : exp.featured ? `0 2px 12px ${exp.dot}10` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: c.text, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {exp.featured && <span style={{ fontSize: '0.95rem' }}>✈️</span>}
          {exp.role[lang]}
          {exp.featured && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 700,
              background: `${exp.dot}22`, color: exp.dot, border: `1px solid ${exp.dot}44`,
              borderRadius: 20, padding: '1px 8px', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {lang === 'es' ? 'Internacional' : 'International'}
            </span>
          )}
        </h3>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: c.text2, whiteSpace: 'nowrap' }}>
          {exp.period[lang]}
        </span>
      </div>
      <p style={{ fontSize: '0.82rem', color: exp.dot, fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</p>
      <p style={{ fontSize: '0.875rem', color: c.text2, lineHeight: 1.65 }}>{exp.desc[lang]}</p>
    </div>
  )
}

function EduCard({ edu, lang, label, c }: { edu: typeof EDUCATION[0]; lang: Lang; label: string; c: typeof C.dark }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        background: c.surface, border: `1px solid ${hov ? c.accent1 + '50' : c.border}`,
        borderRadius: 12, padding: '1.25rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.75rem', transition: 'all 240ms ease',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem' }}>
          {edu.degree[lang]}
        </p>
        <p style={{ fontSize: '0.85rem', color: c.accent1, fontWeight: 600 }}>{edu.school}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: c.text2, display: 'block', marginBottom: '0.4rem' }}>
          {edu.year}
        </span>
        <span style={{
          background: `${c.accent1}18`, color: c.accent1, border: `1px solid ${c.accent1}38`,
          fontSize: '0.68rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20,
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ p, lang, tr, c }: {
  p: typeof PROJECTS[0]; lang: Lang; tr: typeof TR.es; c: typeof C.dark
}) {
  const linkStyle = (primary: boolean) => ({
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', borderRadius: 8,
    padding: '0.4rem 0.8rem',
    color: primary ? '#0F1018' : c.text,
    background: primary ? p.accent : c.surface2,
    border: `1px solid ${primary ? p.accent : c.border}`,
  })
  return (
    <article className="lift-card" style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      padding: '1.35rem 1.4rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem',
      borderTop: `3px solid ${p.accent}`,
      ['--hover-border' as string]: `${p.accent}66`,
      ['--hover-shadow' as string]: `0 10px 28px ${p.accent}1F`,
    }}>
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.02rem', color: c.text }}>
        {p.name}
      </h3>
      <p style={{ fontSize: '0.86rem', color: c.text2, lineHeight: 1.65, flex: 1 }}>{p.desc[lang]}</p>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', listStyle: 'none' }}>
        {p.tags.map(t => (
          <li key={t} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', color: p.accent,
            background: `${p.accent}14`, border: `1px solid ${p.accent}33`, borderRadius: 6, padding: '2px 7px',
          }}>{t}</li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer" style={linkStyle(true)}>
            {tr.demo} <span aria-hidden="true">↗</span>
          </a>
        )}
        <a href={p.repo} target="_blank" rel="noopener noreferrer" style={linkStyle(false)}>
          <GithubIcon c={c} /> {tr.code}
        </a>
      </div>
    </article>
  )
}

// ─── Preferences (safe localStorage) ─────────────────────────────

function readPref(key: string): string | null {
  try { return window.localStorage.getItem(key) } catch { return null }
}

function writePref(key: string, value: string) {
  try { window.localStorage.setItem(key, value) } catch { /* ignore */ }
}

// ─── Icon components ─────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.528 5.855L.057 23.4l5.701-1.498A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.385l-.361-.214-3.741.982.998-3.65-.235-.375A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
    </svg>
  )
}

function MailIcon({ c }: { c: typeof C.dark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.accent1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon({ c }: { c: typeof C.dark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c.accent2}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ c }: { c: typeof C.dark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c.text2}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
