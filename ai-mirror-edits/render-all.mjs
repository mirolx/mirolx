// Usage:
//   node render-all.mjs            -> renders every cut (clean) + the annotated DirectionReel to ./out
//   node render-all.mjs stills     -> renders preview stills of key frames to ./out/stills
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";

const browserExecutable = process.env.REMOTION_CHROME || null;
const mode = process.argv[2] ?? "video";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });

if (mode === "stills") {
  const shots = [
    ["Cut01-ColdOpen", [120, 330]], ["Cut02-CaseFile", [180, 360]], ["Cut03-AIMirror", [280, 450]],
    ["Cut04-Shadow", [330]], ["Cut05-ThreeSelves", [420]], ["Cut06-WhoImNot", [170, 420]], ["Cut07-Reframe", [230, 440]],
  ];
  for (const [id, frames] of shots) {
    for (const frame of frames) {
      const composition = await selectComposition({ serveUrl, id, inputProps: { showDirections: true }, browserExecutable });
      await renderStill({ composition, serveUrl, frame, output: path.resolve(`out/stills/${id}-f${frame}.jpg`), imageFormat: "jpeg", inputProps: { showDirections: true }, browserExecutable, scale: 0.5 });
      console.log("still", id, frame);
    }
  }
} else {
  const ids = mode === "video" ? null : mode.split(",");
  const all = ["DirectionReel", "Cut01-ColdOpen", "Cut02-CaseFile", "Cut03-AIMirror", "Cut04-Shadow", "Cut05-ThreeSelves", "Cut06-WhoImNot", "Cut07-Reframe"];
  for (const id of ids ?? all) {
    const composition = await selectComposition({ serveUrl, id, browserExecutable });
    await renderMedia({ composition, serveUrl, codec: "h264", crf: 20, outputLocation: path.resolve(`out/${id}.mp4`), browserExecutable, concurrency: 4 });
    console.log("rendered", id);
  }
}
