const video = document.querySelector('video');
const iframe = document.querySelector('iframe');
const log = document.querySelector('.log');
const counter = document.querySelector('.counter');
const sticker = document.getElementById("sticker");
const urls = ["https://www.youtube.com/embed/wU4DgHHwVCc",
                "https://www.youtube.com/embed/FIxYCDbRGJc",
                "https://www.youtube.com/embed/fa-0MizbELk",
                "https://www.youtube.com/embed/NUSlHJoGiwc",
                "https://www.youtube.com/embed/11SLnWEWZWs"]
let count = 0;
let previousExp;

const welcome = "https://media.giphy.com/media/mFAUFeIfT5LYGkzeR4/giphy.gif";
const sticker_urls = ["https://media.giphy.com/media/l4vzAUZ9UMYtQUOKNF/giphy.gif"]

num = Math.floor(Math.random() * urls.length);
document.getElementById("video").src = urls[num]

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

video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        try {
            if (detections.expressions["happy"] >= 0.7) {
                if (!previousExp) {
                    count++;
                    counter.innerText = `You've smiled ${count} times`;
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
    }, 500);
});