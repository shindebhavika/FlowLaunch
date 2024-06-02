// pages/index.js
"use client"
import { useState } from "react";

import Card from "../components/Card";
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
     <Card></Card>
    </div>
  );
}
