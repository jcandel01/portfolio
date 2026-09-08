export const profile = {
  name: 'Jaime Candel',
  title: 'Computer Engineer & AI Enthusiast',
  // Hero subtext: kept under 20 words so the hero fits the first viewport.
  tagline:
    'I build production software across the stack: enterprise backends, computer vision pipelines and mobile apps.',
  bio: `I'm a software developer based in Valencia with hands-on experience in enterprise backend systems, computer vision and mobile product development. Professionally I work with C#, Python and Azure at companies like HP and Grupo Alonso; on the side, my main focus lies in robotics and autonomous systems, developing applications and simulations using ROS 2, Gazebo, and PX4 in C++ and Python. While I also have experience building mobile architectures with React Native and Supabase, my true passion is bridging software and physical systems. I also hold an AI Diploma from Samsung Innovation Campus and I'm always looking for the next complex problem worth solving.`,
  location: 'Valencia, Spain',
  email: 'jcandel01@gmail.com',
  cvUrl: '/JCM_CV.pdf',

  links: {
    github: 'https://github.com/jcandel01',
    linkedin: 'https://www.linkedin.com/in/jaime-candel-martinez-4ba7491a2/',
  },

  education: [
    {
      school: 'Universitat Politècnica de València',
      degree: 'Computer Engineering (Ingeniería Informática)',
      period: '2020 to 2024',
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
      period: 'Jul 2024 to Present',
      stack: ['C#', 'Entity Framework', 'C++', 'Python', 'Azure', 'SQL', 'Git'],
      bullets: [
        'Backend development for logistics and transport enterprise systems',
        'Business logic with C# and Entity Framework, cloud infra on Azure',
        'Python scripting and automation across internal tooling',
        'Testing and debugging of C# components for internal use',
        'Database management with SQL Server and PostgreSQL, including migrations and performance tuning',
      ],
    },
    {
      company: 'HP',
      role: 'Software Developer',
      period: 'Feb 2024 to Jul 2024',
      stack: ['C#', 'C++', 'Python', 'Azure', 'Microservices', 'Git'],
      bullets: [
        'Built microservices in Python and C# for internal HP platforms',
        'Developed and maintained Python scripts for data processing and automation',
        'Developed a simulation tool for HP internal use in C++ with OpenGL and ImGui',
        'Low-level components in C++, integrated with Azure DevOps pipelines',
      ],
    },
    {
      company: 'F1 Connecting',
      role: 'Software Developer',
      period: 'Jan 2024 to Feb 2024',
      stack: ['C#', 'SQL'],
      bullets: ['Backend development in C# with relational database management in SQL'],
    },
    {
      company: 'PYGSAGROUP',
      role: 'Software Developer',
      period: 'Jul 2023 to Dec 2023',
      stack: ['Python', 'C#', 'OpenCV', 'Cognex Vision Pro', 'pytorch', 'C++'],
      bullets: [
        'Computer vision solutions for industrial quality control processes',
        'Image processing pipelines with OpenCV and Cognex Vision Pro',
      ],
    },
  ],

  // The four that carry real weight. The long-tail course list lives on the CV,
  // not on the page: a 10-row list here would be a data dump.
  certifications: [
    { name: 'AI Diploma, Samsung Innovation Campus', issuer: 'Universitat Politècnica de València', hours: '350h' },
    { name: 'React + TypeScript: The Complete Guide', issuer: 'Udemy', hours: '58h' },
    { name: '100-Hour Linux Course', issuer: 'LinuxFoundationX, UPValenciaX', hours: '100h' },
    { name: 'Machine Learning Crash Course', issuer: 'Google', hours: '360h' },
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
      items: ['OpenCV', 'Cognex Vision Pro', 'Machine Learning', 'Google Cloud', 'ROS2', 'PyTorch', 'TensorFlow'],
    },
    {
      group: 'Tools',
      items: ['Git', 'GitHub Actions', 'Linux', 'Azure DevOps', 'Vite', 'Docker', 'Figma', 'Jira', 'Notion'],
    },
  ],

  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C1 Cambridge' },
    { name: 'German', level: 'A1, growing' },
  ],
}

export type Profile = typeof profile
