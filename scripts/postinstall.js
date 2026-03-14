#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const packageRoot = path.join(__dirname, '..');
const skillsSource = path.join(packageRoot, 'skills');
const targetRoot = path.join(os.homedir(), '.agents', 'skills');

if (!fs.existsSync(skillsSource)) {
  process.exit(0);
}

fs.mkdirSync(targetRoot, { recursive: true });

const entries = fs.readdirSync(skillsSource, { withFileTypes: true });
for (const ent of entries) {
  if (!ent.isDirectory()) continue;
  const src = path.join(skillsSource, ent.name);
  const dest = path.join(targetRoot, ent.name);
  const hasSkill = fs.existsSync(path.join(src, 'SKILL.md'));
  if (!hasSkill) continue;
  fs.cpSync(src, dest, { recursive: true });
  console.log(`[rocket-skills] Installed skill: ${ent.name} → ~/.agents/skills/${ent.name}`);
}
