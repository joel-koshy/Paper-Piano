import C1 from "./assets/Music_Note_C1.mp3"
import C1s from "./assets/Music_Note_C1s.mp3"
import D1 from "./assets/Music_Note_D1.mp3"
import D1s from "./assets/Music_Note_D1s.mp3"
import E1 from "./assets/Music_Note_E1.mp3"
import F1 from "./assets/Music_Note_F1.mp3"
import F1s from "./assets/Music_Note_F1s.mp3"
import G1 from "./assets/Music_Note_G1.mp3"
import G1s from "./assets/Music_Note_G1s.mp3"
import A1 from "./assets/Music_Note_A1.mp3"
import A1s from "./assets/Music_Note_A1s.mp3"
import B1 from "./assets/Music_Note_B1.mp3"
import C2 from "./assets/Music_Note_C2.mp3"
import C2s from "./assets/Music_Note_C2s.mp3"
import D2 from "./assets/Music_Note_D2s.mp3"
import D2s from "./assets/Music_Note_D2s.mp3"
import E2 from "./assets/Music_Note_E2.mp3"
import F2 from "./assets/Music_Note_F2.mp3"
import F2s from "./assets/Music_Note_F2s.mp3"
import G2 from "./assets/Music_Note_G2.mp3"
import G2s from "./assets/Music_Note_G2s.mp3"
import A2 from "./assets/Music_Note_A2.mp3"
import A2s from "./assets/Music_Note_A2s.mp3"
import B2 from "./assets/Music_Note_B2.mp3"


const whites = [B2, A2, G2, F2, E2, D2, C2, B1, A1, G1, F1, E1, D1, C1]; 
const blacks = [A2s, G2s, F2s, D2s, C2s, A1s, G1s, F1s, D1s, C1s]; 

let hashset_white = new Map(); 
let hashset_black = new Map(); 

const playNote = (index, isWhite) => {
    if(isWhite){
        if(!hashset_white.has(index)){
            const note = new Audio(whites[index]); 
            hashset_white.set(index, note);
            note.play();  
            console.log(index); 
            note.onended = () => {
                console.log(hashset_white.delete(index));
                console.log(hashset_white); 
            }
        }
    }else{
        if(!hashset_black.has(index)){
            const note = new Audio(blacks[index]); 
            hashset_black.set(index, note);
            note.play();  
            note.onended = () => {
                console.log(hashset_white.delete(index));
                console.log(hashset_white); 
            }
       }
        // console.log(hashset_black)
   }
}

const stopNote = (index, isWhite) => {
if(isWhite){
        if(hashset_white.has(index)){
            console.log("Reached"); 
            // hashset_white.get(index).pause(); 
            // hashset_white.get(index).currentTime = 0; 
            // hashset_white.delete(index); 
        }
    }else{
        if(hashset_black.has(index)){
                // hashset_black.get(index).pause(); 
                // hashset_black.get(index).currentTime = 0; 
                // hashset_black.delete(index); 
            }
   }
}

export {playNote, stopNote}; 
