import React from "react";

export default function MissingSection({ type, ...sectionData }) {
  return (
    <div>
      <h3>Missing a template for {type}</h3>
      <p>Check console for component details</p>
    </div>
  );
}
