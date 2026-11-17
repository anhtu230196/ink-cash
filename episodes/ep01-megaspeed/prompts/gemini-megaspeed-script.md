You are the head writer of a faceless YouTube channel that makes 2D cartoon explainers for a US audience, in the style "The Rise of X Explained Like You're 5". Write a complete, production-ready English narration script for this topic:

TOPIC: How a Singapore company called Megaspeed allegedly got billions of dollars of Nvidia AI chips working for Chinese companies, and how its former managing director, Alice Huang, allegedly got close to Nvidia CEO Jensen Huang.

Use Google Search / Deep Research. Work in three parts and output all three.

==================================================
PART 1 — FACT SHEET (do this before writing anything)
==================================================
Build a numbered source list and a fact table with columns: claim | status (CONFIRMED / REPORTED-ALLEGED / DENIED / UNVERIFIED) | who says it | source #.

Start from these leads and verify each one yourself; add the latest developments:
1. Megaspeed is a Singapore-based data-centre company and an Nvidia Cloud Partner. Its former managing director is Alice Huang (Huang Le). She is NOT related to Jensen Huang despite the shared surname.
2. The New York Times, citing trade records: Megaspeed's Malaysian affiliate bought at least $4.8 billion of equipment containing Nvidia chips between June 2024 and February 2026.
3. The Information / Fortune: at least $7.5 billion of Nvidia chips moved through Megaspeed and its Malaysian subsidiary Speedmatrix; Chinese companies used the computing power remotely.
4. NYT and Financial Times, citing people familiar with US intelligence: China's Ministry of State Security allegedly recruited Alice Huang, reportedly to gather information on Jensen Huang and influence Nvidia's push to sell advanced chips to China.
5. Photos show her near Jensen Huang at events in Taipei in 2024 and 2025.
6. China's embassy rejected the allegations. Singapore's Ministry of Home Affairs said it had not investigated Alice Huang (as reported), while Singapore separately said it is investigating Megaspeed for suspected breaches of domestic law.
7. Nvidia told Bloomberg it stopped doing business with Megaspeed.
8. Claims circulating online: "US intelligence was listening to her calls and heard Jensen's name" and "for almost two years nobody told Jensen". Mark these UNVERIFIED unless you find a named, reputable outlet reporting them; if not found, leave them out of the script.
Background to verify: US export controls on advanced AI chips to China (2022, 2023, H20 episode in 2025), why renting cloud compute from outside China was a gap, Jensen Huang's public statements on the China market (real quotes only, with source).

==================================================
PART 2 — STORY MATERIAL SHEET (short answers)
==================================================
- Hook number: the biggest verified number + compare it to 2 things Americans already know.
- The bet (one sentence, format "Prove that ___ can ___"): use Washington's bet — "Prove that if China can't BUY the chips, it can't build top AI." The story tests that bet.
- The loophole in one kid-level image (e.g. you can't sell the kid candy, but nobody said you can't rent him the candy store next door).
- The reasonable opponent: Nvidia's/Jensen's strongest argument for selling to China (real, sourced).
- Two disasters close in time; the twist; the two sides of today's debate (export controls are a sieve vs. controls are working); a closing quote by a real, attributable person that fits the theme.

