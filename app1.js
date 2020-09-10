let gameStatus = "Game On";
let currentPlayer = "X";
const boxes = document.getElementsByClassName("box");

document.getElementById("iksoks").style.display="block";
document.getElementById("teorija").style.display="none";

let brojac=0;

document.getElementById("theory").addEventListener("click",function() {
    document.getElementById("iksoks").style.display="none";
    document.getElementById("teorija").style.display="block";
});

document.getElementById("reset").addEventListener("click", function() {
    gameStatus = "Game On";
    brojac=0;
    Array.prototype.forEach.call(boxes, box => {
        box.innerHTML="";
    });
    currentPlayer = "X";
    document.getElementById("iksoks").style.display="block";
    document.getElementById("teorija").style.display="none";
    document.getElementById("messagen").style.display = "none";
    document.getElementById("messagew").style.display = "none";
  });



Array.prototype.forEach.call(boxes, box => {
    box.innerHTML="";
});

let niz=new Array();

for (let i=0;i<9;i++) {
    boxes[i].addEventListener("click",function(e) {
        if (e.target.classList.contains('box')) {
            if (gameStatus==="Game On") {
                if (boxes[i].innerHTML==="") {
                    boxes[i].innerHTML="X";
                    brojac++;
                    for (let k=0;k<9;k++) {
                        niz[k]=boxes[k].innerHTML;
                    }
                    
                    let q=evaluate5000(i);
                    if (q===100) {
                        endGame(q,brojac,currentPlayer);
                    }
                        
                    if (brojac>=9) {
                        endGame(q,brojac,currentPlayer);
                    }
                    t5000();

                 }
            }
        }
    })
}

function evaluate(i) {
    let j=i%3;
    let k=(Math.floor)(i/3);
    k=3*k;
    if (
        niz[0+j]=== niz[3+j] &&
        niz[3+j] === niz[6+j] &&
        niz[0+j]!= ""
      ) {
        if (niz[0+j]==="X") {
            return 100;
        }
        else {
            return -100;
        }
    } else if (
        niz[0+k] === niz[1+k] &&
        niz[1+k] === niz[2+k] &&
        niz[0+k] != ""
      ) {
        if (niz[0+k]==="X") {
            return 100;
        } else {
            return -100;
        }
    } else  if (i%2==0) {
          if (
            niz[0] === niz[4] &&
            niz[4] === niz[8] &&
            niz[0]!= ""
          ) {
            if (niz[0]==="X") {
                return 100;
            } else {
                return -100;
            }
          }
          if (
            niz[2] === niz[4] &&
            niz[4] === niz[6] &&
            niz[2] != ""
          ) {
            if (niz[2]==="X") {
                return 100;
            } else {
                return -100;
            }
          }
    } 
    return 0;   
}

function endGame(q,brojac, currentPlayer) {
    if (q===100) {
        document.getElementById("winner").innerHTML ="X"
    document.getElementById("messagew").style.display = "block";
    gameStatus = "Game Over";
    
    }
    else if (q===-100) {
        document.getElementById("winner").innerHTML ="O"
    document.getElementById("messagew").style.display = "block";
    gameStatus = "Game Over";
    
    }
    else {
        if (brojac>=9) {
            document.getElementById("messagen").style.display = "block";
            gameStatus="Game Over";
        }
    }    

}

function t800() {
    if (gameStatus==="Game Over") {
        return;
    }
    currentPlayer="O";
    let p=minimalna800(-1);
    boxes[p.ind].innerHTML=currentPlayer;
    niz[p.ind]=currentPlayer;
    brojac++;
    q=evaluate(p.ind);
    if (q<0) {
        endGame(q,brojac,currentPlayer);
    }
    if (brojac>=9) {
        endGame(q,brojac,currentPlayer);
    }
    currentPlayer="X";

}

function minimalna800(j) {
    let value=100000;
    let ind=-1;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
            
        }
        return {value:q, ind};
    }
    
    if (brojac>=9) return {value: 0, ind};

    for (let i=0;i<9;i++) {
        if (niz[i]==="") {
            niz[i]="O";
            brojac++;
            let r=maksimalna800(i);
            if (r<value) {
                value=r;
                ind = i;
            }
            niz[i]="";
            brojac--;
        }

    }

    return {value, ind};

}


function maksimalna800(j) {
    let value=-100000;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
        }
        return q;
    }
    if (brojac>=9) return 0;

    let t = false;
    for (let i=0;i<9;i++) {
        if (niz[i]==="") {
            niz[i]="X";
            brojac++;
            let r=minimalna800(i);
            if (r.value>value) {
                t=true;
                value=r.value;

            }
            niz[i]="";
            brojac--;
        }

    }
    return value;

}


