export default function Skills() {
  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '🟢' },
    { name: 'TypeScript', icon: '🟦' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Three.js', icon: '🌌' },
    { name: 'Git', icon: '🔧' },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Skills & Tech Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center">
            <span className="text-4xl mb-2">{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
