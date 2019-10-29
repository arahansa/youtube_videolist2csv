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

function* gene(load, arr){
    const html = document.getElementById("html").value
    let from =0, to =0;
    let curr = load
    while(true){
        if(curr--){
            from = html.indexOf(`<a id="video-title`, from)
            to = html.indexOf("</a>", from) + 4
            if(from == -1) break
            arr.push(html.substring(from, to))
            from = to
        }else{
            console.log('yield...', curr)
            curr = load
            yield;
        }
    }
}

document.getElementById("convert").addEventListener("click", (e) => {
    console.log("변환!");
    console.time('제네레이터 사용 Function #1')
    const videos = []
    const path = document.getElementById("path").value

    const iterator = gene(10, videos)
    const f = _ => {
        if(iterator.next().done){
            document.getElementById("result").value = videos.map(s => createDom(s))
                .map(aTag => new YoutubeVideo(aTag.getAttribute("title"), aTag.getAttribute("href")))
                .map(v => v.getAddr(path)).join("\n")
            console.timeEnd('제네레이터 사용 Function #1')
        } else setTimeout(f)
    }
    setTimeout(f)

})