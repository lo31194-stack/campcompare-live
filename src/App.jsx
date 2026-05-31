import { useState } from "react";

export default function App() {
  const [county, setCounty] = useState("All");
const [maxPrice, setMaxPrice] = useState(60);

  const campsites = [
    {
      name: "Trevedra Farm",
      county: "Cornwall",
      price: 28,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
    },
    {
      name: "Henry's Campsite",
      county: "Cornwall",
      price: 22,
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7"
    },
    {
      name: "Cofton Holidays",
      county: "Devon",
      price: 40,
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7"
    }
  ];

 const filtered = campsites.filter(
  (site) =>
    (county === "All" || site.county === county) &&
    site.price <= maxPrice
    <label style={{ marginLeft: 20 }}>
  Max Price: £{maxPrice}
  <input
    type="range"
    min="10"
    max="60"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
  />
</label>
);

  return (
    <div style={{ padding: 30, fontFamily: "Arial", maxWidth: 1100, margin: "0 auto" }}>
      <h1>🏕️ CampCompare UK</h1>
      <p>Compare UK campsites with photos.</p>

      <select value={county} onChange={(e) => setCounty(e.target.value)}>
        <option>All</option>
        <option>Cornwall</option>
        <option>Devon</option>
      </select>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 25 }}>
        {filtered.map((site) => (
          <div key={site.name} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18 }}>
            <img
              src={site.image}
              alt={site.name}
              style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }}
            />
            <h2>{site.name}</h2>
            <p>📍 {site.county}</p>
            <p>💷 £{site.price} per night</p>
          </div>
        ))}
      </div>
    </div>
  );
}
