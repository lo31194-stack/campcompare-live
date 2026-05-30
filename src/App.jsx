 import { useState } from "react";

export default function App() {
  const [county, setCounty] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60);
  const [maxSea, setMaxSea] = useState(20);
  const [facility, setFacility] = useState("All");
const [sortBy, setSortBy] = useState("Recommended");
const [ownerMode, setOwnerMode] = useState(false);
const campsites = [
    {
      name: "Trevedra Farm",
      county: "Cornwall",
      price: 28,
      seaDistance: 0.3,
      shopDistance: 1.5,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      attractions: ["Land's End",
