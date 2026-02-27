'use client';

import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="loader-backdrop">
      <PuffLoader color="#8a8a89" size={100} speedMultiplier={0.8} />
    </div>
  );
}