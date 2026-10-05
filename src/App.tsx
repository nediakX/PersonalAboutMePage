import { useState, useEffect, useRef, type ReactNode, type MouseEvent as RMouseEvent } from 'react'

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
    nav: ['Sobre mí', 'Experiencia', 'Proyectos', 'Freelance', 'Educación', 'Certificaciones', 'Habilidades', 'Contacto'],
    navIds: ['about', 'experience', 'projects', 'freelance', 'education', 'certifications', 'skills', 'contact'],
    deskNav: ['about', 'experience', 'projects', 'freelance', 'certifications'],
    available: 'Disponible para freelance y empleo',
    hireCta: 'Cotizar proyecto',
    rolePrefix: 'construyo',
    roles: ['aplicaciones web a medida', 'sistemas de informes automáticos', 'plataformas con usuarios y roles', 'redes LTE 4G y fibra óptica', 'soluciones TI para faenas mineras'],
    stats: [
      { to: 5, suffix: '+', label: 'proyectos publicados' },
      { to: 4, suffix: '+', label: 'años en TI y telecom' },
      { to: 11, suffix: '', label: 'certificaciones' },
      { to: 2, suffix: '', label: 'idiomas' },
    ],
    flBadge: 'Disponible para nuevos proyectos',
    flHeading: '¿Tienes un proyecto en mente?',
    flHighlight: 'Lo construimos juntos.',
    flIntro: 'Trabajo de forma independiente con empresas, pymes y equipos en terreno que necesitan software a medida o apoyo TI. Hablas directamente conmigo, desde la idea hasta la entrega.',
    flModes: ['Remoto · Chile y el extranjero', 'Presencial · Región de Atacama', 'Español / English'],
    flExample: 'Ej.:',
    flProcessTitle: 'Cómo trabajo',
    flSteps: [
      { t: 'Conversamos', d: 'Me cuentas qué necesitas y definimos juntos el alcance.' },
      { t: 'Propuesta', d: 'Recibes plazos y un presupuesto claro antes de empezar.' },
      { t: 'Desarrollo', d: 'Avances frecuentes con una versión en línea para que pruebes.' },
      { t: 'Entrega y soporte', d: 'Publicación, capacitación y ajustes después de la entrega.' },
    ],
    flCtaTitle: 'Cuéntame tu idea',
    flCtaText: 'Escríbeme por WhatsApp o correo con una breve descripción y te respondo con los siguientes pasos.',
    waMsg: 'Hola Williams, vi tu portafolio y me interesa cotizar un proyecto.',
    mailSubject: 'Cotización de proyecto',
    scrollHint: 'Desliza',
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
    footerText: 'Abierto a proyectos freelance y nuevas oportunidades en TI, telecomunicaciones y desarrollo de software, en Chile o a nivel internacional.',
    location: 'Chile',
    license: 'Licencia Clase B',
    native: 'Nativo',
    advanced: 'Bilingüe / Avanzado',
    graduated: 'Titulado',
    skillCats: ['Redes y Telecomunicaciones', 'Infraestructura y Soporte', 'Desarrollo', 'Cloud & IA', 'Seguridad'],
  },
  en: {
    nav: ['About', 'Experience', 'Projects', 'Freelance', 'Education', 'Certifications', 'Skills', 'Contact'],
    navIds: ['about', 'experience', 'projects', 'freelance', 'education', 'certifications', 'skills', 'contact'],
    deskNav: ['about', 'experience', 'projects', 'freelance', 'certifications'],
    available: 'Available for freelance & full-time',
    hireCta: 'Start a project',
    rolePrefix: 'I build',
    roles: ['custom web applications', 'automated reporting systems', 'platforms with users & roles', 'LTE 4G and fiber networks', 'IT solutions for mining sites'],
    stats: [
      { to: 5, suffix: '+', label: 'shipped projects' },
      { to: 4, suffix: '+', label: 'years in IT & telecom' },
      { to: 11, suffix: '', label: 'certifications' },
      { to: 2, suffix: '', label: 'languages' },
    ],
    flBadge: 'Open for new projects',
    flHeading: 'Got a project in mind?',
    flHighlight: "Let's build it together.",
    flIntro: 'I work independently with companies, small businesses and field teams that need custom software or IT support. You deal with me directly, from idea to delivery.',
    flModes: ['Remote · Chile & abroad', 'On-site · Atacama Region', 'English / Español'],
    flExample: 'e.g.',
    flProcessTitle: 'How I work',
    flSteps: [
      { t: "Let's talk", d: 'You tell me what you need and we define the scope together.' },
      { t: 'Proposal', d: 'A clear timeline and budget before any work starts.' },
      { t: 'Build', d: 'Frequent progress updates with a live version you can test.' },
      { t: 'Launch & support', d: 'Deployment, training and adjustments after delivery.' },
    ],
    flCtaTitle: 'Tell me about your idea',
    flCtaText: "Message me on WhatsApp or email with a short description and I'll get back to you with next steps.",
    waMsg: "Hi Williams, I saw your portfolio and I'd like to discuss a project.",
    mailSubject: 'Project inquiry',
    scrollHint: 'Scroll',
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
    footerText: 'Open to freelance projects and new opportunities in IT, telecommunications, and software development — in Chile or internationally.',
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
    demo: 'https://informes-psinet.vercel.app',
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

const SERVICES: { icon: 'code' | 'doc' | 'users' | 'net'; title: L; desc: L; example: string; accent: string }[] = [
  {
    icon: 'code', accent: '#5FE38B',
    title: { es: 'Aplicaciones web a medida', en: 'Custom web apps' },
    desc: { es: 'Sitios y aplicaciones con React y TypeScript: rápidas, responsivas y publicadas en la nube.', en: 'Sites and apps built with React and TypeScript: fast, responsive and deployed to the cloud.' },
    example: 'BitaHouse, CM Cursos Online',
  },
  {
    icon: 'doc', accent: '#F59E0B',
    title: { es: 'Automatización de informes', en: 'Report automation' },
    desc: { es: 'Formularios que generan informes en Word, PDF o Excel listos para entregar, con fotos, firmas y gráficos.', en: 'Forms that generate ready-to-send Word, PDF or Excel reports with photos, signatures and charts.' },
    example: 'Informe Diario PSINet, Informe Eléctrico',
  },
  {
    icon: 'users', accent: '#A78BFA',
    title: { es: 'Plataformas con usuarios y roles', en: 'Platforms with users & roles' },
    desc: { es: 'Login, aprobación de cuentas, panel de administración y datos sincronizados en tiempo real.', en: 'Login, account approval, admin dashboards and real-time synced data.' },
    example: 'BitaHouse, Informe Diario',
  },
  {
    icon: 'net', accent: '#4DD8E8',
    title: { es: 'Redes y soporte TI', en: 'Networks & IT support' },
    desc: { es: 'Redes, cableado estructurado, fibra óptica, CCTV y soporte técnico en terreno.', en: 'Networking, structured cabling, fiber optics, CCTV and on-site technical support.' },
    example: 'Codelco DSAL, Capstone Copper',
  },
]

const TECH = ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'PHP · Laravel', 'SQL', 'Git', 'AWS', 'LTE 4G', 'VHF', 'CCTV', 'Cisco Networking', 'Scrum']

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

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
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