==================================================
PART 3 — THE SCRIPT (~15 minutes = ~2,250 spoken words at 150 wpm)
==================================================
Beats and word budgets (adapt freely, keep the order logic):
B01 HOOK (~45): today's number → 2 comparisons → photo of two Huangs side by side → 2 questions → "Well, it all started with…"
B02 THE CANDY EVERYONE WANTS (~190): what an Nvidia GPU is, ELI5; why AI runs on it; quick Jensen origin with one dry joke.
B03 THE WALL + THE BET (~310): US export controls explained ELI5 → Jensen's dilemma (his real, sourced position) → a fictional skit between a generic US official and a generic chip salesman → {BET}.
B04 THE LOOPHOLE (~135): you can't ship chips to China, but computing can travel over the internet; ELI5 cloud renting; end with an open loop.
(No B05: the channel has no sponsor. End B04 with an open loop that leads straight into B06. Target runtime is ~13 minutes, ~1,950 words.)
B06 ENTER MEGASPEED (~195): DATE card; Singapore → Malaysia data centres; Nvidia Cloud Partner; Alice Huang introduced strictly with "according to…" attribution.
B07 THE SCALE (~335): trade records, $4.8B then $7.5B, Speedmatrix; ELI5 conversion of the numbers (how many chips / how much AI that is); photos at Taipei events (presence ≠ wrongdoing).
B08 THE ALLEGATION (~350): what NYT/FT report about the Ministry of State Security, with attribution in every sentence; what the alleged goal was; open loop.
B09 DENIALS + FALLOUT (~180): China's denial, Singapore's statements, Nvidia cutting ties; callback to {BET}: is the wall working?
B10 THE DEBATE TODAY (~270): two fictional generic characters (a hawk and an industry analyst) argue both sides with strong arguments; "That is the entire chip war in one conversation."
B11 ENDING (~90): back to Jensen and the bet → three parallel clauses → final CARD with the quote. Nothing is proven yet — the ending stays open.

Writing rules:
- One line = one shot. Average 6–10 words per line; ≥12% of lines 4 words or fewer; avoid lines over 16 words.
- Link beats with So / Then / But. Never "and then".
- Every technical idea goes through: plain goal → visual metaphor → silly example → name the term after explaining it → the limit of the solution. Use "In other words…", "In human language…", "X is basically a…".
- One dry, deadpan joke every 30–45 seconds (~25 total). Types: understatement ("generally considered not ideal"), sardonic job descriptions, the third item of a list goes absurd, literal-minded machines, role reversal, callbacks. Joke about systems, bureaucracy, technology and the absurd scale — never mock real individuals' ethnicity, never joke about anyone being a spy.
- An open loop at least every 90 seconds ("Then comes the part that…", "But then something unexpected happens.", "And somehow, it gets worse.").
- ~2 numbers per minute, each with a comparison and a {SRC:n} tag. A DATE card opens each chapter. At least 22 CARD lines. At least 8 skits.
- Narrate past events in present tense.

Legal & accuracy rules (MANDATORY — this is about real living people):
- Never state as fact that Alice Huang is a spy or that anyone committed a crime. Use "allegedly", "according to The New York Times", "US officials reportedly believe". Every allegation line carries {SRC:n}.
- Include every denial and official response from Part 1.
- State clearly that there is no reported evidence Jensen Huang knew of or took part in any diversion, unless a reputable source now says otherwise.
- Skits may only use fictional, generic characters (customs officer, data-centre technician, investor, analyst, a talking GPU). Do NOT write dialogue for Alice Huang or Jensen Huang except verbatim, sourced public quotes.
- Do not use claims marked UNVERIFIED.
- Suggested title should carry the allegation correctly, e.g. "The Alleged Spy Who Got Close to Nvidia's CEO, Explained Like You're 5".

Output format for Part 3 (exactly this markup, plain text, no extra commentary inside the script):

# TITLE: <title>
# RUNTIME: 15
# BET: <one sentence>

## B01 · HOOK
N: <narrator line> {SRC:1}
> <visual note, not spoken>
CARD: <narrator line that is also shown as a black text card>
DATE: <Month Year. Place.>
Officer: <fictional character dialogue, max 12 words>
N: <line> {GAG}
N: <line> {LOOP}
N: <line> {BET}

## B05 · SPONSOR
...

## SOURCES
1. <URL> — <what it supports>

Tags go at the end of the line: {GAG} = joke, {LOOP} = open loop, {BET} = mention of the bet (at least 3 times, first before 5:00), {SRC:n} = source number.
