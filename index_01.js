class YoutubeVideo {
    constructor(title, href) {
        this.title = title.replace(/[\\/\:\*\"\?\<\>|]/gi, '')
        this.href = href
    }
    getAddr(path){
        const str = `https://www.youtube.com${this.href};${this.title};${path}${this.title}.mp4`
        console.log(str)
        return str
    }
}


function save() {
    var a = document.createElement('a');
    with (a) {
        const str =document.getElementById('result').value
        href='data:text/csv;base64,' +  btoa(unescape(encodeURIComponent(str)))
        download='vidoeList4donwloader.csv';
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}



document.getElementById("save").addEventListener("click", save)

document.getElementById('reset').addEventListener("click", e =>{
    e.preventDefault()
    document.getElementById("html").value = ""
    document.getElementById("result").value = ""
})

function createDom(string) {
    const div = document.createElement('div')
    div.innerHTML = string
    return div.firstChild
}

document.getElementById("convert").addEventListener("click", (e) => {
    console.log("변환!");
    console.time('Function #1')

    const html = document.getElementById("html").value
    const videos = []
    let from = 0, to = 0

    while (true) {
        from = html.indexOf(`<a id="video-title`, from)
        to = html.indexOf("</a>", from) + 4
        if (from == -1) break
        videos.push(html.substring(from, to))
        from = to
    }

    const path = document.getElementById("path").value
    document.getElementById("result").value = videos.map(s => createDom(s))
        .map(aTag => new YoutubeVideo(aTag.getAttribute("title"), aTag.getAttribute("href")))
        .map(v => v.getAddr(path)).join("\n")
    console.timeEnd('Function #1')
})