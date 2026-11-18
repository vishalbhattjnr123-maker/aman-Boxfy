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
    Clapperboard,
    Film,
    ArrowUpRight,
    Users,
} from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    specialties: string[];
    avatar: string;
    badge: string;
    gradient: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Aman Sharma",
        role: "Founder & Creative Director",
        bio: "Visionary filmmaker and creative director pioneering AI cinema, 3D worldbuilding, and next-gen storytelling across international projects.",
        specialties: ["AI Cinema", "Creative Direction", "3D Storytelling"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        badge: "Studio Head",
        gradient: "from-pink-500 via-purple-600 to-indigo-700",
    },
    {
        name: "Vishal Bhatt",
        role: "Lead AI Technical Director",
        bio: "Architect behind Boxfy's neural rendering pipelines, generative AI workflows, and cinematic 4K production technologies.",
        specialties: ["Generative AI", "Neural Rendering", "Pipeline Arch"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        badge: "Tech Architect",
        gradient: "from-blue-500 via-indigo-600 to-purple-700",
    },
    {
        name: "Rhea Kapoor",
        role: "Head of 3D & Character Design",
        bio: "Master character artist bringing digital superheroes and expressive animations to life with advanced rigging and stylized CGI physics.",
        specialties: ["Character Modeling", "3D Rigging", "Stylized Animation"],
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        badge: "Lead Animator",
        gradient: "from-purple-500 via-pink-600 to-red-600",
    },
    {
        name: "Kabir Verma",
        role: "Director of VFX & Audio-Visuals",
        bio: "Cinematographer and sound engineer specializing in high-octane visual effects, spatial soundscapes, and cinematic color mastery.",
        specialties: ["Cinematic VFX", "Spatial Audio", "Color Grading"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        badge: "VFX Master",
        gradient: "from-amber-500 via-red-600 to-purple-700",
    },
];

export const OurTeam = () => {
    const phoneNumber = "+91-9115511252";
    const rawPhone = "919115511252";

    return (
        <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0d0d12] to-[#0a0a0a]">
            {/* Ambient Backlight Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 px-3.5 py-1 rounded-full text-pink-400 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                            <span>BOXFY CREATIVE FORCES</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Meet Our Visionary Team
                        </h2>
                        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-3 max-w-2xl leading-relaxed">
                            A multidisciplinary collective of AI filmmakers, 3D animators, character designers, and creative technologists pushing the frontiers of digital entertainment.
                        </p>
                    </div>

                    {/* Quick Call Pill */}
                    <a
                        href={`tel:${rawPhone}`}
                        className="self-start md:self-auto flex items-center gap-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-purple-600/25 transition-all hover:scale-105 active:scale-95 border border-white/20"
                    >
                        <Phone className="w-4 h-4 fill-current animate-pulse" />
                        <span>Direct Studio Line: {phoneNumber}</span>
                    </a>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="relative group bg-zinc-950/80 rounded-2xl border border-white/10 hover:border-purple-500/40 p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300"
                        >
                            {/* Card Top Glow Ribbon */}
                            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${member.gradient}`} />

                            <div>
                                {/* Avatar & Badge */}
                                <div className="relative mb-5 flex items-center justify-between">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all shadow-lg">
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            fill
                                            sizes="100px"
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <span className="bg-white/10 border border-white/15 text-zinc-300 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                        {member.badge}
                                    </span>
                                </div>

                                {/* Names and Role */}
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wider">
                                    {member.role}
                                </p>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                                    {member.bio}
                                </p>
                            </div>

                            {/* Skills Pills */}
                            <div>
                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                                    {member.specialties.map((spec) => (
                                        <span
                                            key={spec}
                                            className="bg-black/60 text-zinc-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/10"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Studio Collaboration Banner with Contact Info */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/15 p-8 sm:p-10 md:p-12 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-indigo-600/10 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                                <span className="text-green-400 font-bold text-xs uppercase tracking-widest">
                                    Available for New Productions & Collaborations
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                                Ready to Bring Your Vision to Life?
                            </h3>
                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                                Get in touch with our creative directors for 3D animation, AI cinematic filmmaking, brand commercials, and next-gen digital experiences.
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
                                href={`https://wa.me/${rawPhone}?text=${encodeURIComponent("Hello Boxfy AI Studio! I would like to inquire about your creative productions.")}`}
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
