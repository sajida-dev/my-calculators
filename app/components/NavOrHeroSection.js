"use client";
import { usePathname } from 'next/navigation';
import Hero from './Hero';
import SecondaryNav from './SecondaryNav';

export default function NavOrHeroSection() {
    const pathname = usePathname();
    return pathname === '/' ? <Hero /> : <SecondaryNav />;
} 