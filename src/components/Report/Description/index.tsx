import React from "react";

interface DescriptionProps {
  url: string;
}

export const Description: React.FC<DescriptionProps> = ({ url }) => {
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "500px",
        paddingLeft: 0,
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-block",
            fontWeight: 600,
            marginRight: "8px",
            color: "#222",
          }}
        >
          URL:
        </span>
        <span style={{ color: "#555", wordBreak: "break-word" }}>{url}</span>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-block",
            fontWeight: 600,
            marginRight: "8px",
            color: "#222",
          }}
        >
          Дата:
        </span>
        <span style={{ color: "#555" }}>{formattedDate}</span>
      </div>
    </div>
  );
};
