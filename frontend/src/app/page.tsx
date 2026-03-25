'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Zap, Users, Shield, Sparkles } from 'lucide-react';

const features = [
  { icon: MessageCircle, title: 'Real-Time Chat', desc: 'Lightning-fast 1-to-1 and group messaging powered by WebSockets.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Built-in Groq-powered AI that drafts replies, summarizes, and translates.' },
  { icon: Users, title: 'Group Chats', desc: 'Collaborate in real-time with multi-member group conversations.' },
  { icon: Shield, title: 'JWT Auth', desc: 'Secure login & signup with industry-standard JSON Web Token auth.' },
  { icon: Zap, title: 'Typing Indicators', desc: 'Know when someone is typing to you. Live presence tracking.' },
  { icon: Sparkles, title: 'Beautiful UI', desc: 'Glassmorphism design with smooth Framer Motion animations.' },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/60 backdrop-blur-lg border-b border-white/5">
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          💬 Talksy
        </span>
        <div className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="ghost" className="text-neutral-300 hover:text-white rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/chat">
            <Button className="rounded-full px-6 bg-white text-black hover:bg-neutral-200 font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden border-none rounded-none">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          <div className="flex flex-col md:flex-row h-full pt-20 md:pt-0">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 w-fit backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-neutral-300 font-medium">AI-Powered Chat Platform</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-[1.1] tracking-tight">
                Chat Smarter.
                <br />
                Talk Better.
              </h1>
              <p className="mt-6 text-neutral-400 max-w-lg text-lg leading-relaxed">
                Real-time conversations supercharged with AI. Connect with friends, 
                collaborate in groups, and let our AI assistant handle the rest.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/chat">
                  <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-neutral-200 font-semibold text-base h-12 shadow-lg shadow-white/10">
                    Enter Chat →
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white font-medium text-base h-12">
                  Learn More
                </Button>
              </div>

              {/* Social proof */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['photo-1494790108377-be9c29b29330', 'photo-1535713875002-d1d0cf377fde', 'photo-1522071820081-009f0129c71c'].map((id, i) => (
                    <img key={i} src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop`} alt="" className="w-9 h-9 rounded-full border-2 border-black object-cover" />
                  ))}
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="text-neutral-300 font-medium">2,400+</span> people already chatting
                </p>
              </div>
            </motion.div>

            {/* Right content - 3D Spline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="flex-1 relative min-h-[350px] md:min-h-full"
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </Card>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="relative w-full py-24 px-6 md:px-16 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-4">
              Everything you need
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto text-lg">
              A complete chat experience with AI superpowers, built for speed and delight.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:bg-neutral-900/80 group rounded-2xl h-full backdrop-blur-sm">
                  <div className="p-2.5 bg-white/5 rounded-xl w-fit mb-4 group-hover:bg-white/10 transition-colors">
                    <f.icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative w-full py-24 px-6 md:px-16 bg-black border-t border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to start chatting?
          </h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of users who are already experiencing the future of real-time AI-powered communication.
          </p>
          <Link href="/chat">
            <Button size="lg" className="rounded-full px-12 bg-white text-black hover:bg-neutral-200 font-semibold text-base h-14 shadow-lg shadow-white/10">
              Launch Talksy →
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full py-8 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-500">© 2026 Talksy. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="text-sm text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors">Privacy</span>
            <span className="text-sm text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors">Terms</span>
            <span className="text-sm text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
