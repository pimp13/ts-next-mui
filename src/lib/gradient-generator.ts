export type GradientColor = {
  color: string;
  stop?: string;
};

export type GradientOptions = {
  type?: "linear" | "radial";
  colors: (string | GradientColor)[];
  angle?: number;
  shape?: "circle" | "ellipse";
  position?: string;
};


export function createGradient({
  type = "linear",
  colors,
  angle = 135,
  shape = "ellipse",
  position = "center",
}: GradientOptions): string {
  const colorStops = colors
    .map((item) => {
      if (typeof item === "string") return item;
      return `${item.color}${item.stop ? ` ${item.stop}` : ""}`;
    })
    .join(", ");

  if (type === "radial") {
    return `radial-gradient(${shape} at ${position}, ${colorStops})`;
  }

  return `linear-gradient(${angle}deg, ${colorStops})`;
}



export function createAuroraGradient(
  primary: string,
  secondary: string,
  background: string
): string {
  return `
    radial-gradient(
      circle at 15% 20%,
      ${primary} 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 85% 80%,
      ${secondary} 0%,
      transparent 45%
    ),
    linear-gradient(
      135deg,
      ${background} 0%,
      ${background} 100%
    )
  `;
}