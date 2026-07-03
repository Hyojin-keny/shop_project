import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 40,
        padding: 20,
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        fontSize: 14,
        color: "#555",
      }}
    >
      © {new Date().getFullYear()} Blossom Co. All rights reserved.
    </footer>
  );
}