function t1000() {
    if (gameStatus==="Game Over") {
        return;
    }
    currentPlayer="O";
    let p=minimalna1000(-1,0);
    boxes[p.ind].innerHTML=currentPlayer;
    niz[p.ind]=currentPlayer;
    brojac++;
    q=evaluate(p.ind);
    if (q<0) {
        endGame(q,brojac,currentPlayer);
    }
    if (brojac>=9) {
        endGame(q,brojac,currentPlayer);
    }
    currentPlayer="X";

}

function minimalna1000(j,dubina) {
    let value=100000;
    let ind=-1;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
            return {value:q+dubina,ind}
        }
        return {value:q-dubina, ind};
    }
    
    if (brojac>=9) return {value: 0, ind};

    for (let i=0;i<9;i++) {
        if (niz[i]==="") {
            niz[i]="O";
            brojac++;
            let r=maksimalna1000(i,dubina+1);
            if (r<value) {
                value=r;
                ind = i;
            }
            niz[i]="";
            brojac--;
        }

    }

    return {value, ind};

}


function maksimalna1000(j,dubina) {
    let value=-100000;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
            return q+dubina;
        }
        return q-dubina;
    }
    if (brojac>=9) return 0;

    for (let i=0;i<9;i++) {
        if (niz[i]==="") {
            niz[i]="X";
            brojac++
            let r=minimalna1000(i,dubina+1);
            if (r.value>value) {
                t=true;
                value=r.value;

            }
            niz[i]="";
            brojac--;
        }

    }
    return value;

}


function tx() {
    if (gameStatus==="Game Over") {
        return;
    }
    currentPlayer="O";
    let p=minimalnax(-1,0,-100000,100000);
    boxes[p.ind].innerHTML=currentPlayer;
    niz[p.ind]=currentPlayer;
    brojac++;
    q=evaluate(p.ind);
    if (q<0) {
        endGame(q,brojac,currentPlayer);
    }
    if (brojac>=9) {
        endGame(q,brojac,currentPlayer);
    }
    currentPlayer="X";

}

function minimalnax(j,dubina,alpha,beta) {
    let value=100000;
    let ind=-1;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
            return {value:q+dubina,ind}
        }
        return {value:q-dubina, ind};
    }
    
    if (brojac>=9) return {value: 0, ind};

    
    for (let i=0;i<9 && value>alpha;i++) {
        if (niz[i]==="") {
            niz[i]="O";
            brojac++;
            let r=maksimalnax(i,dubina+1,alpha,beta);
            
            if (r<value) {
                
                value=r;
                ind = i;
            }
            niz[i]="";
            brojac--;
            if (value<beta) {
                beta=value;
            }
            
        }

    }

    return {value, ind};

}


function maksimalnax(j,dubina,alpha,beta) {
    let value=-100000;
    let q=0;
    if (j!=-1) {
        q=evaluate(j);
    }
    if (q!=0) {
        if (q<0) {
            return q+dubina;
        }
        return q-dubina;
    }
    if (brojac>=9) return 0;

    for (let i=0;i<9 && value<beta;i++) {
        if (niz[i]==="") {
            niz[i]="X";
            brojac++;
            let r=minimalnax(i,dubina+1,alpha,beta);
            if (r.value>value) {
                
                value=r.value;

            }
            niz[i]="";
            brojac--;
            if (value>alpha) {
                alpha=value;
            }
            
        }

    }
    return value;

}


