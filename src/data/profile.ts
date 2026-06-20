export const profile = {
  name: 'Jaime Candel',
  title: 'Computer Engineer & AI Enthusiast',
  tagline:
    'I build production software across the stack — enterprise backends, computer vision pipelines and mobile apps — with a focus on AI and real-world impact.',
  bio: `I'm a software developer based in Valencia with hands-on experience in enterprise backend systems, computer vision and mobile product development. Professionally I work with C#, Python and Azure at companies like HP and Grupo Alonso; on the side I build my own apps with React Native, TypeScript and Supabase. I also hold an AI Diploma from Samsung Innovation Campus and I'm always looking for the next problem worth solving.`,
  location: 'Valencia, Spain',
  email: 'jcandel01@gmail.com',
  cvUrl: '/cv.pdf',

  links: {
    github: 'https://github.com/jcandel01',
    linkedin: 'https://www.linkedin.com/in/jaime-candel-martinez-4ba7491a2/',
  },

  education: [
    {
      school: 'Universitat Politècnica de València',
      degree: 'Computer Engineering — Ingeniería Informática',
      period: '2020 — 2024',
    },
    {
      school: 'Cambridge University',
      degree: 'English C1 Certificate',
      period: '2023',
    },
  ],

  experience: [
    {
      company: 'Grupo Alonso',
      role: 'Software Developer',
      period: 'Jul 2024 — Present',
      stack: ['C#', 'Entity Framework', 'C++', 'Python', 'Azure', 'SQL', 'Git'],
      bullets: [
        'Backend development for logistics and transport enterprise systems',
        'Business logic with C# and Entity Framework, cloud infra on Azure',
        'Python scripting and automation across internal tooling',
      ],
    },
    {
      company: 'HP',
      role: 'Software Developer',
      period: 'Feb 2024 — Jul 2024',
      stack: ['C#', 'C++', 'Python', 'Azure', 'Microservices', 'Git'],
      bullets: [
        'Built microservices in Python and C# for internal HP platforms',
        'Low-level components in C++, integrated with Azure DevOps pipelines',
      ],
    },
    {
      company: 'F1 Connecting',
      role: 'Software Developer',
      period: 'Jan 2024 — Feb 2024',
      stack: ['C#', 'SQL'],
      bullets: [
        'Backend development in C# with relational database management in SQL',
      ],
    },
    {
      company: 'PYGSAGROUP',
      role: 'Software Developer',
      period: 'Jul 2023 — Dec 2023',
      stack: ['Python', 'C#', 'OpenCV', 'Cognex Vision Pro'],
      bullets: [
        'Computer vision solutions for industrial quality control processes',
        'Image processing pipelines with OpenCV and Cognex Vision Pro',
      ],
    },
  ],

  courses: [
    { name: 'AI Diploma — Samsung Innovation Campus', issuer: 'Universitat Politècnica de València', hours: '350h' },
    { name: 'React + TypeScript — The Complete Guide', issuer: 'Udemy', hours: '58h' },
    { name: '100-Hour Linux Course', issuer: 'LinuxFoundationX · UPValenciaX', hours: '100h' },
    { name: 'Machine Learning: Data Science en Python', issuer: 'Udemy', hours: '' },
    { name: 'Machine Learning Crash Course', issuer: 'Google', hours: '' },
    { name: 'Google Cloud Platform', issuer: 'Udemy', hours: '' },
    { name: 'Django con Python', issuer: 'Udemy', hours: '' },
    { name: 'Maestro de Python', issuer: 'Udemy', hours: '' },
    { name: 'NoSQL — Neo4j', issuer: 'Self-study', hours: '' },
    { name: 'Introducción a C desde Cero', issuer: 'Udemy', hours: '' },
  ],

  skills: [
    {
      group: 'Languages',
      items: ['Python', 'C#', 'TypeScript', 'JavaScript', 'C', 'C++', 'Java', 'SQL'],
    },
    {
      group: 'Frontend & Mobile',
      items: ['React', 'React Native', 'Expo', 'Next.js', 'Tailwind CSS', 'HTML + CSS', 'Xamarin'],
    },
    {
      group: 'Backend & Cloud',
      items: ['Supabase', 'PostgreSQL', 'Entity Framework', 'Django', 'Azure', 'Microservices', 'REST APIs'],
    },
    {
      group: 'AI & Vision',
      items: ['OpenCV', 'Cognex Vision Pro', 'Machine Learning', 'Google Cloud', 'ROS2', 'PyTorch', 'TensorFlow', ],
    },
    {
      group: 'Tools',
      items: ['Git', 'GitHub Actions', 'Linux', 'Azure DevOps', 'Vite', 'Docker', 'Figma', 'Jira', 'Notion'],
    },
  ],

  languages: [
    { name: 'Spanish', level: 'Native',      pct: 100, flag: '🇪🇸' },
    { name: 'English', level: 'C1 Cambridge', pct: 85,  flag: '🇬🇧' },
    { name: 'German',  level: 'A1 · Growing', pct: 15,  flag: '🇩🇪' },
  ],
}

export type Profile = typeof profile
