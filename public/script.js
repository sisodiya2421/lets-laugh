const urls = ["https://www.youtube.com/embed/wU4DgHHwVCc",
                "https://www.youtube.com/embed/FIxYCDbRGJc",
                "https://www.youtube.com/embed/fa-0MizbELk",
                "https://www.youtube.com/embed/NUSlHJoGiwc",
                "https://www.youtube.com/embed/11SLnWEWZWs"]


num = Math.floor(Math.random() * 5);

document.getElementById("video").innerHTML = `<iframe id="video" width="600" height="315" src=${urls[num]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`