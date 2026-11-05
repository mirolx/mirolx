import React from "react";
import { useCurrentFrame } from "remotion";
import { lerp, prog } from "../theme";

/** Word-by-word reveal: each word rises and un-blurs. Feels like a thought forming. */
export const Words: React.FC<{
  text: string;
  start: number;
  stagger?: number;
  dur?: number;
  style?: React.CSSProperties;
  wordStyle?: (word: string, i: number) => React.CSSProperties | undefined;
}> = ({ text, start, stagger = 4, dur = 22, style, wordStyle }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <span style={style}>
      {words.map((w, i) => {
        const p = prog(frame, start + i * stagger, dur);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: p,
              transform: `translateY(${lerp(18, 0, p)}px)`,
              filter: `blur(${lerp(8, 0, p)}px)`,
              ...wordStyle?.(w, i),
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
};

/** Typewriter with a blinking caret. */
export const Typed: React.FC<{
  text: string;
  start: number;
  cps?: number; // characters per second
  caret?: boolean;
  caretColor?: string;
  style?: React.CSSProperties;
}> = ({ text, start, cps = 22, caret = true, caretColor = "currentColor", style }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - start) / 30) * cps)));
  const done = n >= text.length;
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && frame >= start && (!done || blink) && (
        <span style={{ display: "inline-block", width: "0.06em", height: "0.9em", background: caretColor, marginLeft: 4, verticalAlign: "-0.1em" }} />
      )}
    </span>
  );
};

/** Small uppercase label used for chapter / theory tags. */
export const Kicker: React.FC<{ children: React.ReactNode; color: string; opacity?: number; style?: React.CSSProperties }> = ({
  children,
  color,
  opacity = 1,
  style,
}) => (
  <div
    style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 20,
      letterSpacing: 6,
      textTransform: "uppercase",
      color,
      opacity,
      ...style,
    }}
  >
    {children}
  </div>
);
