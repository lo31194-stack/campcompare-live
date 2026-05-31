import { useState } from "react";

export default function App() {
  const [county, setCounty] = useState("All");

  const campsites = [
    { name: "Trevedra Farm", county: "Cornwall", price: 28 },
    { name: "Henry's Campsite", county: "Cornwall", price: 22 },
    { name: "Cofton Holidays", county: "Devon", price: 40 }
  ];

  const filtered = campsites.filter(
    (site) => county === "All" || site.county === county
  );

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🏕️ CampCompare UK</h1>
      <p>Safe live version working.</p>

      <select value={county} onChange={(e) => setCounty(e.target.value)}>
        <option>All</option>
        <option>Cornwall</option>
        <option>Devon</option>
      </select>

      {filtered.map((site) => (
        <div key={site.name} style={{ border: "1px solid #ddd", marginTop: 20, padding: 20 }}>
          <h2>{site.name}</h2>
          <p>{site.county}</p>
          <p>£{site.price} per night</p>
        </div>
      ))}
    </div>
  );
}
