//The main idea of this program is using 4 vars. You can add more, but you will have to change a few things
var a = [0,0,0,0]
var b = [0,0,0,0]
var c = [0,0,0,0]
var d = [0,0,0,0]
var all = [a,b,c,d]
const fall = [randomCars(a),randomCars(b),randomCars(c),randomCars(d)];
var iteration = 0;
var stadistics = {
    cexit : [0,0,0,0],
    center : [0,0,0,0],
}
// PROGRAM VARS----
var probs = [1,1,1,1] // a 0.8 its a 80% , a 2.0 its the the (normal cars)*2 (probs of a car of each type)
var traffic = [1,1,1,1] // [a,b,c,d] cars that appear in each one
var max = 10  //number between min and 10
var min = 0 // number between 0 and max
var goalit = 20000
//--------------
console.log("PLEASE READ THE README. IT CONTAINS AN EXPLANATION OF THE PROBLEM AND HOW TO USE THE PROGRAM")
console.log("Random cars for each value (%s-%s) , probability of a car going to a destiny (a,b,c,d) %s and going from there %s",min,max,probs)
console.log("Iterations: %d number of vars: %d",goalit,all.length);
console.log("You can change this information from the code, search 'modificable'")

//Change this for a sleep function
//for(let i = 0; i < 999999; i++){for(let j = 0; j < 99999; j++){}}
//-----------------------------------------------------------------


//draws the vars on console (You have to redefine this function if you want to change the number of vars)
function draw(){ 
    console.log("\n\n\n\n\n\n\n\n%d\n",iteration)
    console.log("         %s\n"+
                "%s                   %s\n"+
                "         %s",a,b,d,c)
}
//adds between 0 and 5 cars to each direction
// x its the var that we want to increment
function randomCars(x){ 
    return (y) => { 
        let suma = 0;
        for(let i = 0; i < a.length; i++){
            let aux = ((Math.floor(Math.random() * y)  + min) * probs[i])*traffic[all.indexOf(x)]
            x[i] += aux
            suma += aux
        }
        return suma;
    }
}

//initialization
actualizar(-1,15)

function actualizar(actual,num){
    
    for(let i = 0; i < all.length; i++) {
        if(actual != i) stadistics.center[i] += fall[i](num);
        //console.debug(actual + "  " + fall[i]);
    }
    draw(); //delete me to turn off the graphic representation
    iteration++;
}

//------------------------------------------ MAIN PROGRAM ------------------------------------------

ejecutar(actualizar);


function ejecutar(f){
    for(let i = 0; i < all.length; i++){

        //console.log(i);
        //All the main directions are set to zero. WARNING: Change the next lines if you change var numbers to make it work
        stadistics.cexit [((i + 1) % all.length)] += all[i][((i + 1) % all.length)]
        stadistics.cexit [((i + 2) % all.length)] += all[i][((i + 2) % all.length)]

        all[i][((i + 1) % all.length)] = 0
        all[i][((i + 2) % all.length)] = 0
        all[(i+2) % all.length][(i + 3) % all.length] += all[i][((i + 3) % all.length)]
        all[i][((i + 3) % all.length)] = 0
        all[(i+2) % all.length][((i + 4) % all.length)] +=  all[i][((i + 4) % all.length)]
        all[i][((i + 4) % all.length)] = 0

        f(i,max);
        //sleep(2000)
    }
        

        if(iteration >= goalit){
            for(let x = 0; x < all.length; x++){
                stadistics.cexit[x] = parseInt(stadistics.cexit[x])
                stadistics.center[x] = parseInt(stadistics.center[x])
            }
            
            console.log("\n\n\n\n Results after %d iterations  \n Cars out of  [a,b,c,d] %s \n Cars entered in [a,b,c,d] %s", iteration,stadistics.cexit,stadistics.center)
            const fs = require('fs') 
            fs.writeFile("results.txt","Results after "+iteration+"  iterations  \n Cars out of  [a,b,c,d] "+stadistics.cexit+" \n Cars entered in [a,b,c,d] "+stadistics.center,(error)=>{ 
            if(error) console.log(error)
            else console.log("Results have been written in 'results.txt' in the current directory")
             })
        } 
        else ejecutar(actualizar)        
}


  