function evaluate5000(i) {
    let j=i%3;
    let k=(Math.floor)(i/3);
    k=3*k;
    if (
        niz[0+j]=== niz[3+j] &&
        niz[3+j] === niz[6+j] &&
        niz[0+j]!= ""
      ) {
        if (niz[0+j]==="X") {
            return 100;
        }
        else {
            return -100;
        }
    } else if (
        niz[0+k] === niz[1+k] &&
        niz[1+k] === niz[2+k] &&
        niz[0+k] != ""
      ) {
        if (niz[0+k]==="X") {
            return 100;
        } else {
            return -100;
        }
    } else  if (i%2==0) {
          if (
            niz[0] === niz[4] &&
            niz[4] === niz[8] &&
            niz[0]!= ""
          ) {
            if (niz[0]==="X") {
                return 100;
            } else {
                return -100;
            }
          }
          if (
            niz[2] === niz[4] &&
            niz[4] === niz[6] &&
            niz[2] != ""
          ) {
            if (niz[2]==="X") {
                return 100;
            } else {
                return -100;
            }
          }
    } 
    let suma=0;
    if (niz[i]==="O") {
        suma+=10;
    }
    else suma-=10;
    let pom;
    for (let j=0;j<3;j++)
    {

        pom=0;
        if (niz[3*j]!="") {
            pom+=niz[3*j].charCodeAt(0)
        }
        if (niz[3*j+1]!="") {
            pom+=niz[3*j+1].charCodeAt(0)
        }

        if (niz[3*j+2]!="") {
            pom+=niz[3*j+2].charCodeAt(0)
        }
        if(pom===88) {
                suma+=5;
            }
        else if (pom===176) {
            suma+=20;
        }
        else if (pom===79) {
            suma-=5;
        }
        else if (pom===158) {
            suma-=20;
        }
        
        pom=0;
        if (niz[j]!="") {
            pom+=niz[j].charCodeAt(0)
        }
        if (niz[j+3]!="") {
            pom+=niz[j+3].charCodeAt(0)
        }

        if (niz[j+6]!="") {
            pom+=niz[j+6].charCodeAt(0)
        }
        if(pom===88) {
                suma+=5;
            }
        else if (pom===176) {
            suma+=20;
        }
        else if (pom===79) {
            suma-=5;
        }
        else if (pom===158) {
            suma-=20;
        }
    } 
    pom=0;
        if (niz[0]!="") {
            pom+=niz[0].charCodeAt(0)
        }
        if (niz[4]!="") {
            pom+=niz[4].charCodeAt(0)
        }

        if (niz[8]!="") {
            pom+=niz[8].charCodeAt(0)
        }
        if(pom===88) {
                suma+=5;
            }
        else if (pom===176) {
            suma+=20;
        }
        else if (pom===79) {
            suma-=5;
        }
        else if (pom===158) {
            suma-=20;
        }
        pom=0;
        if (niz[2]!="") {
            pom+=niz[2].charCodeAt(0)
        }
        if (niz[4]!="") {
            pom+=niz[4].charCodeAt(0)
        }

        if (niz[6]!="") {
            pom+=niz[6].charCodeAt(0)
        }
        if(pom===88) {
                suma+=5;
            }
        else if (pom===176) {
            suma+=20;
        }
        else if (pom===79) {
            suma-=5;
        }
        else if (pom===158) {
            suma-=20;
        }
        return suma;
}


function t5000() {
    if (gameStatus==="Game Over") {
        return;
    }
    currentPlayer="O";
    let stop=2;
    let p=minimalna5000(-1,0,-100000,100000,stop);
    boxes[p.ind].innerHTML=currentPlayer;
    niz[p.ind]=currentPlayer;
    brojac++;
    q=evaluate5000(p.ind);
    if (q==-100) {
        endGame(q,brojac,currentPlayer);
    }
    if (brojac>=9) {
        endGame(q,brojac,currentPlayer);
    }
    currentPlayer="X";

}

function minimalna5000(j,dubina,alpha,beta,stop) {
    let value=100000;
    let ind=-1;
    let q=0;
    if (j!=-1) {
        q=evaluate5000(j);
    }
    if (q===-100) {
        return {value:q+dubina,ind}
    }
    if (q===100) {
        return {value:q-dubina, ind};
    }
    
    if (brojac>=9) return {value: 0, ind};

    if (dubina===stop) {
        return {value:q, ind};
    }

    for (let i=0;i<9 && value>alpha;i++) {
        if (niz[i]==="") {
            niz[i]="O";
            brojac++;
            let r=maksimalna5000(i,dubina+1,alpha,beta,stop);
            
            if (r<value) {
                
                value=r;
                ind = i;
            }
            niz[i]="";
            brojac--;
            if (value<beta) {
                beta=value;
            }
            
        }

    }

    return {value, ind};

}


function maksimalna5000(j,dubina,alpha,beta,stop) {
    let value=-100000;
    let q=0;
    if (j!=-1) {
        q=evaluate5000(j);
    }
    if (q===-100) {
            return q+dubina;
    }
    if (q===100) {
        return q-dubina;
    }
    if (brojac>=9) return 0;
    if (dubina===stop) {
        return q;
    }
    for (let i=0;i<9 && value<beta;i++) {
        if (niz[i]==="") {
            niz[i]="X";
            brojac++;
            let r=minimalnax(i,dubina+1,alpha,beta,stop);
            if (r.value>value) {
                
                value=r.value;

            }
            niz[i]="";
            brojac--;
            if (value>alpha) {
                alpha=value;
            }
            
        }

    }
    return value;

}