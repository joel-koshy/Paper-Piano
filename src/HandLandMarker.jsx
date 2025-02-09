import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../models/hand_landmarker.task";

import drawLandmarks from "./render_landmarks";

const createKeyboardNodes = (width, height) => {
        const keyboardNodes = []
        const y_pos = 0.5 * height;
        const rect_width = 350; 
        const piano_start_x = 0.3*width; 
        const increment = rect_width/14; 
        for (let i = 0; i< 14; i++) {
            keyboardNodes.push({x:  piano_start_x + i*increment , y: y_pos}); 
        }
        console.log((keyboardNodes)); 

        return keyboardNodes; 

}


const Model = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [handPresence, setHandPresence] = useState(null);

    useEffect(() => {
        let handLandmarker;
        let animationFrameId;

        const initializeHandDetection = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
                );
                handLandmarker = await HandLandmarker.createFromOptions(
                    vision, {
                        baseOptions: { modelAssetPath: hand_landmarker_task },
                        numHands: 2,
                        runningMode: "video", 
                        modelComplexity: "0"    
                    }
                );
                detectHands();
            } catch (error) {
                console.error("Error initializing hand detection:", error);
            }
        };


        const keyboardNodes = createKeyboardNodes(640, 480); 


        const detectHands = () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
                setHandPresence(detections.handednesses.length > 0);
                if (detections.landmarks) {
                    drawLandmarks(detections.landmarks, keyboardNodes, canvasRef, videoRef);

                }
            }
            requestAnimationFrame(detectHands);
        };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                await initializeHandDetection();
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            if (handLandmarker) {
                handLandmarker.close();
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <>
        <h1>Is there a Hand? {handPresence ? "Yes" : "No"}</h1>
        <div style={{ position: "relative", width: "fit-content" }}>
            <video ref={videoRef} autoPlay playsInline ></video>
            <canvas ref={canvasRef} style={{position: "absolute", top: "0", left: "0"}}></canvas>
            
        </div>
    </>
    );
};

export default Model;
