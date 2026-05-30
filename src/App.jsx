import { useState } from "react";

export default function App() {
  const [county, setCounty] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60);
  const [maxSea, setMaxSea] = useState(20);
  const [facility, setFacility] = useState("All");

  const campsites = [
    {
      name: "Trevedra Farm",
      county: "Cornwall",
      price: 28,
      seaDistance: 0.3,
      shopDistance: 1.5,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      attractions: ["Land's End", "Minack Theatre", "Sennen Cove"],
      facilities: ["Dog Friendly", "Showers", "Electric Hookup"],
      rating: 4.8,
      reviews: [
        { name: "Sarah", text: "Fantastic location, really close to the beach." },
        { name: "David", text: "Clean facilities and a lovely peaceful stay." }
      ]
    },
    {
      name: "Henry's Campsite",
      county: "Cornwall",
      price: 22,
      seaDistance: 1.2,
      shopDistance: 2,
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7",
      attractions: ["St Ives", "Tate St Ives", "Carbis Bay"],
      facilities: ["Dog Friendly", "Campfires Allowed"],
      rating: 4.6,
      reviews: [
        { name: "Emma", text: "Quirky, friendly and great for a relaxed trip." },
        { name: "James", text: "Loved the atmosphere and dog-friendly setup." }
      ]
    },
    {
      name: "Cofton Holidays",
      county: "Devon",
      price: 40,
      seaDistance: 0.8,
      shopDistance: 1.2,
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7",
      attractions: ["Dawlish Warren", "Powderham Castle", "Exmouth Beach"],
      facilities: ["Swimming Pool", "Showers", "Electric Hookup"],
      rating: 4.7,
      reviews: [
        { name: "Kelly", text: "Brilliant for families and lots to do nearby." },
        { name: "Tom", text: "Great facilities, easy access to beaches and shops." }
      ]
    }
  ];

  const filtered = campsites.filter(
    (site) =>
      (county === "All" || site.county === county) &&
      site.price <= maxPrice &&
      site.seaDistance <= maxSea &&
      (facility === "All" || site.facilities.includes(facility))
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 1100, margin: "0 auto" }}>
      <h1>🏕️ CampCompare UK</h1>
      <p>Compare UK campsites by price, beach distance, shops, facilities and reviews.</p>

      <iframe
        title="CampCompare Map"
        width="100%"
        height="350"
        style={{ border: 0, borderRadius: 12, marginBottom: 25 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=-6.0%2C49.9%2C-3.0%2C51.5&layer=mapnik"
      />

      <div style={{ display: "flex", gap: 15, flexWrap: "wrap", marginBottom: 25 }}>
        <select value={county} onChange={(e) => setCounty(e.target.value)}>
          <option>All</option>
          <option>Cornwall</option>
          <option>Devon</option>
        </select>

        <label>
          Max price: £{maxPrice}
          <input
            type="range"
            min="10"
            max="60"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>

        <label>
          Max sea distance: {maxSea} miles
          <input
            type="range"
            min="0"
            max="20"
            value={maxSea}
            onChange={(e) => setMaxSea(Number(e.target.value))}
          />
        </label>

        <select value={facility} onChange={(e) => setFacility(e.target.value)}>
          <option>All</option>
          <option>Dog Friendly</option>
          <option>Showers</option>
          <option>Electric Hookup</option>
          <option>Campfires Allowed</option>
          <option>Swimming Pool</option>
        </select>
      </div>

      <h2>{filtered.length} campsites found</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {filtered.map((site) => (
          <div key={site.name} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18 }}>
            <img
              src={site.image}
              alt={site.name}
              style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }}
            />

            <h3>{site.name}</h3>
            <p>⭐ {site.rating}/5 rating</p>
            <p>📍 {site.county}</p>
            <p>💷 £{site.price} per night</p>
            <p>🌊 {site.seaDistance} miles to sea</p>
            <p>🛒 {site.shopDistance} miles to shop</p>
            <p>✅ {site.facilities.join(", ")}</p>

            <h4>💬 Reviews</h4>
            {site.reviews.map((review) => (
              <div key={review.name} style={{ background: "#f7f7f7", padding: 10, borderRadius: 8, marginBottom: 8 }}>
                <p>"{review.text}"</p>
                <strong>- {review.name}</strong>
              </div>
            ))}

            <h4>🎢 Days out within 30 miles</h4>
            {site.attractions.map((place) => (
              <button
                key={place}
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`,
                    "_blank"
                  )
                }
                style={{ margin: 4 }}
              >
                {place}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