function usePrefersReducedMotion() {
  const [reduce] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  return reduce
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function Reveal({ children, delay = 0, variant = 'up' }: { children: ReactNode; delay?: number; variant?: 'up' | 'left' | 'scale' }) {
  const { ref, visible } = useReveal()
  const hidden = variant === 'left' ? 'translateX(-32px)' : variant === 'scale' ? 'scale(0.94)' : 'translateY(32px)'
  return (
    <div
      ref={ref}
      style={{
        height: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hidden,
        filter: visible ? 'none' : 'blur(6px)',
        transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms, filter 0.8s ${EASE} ${delay}ms`,
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
  href, bg, color, border, className, glow, children,
}: {
  href: string; bg: string; color: string; border?: string; className?: string; glow?: string; children: ReactNode
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      className={className}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: bg, color, border: border ? `1px solid ${border}` : 'none',
        borderRadius: 10, padding: '0.6rem 1.2rem',
        fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
        transition: `transform 250ms ${EASE}, box-shadow 250ms ease`,
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? (glow ? `0 10px 30px ${glow}55` : '0 8px 22px rgba(0,0,0,0.22)') : (glow ? `0 4px 18px ${glow}33` : 'none'),
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

  const [active, setActive] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll spy: marca en el menú la sección visible
  useEffect(() => {
    const ids = TR.es.navIds
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const onHeroMove = (e: RMouseEvent<HTMLElement>) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - r.left}px`)
    el.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }

  const waLink = `https://wa.me/56953219670?text=${encodeURIComponent(tr.waMsg)}`
  const mailLink = `mailto:vicentebarraza17@outlook.com?subject=${encodeURIComponent(tr.mailSubject)}`

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

      {/* ── SCROLL PROGRESS ───────────────────────────────────── */}
      <div ref={progressRef} aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 101,
        transform: 'scaleX(0)', transformOrigin: '0 50%',
        background: `linear-gradient(90deg, ${c.accent1}, ${c.accent2})`,
        boxShadow: `0 0 10px ${c.accent1}88`,
      }} />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? c.headerBg : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? `1px solid ${c.border}` : '1px solid transparent',
        transition: 'all 300ms ease',
      }}>
        <div style={{
          maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        }}>
          <a href="#hero" aria-label="Williams Barraza Gallardo" className="logo" style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.05rem',
            color: c.accent1, letterSpacing: '-0.02em', cursor: 'pointer', textDecoration: 'none',
          }} onClick={e => { e.preventDefault(); scrollTo('hero') }}>
            WBG<span style={{ color: c.accent2 }}>.</span>
          </a>

          <nav className="desktop-nav" aria-label={lang === 'es' ? 'Secciones' : 'Sections'} style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
            {tr.deskNav.map(id => (
              <NavLink key={id} label={tr.nav[tr.navIds.indexOf(id)]} active={active === id} onClick={() => scrollTo(id)} c={c} />
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
            <button
              aria-label={tr.langLabel}
              onClick={() => setLang(l => (l === 'es' ? 'en' : 'es'))}
              className="chip-btn"
              style={{
                background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20,
                padding: '5px 13px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                color: c.text2, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.05em', ['--chip-accent' as string]: c.accent1,
              }}
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
                transition: `transform 500ms ${EASE}`,
                transform: themeRotating ? 'rotate(360deg) scale(0.85)' : 'rotate(0deg)',
              }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            <a
              href="#freelance"
              className="desktop-nav btn-shine"
              onClick={e => { e.preventDefault(); scrollTo('freelance') }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: c.accent1, color: '#0F1018', borderRadius: 10,
                padding: '0.5rem 0.95rem', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none',
              }}
            >
              {tr.hireCta} <span aria-hidden="true">→</span>
            </a>

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
          <nav id="mobile-menu" className="mobile-only menu-drop" aria-label={lang === 'es' ? 'Secciones' : 'Sections'} style={{
            flexDirection: 'column', padding: '0.25rem 1.5rem 1.25rem', gap: '0.25rem',
          }}>
            {tr.nav.map((label, i) => (
              <button key={i} onClick={() => scrollTo(tr.navIds[i])} style={{
                background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer',
                color: active === tr.navIds[i] ? c.accent1 : c.text, fontSize: '1rem', fontFamily: 'inherit', padding: '0.65rem 0',
                borderBottom: `1px solid ${c.border}`, animation: `fadeSlideUp 0.4s ${EASE} ${i * 35}ms both`,
              }}>
                {label}
              </button>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              marginTop: '0.9rem', textAlign: 'center', background: c.accent1, color: '#0F1018',
              borderRadius: 10, padding: '0.75rem', fontWeight: 700, textDecoration: 'none',
            }}>
              {tr.hireCta}
            </a>
          </nav>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={onHeroMove}
        style={{
          minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '7.5rem 1.5rem 6rem', position: 'relative', overflow: 'hidden',
          ['--sx' as string]: '50%', ['--sy' as string]: '35%',
        }}
      >
        {/* Circuit bg (deriva lenta) */}
        <svg
          className="circuit-drift"
          aria-hidden="true"
          style={{ position: 'absolute', top: -80, left: -80, width: 'calc(100% + 160px)', height: 'calc(100% + 160px)', opacity: theme === 'dark' ? 0.07 : 0.05, pointerEvents: 'none' }}
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

        {/* Señales que recorren el fondo */}
        <svg aria-hidden="true" className="signal-lines" viewBox="0 0 1200 800" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: theme === 'dark' ? 0.55 : 0.4 }}>
          <defs>
            <linearGradient id="sig" x1="0" x2="1">
              <stop offset="0" stopColor={c.accent1} stopOpacity="0" />
              <stop offset="0.5" stopColor={c.accent1} />
              <stop offset="1" stopColor={c.accent2} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="sig sig-1" d="M-20 220 H260 L320 160 H620" stroke="url(#sig)" strokeWidth="1.5" fill="none" />
          <path className="sig sig-2" d="M1220 600 H900 L840 660 H560" stroke="url(#sig)" strokeWidth="1.5" fill="none" />
          <path className="sig sig-3" d="M1220 140 H1000 L950 190 H780" stroke="url(#sig)" strokeWidth="1.2" fill="none" />
          <path className="sig sig-4" d="M-20 640 H180 L230 590 H420" stroke="url(#sig)" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Foco que sigue al cursor */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(560px circle at var(--sx) var(--sy), ${c.accent1}${theme === 'dark' ? '16' : '12'}, transparent 70%)`,
        }} />

        {/* Glow orbs */}
        <div className="float-a" aria-hidden="true" style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(95,227,139,0.10)' : 'rgba(31,163,94,0.07)'} 0%, transparent 70%)`, top: '2%', right: '4%', pointerEvents: 'none' }} />
        <div className="float-b" aria-hidden="true" style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(77,216,232,0.10)' : 'rgba(14,143,166,0.07)'} 0%, transparent 70%)`, bottom: '8%', left: '2%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 780, width: '100%', textAlign: 'center', position: 'relative' }}>
          {/* Avatar con anillo giratorio */}
          <div className="hero-avatar" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', width: 124, height: 124 }}>
              <div className="ring-spin" aria-hidden="true" style={{
                position: 'absolute', inset: -5, borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${c.accent1}, ${c.accent2}, transparent 55%, transparent 70%, ${c.accent1})`,
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))',
              }} />
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: `linear-gradient(135deg, ${c.accent1}22, ${c.accent2}22), ${c.surface}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 40px ${c.accent1}22`,
              }}>
                <span className="grad-text" style={{
                  fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '2.5rem',
                  backgroundImage: `linear-gradient(120deg, ${c.accent1}, ${c.accent2}, ${c.accent1})`,
                }}>WB</span>
              </div>
              <div aria-hidden="true" style={{
                position: 'absolute', inset: -14, borderRadius: '50%',
                border: `1px solid ${c.accent1}28`, animation: 'pulseRing 2.6s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Available badge */}
          <div className="hero-badge">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              background: `${c.accent1}14`, border: `1px solid ${c.accent1}38`,
              borderRadius: 20, padding: '6px 16px 6px 12px', marginBottom: '1.4rem',
            }}>
              <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-block' }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c.accent1 }} />
                <span className="ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c.accent1 }} />
              </span>
              <span style={{
                fontSize: '0.78rem', fontWeight: 600, color: c.accent1,
                fontFamily: "'JetBrains Mono', monospace",
              }}>{tr.available}</span>
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-name" style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6.4vw, 4.2rem)', lineHeight: 1.05,
            letterSpacing: '-0.035em', marginBottom: '1rem',
          }}>
            Williams Barraza{' '}
            <span className="grad-text" style={{
              backgroundImage: `linear-gradient(110deg, ${c.accent1} 0%, ${c.accent2} 45%, ${c.accent1} 90%)`,
            }}>
              Gallardo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: c.text2,
            lineHeight: 1.7, marginBottom: '1rem',
          }}>
            {tr.subtitle}
          </p>

          {/* Typewriter */}
          <p className="hero-tag" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            color: c.text, marginBottom: '2.25rem', minHeight: '1.6em',
          }}>
            <span className="sr-only">{tr.rolePrefix}: {tr.roles.join(', ')}</span>
            <span aria-hidden="true">
              <span style={{ color: c.accent1 }}>&gt;</span>{' '}
              <span style={{ color: c.text2 }}>{tr.rolePrefix}</span>{' '}
              <Typewriter key={lang} words={tr.roles} color={c.accent2} />
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-btns" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ContactButton href="#freelance" bg={c.accent1} color="#0F1018" className="btn-shine" glow={c.accent1}>
              {tr.hireCta} <span aria-hidden="true">→</span>
            </ContactButton>
            <ContactButton href={waLink} bg={c.surface} color={c.text} border={c.border}>
              <span style={{ color: '#25D366', display: 'inline-flex' }}><WhatsAppIcon /></span> WhatsApp
            </ContactButton>
            <ContactButton href="https://www.linkedin.com/in/williams-barraza-gallardo-919197271" bg={c.surface} color={c.text} border={c.border}>
              <LinkedInIcon c={c} /> LinkedIn
            </ContactButton>
            <ContactButton href="https://github.com/nediakX/" bg={c.surface} color={c.text} border={c.border}>
              <GithubIcon c={c} /> GitHub
            </ContactButton>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '3.25rem',
            border: `1px solid ${c.border}`, borderRadius: 16, background: `${c.surface}AA`,
            backdropFilter: 'blur(8px)', overflow: 'hidden',
          }}>
            {tr.stats.map((st, i) => (
              <div key={st.label} className="stat-cell" style={{
                padding: '1.1rem 0.5rem', borderLeft: i ? `1px solid ${c.border}` : 'none',
              }}>
                <div className="grad-text" style={{
                  fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)',
                  backgroundImage: `linear-gradient(120deg, ${c.accent1}, ${c.accent2})`, animation: 'none',
                }}>
                  <CountUp to={st.to} suffix={st.suffix} />
                </div>
                <div style={{ fontSize: '0.74rem', color: c.text2, marginTop: '0.2rem' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <button
          className="scroll-hint"
          onClick={() => scrollTo('about')}
          aria-label={tr.scrollHint}
          style={{
            position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: c.text2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 22, height: 34, border: `1.5px solid ${c.text2}88`, borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <span className="scroll-dot" style={{ width: 3, height: 7, borderRadius: 2, background: c.accent1 }} />
          </span>
          {tr.scrollHint}
        </button>
      </section>

      {/* ── TECH MARQUEE ───────────────────────────────────────── */}
      <Marquee items={TECH} c={c} />

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
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: c.accent2,
              marginBottom: '1.1rem', borderLeft: `2px solid ${c.accent1}`, paddingLeft: '0.9rem',
            }}>
              {tr.tagline}
            </p>
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
              <Reveal key={i} delay={i * 70} variant="left">
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

      {/* ── FREELANCE ──────────────────────────────────────────── */}
      <section id="freelance" style={{ padding: '6rem 1.5rem', background: c.timelineBg, position: 'relative', overflow: 'hidden', transition: 'background 300ms ease' }}>
        <div className="float-b" aria-hidden="true" style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${c.accent1}12 0%, transparent 70%)`, top: '-10%', right: '-10%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <SectionTag num="04" c={c} />
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem',
              background: `${c.accent1}14`, border: `1px solid ${c.accent1}38`, borderRadius: 20,
              padding: '4px 14px 4px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
              fontWeight: 600, color: c.accent1,
            }}>
              <span style={{ position: 'relative', width: 7, height: 7, display: 'inline-block' }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c.accent1 }} />
                <span className="ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c.accent1 }} />
              </span>
              {tr.flBadge}
            </span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)', letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: '1rem',
            }}>
              {tr.flHeading}{' '}
              <span className="grad-text" style={{ backgroundImage: `linear-gradient(110deg, ${c.accent1} 0%, ${c.accent2} 45%, ${c.accent1} 90%)` }}>
                {tr.flHighlight}
              </span>
            </h2>
            <p style={{ color: c.text2, fontSize: '1rem', lineHeight: 1.75, maxWidth: 640, marginBottom: '1.25rem' }}>
              {tr.flIntro}
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {tr.flModes.map((m, i) => (
                <Pill key={m} icon={['🌐', '📍', '💬'][i]} label={m} c={c} />
              ))}
            </div>
          </Reveal>

          {/* Servicios */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
            {SERVICES.map((sv, i) => (
              <Reveal key={sv.icon} delay={i * 90}>
                <article
                  className="spot-card"
                  onMouseMove={spotMove}
                  onMouseLeave={spotLeave}
                  style={{
                    background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16,
                    padding: '1.4rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.7rem',
                    ['--spot' as string]: `${sv.accent}24`,
                    ['--hover-border' as string]: `${sv.accent}66`,
                    ['--hover-shadow' as string]: `0 14px 34px ${sv.accent}1F`,
                  }}
                >
                  <span className="icon-tile" style={{
                    width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${sv.accent}18`, border: `1px solid ${sv.accent}40`, color: sv.accent,
                  }}>
                    <ServiceIcon name={sv.icon} />
                  </span>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1rem', color: c.text }}>{sv.title[lang]}</h3>
                  <p style={{ fontSize: '0.86rem', color: c.text2, lineHeight: 1.65, flex: 1 }}>{sv.desc[lang]}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: sv.accent }}>
                    {tr.flExample} {sv.example}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Proceso */}
          <Reveal>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {tr.flProcessTitle}
            </h3>
          </Reveal>
          <ProcessSteps steps={tr.flSteps} c={c} />

          {/* CTA */}
          <Reveal variant="scale">
            <div className="glow-border" style={{
              marginTop: '3.5rem', padding: 1.5, borderRadius: 20,
              backgroundImage: `linear-gradient(120deg, ${c.accent1}, ${c.accent2}, ${c.accent1}55, ${c.accent2}, ${c.accent1})`,
            }}>
              <div style={{
                background: `radial-gradient(120% 140% at 0% 0%, ${c.accent1}14, transparent 55%), ${c.surface}`,
                borderRadius: 19, padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
              }}>
                <div style={{ maxWidth: 480 }}>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                    {tr.flCtaTitle}
                  </h3>
                  <p style={{ color: c.text2, fontSize: '0.92rem', lineHeight: 1.65 }}>{tr.flCtaText}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <ContactButton href={waLink} bg={c.accent1} color="#0F1018" className="btn-shine" glow={c.accent1}>
                    <WhatsAppIcon /> WhatsApp
                  </ContactButton>
                  <ContactButton href={mailLink} bg={c.surface2} color={c.text} border={c.border}>
                    <MailIcon c={c} /> Email
                  </ContactButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EDUCATION ──────────────────────────────────────────── */}
      <section id="education" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="05" c={c} />
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
      <section id="certifications" style={{ padding: '5rem 1.5rem', background: c.timelineBg, transition: 'background 300ms ease' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="06" c={c} />
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.025em', marginBottom: '2rem',
            }}>
              {tr.certsTitle}
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.875rem' }}>
            {CERTS.map((cert, i) => (
              <Reveal key={i} delay={i * 55} variant="scale">
                <CertCard cert={cert} c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="07" c={c} />
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
      <section id="languages" style={{ padding: '3.5rem 1.5rem 5rem', background: c.timelineBg, transition: 'background 300ms ease' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <SectionTag num="08" c={c} />
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
              <ContactButton href={waLink} bg={c.accent1} color="#0F1018" className="btn-shine" glow={c.accent1}>
                <WhatsAppIcon /> WhatsApp
              </ContactButton>
              <ContactButton href={mailLink} bg={c.surface} color={c.text} border={c.border}>
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

function NavLink({ label, onClick, active, c }: { label: string; onClick: () => void; active: boolean; c: typeof C.dark }) {
  return (
    <button
      onClick={onClick}
      className={`nav-link${active ? ' is-active' : ''}`}
      aria-current={active ? 'true' : undefined}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
        color: active ? c.text : c.text2, fontSize: '0.86rem', fontWeight: active ? 600 : 400,
        transition: 'color 200ms ease', fontFamily: 'inherit', padding: '6px 2px',
        ['--nav-accent' as string]: c.accent1,
      }}
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
    <article className="spot-card" onMouseMove={spotMove} onMouseLeave={spotLeave} style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      padding: '1.35rem 1.4rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem',
      borderTop: `3px solid ${p.accent}`,
      ['--spot' as string]: `${p.accent}22`,
      ['--hover-border' as string]: `${p.accent}66`,
      ['--hover-shadow' as string]: `0 16px 36px ${p.accent}22`,
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

// ─── Animation helpers ───────────────────────────────────────────

function spotMove(e: RMouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  el.style.setProperty('--rx', `${(y / r.height - 0.5) * -5}deg`)
  el.style.setProperty('--ry', `${(x / r.width - 0.5) * 5}deg`)
}

function spotLeave(e: RMouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function Typewriter({ words, color }: { words: string[]; color: string }) {
  const reduce = usePrefersReducedMotion()
  const [i, setI] = useState(0)
  const [text, setText] = useState(reduce ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i]
    let t: number
    if (reduce) {
      setText(word)
      t = window.setTimeout(() => setI((i + 1) % words.length), 2800)
    } else if (!deleting && text === word) {
      t = window.setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === '') {
      t = window.setTimeout(() => { setDeleting(false); setI((i + 1) % words.length) }, 250)
    } else {
      t = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 26 : 55,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, words, reduce])

  return (
    <span style={{ color, fontWeight: 600 }}>
      {text}
      <span className="caret" style={{ background: color }} />
    </span>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.4)
  const reduce = usePrefersReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!visible || reduce) return
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, to, reduce])
  return <span ref={ref}>{n}{suffix}</span>
}

function Marquee({ items, c }: { items: string[]; c: typeof C.dark }) {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true" style={{
      borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`,
      padding: '1.05rem 0', overflow: 'hidden', background: c.timelineBg,
    }}>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: c.text2,
            display: 'inline-flex', alignItems: 'center', gap: '1.4rem', paddingRight: '1.4rem', whiteSpace: 'nowrap',
          }}>
            {t}
            <span style={{ color: i % 2 ? c.accent2 : c.accent1, fontSize: '0.55rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function ProcessSteps({ steps, c }: { steps: { t: string; d: string }[]; c: typeof C.dark }) {
  const { ref, visible } = useReveal(0.25)
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="process-line" aria-hidden="true" style={{
        position: 'absolute', top: 21, left: 22, right: 22, height: 2, background: c.border, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: visible ? '100%' : '0%',
          background: `linear-gradient(90deg, ${c.accent1}, ${c.accent2})`,
          transition: `width 1.6s ${EASE} 0.2s`,
        }} />
      </div>
      <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.25rem', position: 'relative' }}>
        {steps.map((st, i) => (
          <li key={st.t} style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
            transition: `opacity 0.7s ${EASE} ${300 + i * 220}ms, transform 0.7s ${EASE} ${300 + i * 220}ms`,
          }}>
            <span style={{
              width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: c.bg, border: `2px solid ${i % 2 ? c.accent2 : c.accent1}`,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.8rem',
              color: i % 2 ? c.accent2 : c.accent1, marginBottom: '0.9rem',
              boxShadow: `0 0 18px ${i % 2 ? c.accent2 : c.accent1}33`,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.35rem' }}>{st.t}</p>
            <p style={{ fontSize: '0.85rem', color: c.text2, lineHeight: 1.6 }}>{st.d}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ServiceIcon({ name }: { name: 'code' | 'doc' | 'users' | 'net' }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'code') return <svg {...common}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  if (name === 'doc') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>
  if (name === 'users') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  return <svg {...common}><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
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
