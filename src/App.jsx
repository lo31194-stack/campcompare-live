import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function App() {
  const [county, setCounty] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60);
  const [maxSea, setMaxSea] = useState(20);
  const [facility, setFacility] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [ownerMode, setOwnerMode] = useState(false);
 const [favourites, setFavourites] = useState(() => {
  const saved = localStorage.getItem("campcompare-favourites");
  return saved ? JSON.parse(saved) : [];
});
const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
const [recentlyViewed, setRecentlyViewed] = useState(() => {
  const [newSite, setNewSite] = useState({
  name: "",
  county: "",
  price: "",
});
  const saved = localStorage.getItem("campcompare-recently-viewed");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("campcompare-favourites", JSON.stringify(favourites));
}, [favourites]);
  const campsites = [
    {
      name: "Trevedra Farm",
      lat: 50.061,
lng: -5.69,
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
      lat: 50.238,
lng: -5.182,
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
      lat: 50.603,
lng: -3.468,
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

  function toggleFavourite(siteName) {
    if (favourites.includes(siteName)) {
      setFavourites(favourites.filter((name) => name !== siteName));
    } else {
      setFavourites([...favourites, siteName]);
    }
  }

  const filtered = campsites
    .filter(
      (site) =>
        (county === "All" || site.county === county) &&
        site.price <= maxPrice &&
        site.seaDistance <= maxSea &&
        (facility === "All" || site.facilities.includes(facility)) &&
        (!showFavouritesOnly || favourites.includes(site.name))
    )
    .sort((a, b) => {
      if (sortBy === "Lowest Price") return a.price - b.price;
      if (sortBy === "Highest Rating") return b.rating - a.rating;
      if (sortBy === "Closest to Sea") return a.seaDistance - b.seaDistance;
      return 0;
    });
    function markAsViewed(siteName) {
  const updated = [siteName, ...recentlyViewed.filter((name) => name !== siteName)];
  setRecentlyViewed(updated.slice(0, 3));
}

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 1100, margin: "0 auto" }}>
      <h1>🏕️ CampCompare UK</h1>
      <p>Compare UK campsites by price, beach distance, shops, facilities and reviews.</p>
      <p>❤️ {favourites.length} favourite campsite(s) saved</p>
<button
  onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
  style={{
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #ddd",
    marginBottom: 20,
    cursor: "pointer"
  }}
  
>
  {showFavouritesOnly ? "Show All Campsites" : "View Favourites Only"}
</button>
{recentlyViewed.length > 0 && (
  <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 12, marginBottom: 20 }}>
    <h3>👀 Recently Viewed</h3>
    {recentlyViewed.map((name) => (
      <p key={name}>🏕️ {name}</p>
    ))}
  </div>
)}

      <button
        onClick={() => setOwnerMode(!ownerMode)}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#2e8b57",
          color: "white",
          marginBottom: 20,
          cursor: "pointer"
        }}
      >
        {ownerMode ? "Back to Campsites" : "Owner Dashboard"}
      </button>

      {ownerMode && (
        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12, marginBottom: 25 }}>
          <h2>👤 Owner Dashboard</h2>

<input
  type="text"
  placeholder="Campsite Name"
  value={newSite.name}
  onChange={(e) =>
    setNewSite({ ...newSite, name: e.target.value })
  }
/>

<br /><br />

<input
  type="text"
  placeholder="County"
  value={newSite.county}
  onChange={(e) =>
    setNewSite({ ...newSite, county: e.target.value })
  }
/>

<br /><br />

<input
  type="number"
  placeholder="Price Per Night"
  value={newSite.price}
  onChange={(e) =>
    setNewSite({ ...newSite, price: e.target.value })
  }
/>

<br /><br />

<button>
  Submit Listing
</button>
        </div>
      )}

<button
  onClick={() => markAsViewed(site.name)}
  style={{
    marginTop: 10,
    marginLeft: 8,
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    cursor: "pointer"
  }}
>
  👀 Mark as Viewed
</button>
      <MapContainer
  center={[50.4, -4.8]}
  zoom={8}
  style={{
    height: 350,
    width: "100%",
    borderRadius: 12,
    marginBottom: 25
  }}
>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {filtered.map((site) => (
    <CircleMarker
      key={site.name}
      center={[site.lat, site.lng]}
      radius={10}
    >
      <Popup>
        <strong>{site.name}</strong>
        <br />
        £{site.price} per night
        <br />
        ⭐ {site.rating}/5
      </Popup>
    </CircleMarker>
  ))}
</MapContainer>
      /

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

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Recommended</option>
          <option>Lowest Price</option>
          <option>Highest Rating</option>
          <option>Closest to Sea</option>
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

            <button
              onClick={() => toggleFavourite(site.name)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: "pointer"
              }}
            >
              {favourites.includes(site.name) ? "❤️ Saved" : "🤍 Save Favourite"}
            </button>

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
