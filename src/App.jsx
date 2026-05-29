export default function App() {
  const campsites = [
    { name: "Trevedra Farm", county: "Cornwall", price: 28, seaDistance: 0.3, shopDistance: 1.5 },
    { name: "Henry's Campsite", county: "Cornwall", price: 22, seaDistance: 1.2, shopDistance: 2 },
    { name: "Cofton Holidays", county: "Devon", price: 40, seaDistance: 0.8, shopDistance: 1.2 }
  ];

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 1100, margin: "0 auto" }}>
      <h1>🏕️ CampCompare UK</h1>
      <p>Compare UK campsites by price, location and nearby facilities.</p>

      {campsites.map((site) => (
        <div key={site.name} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <h2>{site.name}</h2>
          <p>📍 {site.county}</p>
          <p>💷 £{site.price} per night</p>
          <p>🌊 {site.seaDistance} miles to sea</p>
          <p>🛒 {site.shopDistance} miles to shop</p>
        </div>
      ))}
    </div>
  );
}