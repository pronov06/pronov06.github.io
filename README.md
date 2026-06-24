<div align="center">

<img src="public/favicon.svg" width="78" alt="logo" />

# Pronov Mazumdar — 3D Interactive Portfolio

<a href="https://pronov06.github.io/">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=22&pause=1000&color=C2A4FF&center=true&vCenter=true&width=620&height=45&lines=AI%2FML+Engineer+%26+Full-Stack+Developer;Deep+Learning+%7C+RAG+Pipelines+%7C+MERN;LeetCode+Knight+%E2%99%9E++%C2%B7++CGPA+9.42%2F10" alt="typing tagline" />
</a>

<p>
  <a href="https://pronov06.github.io/"><img src="https://img.shields.io/badge/%E2%96%B6%20Live%20Demo-0b080c?style=for-the-badge&logo=githubpages&logoColor=C2A4FF&labelColor=0b080c" alt="Live Demo" /></a>
  <a href="https://linkedin.com/in/pronov"><img src="https://img.shields.io/badge/LinkedIn-0b080c?style=for-the-badge&logo=linkedin&logoColor=C2A4FF&labelColor=0b080c" alt="LinkedIn" /></a>
  <a href="https://github.com/pronov06"><img src="https://img.shields.io/badge/GitHub-0b080c?style=for-the-badge&logo=github&logoColor=C2A4FF&labelColor=0b080c" alt="GitHub" /></a>
  <a href="https://x.com/pranavv9_"><img src="https://img.shields.io/badge/X-0b080c?style=for-the-badge&logo=x&logoColor=C2A4FF&labelColor=0b080c" alt="X" /></a>
  <a href="mailto:mazumdarpronov@gmail.com"><img src="https://img.shields.io/badge/Email-0b080c?style=for-the-badge&logo=gmail&logoColor=C2A4FF&labelColor=0b080c" alt="Email" /></a>
</p>

<br/>

<img src="public/images/avatar_sitting.jpg" width="300" alt="3D character" />

<sub>An immersive, real-time 3D portfolio — rigged character, physics, post-processing and buttery GSAP scroll choreography.</sub>

