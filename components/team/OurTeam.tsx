"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Phone,
    MessageCircle,
    Mail,
    MapPin,
    Sparkles,
    Award,
    Briefcase,
    Crown,
    Film,
    ArrowUpRight,
} from "lucide-react";

interface ExecutiveLeader {
    name: string;
    role: string;
    subtitle: string;
    bio: string;
    focusAreas: string[];
    avatar: string;
    badge: string;
    badgeIcon: any;
    gradient: string;
    borderGlow: string;
}

const leaders: ExecutiveLeader[] = [
    {
        name: "Dr. Ajay Sharma",
        role: "Chief Executive Officer (CEO)",
        subtitle: "Executive Leadership & Global Strategy",
        bio: "Leading Boxfy AI Studio's global vision, strategic alliances, and enterprise growth. Spearheading the convergence of creative technologies, AI innovation, and next-generation digital media production.",
        focusAreas: ["Strategic Leadership", "Global Expansion", "AI Innovation", "Creative Technology"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        badge: "Chief Executive Officer",
        badgeIcon: Crown,
        gradient: "from-amber-500 via-pink-600 to-purple-600",
        borderGlow: "group-hover:border-amber-500/50 group-hover:shadow-amber-500/20",
    },
    {
        name: "Aman Attal",
        role: "Founder & Creative Director",
        subtitle: "Creative Direction & Cinematic Vision",
        bio: "The driving creative visionary behind Boxfy AI Studio's original intellectual properties, 3D character animations, and AI film pipelines. Transforming bold futuristic concepts into immersive cinema-grade productions.",
        focusAreas: ["Creative Direction", "AI Filmmaking", "3D Animation", "Original Content"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        badge: "Founder & Director",
        badgeIcon: Film,
        gradient: "from-pink-500 via-purple-600 to-indigo-600",
        borderGlow: "group-hover:border-pink-500/50 group-hover:shadow-pink-500/20",
    },
];

export const OurTeam = () => {
    const phoneNumber = "+91-9115511252";
    const rawPhone = "919115511252";

    return (
        <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0d0d12] to-[#0a0a0a]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-600/15 via-purple-600/15 to-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-purple-500/30 px-4 py-1.5 rounded-full text-pink-400 text-xs font-bold tracking-widest uppercase mb-3.5 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                            <span>STUDIO LEADERSHIP</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Meet Our Visionary Leadership
                        </h2>
                        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-3 max-w-2xl leading-relaxed font-normal">
                            Guided by experienced executive leadership and groundbreaking creative direction at the forefront of AI cinema, 3D animation, and modern digital media.
                        </p>
                    </div>

                    {/* Direct Call Button */}
                    <a
                        href={`tel:${rawPhone}`}
                        className="self-start md:self-auto flex items-center gap-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 border border-white/20 shrink-0"
                    >
                        <Phone className="w-4 h-4 fill-current animate-pulse text-amber-300" />
                        <span>Direct Studio Line: {phoneNumber}</span>
                    </a>
                </div>

                {/* 2-Column Executive Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {leaders.map((leader, index) => {
                        const Icon = leader.badgeIcon;
                        return (
                            <motion.div
                                key={leader.name}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -6 }}
                                className={`relative group bg-zinc-950/90 rounded-3xl border border-white/10 ${leader.borderGlow} p-7 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300`}
                            >
                                {/* Top Gradient Accent Line */}
                                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${leader.gradient}`} />

                                {/* Ambient Corner Highlight */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${leader.gradient} opacity-15 rounded-full blur-2xl group-hover:opacity-30 transition-opacity pointer-events-none`} />

                                <div>
                                    {/* Top Profile Strip */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-white/15 group-hover:ring-white/40 transition-all shadow-2xl shrink-0">
                                                <Image
                                                    src={leader.avatar}
                                                    alt={leader.name}
                                                    fill
                                                    sizes="140px"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-pink-300 mb-2 backdrop-blur-md">
                                                    <Icon className="w-3 h-3 text-amber-400" />
                                                    <span>{leader.badge}</span>
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-pink-400 transition-colors tracking-tight">
                                                    {leader.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent mt-0.5">
                                                    {leader.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Executive Bio */}
                                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                                        {leader.bio}
                                    </p>
                                </div>

                                {/* Focus Areas / Strategic Pillars */}
                                <div className="pt-4 border-t border-white/10">
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-2.5">
                                        Executive Pillars & Domain Expertise
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {leader.focusAreas.map((area) => (
                                            <span
                                                key={area}
                                                className="bg-zinc-900/90 text-zinc-300 text-xs font-semibold px-3 py-1 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Collaboration & Contact Card */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/15 p-8 sm:p-10 md:p-12 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-indigo-600/10 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                                <span className="text-green-400 font-bold text-xs uppercase tracking-widest">
                                    Direct Executive Office & Production Inquiries
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                                Connect With Boxfy Leadership
                            </h3>
                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                                For high-impact brand commercials, 3D character animation pipelines, AI filmmaking, or strategic partnerships, reach out directly to our leadership desk.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs sm:text-sm text-zinc-400">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-pink-500" /> Chandigarh, India
                                </span>
                                <span className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-purple-400" /> hello@boxfy.co.in
                                </span>
                                <span className="flex items-center gap-2 text-white font-bold">
                                    <Phone className="w-4 h-4 text-green-400" /> {phoneNumber}
                                </span>
                            </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                            <a
                                href={`tel:${rawPhone}`}
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-xl shadow-pink-600/25 active:scale-95"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Call: {phoneNumber}</span>
                            </a>

                            <a
                                href={`https://wa.me/${rawPhone}?text=${encodeURIComponent("Hello Dr. Ajay Sharma & Aman Attal! I would like to inquire about creative collaboration with Boxfy AI Studio.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-xl shadow-green-600/25 active:scale-95"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
