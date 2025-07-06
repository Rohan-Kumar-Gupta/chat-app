import React from "react";

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`;
  return color;
};

const Avatar = ({ name, size = 40 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const backgroundColor = stringToColor(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: size / 2,
        textTransform: "uppercase",
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
