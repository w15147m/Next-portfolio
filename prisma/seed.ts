import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting seed for Waseem Abbas...");

  const databaseUrl = process.env.DATABASE_URL!;
  const adapter = new PrismaMariaDb(databaseUrl);
  const prisma = new PrismaClient({ adapter });

  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    const email = "waseemofficee@gmail.com";

    // 1. Create or Update User Profile
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: "Waseem Abbas",
        number: "+923130930399",
        password: hashedPassword,
        desc: "Software Engineer | Full stack developer | Laravel, Vue, React, React Native. Specialized in architecting scalable web applications, real-time WebSocket communication, desktop apps, and mobile development.",
      },
      create: {
        name: "Waseem Abbas",
        email: email,
        password: hashedPassword,
        number: "+923130930399",
        address: "Pakistan",
        desc: "Software Engineer | Full stack developer | Laravel, Vue, React, React Native. Specialized in architecting scalable web applications, real-time WebSocket communication, desktop apps, and mobile development.",
        emailVerified: true,
      },
    });

    // 2. Create Credential Account
    const existingAccount = await prisma.account.findFirst({
      where: { userId: user.id, providerId: "credential" },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          accountId: user.email,
          providerId: "credential",
          userId: user.id,
          password: hashedPassword,
        },
      });
    } else {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      });
    }

    // 3. Seed Socials
    const socialsData = [
      { name: "GitHub", link: "https://github.com/w15147m", desc: "GitHub Profile" },
      { name: "LinkedIn", link: "https://linkedin.com/in/waseemln", desc: "LinkedIn Profile" },
    ];

    for (const s of socialsData) {
      const existingSocial = await prisma.social.findFirst({
        where: { userId: user.id, name: s.name },
      });
      if (!existingSocial) {
        await prisma.social.create({
          data: { userId: user.id, ...s },
        });
      }
    }

    // 4. Seed Skills
    const skillsList = [
      { name: "Laravel", proficiency: "Expert", desc: "PHP Framework" },
      { name: "Vue", proficiency: "Advanced", desc: "Vue 3 & Ecosystem" },
      { name: "React", proficiency: "Advanced", desc: "React 19 & Next.js" },
      { name: "React Native", proficiency: "Advanced", desc: "Mobile Development" },
      { name: "Electron", proficiency: "Intermediate", desc: "Desktop App Framework" },
      { name: "Tauri", proficiency: "Intermediate", desc: "Desktop App Framework" },
      { name: "PHP", proficiency: "Expert", desc: "Backend Development" },
      { name: "TypeScript", proficiency: "Advanced", desc: "Type-safe JavaScript" },
      { name: "MySQL", proficiency: "Advanced", desc: "Relational Database" },
      { name: "SQLite", proficiency: "Advanced", desc: "Embedded Database" },
      { name: "Relational Database", proficiency: "Advanced", desc: "Database Design & Optimization" },
      { name: "Drizzle ORM", proficiency: "Intermediate", desc: "TypeScript ORM" },
      { name: "Laravel Reverb", proficiency: "Advanced", desc: "Real-time WebSockets" },
      { name: "WebSockets", proficiency: "Advanced", desc: "Real-time Communication" },
      { name: "RESTful APIs", proficiency: "Expert", desc: "API Architecture" },
      { name: "HTML", proficiency: "Expert", desc: "Markup Language" },
      { name: "SCSS", proficiency: "Advanced", desc: "CSS Preprocessor" },
      { name: "Bootstrap", proficiency: "Advanced", desc: "CSS Framework" },
      { name: "Tailwind", proficiency: "Expert", desc: "Tailwind CSS & NativeWind" },
      { name: "GitHub & Git", proficiency: "Advanced", desc: "Version Control" },
      { name: "VS Code", proficiency: "Expert", desc: "Primary IDE" },
      { name: "Linux", proficiency: "Intermediate", desc: "OS & Server Environment" },
      { name: "VPS", proficiency: "Intermediate", desc: "Hosting & Server Config" },
    ];

    const skillMap = new Map<string, bigint>();

    for (const sk of skillsList) {
      let existingSkill = await prisma.skill.findFirst({
        where: { userId: user.id, name: sk.name },
      });
      if (!existingSkill) {
        existingSkill = await prisma.skill.create({
          data: { userId: user.id, ...sk },
        });
      }
      skillMap.set(sk.name, existingSkill.id);
    }

    // 5. Seed Experience
    const experienceData = {
      company: "Softleed",
      position: "Software Engineer | Full Stack Developer",
      startDate: new Date("2024-01-01"),
      desc: "Architecting workforce platforms, desktop productivity tools, bulk communication systems, and official web platforms using Laravel, Vue 3, React, Electron, and WebSockets.",
    };

    const existingExp = await prisma.experience.findFirst({
      where: { userId: user.id, company: experienceData.company },
    });
    if (!existingExp) {
      await prisma.experience.create({
        data: { userId: user.id, ...experienceData },
      });
    }

    // 6. Seed Education
    const educationList = [
      {
        institution: "Virtual University",
        degree: "Bachelor of Business & Information Technology (BBIT)",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2027-12-31"),
      },
      {
        institution: "Aptech Pakistan",
        degree: "Full-Stack Web Development",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-12-31"),
      },
    ];

    for (const edu of educationList) {
      const existingEdu = await prisma.education.findFirst({
        where: { userId: user.id, institution: edu.institution },
      });
      if (!existingEdu) {
        await prisma.education.create({
          data: { userId: user.id, ...edu },
        });
      }
    }

    // 7. Seed Projects & Link Skills
    const projectsList = [
      {
        name: "Enterprise Workforce Platform",
        desc: "Architecting a comprehensive workforce management system using Laravel and Vue 3, implementing real-time data synchronization with Laravel Echo and interactive performance timelines using Vis-Timeline.",
        skills: ["Laravel", "Vue", "WebSockets"],
      },
      {
        name: "Desktop Productivity Tracker",
        desc: "Engineering a cross-platform desktop application with Electron and Vue 3, featuring automated activity monitoring, idle detection, and high-performance local data persistence using Dexie.",
        skills: ["Electron", "Vue", "TypeScript"],
      },
      {
        name: "Bulk Communication System",
        desc: "Contributed to the development of a high-volume WhatsApp messaging platform using PHP and MySQL, optimizing backend architecture to significantly improve message delivery efficiency and reliability.",
        skills: ["PHP", "MySQL", "RESTful APIs"],
      },
      {
        name: "Official Platform Development",
        desc: "Maintenance and feature expansion of the official Softleed web platform using Laravel, ensuring a seamless and responsive user experience for client-facing assets.",
        skills: ["Laravel", "Tailwind", "Bootstrap"],
      },
      {
        name: "SocialBatch scheduler and video generator",
        desc: "Featuring automatic video rendering from templates using Remotion, interactive calendars, drag-and-drop playlist organization, Spatie roles & permissions, and real-time events powered by Laravel Reverb.",
        skills: ["Laravel", "Laravel Reverb", "React", "WebSockets"],
      },
      {
        name: "Islamic prayer times and supplications mobile application",
        desc: "Mobile application for Islamic prayer times, supplications, and Qibla direction, Styled with Tailwind CSS (NativeWind) and structured with React Navigation drawer, stack, and tabs.",
        skills: ["React Native", "Tailwind"],
      },
      {
        name: "Notes App",
        desc: 'A desktop sticky notes application built with Electron and React 19, featuring rich-text editing via TinyMCE, drag-and-drop note cards, color customization, "Always on Top" window mode, and a dark/light theme system.',
        skills: ["Electron", "React", "TypeScript"],
      },
      {
        name: "Real-Time Chat App",
        desc: "Built a real-time messaging platform using Laravel Reverb (WebSockets). Implemented server-side rendering with Livewire Volt and Flux. Designed scalable event-driven communication architecture.",
        skills: ["Laravel", "Laravel Reverb", "WebSockets"],
      },
      {
        name: "React Native Starter Kit",
        desc: "A robust and modern React Native starter kit built using the React Native CLI, pre-configured with SQLite, Drizzle ORM, NativeWind (Tailwind CSS), and navigation.",
        skills: ["React Native", "SQLite", "Drizzle ORM", "Tailwind"],
      },
      {
        name: "Local network file sharing application",
        desc: "High-performance desktop application built with Tauri, Vue 3, and Tailwind CSS 4 that enables seamless sharing of files, entire folders, and text between devices over a local area network (LAN).",
        skills: ["Tauri", "Vue", "Tailwind"],
      },
    ];

    for (const proj of projectsList) {
      let existingProj = await prisma.project.findFirst({
        where: { userId: user.id, name: proj.name },
      });

      if (!existingProj) {
        existingProj = await prisma.project.create({
          data: {
            userId: user.id,
            name: proj.name,
            desc: proj.desc,
          },
        });
      }

      // Link skills via projectSkills pivot
      for (const skillName of proj.skills) {
        const skillId = skillMap.get(skillName);
        if (skillId) {
          const existingLink = await prisma.projectSkill.findFirst({
            where: { projectId: existingProj.id, skillId },
          });
          if (!existingLink) {
            await prisma.projectSkill.create({
              data: {
                projectId: existingProj.id,
                skillId,
              },
            });
          }
        }
      }
    }

    console.log("✅ Successfully seeded Waseem Abbas resume profile, skills, projects, experience, and education!");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
