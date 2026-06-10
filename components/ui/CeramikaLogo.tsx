export function CeramikaLogo({ className = "h-6 w-auto" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 220 32"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Geometric minimalist tile monogram */}
            <g className="text-[#a68038] dark:text-[#c8a96e]">
                <rect x="4" y="16" width="12" height="12" transform="rotate(-45 4 16)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <rect x="14" y="16" width="12" height="12" transform="rotate(-45 14 16)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" fill="currentColor" />
                <rect x="9" y="8" width="12" height="12" transform="rotate(-45 9 8)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.2" fill="currentColor" />
            </g>
            
            {/* Elegant Typography */}
            <text
                x="44"
                y="22"
                fontFamily="'Georgia', serif"
                fontSize="21"
                fontWeight="900"
                fill="currentColor"
                letterSpacing="0.1em"
            >
                CeramiKa
            </text>
        </svg>
    );
}
