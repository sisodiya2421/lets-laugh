const video = document.querySelector('video');
const iframe = document.querySelector('iframe');
const log = document.querySelector('.log');
const counter = document.querySelector('.counter');
const sticker = document.getElementById("sticker");
const urls = ["https://www.youtube.com/embed/wU4DgHHwVCc",
                "https://www.youtube.com/embed/FIxYCDbRGJc",
                "https://www.youtube.com/embed/fa-0MizbELk",
                "https://www.youtube.com/embed/NUSlHJoGiwc",
                "https://www.youtube.com/embed/11SLnWEWZWs",
                "https://www.youtube.com/embed/oo5uPLA16sc",
                "https://www.youtube.com/embed/IVJApevLoHc"]
let count = 0;
let previousExp;

const welcome = "https://media.giphy.com/media/mFAUFeIfT5LYGkzeR4/giphy.gif";
const sticker_urls = ["https://media.giphy.com/media/l4vzAUZ9UMYtQUOKNF/giphy.gif",
                        "https://media.giphy.com/media/eltZvfFAW9f9HI1foH/giphy.gif",
                        "https://media.giphy.com/media/W3fbjOoLVKHGYHlJ4z/giphy.gif",
                        "https://media.giphy.com/media/dXWB6ZIFZnYKeT3eV5/giphy.gif",
                        "https://media.giphy.com/media/h7zwAXs5GYOSD0qaQD/giphy.gif",
                        "https://media.giphy.com/media/kgONyOaLK1eFnOxI5x/giphy.gif",
                        "https://media.giphy.com/media/WtOCPJDq7HBlpFZsnL/giphy.gif",
                        "https://media.giphy.com/media/KOfp5sCYol4S4/giphy.gif",
                        "https://media.giphy.com/media/20O0nOHdehJhIQ5GGN/giphy.gif"]

num = urls.length - Math.floor(Math.random() * (urls.length) + 1);
document.getElementById("video").src = urls[num]

function randomize() {
    new_num = urls.length - Math.floor(Math.random() * (urls.length) + 1);
    if (new_num != num){
        document.getElementById("video").src = urls[new_num];
    }
    else {
        randomize();
    }
  };

Promise.all([
    log.innerText = "Loading models...",
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),
    sticker.src = welcome,
    log.innerText = "Models loaded successfully!",
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia({ video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

unique_id = makeid(8);

video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        try {
            if (detections.expressions["happy"] >= 0.7) {
                if (!previousExp) {
                    count++;
                    counter.innerText = `You've smiled ${count} times`;
                    newrelic.addPageAction('Times_smiled', {'unique_id': unique_id, 'times_smiled': count});
                    stickers_num = sticker_urls.length - Math.floor(Math.random() * (sticker_urls.length) + 1);
                    sticker.src = sticker_urls[stickers_num];
                    $("#sticker").fadeIn();
                }
                log.innerText = "smiling face detected! 😉";
                previousExp = true;
            }
            else {
                previousExp = false;
                log.innerText = "Face detected 🧐";
            }
        }
        catch {
            previousExp = false;
            log.innerText = "Can't identify your face 😕";
        }
    }, 2000);
});