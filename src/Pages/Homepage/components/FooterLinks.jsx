export default function FooterLinks() {
  const links = [
    { title: "Top Features", items: ["Music distributions", "Music career funding", "Top-notch Music business training and mentorship", "Concerts/events performances", "Record Label Recommendations"] },
    { title: "Useful Links", items: ["Home", "Discover Musics", "Top Albums", "Playlists", "About", "Contact/Support", "FAQ"] },
    { title: "Legal", items: ["Terms", "Privacy", "Security"] },
  ]

  return (
    <div className="py-16 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {links.map(col => (
          <div key={col.title}>
            <h4 className="font-bold text-orange-600 mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {col.items.map(item => (
                <li key={item}><a href="#" className="hover:text-orange-600 transition">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-bold text-orange-600 mb-4">Contact</h4>
          <p className="text-sm text-gray-600">
            House 3, Road 11, Maryland Estate<br />
            Lekki, Lagos State<br />
            support@mayvibe.com<br />
            mayvibeofficial@gmail.com<br />
            +234 706 123 4567
          </p>
        </div>
      </div>
    </div>
  )
}