import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../models/hand_landmarker.task";

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

        const keyboardNodes = []
        const y_pos = 0.5 * 480;
        const rect_width = 350; 
        const piano_start_x = 0.3*640; 
        const increment = rect_width/14; 

        for (let i = 0; i< 14; i++) {
            keyboardNodes.push({x:  piano_start_x + i*increment , y: y_pos}); 
        }
        console.log((keyboardNodes)); 
        const rect_height = 200;
        const canvasHeight = canvasRef.current.height; 
    
        const temp_sounds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']

        const isCollision = (landmark, node, threshold) => {
            const xDistance = (landmark.x*canvasRef.current.width - node.x);
            const yDistance = (landmark.y*canvasRef.current.height - node.y);
            const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance); // Euclidean distance
            return distance < threshold;  // Collision occurs if distance is less than threshold
        };

        const detectCollision = (fingertips, keyboardNodes, threshold) => {
            keyboardNodes.forEach((keyboardNode, index) => {
                fingertips.forEach(fingertip => {
                    if(isCollision(fingertip, keyboardNode ,threshold)){
                        console.log(temp_sounds[index]); 
                    }
                });
            });
        }

        const drawLandmarks = (landmarksArray, keyboardNodes) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (videoRef.current) {
                        canvas.width = videoRef.current.videoWidth;
                        canvas.height = videoRef.current.videoHeight;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            if(landmarksArray.length > 0){
                // const fingertips = [landmarksArray[0][4], landmarksArray[0][8], landmarksArray[0][12], landmarksArray[0][16], landmarksArray[0][20] ];
                const fingertips = [landmarksArray[0][8] ];
                fingertips.forEach(landmark => {
                    const x = landmark.x * canvas.width;
                    const y = landmark.y * canvas.height;
                    // console.log("X: ", x, "Y: ", y ); 
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle for each landmark
                    ctx.fill();
                });
                detectCollision(fingertips, keyboardNodes, 13); 
            }

            keyboardNodes.forEach(node => {
                const x = node.x
                const y = node.y
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw circle for each keyboard node
                ctx.fillStyle = 'red'; // You can change the color for keyboard nodes
                ctx.fill();
            });
        };

        const detectHands = () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
                setHandPresence(detections.handednesses.length > 0);
                if (detections.landmarks) {
                    // ctx.beginPath();
                    // ctx.arc(10, 10, 10, 0, 2 * Math.PI); // Draw circle for each keyboard node
                    // ctx.fill();
                    drawLandmarks(detections.landmarks, keyboardNodes);
                    // drawKeyboard(keyboardNodes); 
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
