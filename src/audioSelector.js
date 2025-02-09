import C from "./assets/piano_C.wav"
import D from "./assets/piano_D.wav"
import E from "./assets/piano_E.wav"
import F from "./assets/piano_F.wav"
import G from "./assets/piano_F.wav"

import C_sharp from "./assets/piano_Csharp.wav"
import D_sharp from "./assets/piano_Dsharp.wav"
import F_sharp from "./assets/piano_Fsharp.wav"
import G_sharp from "./assets/piano_Gsharp.wav"

const whites = [C, D, E, F, G]; 
const blacks = [C_sharp, D_sharp, F_sharp, G_sharp]; 

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
