import Image1 from '../../../../../assets/Subscribers1.png'
import Image2 from '../../../../../assets/Subscribers2.png'
import Image3 from '../../../../../assets/Subscribers3.png'

export default function ProjectsSection() {
  const projects = [
    {
      artwork: Image1,
      title: "UY Scuti",
      artist: "Junior"
    },
    {
      artwork: Image2,
      title: "Made In Lagos",
      artist: "Junior"
    },
    {
      artwork: Image3,	
      title: "A Better Time",
      artist: "Junior"
    },
    {
      artwork: Image1,
      title: "Twice As Tall",
      artist: "Junior"
    },
    {
      artwork: Image2,
      title: "Rave & Roses",
      artist: "Junior"
    }
  ];

  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Projects</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Circular Artwork */}
            <div className="relative mb-5 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48">
              <img
                src={project.artwork}
                alt={project.title}
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-white group-hover:ring-orange-500/30 transition-all duration-300"
              />
              {/* Subtle hover scale */}
              <div className="absolute inset-0 rounded-full group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Title & Artist */}
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {project.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}