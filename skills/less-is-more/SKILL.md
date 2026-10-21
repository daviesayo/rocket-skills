---
name: less-is-more
description: Less is more, from Jakub Krehel's essay. Use when building or reviewing interface work, or adding any element, copy, animation, or feature.
---

# Less is more

Distilled from Jakub Krehel, [Less is more, more or less](https://jakub.kr/writing/less-is-more).

Adding is cheap for an agent and removing takes understanding, so an agent's default drift is toward more. Every element, line of copy, animation, and feature must **earn its place**: it makes the outcome better for the person using it. Simplicity is order brought to complexity, which needs an understanding of the product, the user, and the problem deep enough to know what to remove, what to leave alone, and what not to build at all.

## The earn-its-place test

Run every addition through these questions, once before writing it and again when reviewing the finished change. An addition that fails any question is cut.

1. **What job does it do for the user?** Name the job in one phrase. No job, no element.
2. **Does the user already know it?** Copy carries only what the user lacks. A "Start Call" button needs no caption saying "Real call."; the button already says it starts a call, and "real" answers a question nobody asked. "Telnyx charges apply." carries a fact the user lacks, so it can stay.
3. **How often will the user meet it?** Cost multiplies by frequency. A 300ms animation on a menu opened 200 times a day costs about a minute a day, more than 6 hours a year. The more often a surface appears, the less it does.
4. **Did anyone ask for it?** Features, sections, settings, and variants enter when the task requires them.

## Default state

Each item below starts absent and enters only by passing the test:

- an eyebrow, the small kicker label above a heading
- a subtitle, helper text, or caption that restates its heading, label, or control
- a badge, icon, divider, or card wrapping content that reads fine bare
- motion on a high-frequency surface: menu entrances, hover colour fades in dense lists
- an extra state, option, or empty-state flourish the task never mentioned

## Motion

Animate where motion explains something: a spatial change, a state change the user would otherwise miss, or feedback on their action. A context menu the user opens all day appears instantly, fades out on close, and changes item backgrounds on hover without a transition.

## Code

The same bar applies to diffs. The best change does its job with the least code; prefer deleting to adding, and reach for an existing piece before writing a new one.

## Done

The change is done when every element, sentence, and animation in it has a named job, and removing any one of them would make the outcome worse.
