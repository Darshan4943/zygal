import React, { useEffect, useRef, useState } from "react";
import styles from './canva.module.css'
const Canvas = () => {
  const canvasRef = useRef(null);
  const [pixelColor, setPixelColor] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const canvasWidth = 16;
    const canvasHeight = 34;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.fillStyle = "orange";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = "black";
    context.font = "20px Times New Roman";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("D", centerX, centerY);

   
    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = imageData.data;
    let colorData = "";
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i].toString(16).padStart(2, "0");
      const g = pixels[i + 1].toString(16).padStart(2, "0");
      const b = pixels[i + 2].toString(16).padStart(2, "0");
      colorData += `#${r}${g}${b}\n`;
    }
    setPixelColor(colorData);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([pixelColor], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixel.txt";
    link.click();
  };

  return (
    <div className={styles.main} >
      <canvas ref={canvasRef} />

      <button className={styles.button} onClick={handleDownload}>Download Pixel Color</button>
    </div>
  );
};

export default Canvas;