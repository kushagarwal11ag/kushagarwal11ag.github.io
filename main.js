var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage = (src,callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img); 
    img.src = src;
}

let imagePath =(frameNumber, animation) => {
    return "images/"+ animation + "/"+ frameNumber +".png";
}

let frames = {
    static: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    backward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
    forward:[1,2,3,4,5,6],
};

let loadImages = (callback) => {
    let images ={ static: [], kick: [], punch: [] ,backward:[], block:[], forward:[]};
    let imagesToLoad = 0;
    ["static","kick","punch","backward","block","forward"].forEach((animation) => { 
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;
        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);
            loadImage(path, (image) => {
                images[animation][frameNumber -1] = image;
                imagesToLoad = imagesToLoad -1;
                if(imagesToLoad === 0){
                    callback(images);
                }
        });
    });
       
});
};
let x = 0;
let animate =(ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(()=>{
            if (image.src.includes("forward")&& x<576) {
                x += 20;
                ctx.clearRect(x, 400, 100, 500);
                ctx.drawImage(image, x, 100, 350, 350);
            }
            else if (image.src.includes("backward")&& x>0) {
                x -= 20;
                ctx.clearRect(x, 100, 500, 500);
                ctx.drawImage(image, x, 100, 350, 350);
            }
            ctx.clearRect(x, 0, 500, 500);
            ctx.drawImage(image, x, 0, 500, 500);
        }, index * 100);
    });

    setTimeout(callback,images[animation].length * 90);
};

loadImages((images) => {
    let queuedAnimations = [];
    let selectedAnimation ="static";

    let aux = () =>{
        let selectedAnimation;

        if(queuedAnimations.length === 0){
            selectedAnimation ="static";
        } else{
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    aux();
   
    document.getElementById("kick").onclick =() =>{
        queuedAnimations.push("kick");
    };
    document.getElementById("punch").onclick =() =>{
        queuedAnimations.push("punch");
    };
 
    document.getElementById("backward").onclick =() =>{
        queuedAnimations.push("backward");
    };
    document.getElementById("block").onclick =() =>{
        queuedAnimations.push("block");
    };
    document.getElementById("forward").onclick =() =>{
        queuedAnimations.push("forward");
    };


    document.addEventListener("keyup", (event) =>{
        const key= event.key; 

        if(key === "a"){
            queuedAnimations.push("kick");
        }else if(key === "d"){
            queuedAnimations.push("punch");
        }else if(key ==="ArrowLeft"){
            queuedAnimations.push("backward");
        }else if(key ==="s"){
            queuedAnimations.push("block");
        }else if(key === "ArrowRight"){
            queuedAnimations.push("forward");
        }
 
    });
});
