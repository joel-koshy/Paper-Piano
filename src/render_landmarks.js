import detectCollision from "./collisionDetection";
const drawLandmarks = (landmarksArray, keyboardNodes, canvasRef, videoRef, blackNodes) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (videoRef.current) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    let fingertips = []
    if(landmarksArray.length == 2){
        fingertips = [landmarksArray[0][4], landmarksArray[0][8], landmarksArray[0][12], landmarksArray[0][16], landmarksArray[0][20], 
                 landmarksArray[1][4], landmarksArray[1][8], landmarksArray[1][12], landmarksArray[1][16], landmarksArray[1][20] 
        ];

    }else if(landmarksArray.length == 1){
        fingertips = [landmarksArray[0][4], landmarksArray[0][8], landmarksArray[0][12], landmarksArray[0][16], landmarksArray[0][20]];
    }

    if(fingertips.length > 0){
        fingertips.forEach(landmark => {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;
            // console.log("X: ", x, "Y: ", y ); 
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle for each landmark
            ctx.fill();
        });
        detectCollision(fingertips, keyboardNodes, blackNodes, 13, canvas.width, canvas.height); 
 
    }

    keyboardNodes.forEach(node => {
        const x = node.x
        const y = node.y
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI); 
        ctx.fillStyle = 'red'; 
        ctx.fill();
    });

    blackNodes.forEach(node => {
        const x = node.x
        const y = node.y
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI); 
        ctx.fillStyle = 'red'; 
        ctx.fill();
    });



};

export default drawLandmarks; 
