import React, { useEffect, useRef } from "react";
import socket from "../socket";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false); // Ref to track drawing state

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctxRef.current = ctx;

    // Function to draw on the canvas
    const draw = (x: number, y: number, emit = false) => {
      if (!ctxRef.current) return;
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
      if (emit) {
        socket.emit("draw", { x, y });
      }
    };

    // Mouse down handler
    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true;
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top
      );
    };

    // Mouse up handler
    const handleMouseUp = () => {
      if (isDrawing.current) {
        ctxRef.current?.closePath(); // Close the path
      }
      isDrawing.current = false; // Stop drawing
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      const offsetX = e.clientX - canvas.getBoundingClientRect().left;
      const offsetY = e.clientY - canvas.getBoundingClientRect().top;
      draw(offsetX, offsetY, true); // Draw locally and emit the coordinates
    };

    // Draw event from other users
    const handleDraw = ({ x, y }: { x: number; y: number }) => {
      draw(x, y); // Draw from other users
    };

    // Listen to socket events
    socket.on("draw", handleDraw);

    // Add event listeners for canvas
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseUp); // Stop drawing if mouse leaves canvas

    // Cleanup function to remove event listeners and socket subscriptions
    return () => {
      socket.off("draw", handleDraw);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Whiteboard;
