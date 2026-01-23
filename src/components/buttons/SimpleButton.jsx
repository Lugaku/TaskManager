import { buttonTokens } from "../../tokens/buttonTokens";

export default function Button({
  children,
  color = "blue",
  size = "md",
  onClick,
  translate = "none",
  className = "",
}) {
  const c = buttonTokens;

  return (
    <button
      onClick={onClick}
      className={`shadow-1xl rounded-2xl
        ${c.colors[color].base}
        ${c.colors[color].hover}
        ${c.colors[color].text}
        ${c.sizes[size]}
        ${c.translates[translate]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}