<br/><br/>

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![R3F](https://img.shields.io/badge/React_Three_Fiber-black?style=flat-square&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=flat-square&logo=greensock&logoColor=black)
![Rapier](https://img.shields.io/badge/Rapier_Physics-8B5CF6?style=flat-square)

</div>

---

## 🧭 Contents

- [✨ Highlights](#-highlights)
- [🛠️ Built With](#️-built-with)
- [💼 Featured Projects](#-featured-projects)
- [🚀 Run Locally](#-run-locally)
- [📁 Project Structure](#-project-structure)
- [🌐 Deployment](#-deployment)
- [📫 Connect](#-connect)
- [🙏 Acknowledgements](#-acknowledgements)
- [📜 License](#-license)

---

## ✨ Highlights

> A single-page, scroll-driven experience that pairs a real-time 3D scene with my work as an AI/ML and full-stack engineer.

- 🧍 **Real-time 3D character** — rigged GLTF model with mouse-tracked head, blink, typing and intro animations, rendered with Three.js + React Three Fiber.
- 🌌 **Physics & post-processing** — floating tech-stack spheres (Rapier physics) with N8AO ambient occlusion and HDR environment lighting.
- 🎞️ **GSAP scroll choreography** — section transitions, a pinned horizontal **Work** carousel, an animated career timeline, and smooth scrolling via ScrollSmoother.
- 🖱️ **Custom cursor & micro-interactions** — hover states, magnetic social icons, and a load-in sequence.
- 📱 **Responsive** — desktop gets the full 3D treatment; mobile gets a tuned, lightweight fallback.
- ⚡ **Performance-minded** — capped device-pixel-ratio, off-screen render pausing, and visibility-gated canvases.

---

## 🛠️ Built With

| Layer | Tech |
|---|---|
| **Framework** | React 18 · TypeScript · Vite |
| **3D / WebGL** | Three.js · @react-three/fiber · @react-three/drei · three-stdlib |
| **Physics & FX** | @react-three/rapier · @react-three/postprocessing (N8AO) |
| **Animation** | GSAP · @gsap/react · ScrollTrigger · ScrollSmoother |
| **UI bits** | react-fast-marquee · react-icons |
| **Type** | Clash Display (display) · Geist (body) |
| **Analytics** | @vercel/analytics |
| **Deploy** | GitHub Pages · GitHub Actions |

---

## 💼 Featured Projects

<table>
<tr>
<td width="33%" valign="top" align="center">
<a href="https://spend-wise-gmrs.vercel.app/"><img src="public/images/shot-spendwise.png" alt="SpendWise" /></a>
<br/><br/>
<b>SpendWise</b><br/>
<sub>Full-stack personal finance tracker — expenses, budgets, group splits & AI insights.</sub>
<br/><br/>
<code>React</code> <code>Node</code> <code>Express</code> <code>MongoDB</code> <code>JWT</code>
<br/><br/>
<a href="https://spend-wise-gmrs.vercel.app/">Live ↗</a>
</td>
<td width="33%" valign="top" align="center">
<a href="https://huggingface.co/spaces/pronov06/lumen-crm"><img src="public/images/shot-lumen.png" alt="Lumen" /></a>
<br/><br/>
<b>Lumen</b><br/>
<sub>A mini CRM engagement loop — pick an audience, send a campaign, learn from responses.</sub>
<br/><br/>
<code>FastAPI</code> <code>SQLAlchemy</code> <code>React</code> <code>TypeScript</code>
<br/><br/>
<a href="https://huggingface.co/spaces/pronov06/lumen-crm">Live ↗</a>
</td>
<td width="33%" valign="top" align="center">
<a href="https://analyzemyresume.streamlit.app/"><img src="public/images/shot-resume.png" alt="Resume ATS Analyzer" /></a>
<br/><br/>
<b>Resume ATS Analyzer</b><br/>
<sub>AI-powered ATS scoring with keyword analysis, strengths & improvement tips.</sub>
<br/><br/>
<code>Python</code> <code>spaCy</code> <code>NLTK</code> <code>Streamlit</code>
<br/><br/>
<a href="https://analyzemyresume.streamlit.app/">Live ↗</a>
</td>
</tr>
</table>

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/pronov06/pronov06.github.io.git
cd pronov06.github.io

# 2. Install
npm install

# 3. Start the dev server (Vite)
npm run dev

# 4. Production build
npm run build
npm run preview   # preview the build locally
```

> Requires **Node 18+**. The dev server runs at `http://localhost:5173`.

---

## 📁 Project Structure

```text
src/
├─ components/
│  ├─ Character/        # 3D scene, model loading, rig animations (do not edit lightly)
│  ├─ Landing.tsx       # hero — name, role, social icons
│  ├─ About.tsx         # bio
│  ├─ WhatIDo.tsx       # services / skill cards
│  ├─ Career.tsx        # experience timeline
│  ├─ Work.tsx          # pinned horizontal project carousel
│  ├─ Contact.tsx       # footer / contact
│  ├─ TechStack.tsx     # physics sphere canvas
│  └─ utils/            # GSAP scroll + split-text helpers
├─ data/                # bone data for the rig
├─ App.tsx · index.css  # shell + global styles / tokens
public/
├─ models/              # 3D model + HDR environment
├─ images/              # project shots, tech icons, avatars
└─ font/                # Clash Display
```

---

## 🌐 Deployment

Hosted on **GitHub Pages** and deployed automatically by **GitHub Actions** on every push to `main`.

```bash
git push origin main   # → Actions builds & publishes → https://pronov06.github.io/
```

---

## 📫 Connect

<p>
  <a href="https://pronov06.github.io/"><img src="https://img.shields.io/badge/Portfolio-C2A4FF?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="https://linkedin.com/in/pronov"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://github.com/pronov06"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://x.com/pranavv9_"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
  <a href="mailto:mazumdarpronov@gmail.com"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

**Pronov Mazumdar** · AI/ML Engineer & Full-Stack Developer · Chennai, India
Final-year B.Tech CSE (Big Data Analytics) @ SRM Institute of Science and Technology

---

## 🙏 Acknowledgements

- 3D portfolio template originally created by **[Moncy Yohannan](https://github.com/MoncyDev/Portfolio-Website)** — adapted here with my own content, projects, copy, and tuning. All original 3D avatar assets belong to the original author and are **not** redistributed; my live site uses my own content.
- [GSAP](https://gsap.com/) · [Three.js](https://threejs.org/) · [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) · [Rapier](https://rapier.rs/)

---

## 📜 License

This project is based on a template released under the **Personal Portfolio License (PPL) v1.0** — see [`LICENSE`](LICENSE). Please respect the original author's terms: don't clone the full design/experience or reuse the proprietary 3D assets. Build your own. 🙂

<div align="center"><sub>⭐ If this inspired your own build, a star is always appreciated.</sub></div>
