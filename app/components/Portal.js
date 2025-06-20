"use client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }) {
    const [mounted, setMounted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        ref.current = document.body;
        setMounted(true);
    }, []);

    return mounted && ref.current ? createPortal(children, ref.current) : null;
} 