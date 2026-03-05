import { useEffect, useRef } from 'react';

export function useMagneticEffect(maxMove = 8) {
    const ref = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Desktop only — skip on touch devices
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const onMouseEnter = () => {
            el.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = ((e.clientX - cx) / (rect.width / 2)) * maxMove;
            const dy = ((e.clientY - cy) / (rect.height / 2)) * maxMove;
            el.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
            el.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        };

        const onMouseLeave = () => {
            el.style.transform = 'translate(0, 0) scale(1)';
            el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        };

        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);

        return () => {
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [maxMove]);

    return ref;
}
