"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const dodgeDistance = 120;

  const moveButton = (e: MouseEvent) => {
    if (!noButtonRef.current) return;

    const rect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - buttonCenterX;
    const dy = e.clientY - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < dodgeDistance) {
      const newX = Math.random() * (window.innerWidth - rect.width - 20);
      const newY = Math.random() * (window.innerHeight - rect.height - 20);

      setNoPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveButton);
    return () => window.removeEventListener("mousemove", moveButton);
  }, []);

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-pink-100 overflow-hidden px-6 text-center">
      {!accepted ? (
        <div className="transition-all duration-500 ease-in-out">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
            💖 Will you be my Valentine? 💖
          </h1>

          <div className="flex gap-6 justify-center items-center relative">
            <button
              onClick={() => setAccepted(true)}
              className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              Sí 💘
            </button>

            <button
              ref={noButtonRef}
              style={{
                position: "absolute",
                left: noPosition.x,
                top: noPosition.y,
              }}
              className="px-8 py-3 bg-gray-400 text-white rounded-full shadow-lg transition-all duration-300"
            >
              No 😅
            </button>
          </div>

          <p className="mt-6 text-pink-500 text-lg">
            No intentes picarle al no💕✨
          </p>
        </div>
      ) : (
        <div className="transition-all duration-700 ease-in-out">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 animate-fadeIn">
  Sabía que dirías que si. Te amo mucho ❤️ <br />
  Prepárate para el desayuno el 14 de febrero a las 10:00.
</h2>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <span
                key={i}
                className="absolute text-pink-400 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 24 + 16}px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                💖
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

