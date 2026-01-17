import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    repeat?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
    children,
    width = "100%",
    delay = 0,
    className = "",
    repeat = false
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: !repeat, margin: "-20px" });

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
