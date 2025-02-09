import {playNote, stopNote} from "./audioSelector";
const isCollision = (landmark, node, threshold, canvasWidth, canvasHeight) => {
    const xDistance = (landmark.x*canvasWidth - node.x);
    const yDistance = (landmark.y*canvasHeight - node.y);
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance); // Euclidean distance
    return distance < threshold;  // Collision occurs if distance is less than threshold
};

const temp_sounds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']
const temp_sharps = ['a#', 'b#', 'c#', 'd#', 'e#', 'f#', 'g#', 'h#', 'i#', 'j#', 'k#', 'l#', 'm#', 'n#']
const detectCollision = (fingertips, keyboardNodes, blackNodes, threshold, canvasWidth, canvasHeight) => {
    keyboardNodes.forEach((keyboardNode, index) => {
        fingertips.forEach(fingertip => {
            if(isCollision(fingertip, keyboardNode ,threshold, canvasWidth, canvasHeight )){
                playNote(index, true); 
            } 
       });
    });
    
    blackNodes.forEach((keyboardNode, index) => {
        fingertips.forEach(fingertip => {
            if(isCollision(fingertip, keyboardNode ,threshold, canvasWidth, canvasHeight )){
                playNote(index, false); 
            }
        });
    });
}

export default detectCollision