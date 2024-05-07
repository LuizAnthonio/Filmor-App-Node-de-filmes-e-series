
let widthTela = screen.width;
let heightTela = screen.height;
let playerC = document.getElementById("player")
let playerConteiner = document.getElementById("player-container")
let header = document.getElementById("header");
let aberturaT = parseFloat(document.getElementById("abertura").textContent)
let tempAbe = parseFloat(document.getElementById("tempoAbe").textContent)

//alert(coisa)



let timerCursor;
let telA = document.getElementById("tela")



function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    const segundosFormatados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
    return `${minutos}:${segundosFormatados}`;
}

function clicou(e){
    // alert()
    window.location.replace("http://localhost:8000"+e)
}

let urlAtual = window.location.href;
let separa = urlAtual.split("/")
let numeroFinalEp = parseInt(urlAtual.split("/")[5])
separa[5] = numeroFinalEp+1
let urlFinal = `http://localhost:8000/serie/${separa[4]}/${separa[5]}`


let botaoPular = document.getElementById("btn-pular");
let video = document.getElementById("video")



let play = document.getElementById("btn-play-1");

let volumeIcon = document.getElementById("ico-volume");

let volumeRange = document.getElementById("input-volume");

const botaoFullscreen = document.getElementById('botaoFullscreen');

botaoFullscreen.addEventListener('click', () => {
    if (document.fullscreenEnabled) {

        document.documentElement.requestFullscreen(); // Solicita a entrada em tela cheia para a janela

        telA.width = widthTela;
        telA.height = heightTela;

    }
    if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });





video.addEventListener("mousemove", () => {

    clearTimeout(timerCursor); // Limpa o timer se o mouse se mover
        
    video.style.cursor = "pointer" // Mostra o cursor
    playerC.style.opacity = 1;




    header.style.opacity = 0.7;
    timerCursor = setTimeout(() => {
            playerC.style.opacity = 0;
            video.style.cursor = "none" // Mostra o cursor
            header.style.opacity = 0;
            
        }, 3000);
    



})

playerC.addEventListener("mouseover", () => {
    playerC.style.opacity = 1;
})
playerC.addEventListener("mouseout", () => {
    playerC.style.opacity = 0;
})

volumeRange.addEventListener("input", () => {
    video.volume = volumeRange.value;
})


volumeRange.addEventListener("mouseover", () => {
    volumeRange.classList.add("ativo")
    volumeRange.classList.remove("Nativo")
    
})

volumeRange.addEventListener("mouseout", () => {
    volumeRange.classList.remove("ativo")
    volumeRange.classList.add("Nativo")
    
})

volumeIcon.addEventListener("mouseover", () => {
    volumeRange.classList.add("ativo")
    volumeRange.classList.remove("Nativo")
})

volumeIcon.addEventListener("mouseout", () => {
    volumeRange.classList.remove("ativo")
    volumeRange.classList.add("Nativo")
})

play.addEventListener("click", () => {
    

    if(video.paused){
        video.play()

    }else{
        video.pause()
    }

        
    
})



video.controls = false


let duration = {}
duration.estado = false;

const barraProgresso = document.getElementById('barra-time');
let incio = document.getElementById("duration-inicial")
let fim = document.getElementById("duration-fim")


const progressBar = document.getElementById('progressBar');

    // Atualiza o valor da progress bar conforme o input range é alterado
    barraProgresso.addEventListener('input', () => {
        progressBar.value = barraProgresso.value;
    });

video.addEventListener('timeupdate', () => {
        const porcentagem = (video.currentTime / video.duration) * 100;
        incio.innerHTML = formatarTempo(video.currentTime);
        barraProgresso.value = porcentagem;
        fim.innerHTML = formatarTempo(video.duration);

            
        let tempoA = video.currentTime;

        console.log(tempAbe)
        console.log(aberturaT)

        console.log("o tempo atual é: ",tempoA)
        if(tempoA >= tempAbe && tempoA < tempAbe + 45 ){
            botaoPular.style.display = "block";
            botaoPular.innerHTML = "Pular Abertura"
        }else{
            
            botaoPular.style.display = "none";
        }
        
        if(tempoA >= 1337.0 ){
            //window.location.href
            botaoPular.style.display = "block";
            console.log(urlAtual)
            botaoPular.innerHTML = "Proximo episodio";
            
        }

        if(tempoA === video.duration){
            window.location.href = urlFinal
        }

    });

    barraProgresso.addEventListener('input', () => {
        const porcentagem = barraProgresso.value;
        const novaPosicao = (porcentagem * video.duration) / 100;
        video.currentTime = novaPosicao;

    });

    
    
    video.addEventListener("click", () => {

        if(video.paused){
            video.play()
        }else{
            video.pause()
        }
        // alert("oiii")
        video.controls = false
        
        duration.dur = video.duration;
})

document.addEventListener("keydown", (e) => {
   // alert(e.key)
    if(e.key === "f" || e.key === "F"){

        if (document.fullscreenEnabled) {

        document.documentElement.requestFullscreen(); 

        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

    }
    if(e.key === "k" || e.key === "K" || e.key === " "){
        
        if(video.paused){
            video.play()
        }else{
            video.pause()
        }
    }
    if(e.key === "ArrowRight"){
        video.currentTime += 10
    }
    if(e.key === "ArrowLeft"){
        video.currentTime -= 10
    }
    if(e.key === "ArrowUp"){
        volumeRange.value += 0.2
        video.volume += 0.2
    }
    if(e.key === "ArrowDown"){
        volumeRange.value -= 0.1
        video.volume -= 0.1
    }
    
    if(e.key === "m"){
        if(video.volume === 0){
            volumeRange.value += 1
            
            video.volume += 1
        }else{
            
            volumeRange.value -= 1
            video.volume -= 1
        }
    }
    

})
//alert(duration)

botaoPular.addEventListener("click", () => {

    if(video.currentTime >= video.currentTime+120 ){

        //window.location.replace(urlFinal)
        window.location.href = urlFinal
            //console.log(urlFinal)


    }else{

        video.currentTime += aberturaT
    }
    
    botaoPular.style.display = "none";

})
    



