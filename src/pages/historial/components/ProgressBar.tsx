import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  currentHours: number; // Horas actuales
  totalHours: number;   // Total de horas
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentHours, totalHours }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0); // Estado para la animación
  const percentage = Math.min((currentHours / totalHours) * 100, 100); // Calcula el porcentaje (máximo 100%)
  const isCompleted = currentHours >= totalHours; // Verifica si se completaron las horas

  useEffect(() => {
    // Animación: Incrementa gradualmente hasta alcanzar el porcentaje
    const interval = setInterval(() => {
      setAnimatedWidth((prev) => {
        if (prev >= percentage) {
          clearInterval(interval);
          return percentage;
        }
        return prev + 1; // Incrementa por 1% cada vez
      });
    }, 0); // Ajusta el intervalo para controlar la velocidad
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [percentage]);

  return (
    <div style={{ width: "100%", margin: "20px 0", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
        <span style={{ fontWeight: "bold", fontSize: "14px" }}></span>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#6d1510" }}>
          {animatedWidth.toFixed(1)}%
        </span>
      </div>
      <div style={{ position: "relative", height: "30px", background: "#ede4e4", borderRadius: "5px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${animatedWidth}%`,
            background: "#6d1510",
            borderRadius: "5px",
            transition: "width 0.5s ease-in-out", // Transición suave
          }}
        ></div>
      </div>
      <div style={{ marginTop: "5px", fontSize: "12px", textAlign: "center", color: "#666" }}>
        {isCompleted 
          ? "Programa de formación completado" 
          : `${currentHours} horas de ${totalHours} horas`}
      </div>
    </div>
  );
};

export default ProgressBar;
