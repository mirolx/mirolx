# The AI Mirror, ep. 01: visual direction cuts

Remotion motion-graphics inserts for the script **"What If the People You Dislike Are More Like You Than You Think?"**

These are not a full edit. They are seven designed inserts for the moments where the script turns. Everything between them stays as your A-roll (talking head) and B-roll. The cut list below says exactly where each insert drops in and how to cut into and out of it.

## Run it

```bash
npm install
npm run studio          # preview and tweak in Remotion Studio
npm run render:all      # -> out/DirectionReel.mp4 (annotated) + out/Cut0X-*.mp4 (clean)
```

- **DirectionReel** plays all seven cuts back to back, with an editor's slate on each one. It's for review.
- **Cut01 … Cut07** are clean versions with no slate. Drop these onto your timeline.
- Every cut opens and closes with a 10-frame dip, so you have handles to trim or cross-dissolve.
- 1920×1080, 30 fps. Total ≈ 1:41 of inserts across a 9:30 video.

## Look

| Element | Choice | Why |
|---|---|---|
| Palette | Journal paper `#EEE8DF` / charcoal `#121315` / one dusty rose `#B0716A` | **Paper** is the thinking-out-loud world (theory, journal). **Night** is the inner world (mirror, AI chat, realisations). Rose appears only on what matters. |
| Type | Cormorant Garamond (voice), Inter (labels), JetBrains Mono (kickers/tags) | Intellectual and quiet, not a textbook. Italics carry the "inner voice." |
| Motion | Word-by-word un-blur, slow 2–3.5% push-in, typewriter for anything *asked* | Text forms like a thought instead of popping in. |
| Texture | Animated grain + vignette on every insert | The graphics sit next to camera footage without looking pasted on. |

## Cut list

| # | Insert | Script moment (approx. TC) | Cut in on | What happens |
|---|---|---|---|---|
| 01 | **Cold Open: Mirror** (12s) | Ch.1, 0:00 | First frame of the video | The line plays on both sides of a mirror seam. The reflection lags, then sharpens. The seam wipes open to paper → title card. |
| 02 | **Case File** (13s) | Ch.2, ≈2:00 | "…simply a matter of taste." | Four "layers of dislike" cards land. Three dim, and a red pen circles *Personal association* on "my ex-boyfriend actually liked her." Then it types: *"What does he actually see in her?"* |
| 03 | **The AI Mirror** (16s) | Ch.3, 2:40–3:50 | "And one particular discovery really stood out to me." | A stylised chat: your prompt, the reply streaming in, the quiz with **B** selected. Then the chat blurs back and the key line punches in with a highlighter swipe. |
| 04 | **The Shadow** (13s) | Ch.4 Theory 1, ≈4:40 | "Then there's Carl Jung's concept of the shadow." | A shadow grows behind the "who I think I am" circle. *Ambition, confidence, assertiveness, being admired* drift into it. Hold on "Not necessarily negative." |
| 05 | **Three Selves** (15s) | Ch.4 Theory 2, ≈5:20 | "Our actual self…" | Actual, Ideal and Ought rings draw on. Your own words write in underneath. Ideal dims, and a dashed gap arcs between Actual and Ought: *"I downplay my achievements so I won't be seen as arrogant."* |
| 06 | **Who I'm Not** (15s) | Ch.5, ≈7:20 | "We also want to establish who we are not." | Three "I can be X / without being Y" pairs. Then a her/me overlap of *ambition · creativity · drive* pulls apart → *"Similarity doesn't mean identity."* |
| 07 | **The Reframe** (16s) | Ch.7, ≈9:05 | "…instead of immediately asking," | *"What's wrong with them?"* types, gets struck through, and lifts away. *"Why does this bother me so much?"* types in. Fade to night: *"Humility doesn't require self-minimization."* |

## Extra direction (not in the original chat)

**Between the inserts**
- **Two-camera feel from one camera.** Shoot the talking head in 4K and alternate a wide and a 1.3× punch-in at sentence breaks. Use the punch-in on every personal admission ("I don't want to look like a show-off").
- **J-cuts into every insert.** Start the VO line about 6–10 frames before the graphic appears, so the image answers the voice instead of announcing it.
- **The "beat of silence."** Right before Cut 03's key line and before Cut 07's final card, drop all music for ~12 frames (room tone only). That silence lands the realisation harder than any effect.
- **Recurring mirror motif.** In Ch.1 and Ch.5 B-roll, shoot one take *through* a mirror and one *at* it. In the edit, match-cut from your reflection to Cut 01's mirror seam, and from Cut 06's separating circles to you turning away from the mirror.
- **Chapter cards.** Re-use the Kicker style (`THEORY 01 · CARL JUNG`) as a 2-second lower-left tag over A-roll at each chapter start, instead of full-screen chapter cards. It keeps the documentary flow.

**Grade and sound**
- **Grade:** warm, lifted blacks (paper-like). Skin a touch desaturated. Night scenes with a slight teal shadow so the rose accent pops.
- **Music:** one ambient/R&B bed. Filter it (low-pass) during the theory section, then open it back up on "My biggest realization" (Ch.5).
- **Foley:** pen scratch under Cut 02's red circle, soft keyboard ticks under every typewriter line, and a paper slide on the case-file cards. Keep it at −24 dB, felt more than heard.

**Responsible framing** (built into the cuts)
- Cut 02 carries an on-screen note that this is your *interpretation of an artistic persona*, and it uses no photos of the artist.
- Cut 03 is tagged *"AI as a reflection partner, not a mind reader,"* which matches the chat's own caveat.

## Customising

- Change wording in `src/cuts/C0X*.tsx`. All timings are frame numbers (30 = 1s), so shift them to match your actual VO.
- Swap Cut 03's mock chat for your real screen recording: replace the chat panel block with `<OffthreadVideo src={staticFile("chat.mp4")} />` and keep the key-line punch-in.
- Colours and fonts live in `src/theme.ts`.

## Bold variant (second style)

`src/bold/` is a second take on all seven cuts. It's styled after creator-explainer graphics: a cream canvas, bold rounded navy type (Poppins), one mustard accent, white pill callouts and ring counters. The beats and durations match the main set, so you can swap either set into the same timeline slot.

```bash
node render-all.mjs bold        # -> out/BoldDirectionReel.mp4 + out/Bold0X-*.mp4
node render-all.mjs everything  # both sets
```

The motion follows Emil Kowalski's standards (animations.dev):
- **Entrances:** pills pop in over ~333ms with `cubic-bezier(0.23, 1, 0.32, 1)`, growing from 95% size plus a fade and a 12px rise. Never from zero size.
- **On-screen moves:** ring draws, the rings pulling apart, and scene swaps use `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Groups:** stagger 67ms (2 frames).
- **Selections:** state changes snap in ~170ms, like a tap.
- **Handles:** each cut fades in and out from the cream background, not from black, to suit the bright look.
