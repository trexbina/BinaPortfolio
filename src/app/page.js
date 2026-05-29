"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import { portfolioData } from "@/data/portfolio";
import { 
  Cloud, 
  Shield, 
  Terminal, 
  Activity, 
  Sun, 
  Moon, 
  Globe, 
  Send, 
  CheckCircle2, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Check, 
  FileText,
  AlertCircle,
  Command as CommandIcon,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Menu,
  X,
  Trophy
} from "lucide-react";

export default function Home() {
  // Theme and Styling State
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#3b82f6"); // Default Blue

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("Lofi Chill Beats - Dev Session");
  const [defaultTrackReady, setDefaultTrackReady] = useState(true);
  const audioElRef = useRef(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let mounted = true;

    const setupAudio = async () => {
      try {
        const response = await fetch("/audio/default.mp3", { method: "HEAD" });
        if (!mounted) return;

        const el = audioElRef.current || document.getElementById("default-audio");
        if (!el) return;

        el.preload = "auto";
        el.playsInline = true;
        el.loop = true;
        el.src = response && response.ok ? "/audio/default.mp3" : "";

        if (response && response.ok) {
          setDefaultTrackReady(true);
          setCurrentTrack("Default Track");

          // Aggressive autoplay strategy:
          // 1) Try muted autoplay then unmute (works on many browsers)
          // 2) If that fails, try unmuted autoplay directly
          // 3) If both fail, show overlay/CTA for explicit user gesture
          try {
            el.muted = true;
            setIsMuted(true);
            await el.play();
            if (!mounted) return;
            setIsPlaying(true);
            // Attempt to unmute after short delay
            window.setTimeout(async () => {
              try {
                el.muted = false;
                setIsMuted(false);
              } catch (e) { /* ignore */ }
            }, 300);
            setAutoplayBlocked(false);
            return;
          } catch (mutedErr) {
            console.warn("Muted autoplay blocked:", mutedErr);
          }

          // Try unmuted autoplay directly
          try {
            el.muted = false;
            setIsMuted(false);
            await el.play();
            if (!mounted) return;
            setIsPlaying(true);
            setAutoplayBlocked(false);
            return;
          } catch (unmutedErr) {
            console.warn("Unmuted autoplay blocked:", unmutedErr);
            setAutoplayBlocked(true);
          }
        } else {
          setDefaultTrackReady(false);
          setCurrentTrack("No default track loaded");
        }
      } catch (e) {
        console.warn("Audio setup failed", e);
        setDefaultTrackReady(false);
        setCurrentTrack("No default track loaded");
        setAutoplayBlocked(true);
      }
    };

    setupAudio();

    return () => {
      mounted = false;
      try { (audioElRef.current || document.getElementById("default-audio"))?.pause?.(); } catch {}
      audioElRef.current = null;
    };
  }, []);

  // If autoplay was blocked, try to resume/unmute on first user interaction
  useEffect(() => {
    if (!autoplayBlocked) return;

    const tryEnableOnInteraction = async () => {
      const el = audioElRef.current || document.getElementById("default-audio");
      if (!el) return;
      try {
        el.muted = false;
        await el.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn("Enable on interaction failed:", err);
      }
    };

    const onPointer = () => tryEnableOnInteraction();
    const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') tryEnableOnInteraction(); };

    window.addEventListener('pointerdown', onPointer, { once: true });
    window.addEventListener('keydown', onKey, { once: true });

    return () => {
      try { window.removeEventListener('pointerdown', onPointer); } catch {}
      try { window.removeEventListener('keydown', onKey); } catch {}
    };
  }, [autoplayBlocked]);

  const togglePlay = async () => {
    const el = audioElRef.current || document.getElementById("default-audio");
    if (!el) return;
    if (!defaultTrackReady && !el.src) return;
    try {
      if (isPlaying) {
        el.pause();
        setIsPlaying(false);
      } else {
        await el.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio playback failed:", err);
    }
  };

  // Interactive Terminal State (Hero Terminal)
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([
    "Welcome to Patrick Jake T. Biña's secure dev console v2.8.",
    "Type 'help' to view available system administration commands.",
    "------------------------------------------------",
    "VISITOR COMMENTS BOARD ACTIVE.",
    "Type 'comments' to view employer/visitor notes.",
    "Type 'comment <text>' to post your anonymous note!",
    "------------------------------------------------",
    "admin@bina-dev:~$ "
  ]);
  const terminalEndRef = useRef(null);

  // Skill Details Analyzer State
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("Cloud & DevOps");
  const [skillAnalysis, setSkillAnalysis] = useState("");

  // Projects State
  const [expandedProject, setExpandedProject] = useState(null);

  // Experience State
  const [expandedExperience, setExpandedExperience] = useState(0);

  // Contact Form State (Dual Synced with Contact Terminal)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [terminalFormMode, setTerminalFormMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const commentRef = useRef(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  
  // Custom contact terminal commands
  const [contactTerminalInput, setContactTerminalInput] = useState("");
  const [contactTerminalLogs, setContactTerminalLogs] = useState([
    "SYSTEM: Mail Server Daemon active.",
    "Type 'name <value>', 'email <value>', 'message <value>', then 'submit' to send transmission.",
    "guest@carter-mail:~$ "
  ]);
  const contactTerminalEndRef = useRef(null);

  // Comments / Message Box (employer-focused feedback) state
  const [comments, setComments] = useState([
    { user: "bunnyhoney123", message: "Impressive projects — Cyber Shield looks polished!", time: new Date().toISOString() }
  ]);
  const [commentInput, setCommentInput] = useState("");

  // Retro Web Audio Sound Synthesiser for Mini-Game
  const playSound = (type) => {
    if (typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "start") {
        osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.1); // A4
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.2); // C#5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "food") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === "gameover") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.log("Audio not supported or blocked by user interaction.", e);
    }
  };

  // Snake Game State
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameStarted, setGameStarted] = useState(false);
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(0);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, user: "cyberfox721",   score: 180, date: "Today" },
    { rank: 2, user: "sparkbyte404",  score: 130, date: "Today" },
    { rank: 3, user: "otterloop512",  score: 90,  date: "Today" },
  ]);
  const [currentGamerTag, setCurrentGamerTag] = useState("");

  // Snake game loop
  useEffect(() => {
    if (!gameStarted || snakeGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        switch (direction) {
          case "UP": head.y -= 1; break;
          case "DOWN": head.y += 1; break;
          case "LEFT": head.x -= 1; break;
          case "RIGHT": head.x += 1; break;
          default: break;
        }

        // Check Wall Collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setSnakeGameOver(true);
          setGameStarted(false);
          playSound("gameover");
          setSnakeScore(s => { submitScoreRef.current(s); return s; });
          return prevSnake;
        }

        // Check Self Collision
        for (let segment of prevSnake) {
          if (head.x === segment.x && head.y === segment.y) {
            setSnakeGameOver(true);
            setGameStarted(false);
            playSound("gameover");
            setSnakeScore(s => { submitScoreRef.current(s); return s; });
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
          setSnakeScore((s) => {
            const nextScore = s + 10;
            if (nextScore > snakeHighScore) {
              setSnakeHighScore(nextScore);
            }
            return nextScore;
          });
          // Generate new food
          let newFood;
          while (true) {
            newFood = {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 20)
            };
            // Ensure food is not on snake
            let onSnake = false;
            for (let segment of newSnake) {
              if (segment.x === newFood.x && segment.y === newFood.y) {
                onSnake = true;
                break;
              }
            }
            if (!onSnake) break;
          }
          setFood(newFood);
          playSound("food");
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 130);
    return () => clearInterval(interval);
  }, [gameStarted, snakeGameOver, direction, food, snakeHighScore]);

  // Snake Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || snakeGameOver) return;
      
      // Prevent default browser scrolling when playing
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStarted, snakeGameOver]);

  // Ref to always have the latest submitScoreToLeaderboard + currentGamerTag in game loop
  const submitScoreRef = useRef(null);
  useEffect(() => {
    submitScoreRef.current = (score) => submitScoreToLeaderboard(score, currentGamerTag);
  }, [currentGamerTag]);

  const startSnakeGame = () => {
    const tag = currentGamerTag || generateGamerTag();
    if (!currentGamerTag) setCurrentGamerTag(tag);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("RIGHT");
    setSnakeScore(0);
    setSnakeGameOver(false);
    setGameStarted(true);
    playSound("start");
  };

  const generateUsername = () => {
    const animals = ["bunny","fox","otter","panda","tiger","sparrow","lynx","hamster","koala","badger"];
    const sweet = ["honey","pixel","drift","spark","byte","mint","cloud","blink","loop","flare"];
    const a = animals[Math.floor(Math.random() * animals.length)];
    const s = sweet[Math.floor(Math.random() * sweet.length)];
    const n = Math.floor(100 + Math.random() * 900);
    return `${a}${s}${n}`;
  };

  const generateGamerTag = () => {
    const prefixes = ["cyber","neo","dark","hyper","ultra","turbo","mega","nitro","stealth","ghost"];
    const nouns   = ["fox","wolf","viper","hawk","lynx","byte","core","pixel","rift","grid"];
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const n = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `${p}${n}${num}`;
  };

  const submitScoreToLeaderboard = (score, tag) => {
    if (score <= 0) return;
    setLeaderboard(prev => {
      const updated = [...prev, { user: tag, score, date: "Just now" }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((entry, i) => ({ ...entry, rank: i + 1 }));
      return updated;
    });
  };

  const postComment = (e) => {
    e?.preventDefault?.();
    const text = commentInput.trim();
    if (!text) return;
    const newComment = { user: generateUsername(), message: text, time: new Date().toISOString() };
    setComments(prev => [newComment, ...prev]);
    setCommentInput("");
  };

  const goToComments = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("comments");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // focus textarea after scroll
    setTimeout(() => {
      commentRef.current?.focus?.();
    }, 300);
  };

  const openProjectModal = (projectId) => {
    const proj = portfolioData.projects.find(p => p.id === projectId) || portfolioData.projects[0];
    setModalImageSrc(proj.image || '/projects/placeholder.png');
    setProjectModalOpen(true);
    setMobileMenuOpen(false);
    const el = document.getElementById("top-projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setModalImageSrc(null);
  };

  const postCommentFromTerminal = (text) => {
    if (!text) return ["ERROR: Comment text cannot be empty."];
    const username = generateUsername();
    const newComment = { user: username, message: text, time: new Date().toISOString() };
    setComments(prev => [newComment, ...prev]);
    playSound("food");
    return [
      `[OK] Secure comment tunnel opened.`,
      `[SUCCESS] Posted by ${username}: "${text}"`
    ];
  };

  // Accent Colors Palette
  const accentColors = [
    { name: "Electric Blue", hex: "#3b82f6" },
    { name: "Neon Orange", hex: "#f97316" },
    { name: "Lime Green", hex: "#84cc16" },
    { name: "Vivid Purple", hex: "#a855f7" },
    { name: "Retro Coral", hex: "#f43f5e" }
  ];

  // System Uptime Simulator
  const [uptimePercent, setUptimePercent] = useState(99.994);
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuation
      const change = (Math.random() - 0.5) * 0.002;
      setUptimePercent(prev => Math.min(100, Math.max(99.990, Number((prev + change).toFixed(3)))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update Main Accent Color in DOM
  useEffect(() => {
    document.documentElement.style.setProperty("--main", accentColor);
  }, [accentColor]);

  // Handle Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Scroll Terminals to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  useEffect(() => {
    contactTerminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contactTerminalLogs]);

  // Execute Hero Terminal Commands
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    const newLogs = [...terminalLogs];
    // Remove trailing prompt from last entry and re-add with user input
    newLogs[newLogs.length - 1] = `admin@bina-dev:~$ ${terminalInput}`;

    switch (true) {
      case cmd === "help":
        response = [
          "Available Commands:",
          "  help           - Show this administration helper menu.",
          "  neofetch       - Render system developer profile stats.",
          "  comments       - Display all visitor notes left by employers.",
          "  comment <text> - Post a new anonymous visitor note to the board.",
          "  ping           - Run connection test to public DNS cluster.",
          "  status         - Run automated diagnostic check of cloud networks.",
          "  skills         - List all verified technological capabilities.",
          "  clear          - Flush console history."
        ];
        break;
      case cmd === "comments":
        response = [
          "DATABASE QUERY: select * from visitor_comments order by time desc;",
          "----------------------------------------",
          ...comments.map(c => `[${new Date(c.time).toLocaleTimeString()}] ${c.user}: "${c.message}"`),
          "----------------------------------------",
          `Total notes: ${comments.length}`
        ];
        break;
      case cmd === "comment":
        response = [
          "ERROR: Please supply comment content.",
          "Usage: comment <your message here>"
        ];
        break;
      case cmd.startsWith("comment "): {
        const text = terminalInput.substring(8).trim();
        response = postCommentFromTerminal(text);
        break;
      }
      case cmd === "neofetch":
        response = [
          " ██████╗  ██████╗  ██████╗  ██████╗  ██████╗ ",
          " ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗",
          " ██████╔╝ ██████╔╝ ██║  ██║ ██║  ██║ ██████╔╝",
          " ██╔═══╝  ██╔══██╗ ██║  ██║ ██║  ██║ ██╔═══╝ ",
          " ██║      ██║  ██║ ██████╔╝ ██████╔╝ ██║     ",
          " ╚═╝      ╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═╝     ",
          "----------------------------------------",
          `OS: Linux RedHat 9.4 Enterprise Edition`,
          `HOST: AWS EC2 micro-cluster (us-east-1)`,
          `UPTIME: 284 Days, 4 Hours, 12 Mins`,
          `DEVELOPER: ${portfolioData.personalInfo.name}`,
          `TITLE: ${portfolioData.personalInfo.title}`,
          `LOCATION: ${portfolioData.personalInfo.location}`,
          `SHELL: Bash/Next.js-v16.2.6`
        ];
        break;
      case cmd === "ping":
        response = [
          "PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.",
          "64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=8.24 ms",
          "64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=9.11 ms",
          "64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=7.89 ms",
          "--- 8.8.8.8 ping statistics ---",
          "3 packets transmitted, 3 received, 0% packet loss, time 2003ms",
          "rtt min/avg/max/mdev = 7.89/8.41/9.11/0.51 ms"
        ];
        break;
      case cmd === "status":
        response = [
          "INITIALIZING SYSTEM ARCHITECTURE DIAGNOSTICS...",
          "[OK] Cloud Services Status: healthy",
          "[OK] Network Subnets Route: healthy",
          "[OK] Kubernetes Ingress Controllers: healthy (replica x3)",
          `[OK] Simulated Global Uptime: ${uptimePercent}%`,
          "[OK] Security Threat Level: ZERO VECTORS DETECTED",
          "ALL SYSTEMS OPERATIONAL. NO HAZARDS REPORTED."
        ];
        break;
      case cmd === "skills":
        response = [
          "Verifying Infrastructure Capabilities:",
          "  * Cloud Platforms: AWS, Azure, GCP",
          "  * DevOps & Orchestration: Kubernetes, Docker, Terraform, CI/CD",
          "  * Core Systems: Red Hat Linux, Ubuntu, Active Directory, Databases",
          "  * Networking: VPNs, Firewalls, Cisco Systems, Security Hardening",
          "Type 'skills' in the skills dashboard for detailed logs."
        ];
        break;
      case cmd === "clear":
        setTerminalLogs(["admin@bina-dev:~$ "]);
        setTerminalInput("");
        return;
      default:
        response = [
          `bash: command not found: ${cmd.split(" ")[0]}.`,
          "Type 'help' for a full list of system actions."
        ];
    }

    setTerminalLogs([...newLogs, ...response, "admin@bina-dev:~$ "]);
    setTerminalInput("");
  };

  // Skill category analysis generator
  const analyzeCategory = (category) => {
    setSelectedSkillCategory(category);
    let logs = "";
    if (category === "Cloud & DevOps") {
      logs = `DEPLOYMENT AUDIT LOGS [Cloud & DevOps]
------------------------------------------------
[08:24:12] Initializing Terraform configuration check...
[08:24:14] Successfully parsed modules: 'vpc', 'rds', 'kubernetes', 'cloudfront'
[08:24:15] State file verification completed. No drift detected.
[08:24:18] Checking Kubernetes orchestration pods...
[08:24:19] Microservices replicas matched deployment descriptor: 12/12 online.
[08:24:21] Docker Image scans completed: 0 critical vulnerabilities.
[08:24:22] CI/CD Pipeline verification: GitHub Actions Runner active and green.
------------------------------------------------
AUDIT: EXCELLENT. Systems are fully automated and autoscaling in multi-regions.`;
    } else if (category === "SysAdmin & Core IT") {
      logs = `SYSTEM HARDENING REPORT [SysAdmin & Core IT]
------------------------------------------------
[09:12:01] Parsing Linux host security rules (RHEL & Ubuntu)...
[09:12:03] SSH configuration hardened: root login DISABLED. Keyauth ONLY.
[09:12:05] Auditd daemon actively monitoring security log directories.
[09:12:07] Active Directory connection check: secure LDAP Active.
[09:12:09] User Identity Management IAM access checks passed.
[09:12:11] Disk Space health check: root: 32% used, backups: 12% used.
------------------------------------------------
AUDIT: STABLE. Operating systems are locked down, patched, and fully monitored.`;
    } else {
      logs = `SECURITY TRACE & PACKET AUDIT [Networking & Security]
------------------------------------------------
[10:45:33] Sniffing PfSense / Palo Alto firewalls state tables...
[10:45:35] VPN tunnels status: IPsec tunnel 1 ONLINE. WireGuard tunnel ACTIVE.
[10:45:37] Network Intrusion Detection System (IDS) monitoring live span port.
[10:45:39] Penetration test check: Kali suite verify port scanner blocklist.
[10:45:41] SSL/TLS certificates audit: 100% verified validity.
[10:45:43] Automated backup audit logs: verified encrypted S3 archives.
------------------------------------------------
AUDIT: ARMORED. Perimeter firewalls hardened, full payload inspection active.`;
    }
    setSkillAnalysis(logs);
  };

  // Sync Form to Terminal
  const syncFormToTerminal = (name, email, msg) => {
    const logs = [
      "SYSTEM: Mail Server Daemon active.",
      `guest@bina-mail:~$ name ${name || ""}`,
      `guest@bina-mail:~$ email ${email || ""}`,
      `guest@bina-mail:~$ message ${msg || ""}`,
      "guest@bina-mail:~$ "
    ];
    setContactTerminalLogs(logs);
  };

  // Handle Contact Terminal Commands
  const handleContactTerminalSubmit = (e) => {
    e.preventDefault();
    const input = contactTerminalInput.trim();
    if (!input) return;

    const lowerInput = input.toLowerCase();
    const newLogs = [...contactTerminalLogs];
    newLogs[newLogs.length - 1] = `guest@bina-mail:~$ ${input}`;

    let response = [];

    if (lowerInput === "help") {
      response = [
        "Interactive Form Mailer Commands:",
        "  name <yourname>      - Set the sender name parameter.",
        "  email <youremail>    - Set the sender email parameter.",
        "  message <text>       - Set the message payload.",
        "  view                 - Preview current transmission parameters.",
        "  submit               - Fire secure transmission request to Patrick Jake T. Biña.",
        "  clear                - Reset console history."
      ];
    } else if (lowerInput.startsWith("name ")) {
      const val = input.substring(5).trim();
      setContactName(val);
      response = [`[OK] Sender Name configured: "${val}"`];
    } else if (lowerInput.startsWith("email ")) {
      const val = input.substring(6).trim();
      setContactEmail(val);
      response = [`[OK] Sender Email configured: "${val}"`];
    } else if (lowerInput.startsWith("message ") || lowerInput.startsWith("msg ")) {
      const startIdx = lowerInput.startsWith("message ") ? 8 : 4;
      const val = input.substring(startIdx).trim();
      setContactMsg(val);
      response = [`[OK] Message Payload loaded.`];
    } else if (lowerInput === "view") {
      response = [
        "Transmission Parameters Preview:",
        `  Sender Name : ${contactName || "[Not Configured]"}`,
        `  Sender Email: ${contactEmail || "[Not Configured]"}`,
        `  Message     : ${contactMsg || "[Not Configured]"}`
      ];
    } else if (lowerInput === "submit") {
      if (!contactName || !contactEmail || !contactMsg) {
        response = [
          "ERROR: INCOMPLETE TRANSMISSION DATA.",
          `Please configure name (${contactName ? "✓" : "MISSING"}), email (${contactEmail ? "✓" : "MISSING"}), and message (${contactMsg ? "✓" : "MISSING"}) before dispatching.`
        ];
      } else {
        setFormSubmitted(true);
        response = [
          "DISPATCHING INFRASTRUCTURE TRANSMISSION...",
          "CONNECTING TO RELAY SERVER mail.bina-dev.net...",
          "TRANSMISSION ENCRYPTED VIA AES-GCM-256...",
          "[SUCCESS] DISPATCH CONFIRMED! Patrick Jake T. Biña has been notified.",
          "THANK YOU! The Fullstack Developer will respond within 4 business hours."
        ];
      }
    } else if (lowerInput === "clear") {
      setContactTerminalLogs(["guest@bina-mail:~$ "]);
      setContactTerminalInput("");
      return;
    } else {
      response = [
        `Syntax Error: ${input}`,
        "Type 'help' for custom IT mail commands, or toggle 'Form UI' to use regular textboxes."
      ];
    }

    setContactTerminalLogs([...newLogs, ...response, "guest@bina-mail:~$ "]);
    setContactTerminalInput("");
  };

  // Quote Request trigger
  const requestQuoteFor = (serviceTitle) => {
    const text = `I'd like to get a quote for: ${serviceTitle}.`;
    setContactMsg(text);
    if (terminalFormMode) {
      setContactTerminalLogs([
        "SYSTEM: Mail Server Daemon active.",
        `guest@bina-mail:~$ message ${text}`,
        "guest@bina-mail:~$ [Success] Service loaded. Now set your name and email, then 'submit'."
      ]);
    }
    // Scroll to contact form
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen font-sans bg-background text-foreground transition-colors duration-300`}>
      {/* Full-screen overlay to request a user gesture when autoplay is blocked */}
      {autoplayBlocked && !isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
          <div className="text-center p-6 max-w-sm">
            <h2 className="text-2xl font-bold mb-3">Enable Site Audio</h2>
            <p className="mb-4">To enjoy background music automatically, please enable sound. This site will play a default track when allowed.</p>
            <div className="flex justify-center gap-3">
              <button className="px-4 py-2 bg-main text-main-foreground rounded font-bold border-2 border-black" onClick={async () => {
                const el = audioElRef.current || document.getElementById("default-audio");
                if (!el) return;
                try {
                  el.muted = false;
                  await el.play();
                  setIsPlaying(true);
                  setAutoplayBlocked(false);
                  setIsMuted(false);
                } catch (err) {
                  console.warn('Manual enable failed', err);
                }
              }}>Enable Sound</button>
              <button className="px-4 py-2 bg-transparent border-2 border-white rounded" onClick={() => { setAutoplayBlocked(false); }}>Continue Muted</button>
            </div>
          </div>
        </div>
      )}
      {/* Neo-brutalist Bold Top Header Bar */}
      <header className="sticky top-0 z-50 bg-background border-b-4 border-black dark:border-white py-4 px-6 flex justify-between items-center shadow-[0_4px_0_0_rgba(0,0,0,1)] dark:shadow-[0_4px_0_0_rgba(255,255,255,1)]">
        <div className="flex items-center gap-3">
          <div className="bg-main border-2 border-black p-2 font-black text-xl tracking-tighter uppercase text-main-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            P.BINA // DEV
          </div>
          <div className="hidden md:flex items-center gap-2 border-2 border-black bg-secondary-background px-3 py-1 rounded-base font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none">
            {isPlaying ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-main"></span>
              </span>
            ) : (
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
              </span>
            )}
            <span className="truncate max-w-30">{isPlaying ? currentTrack : "Track Paused"}</span>
            <button onClick={togglePlay} className="ml-2 px-2 py-1 border-2 border-black bg-transparent rounded-sm">{isPlaying ? <Pause className="inline" /> : <Play className="inline" />}</button>
            <button onClick={async () => {
              const el = audioElRef.current || document.getElementById("default-audio");
              if (!el) return;
              try {
                el.muted = !el.muted;
                setIsMuted(el.muted);
              } catch (e) { console.warn(e); }
            }} className="ml-2 px-2 py-1 border-2 border-black bg-transparent rounded-sm">{isMuted ? 'Unmute' : 'Mute'}</button>
          </div>
          {/* DOM audio element used for reliable autoplay (muted) */}
          <audio id="default-audio" ref={audioElRef} style={{ display: "none" }} autoPlay muted loop playsInline />
          {autoplayBlocked && (
            <button onClick={async () => {
              const el = audioElRef.current || document.getElementById("default-audio");
              if (!el) return;
              try {
                el.muted = false;
                await el.play();
                setIsPlaying(true);
                setAutoplayBlocked(false);
              } catch (err) {
                console.warn('Manual enable failed', err);
              }
            }} className="ml-3 px-3 py-1 border-2 border-black bg-main text-main-foreground rounded-base font-bold">Enable Sound</button>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-6 font-bold text-sm">
          <a href="#profile" className="hover:underline hover:text-main">Profile</a>
          <a href="#playground" className="hover:underline hover:text-main">Playground</a>
          <a href="#skills" className="hover:underline hover:text-main">Skills</a>
          <button type="button" onClick={() => openProjectModal(portfolioData.projects[0].id)} className="hover:underline hover:text-main">Projects</button>
          <button type="button" onClick={goToComments} className="hover:underline hover:text-main">Notes</button>
        </nav>

        {/* Dynamic theme Customizer Controls */}
        <div className="flex items-center gap-3">
          {/* Color Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 border-2 border-black bg-secondary-background p-1.5 rounded-base shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setAccentColor(color.hex)}
                className="size-5 rounded-full border-2 border-black transition-all hover:scale-110 active:scale-95"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Dark Mode toggle */}
          <Button
            variant="neutral"
            size="icon"
            onClick={toggleDarkMode}
            className="border-2 border-black bg-secondary-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="size-5 text-amber-500" /> : <Moon className="size-5 text-indigo-900" />}
          </Button>

          {/* Removed FAQ & Contact quick link as requested. */}

          {/* Hamburger Menu Toggle Button */}
          <Button
            variant="neutral"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden border-2 border-black bg-secondary-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Drawer Menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 lg:hidden bg-background border-b-4 border-black dark:border-white p-6 shadow-[0_8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_8px_0_0_rgba(255,255,255,1)] animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 font-black text-lg uppercase tracking-wider mb-6">
            <a 
              href="#profile" 
              onClick={() => setMobileMenuOpen(false)} 
              className="border-2 border-black p-3 bg-secondary-background hover:bg-main hover:text-main-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Profile
            </a>
            <a 
              href="#playground" 
              onClick={() => setMobileMenuOpen(false)} 
              className="border-2 border-black p-3 bg-secondary-background hover:bg-main hover:text-main-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Playground
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)} 
              className="border-2 border-black p-3 bg-secondary-background hover:bg-main hover:text-main-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Skills
            </a>
            <button
              type="button"
              onClick={() => openProjectModal(portfolioData.projects[0].id)}
              className="w-full text-left border-2 border-black p-3 bg-secondary-background hover:bg-main hover:text-main-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => goToComments()}
              className="w-full text-left border-2 border-black p-3 bg-secondary-background hover:bg-main hover:text-main-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Notes
            </button>
          </nav>

          {/* Color Switcher inside Mobile Drawer */}
          <div className="border-2 border-black p-4 bg-secondary-background shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col gap-3">
            <span className="text-xs font-black uppercase text-foreground">Select Accent Matrix:</span>
            <div className="flex gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setAccentColor(color.hex);
                    setMobileMenuOpen(false);
                  }}
                  className="size-8 rounded-full border-2 border-black transition-all hover:scale-110 active:scale-95 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-2 border-black bg-secondary-background px-4 py-2 rounded-base font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            UPTIME: {uptimePercent}%
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 sm:space-y-24">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Hero Left Column: Big Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="default" className="text-sm font-black uppercase py-1 border-2 border-black tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ★ FULLSTACK DEVELOPER & CLOUD ENGINEER ★
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] uppercase">
              I Deploy <span className="bg-main text-main-foreground px-2 border-2 border-black inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">High-Availability</span> Cloud Architectures & Hardened Networks.
            </h1>

            <p className="text-lg sm:text-xl font-bold leading-relaxed text-muted-foreground border-l-4 border-black dark:border-white pl-4 py-1">
              Hi, I'm Patrick. I build highly-scalable web applications, design cloud architectures, and engineer robust full-stack software solutions.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {portfolioData.personalInfo.stats.map((stat, i) => (
                <Card 
                  key={i} 
                  className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:scale-105 transition-all p-4 bg-secondary-background flex flex-col justify-between"
                >
                  <CardTitle className="text-3xl font-black tracking-tighter text-main">{stat.value}</CardTitle>
                  <CardDescription className="text-xs font-black uppercase text-foreground">{stat.label}</CardDescription>
                </Card>
              ))}
            </div>

            {/* Actions CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={() => openProjectModal(portfolioData.projects[0].id)} className="border-2 border-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Inspect System Projects
              </Button>
              <a href="#contact">
                <Button size="lg" variant="neutral" className="border-2 border-black bg-secondary-background font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Execute IT Request
                </Button>
              </a>
              <a 
                href={portfolioData.personalInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center p-3 border-2 border-black rounded-base bg-secondary-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                aria-label="GitHub Link"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a 
                href={portfolioData.personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center p-3 border-2 border-black rounded-base bg-secondary-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                aria-label="LinkedIn Link"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          {/* Hero Right Column: Graphic Avatar + Interactive Command Terminal Console */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Avatar display Card */}
            <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-6 sm:p-8 bg-card relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase py-1 px-2.5 rounded-base">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SYS: ACTIVE
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-6 sm:pt-0">
                {/* Generated Avatar */}
                <div className="size-36 sm:size-44 md:size-52 shrink-0 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden bg-main">
                  <img 
                    src="/profile.jpg" 
                    alt="Patrick Jake T. Biña profile" 
                    className="w-full h-full object-cover object-top transition-all duration-300" 
                  />
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1 pr-0 lg:pr-16">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight pt-2 sm:pt-0">{portfolioData.personalInfo.name}</h3>
                  <p className="text-md font-black text-main uppercase tracking-wider">{portfolioData.personalInfo.title}</p>
                  <p className="text-sm font-bold text-muted-foreground">{portfolioData.personalInfo.location}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-2">
                    <Badge variant="neutral" className="border-2 border-black bg-secondary-background text-[11px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">AWS Certified</Badge>
                    <Badge variant="neutral" className="border-2 border-black bg-secondary-background text-[11px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Google Certified</Badge>
                    <Badge variant="neutral" className="border-2 border-black bg-secondary-background text-[11px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">DTI Misamis Oriental Coursera Scholar</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interactive Shell Terminal */}
            <div className="border-4 border-black dark:border-white bg-neutral-950 text-emerald-400 font-mono text-sm shadow-[5px_5px_0_0_rgba(0,0,0,1)] dark:shadow-[5px_5px_0_0_rgba(255,255,255,1)]">
              {/* Terminal Titlebar */}
              <div className="bg-neutral-800 text-neutral-300 px-4 py-2 border-b-2 border-black flex justify-between items-center font-bold text-xs select-none">
                <div className="flex items-center gap-1.5">
                  <Terminal className="size-4 text-emerald-400" />
                  <span>SECURE_SHELL://patrick@bina-dev.net</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-red-500"></span>
                  <span className="size-2.5 rounded-full bg-yellow-500"></span>
                  <span className="size-2.5 rounded-full bg-green-500"></span>
                </div>
              </div>

              {/* Terminal Logs Content */}
              <div className="p-4 h-60 overflow-y-auto space-y-2.5 custom-scrollbar">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                    {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Box */}
              <form onSubmit={handleTerminalSubmit} className="flex border-t border-neutral-800 bg-neutral-900 px-4 py-2">
                <span className="text-emerald-500 select-none mr-2 font-bold">admin@bina-dev:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent text-emerald-400 focus:outline-none flex-1 font-mono"
                  placeholder="type 'help'..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button type="submit" className="hidden">Submit</button>
              </form>
            </div>
          </div>
        </section>
        {/* Project Image Modal */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
            <div className="bg-white dark:bg-zinc-900 border-4 border-black rounded-base shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-4xl w-full relative">
              <button onClick={closeProjectModal} className="absolute top-3 right-3 border-2 border-black bg-secondary-background p-2 rounded-base">Close</button>
              <img src={modalImageSrc} alt="Project" className="w-full h-auto object-cover rounded-sm" />
            </div>
          </div>
        )}

        {/* TOP PROJECTS (featured on landing for employers) */}
        <section id="top-projects" className="py-6 border-y-4 border-black scroll-mt-20 bg-secondary-background">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="default" className="text-sm font-black py-1 border-2 border-black tracking-widest uppercase">
              ★ TOP PROJECTS — FOR EMPLOYERS ★
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black uppercase"> Projects</h2>
            <p className="text-lg font-bold text-muted-foreground">Selected work with demos and concise details — prioritized for hiring review.</p>
          </div>

          <div className="space-y-6 max-w-7xl mx-auto pt-6">
            {portfolioData.projects.slice(0,4).map((project) => (
              <Card key={project.id} className="border-2 border-black bg-card p-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Image column */}
                  <div className="md:w-2/5 h-48 md:h-auto bg-zinc-100 dark:bg-zinc-800 border-b-2 md:border-b-0 md:border-r-2 border-black flex items-center justify-center overflow-hidden">
                    <img
                      src={project.image || '/projects/placeholder.png'}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details column */}
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">{project.title}</h3>
                      <p className="text-sm font-bold text-muted-foreground mt-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="neutral" className="border border-black bg-white text-[10px] font-bold px-2 py-0.5">#{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                        <Button size="sm" variant="neutral" className="border-2 border-black bg-white font-black uppercase text-[10px] w-full">
                          <Play className="size-3 text-main mr-1" /> Demo
                        </Button>
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                        <Button size="sm" className="border-2 border-black font-black uppercase text-[10px] w-full">Code</Button>
                      </a>
                      <Button size="sm" variant="ghost" className="border-2 border-black font-black uppercase text-[10px] flex-1 sm:flex-none" onClick={() => setExpandedProject(project.id)}>
                        Inspect Specs
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CERTIFICATES & EXPERTISE */}
        <section id="certificates-expertise" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="default" className="text-sm font-black py-1 border-2 border-black tracking-widest uppercase">
              ★ CERTIFICATES & EXPERTISE ★
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black uppercase">Certifications & Key Expertise</h2>
            <p className="text-lg font-bold text-muted-foreground">Representative certifications and condensed expertise areas for quick employer review.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto pt-6">
            {/* Certificates Column */}
            <div>
              <Card className="border-2 border-black bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black uppercase">Certificates</h3>
                <div className="mt-4 space-y-3">
                  {portfolioData.certifications.slice(0,4).map((cert, i) => (
                    <div key={i} className="flex justify-between items-start border-2 border-black p-3 bg-secondary-background">
                      <div>
                        <div className="font-black uppercase">{cert.name}</div>
                        <div className="text-xs font-bold text-muted-foreground">{cert.issuer} • {cert.date}</div>
                      </div>
                      <div className="text-xs font-bold text-main">{cert.code || "—"}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Expertise Column */}
            <div>
              <Card className="border-2 border-black bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black uppercase">Key Expertise</h3>
                <p className="mt-2 text-sm font-bold text-muted-foreground">Concise areas of strength employers look for.</p>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {portfolioData.skills.map((cat, idx) => (
                    <div key={idx} className="p-3 border-2 border-black bg-white dark:bg-zinc-800">
                      <div className="font-black uppercase">{cat.category}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cat.items.slice(0,4).map((it) => (
                          <Badge key={it.name} variant="neutral" className="border border-black bg-secondary-background text-[10px] font-bold px-2 py-0.5">{it.name}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* COMMENTS / MESSAGE BOX moved to Playground Arcade for better UX */}

        {/* PROFILE SECTION */}
        <section id="profile" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="default" className="text-sm font-black py-1 border-2 border-black tracking-widest uppercase">
              ★ DEVELOPER DOSSIER ★
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black uppercase">Professional Profile</h2>
            <p className="text-lg font-bold text-muted-foreground">
              A comprehensive file of competencies, educational scholar paths, and coding philosophies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Dossier Left: Main Dossier Card */}
            <div className="lg:col-span-8">
              <Card className="border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-6 md:p-8 space-y-6 relative overflow-hidden">
                {/* Dossier Watermark / Stamp */}
                <div className="absolute -bottom-8 -right-8 opacity-5 dark:opacity-10 transform -rotate-12 select-none pointer-events-none">
                  <div className="border-8 border-black text-6xl font-black p-4 uppercase tracking-widest">
                    VERIFIED
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-black pb-4">
                  <div>
                    <span className="text-xs font-black uppercase text-main bg-main/10 px-2 py-0.5 border border-main rounded-base">STATUS: ACTIVE DEVELOPER</span>
                    <h3 className="text-3xl font-black uppercase tracking-tight mt-1">Patrick Jake T. Biña</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-muted-foreground uppercase block">Dossier ID</span>
                    <span className="font-mono text-sm font-bold bg-secondary-background border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] inline-block">PJB-FS-2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-black uppercase text-muted-foreground">Primary Focus</h4>
                      <p className="font-bold text-md uppercase text-main mt-0.5">Fullstack Engineering & Cloud Architectures</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-muted-foreground">Current Sector</h4>
                      <p className="font-bold text-md mt-0.5">Philippines Cagayan de Oro City</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-muted-foreground">Scholar Credentials</h4>
                      <p className="font-bold text-sm mt-0.5 leading-relaxed">
                        Received the prestigious <span className="bg-main/20 border-b-2 border-black px-1">DTI Misamis Oriental Coursera Scholarship</span>, compiling multiple certifications across Google Analyst and AWS pathways.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-black uppercase text-muted-foreground">Core Competency Statement</h4>
                      <p className="font-bold text-sm text-muted-foreground leading-relaxed mt-0.5">
                        "I bridge the gap between heavy, secure cloud computing infrastructure and fast, responsive, and gorgeous modern user experiences. I specialize in Next.js, Node environments, AWS, and neobrutalist interface systems."
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-muted-foreground">Dev Methodology</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="neutral" className="border border-black bg-white text-[10px] font-bold">Zero-Trust Config</Badge>
                        <Badge variant="neutral" className="border border-black bg-white text-[10px] font-bold">IaC Deployment</Badge>
                        <Badge variant="neutral" className="border border-black bg-white text-[10px] font-bold">Responsive UI/UX</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Dossier Right: Key Pillars */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="border-2 border-black bg-secondary-background p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight text-main border-b-2 border-black pb-2 mb-3">Academic Foundation</h4>
                  <p className="text-sm font-bold leading-relaxed text-muted-foreground">
                    Deep conceptual foundations in analytical programming, cloud automation infrastructure, and interactive frontend paradigms via active training and self-directed scholarly pipelines.
                  </p>
                </div>
                <div className="pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">VERIFICATION LEVEL</span>
                  <div className="h-4 bg-white border-2 border-black rounded-base overflow-hidden relative mt-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <div className="h-full bg-main w-[90%] border-r border-black" />
                  </div>
                </div>
              </Card>

              <Card className="border-2 border-black bg-secondary-background p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight text-main border-b-2 border-black pb-2 mb-3">Philosophical Pillars</h4>
                  <ul className="text-xs font-bold space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-1.5"><span className="text-main">✔</span> Write declarative, scalable code.</li>
                    <li className="flex items-center gap-1.5"><span className="text-main">✔</span> Automate deployment vectors fully.</li>
                    <li className="flex items-center gap-1.5"><span className="text-main">✔</span> Design robust, visual, zero-placeholder UIs.</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* PLAYGROUND (MINI GAMES) SECTION */}
        <section id="playground" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="default" className="text-sm font-black py-1 border-2 border-black tracking-widest uppercase">
              ★ SYSTEM SANDBOX ★
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black uppercase">Playground Arcade</h2>
            <p className="text-lg font-bold text-muted-foreground">
              Take a break from inspect mode and play a fully-interactive retro Snake Game.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Game Console Frame */}
            <div className="md:col-span-8 border-4 border-black dark:border-white bg-card rounded-base p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] space-y-4">
              <div className="flex justify-between items-center bg-secondary-background border-2 border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground block">SCORE</span>
                    <span className="text-xl font-black font-mono text-main">{snakeScore}</span>
                  </div>
                  <div className="border-l border-black/20 h-8" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground block">HIGH SCORE</span>
                    <span className="text-xl font-black font-mono">{snakeHighScore}</span>
                  </div>
                </div>
                
                <Badge variant="neutral" className="text-[9px] font-bold border border-black bg-white">
                  🔊 Sound Synth Active
                </Badge>
              </div>

              {/* Game Viewport Container */}
              <div className="relative aspect-square md:h-100 md:w-100 mx-auto bg-neutral-950 border-4 border-black rounded-base overflow-hidden flex flex-col justify-center items-center">
                {/* Visual grid behind the game */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[20px_20px]" />

                {/* Game Board */}
                {gameStarted && !snakeGameOver ? (
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    {/* Render Food block */}
                    <rect 
                      x={food.x * 20} 
                      y={food.y * 20} 
                      width="20" 
                      height="20" 
                      className="fill-rose-500 stroke-black stroke-2 animate-pulse" 
                    />
                    {/* Render Snake blocks */}
                    {snake.map((seg, idx) => (
                      <rect 
                        key={idx}
                        x={seg.x * 20} 
                        y={seg.y * 20} 
                        width="20" 
                        height="20" 
                        rx={idx === 0 ? "4" : "1"}
                        className={`${idx === 0 ? "fill-main" : "fill-main/80"} stroke-black stroke-2`} 
                      />
                    ))}
                  </svg>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-neutral-950/95 space-y-4 z-10 text-white select-none">
                    {snakeGameOver ? (
                      <div className="space-y-2">
                        <h4 className="text-3xl font-black uppercase tracking-tight text-rose-500">SYSTEM CRASHED</h4>
                        <p className="font-mono text-sm text-neutral-400 font-bold">GAME OVER. Snake collided with standard perimeter rules.</p>
                        <p className="text-xs text-neutral-500 italic">Session Tag: <span className="text-main not-italic">{currentGamerTag}</span></p>
                        <p className="text-xs text-neutral-500">Final Score: {snakeScore} pts</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black uppercase tracking-tight text-emerald-400">Neo-Snake Sandbox</h4>
                        <p className="text-sm font-bold text-neutral-400 max-w-xs mx-auto">Play a quick session to test browser capabilities and score logic.</p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={startSnakeGame}
                      className="border-2 border-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    >
                      {snakeGameOver ? "Reboot & Play Again" : "Boot Up Game Session"}
                    </Button>
                    <p className="text-[10px] text-neutral-500 font-bold font-mono">Controls: W/A/S/D or Arrow Keys</p>
                  </div>
                )}
              </div>

              {/* On-screen controls for mobile/tablet */}
              <div className="flex flex-col items-center gap-1 max-w-50 mx-auto pt-2 md:hidden">
                <Button 
                  size="sm" 
                  variant="neutral" 
                  onClick={() => { if (direction !== "DOWN") setDirection("UP"); }}
                  className="border-2 border-black font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-2 size-10 flex items-center justify-center"
                >
                  ▲
                </Button>
                <div className="flex gap-10">
                  <Button 
                    size="sm" 
                    variant="neutral" 
                    onClick={() => { if (direction !== "RIGHT") setDirection("LEFT"); }}
                    className="border-2 border-black font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-2 size-10 flex items-center justify-center"
                  >
                    ◀
                  </Button>
                  <Button 
                    size="sm" 
                    variant="neutral" 
                    onClick={() => { if (direction !== "LEFT") setDirection("RIGHT"); }}
                    className="border-2 border-black font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-2 size-10 flex items-center justify-center"
                  >
                    ▶
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="neutral" 
                  onClick={() => { if (direction !== "UP") setDirection("DOWN"); }}
                  className="border-2 border-black font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-2 size-10 flex items-center justify-center"
                >
                  ▼
                </Button>
              </div>
            </div>

            {/* Playground Instructions Card */}
            <div className="md:col-span-4 space-y-6">
              <Card className="border-2 border-black bg-secondary-background p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <h4 className="text-lg font-black uppercase tracking-tight text-main border-b-2 border-black pb-2">Arcade Rules</h4>
                <ul className="text-xs font-bold space-y-2 text-muted-foreground leading-relaxed">
                  <li>🍎 Collect red code packages to grow and gain +10 score points.</li>
                  <li>💥 Do not collide with the outer border or the snake's tail.</li>
                  <li>🎹 W/A/S/D or Arrow keys are supported on keyboard configurations.</li>
                  <li>🔊 Audio tones are generated programmatically via Web Synthesizers!</li>
                </ul>
              </Card>

              <Card className="border-2 border-black bg-secondary-background p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-main">PERSISTENT CACHE STATE</span>
                <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                  High score is monitored inside the client scope, ideal for sandbox performance testing.
                </p>
              </Card>

              {/* Leaderboard Card */}
              <Card className="border-2 border-black bg-secondary-background p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <h4 className="text-lg font-black uppercase tracking-tight text-main border-b-2 border-black pb-2 flex justify-between items-center">
                  <span>Leaderboard</span>
                  <Trophy className="size-5" />
                </h4>
                <div className="space-y-2">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-bold border-b border-black/5 pb-1 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 flex items-center justify-center rounded-full text-[10px] ${idx === 0 ? "bg-main text-white" : "bg-neutral-200 text-black"}`}>
                            {entry.rank}
                          </span>
                          <span className="truncate max-w-25">{entry.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-main">{entry.score}</span>
                          <span className="text-[9px] text-muted-foreground font-normal">{entry.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-center text-muted-foreground py-4">No scores yet. Be the first!</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>

      </main>

        {/* COMMENTS / MESSAGE BOX (random animal usernames) - moved under Playground Arcade */}
        <section id="comments" className="space-y-6 max-w-3xl mx-auto scroll-mt-20">
          <h3 className="text-2xl font-black uppercase text-center">Visitor Notes</h3>
          <Card className="border-2 border-black p-4 bg-card">
            <form onSubmit={postComment} className="space-y-3">
              <textarea
                id="comment-input"
                ref={commentRef}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Leave a short comment for employers to see..."
                rows={3}
                className="w-full border-2 border-black rounded-base p-3 font-bold bg-white dark:bg-zinc-800"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <div className="text-xs text-muted-foreground max-w-md">Your username will be randomly generated (example: bunnyhoney123).</div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Button type="button" variant="neutral" onClick={() => setCommentInput('')} className="border-2 border-black font-black uppercase text-xs w-1/2 sm:w-auto">Clear</Button>
                  <Button type="submit" className="border-2 border-black font-black uppercase text-xs w-1/2 sm:w-auto">Post Note</Button>
                </div>
              </div>
            </form>

            <div className="mt-4 space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="p-3 border-2 border-black bg-secondary-background">
                  <div className="flex justify-between items-start">
                    <div className="font-black">{c.user}</div>
                    <div className="text-xs text-muted-foreground">{new Date(c.time).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 font-bold">{c.message}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-black dark:border-white bg-secondary-background py-12 px-6 mt-24 text-center space-y-6 shadow-[0_-4px_0_0_rgba(0,0,0,1)] select-none">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-xl font-black uppercase tracking-tight text-main">PATRICK JAKE T. BIÑA // DEV SYSTEMS</h4>
            <p className="text-xs font-bold text-muted-foreground">Building modern web applications. Architecting cloud infrastructures. Creating robust systems.</p>
          </div>

          <div className="flex gap-4">
            <a 
              href={portfolioData.personalInfo.github} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 border-2 border-black rounded-base bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all"
              aria-label="GitHub Profile"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            <a 
              href={portfolioData.personalInfo.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 border-2 border-black rounded-base bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all"
              aria-label="LinkedIn Profile"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a 
              href={portfolioData.personalInfo.twitter} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 border-2 border-black rounded-base bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all"
            >
              <Globe className="size-5" />
            </a>
          </div>
        </div>

        <div className="text-xs font-black uppercase tracking-wider text-muted-foreground border-t-2 border-neutral-300 dark:border-zinc-800 pt-6 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} PATRICK JAKE T. BIÑA. ALL SHELLS INTACT.</span>
          <span>DESIGNED VIA NEOBRUTALISM & SHADCN/UI.</span>
        </div>
      </footer>
    </div>
  );
}
