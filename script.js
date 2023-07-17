//stałe
const rozmGry = 400
const buttonsTab = [3, 4, 5, 6]


let ileLos = 0
let timer = setInterval(function () { }, 10)
clearInterval(timer)
let paczek = {
    imgsrc: ["gfx/1.jpg", "gfx/2.jpg", "gfx/3.jpg"],
    rozmiar: rozmGry,
    //zwraca wycięte fragmenty zdjęcia
    returnKafelek: function (x, y, ile) {
        let div = document.createElement("div")

        //ostatni jest czarny (puste pole)
        if (y == ile - 1 && x == ile - 1) {
            div.style.backgroundColor = "black"
            div.style.zIndex = "-1"
        }
        else {
            div.style.backgroundImage = "url(" + actualSrc + ")"
            div.style.backgroundSize = rozmGry + "px"
            div.style.backgroundPosition = -x * (rozmGry / ile) + "px " + -y * (rozmGry / ile) + "px"
        }

        div.style.width = (rozmGry / ile) + "px"
        div.style.height = (rozmGry / ile) + "px"

        return (div)

    },
    returnKafelki: function (ile) {
        clearInterval(losowanie)
        let timerDiv = document.getElementById("timer")
        timerDiv.innerHTML = ""
        let imgs = { ms: [], s: [], m: [], g: [] }
        for (let i = 0; i < 3; i++) {
            let img = document.createElement("img")
            img.src = "./gfx/cyferki/c0.gif"
            img.style.height = (rozmGry / 10) + "px"
            imgs.ms.unshift(img)
            let timerDiv = document.getElementById("timer")
            timerDiv.appendChild(img)
        }
        let img = document.createElement("img")
        img.src = "./gfx/cyferki/dot.gif"
        img.style.height = (rozmGry / 10) + "px"
        timerDiv = document.getElementById("timer")
        timerDiv.appendChild(img)
        for (let i = 0; i < 2; i++) {
            let img = document.createElement("img")
            img.src = "./gfx/cyferki/c0.gif"
            img.style.height = (rozmGry / 10) + "px"
            imgs.s.unshift(img)
            let timerDiv = document.getElementById("timer")
            timerDiv.appendChild(img)
        }
        img = document.createElement("img")
        img.src = "./gfx/cyferki/colon.gif"
        img.style.height = (rozmGry / 10) + "px"
        timerDiv = document.getElementById("timer")
        timerDiv.appendChild(img)
        for (let i = 0; i < 2; i++) {
            let img = document.createElement("img")
            img.src = "./gfx/cyferki/c0.gif"
            img.style.height = (rozmGry / 10) + "px"
            imgs.m.unshift(img)
            let timerDiv = document.getElementById("timer")
            timerDiv.appendChild(img)
        }
        img = document.createElement("img")
        img.src = "./gfx/cyferki/colon.gif"
        img.style.height = (rozmGry / 10) + "px"
        timerDiv = document.getElementById("timer")
        timerDiv.appendChild(img)
        for (let i = 0; i < 2; i++) {
            let img = document.createElement("img")
            img.src = "./gfx/cyferki/c0.gif"
            img.style.height = (rozmGry / 10) + "px"
            imgs.g.unshift(img)
            let timerDiv = document.getElementById("timer")
            timerDiv.appendChild(img)
        }

        let actualTime = 0
        let miliseconds = 0


        let game = document.getElementById("game")
        game.style.display = "flex"
        game.innerHTML = ""
        game.style.width = rozmGry + "px"
        game.style.height = rozmGry + "px"
        for (let y = 0; y < ile; y++) {
            for (let x = 0; x < ile; x++) {
                var div = paczek.returnKafelek(x, y, ile)
                div.id = x + "p" + y
                div.className = x + "p" + y
                div.style.position = "absolute"
                div.style.left = (rozmGry / ile) * x + "px"
                div.style.top = (rozmGry / ile) * y + "px"
                div.addEventListener("click", function () {
                    let xy = this.className.split("p")
                    let pusty = document.getElementById((ile - 1) + "p" + (ile - 1))
                    let xyPusty = pusty.className.split("p")
                    let pom = 0
                    if ((parseInt(xy[0]) + 1 == parseInt(xyPusty[0]) && parseInt(xy[1]) == parseInt(xyPusty[1])) || (parseInt(xy[0]) - 1 == parseInt(xyPusty[0]) && parseInt(xy[1]) == parseInt(xyPusty[1])) || (parseInt(xy[0]) == parseInt(xyPusty[0]) && parseInt(xy[1]) + 1 == parseInt(xyPusty[1])) || (parseInt(xy[0]) == parseInt(xyPusty[0]) && parseInt(xy[1]) - 1 == parseInt(xyPusty[1]))) {
                        pom = this.className
                        this.className = pusty.className
                        pusty.className = pom
                        xy = this.className.split("p")
                        pusty = document.getElementById((ile - 1) + "p" + (ile - 1))
                        xyPusty = pusty.className.split("p")
                        pusty.style.left = (rozmGry / ile) * xyPusty[0] + "px"
                        pusty.style.top = (rozmGry / ile) * xyPusty[1] + "px"

                        let pozAktualna = [(rozmGry / ile) * xyPusty[0], (rozmGry / ile) * xyPusty[1]]
                        let jedSlide = [(((rozmGry / ile) * xy[0]) - ((rozmGry / ile) * xyPusty[0])) / 40, (((rozmGry / ile) * xy[1]) - ((rozmGry / ile) * xyPusty[1])) / 40]
                        let i = 0
                        let dys = this
                        let slide = setInterval(function () {
                            i++
                            if (i == 39) {
                                clearInterval(slide)
                                dys.style.left = (rozmGry / ile) * xy[0] + "px"
                                dys.style.top = (rozmGry / ile) * xy[1] + "px"
                            }
                            else {
                                pozAktualna[0] += jedSlide[0]
                                pozAktualna[1] += jedSlide[1]
                                dys.style.left = pozAktualna[0] + "px"
                                dys.style.top = pozAktualna[1] + "px"
                            }

                        }, 1)
                    }
                    let spr = true
                    for (let y = 0; y < ile; y++) {
                        for (let x = 0; x < ile; x++) {
                            var kafel = document.getElementById(x + "p" + y)
                            if (kafel.id != kafel.className) spr = false
                        }
                    }
                    setTimeout(function () {
                        if (spr) {
                            clearInterval(timer)
                            let czas = actualTime.g[0] + actualTime.g[1] + ":" + actualTime.m[0] + actualTime.m[1] + ":" + actualTime.s[0] + actualTime.s[1] + "." + actualTime.ms[0] + actualTime.ms[1] + actualTime.ms[2]
                            setTimeout(function () {
                                let overlay = document.createElement("div")
                                overlay.className = "overlay"

                                let okno = document.createElement("div")
                                okno.className = "overlayOkno"

                                let exit = document.createElement("div")
                                exit.id = "exit"
                                exit.innerText = "✖"
                                exit.style.cursor = "pointer"
                                exit.addEventListener("click", function () {
                                    overlay.remove()
                                })
                                okno.appendChild(exit)

                                let tekst = document.createElement("div")
                                tekst.id = "tekst"
                                tekst.innerText = "BIG WINNER!!!"
                                okno.appendChild(tekst)

                                let tekstCzas = document.createElement("div")
                                tekstCzas.className = "overlayItems"
                                tekstCzas.innerText = "Twój czas: " + czas
                                okno.appendChild(tekstCzas)

                                let formDiv = document.createElement("div")
                                formDiv.id = "form"

                                let formDivTekst = document.createElement("div")
                                formDivTekst.innerText = "Nick: "
                                formDiv.appendChild(formDivTekst)

                                let formDivInput = document.createElement("input")
                                formDivInput.id = "input"
                                formDivInput.type = "tekst"
                                formDiv.appendChild(formDivInput)

                                let formDivButton = document.createElement("button")
                                formDivButton.innerText = "OK"
                                formDivButton.type = "submit"
                                formDivButton.addEventListener("click", function () {
                                    cookieAdd(formDivInput.value, czas, miliseconds, ile)
                                    overlay.remove()
                                })
                                formDiv.appendChild(formDivButton)

                                okno.appendChild(formDiv)
                                overlay.appendChild(okno)
                                document.body.appendChild(overlay)
                            }, 100)
                        }
                    }, 10)
                })
                game.appendChild(div)
            }
        }
        let i = 0
        let bigButt = buttonsTab[buttonsTab.length - 1]
        if (ileLos == 0) {
            ileLos = (bigButt ** 3)
            let pomoc = document.getElementById("pomoc")
            pomoc.style.cursor = "pointer"
            pomoc.addEventListener("click", function () {
                console.log("x");
                console.log(ileLos);
                if (ileLos == (bigButt ** 3)) {
                    ileLos = (bigButt + 3)
                    this.style.border = "2px solid darkred"
                }
                else {
                    ileLos = (bigButt ** 3)
                    this.style.border = ""
                }
            })
        }

        clearInterval(losowanie)
        var losowanie = setInterval(function () {
            if (i >= ileLos) {
                clearInterval(losowanie)
                let startTime = new Date().getTime()
                clearInterval(timer)
                timer = setInterval(function () {
                    let ileMinelo = ((new Date().getTime()) - startTime)
                    actualTime = { ms: [0, 0, 0], s: [0, 0], m: [0, 0], g: [0, 0] }
                    miliseconds = ileMinelo
                    let g = Math.floor(ileMinelo / (1000 * 60 * 60))
                    ileMinelo -= g * (1000 * 60 * 60)
                    let m = Math.floor(ileMinelo / (1000 * 60))
                    ileMinelo -= m * (1000 * 60)
                    let s = Math.floor(ileMinelo / (1000))
                    ileMinelo -= s * (1000)
                    for (let j = 0; j < String(g).length; j++) {
                        if (String(g).length == 1) {
                            actualTime.g[j] = 0
                            actualTime.g[j + 1] = String(g)[j]
                            break
                        }
                        actualTime.g[j] = String(g)[j]
                    }
                    for (let j = 0; j < String(m).length; j++) {
                        if (String(m).length == 1) {
                            actualTime.m[j] = 0
                            actualTime.m[j + 1] = String(m)[j]
                            break
                        }
                        actualTime.m[j] = String(m)[j]
                    }
                    for (let j = 0; j < String(s).length; j++) {
                        if (String(s).length == 1) {
                            actualTime.s[j] = 0
                            actualTime.s[j + 1] = String(s)[j]
                            break
                        }
                        actualTime.s[j] = String(s)[j]
                    }
                    for (let j = 0; j < String(ileMinelo).length; j++) {
                        if (String(ileMinelo).length == 1) {
                            actualTime.ms[j] = 0
                            actualTime.ms[j + 1] = 0
                            actualTime.ms[j + 2] = String(ileMinelo)[j]
                            break
                        } else if (String(ileMinelo).length == 2) {
                            actualTime.ms[j] = 0
                            actualTime.ms[j + 1] = String(ileMinelo)[j]
                            actualTime.ms[j + 2] = String(ileMinelo)[j + 1]
                            break
                        }
                        actualTime.ms[j] = String(ileMinelo)[j]
                    }

                    for (let j = 0, k = 2; j < 3; j++, k--) {
                        if (j < 2) {
                            imgs.g[j].src = "./gfx/cyferki/c" + actualTime.g[j] + ".gif"
                            imgs.m[j].src = "./gfx/cyferki/c" + actualTime.m[j] + ".gif"
                            imgs.s[j].src = "./gfx/cyferki/c" + actualTime.s[j] + ".gif"
                        }
                        imgs.ms[j].src = "./gfx/cyferki/c" + actualTime.ms[j] + ".gif"
                    }

                }, 1)
            }
            i++
            let pusty = document.getElementById((ile - 1) + "p" + (ile - 1))
            //losowanie 0-poziom 1-pion
            let kierunek = Math.floor(Math.random() * 2)
            if (kierunek == 0) {
                let xyPusty = pusty.className.split("p")
                if (xyPusty[0] == 0) {
                    xyPusty[0]++
                    let xy = xyPusty.join("p")
                    let kafelek = document.getElementsByClassName(xy)[0]
                    pusty.className = xy
                    pusty.style.left = (rozmGry / ile) * xyPusty[0] + "px"

                    let xyKafelek = kafelek.className.split("p")
                    xyKafelek[0]--
                    xy = xyKafelek.join("p")
                    kafelek.className = xy
                    kafelek.style.left = (rozmGry / ile) * xyKafelek[0] + "px"
                }
                else if (xyPusty[0] == ile - 1) {
                    xyPusty[0]--
                    let xy = xyPusty.join("p")
                    let kafelek = document.getElementsByClassName(xy)[0]
                    pusty.className = xy
                    pusty.style.left = (rozmGry / ile) * xyPusty[0] + "px"

                    let xyKafelek = kafelek.className.split("p")
                    xyKafelek[0]++
                    xy = xyKafelek.join("p")
                    kafelek.className = xy
                    kafelek.style.left = (rozmGry / ile) * xyKafelek[0] + "px"
                }
                else {
                    let strona = Math.floor(Math.random() * 2)
                    if (strona == 0) {
                        xyPusty[0]--
                        let xy = xyPusty.join("p")
                        let kafelek = document.getElementsByClassName(xy)[0]
                        pusty.className = xy
                        pusty.style.left = (rozmGry / ile) * xyPusty[0] + "px"

                        let xyKafelek = kafelek.className.split("p")
                        xyKafelek[0]++
                        xy = xyKafelek.join("p")
                        kafelek.className = xy
                        kafelek.style.left = (rozmGry / ile) * xyKafelek[0] + "px"
                    }
                    else {
                        xyPusty[0]++
                        let xy = xyPusty.join("p")
                        let kafelek = document.getElementsByClassName(xy)[0]
                        pusty.className = xy
                        pusty.style.left = (rozmGry / ile) * xyPusty[0] + "px"

                        let xyKafelek = kafelek.className.split("p")
                        xyKafelek[0]--
                        xy = xyKafelek.join("p")
                        kafelek.className = xy
                        kafelek.style.left = (rozmGry / ile) * xyKafelek[0] + "px"
                    }
                }
            }
            else {
                let xyPusty = pusty.className.split("p")
                if (xyPusty[1] == 0) {
                    xyPusty[1]++
                    let xy = xyPusty.join("p")
                    let kafelek = document.getElementsByClassName(xy)[0]
                    pusty.className = xy
                    pusty.style.top = (rozmGry / ile) * xyPusty[1] + "px"

                    let xyKafelek = kafelek.className.split("p")
                    xyKafelek[1]--
                    xy = xyKafelek.join("p")
                    kafelek.className = xy
                    kafelek.style.top = (rozmGry / ile) * xyKafelek[1] + "px"
                }
                else if (xyPusty[1] == ile - 1) {
                    xyPusty[1]--
                    let xy = xyPusty.join("p")
                    let kafelek = document.getElementsByClassName(xy)[0]
                    pusty.className = xy
                    pusty.style.top = (rozmGry / ile) * xyPusty[1] + "px"

                    let xyKafelek = kafelek.className.split("p")
                    xyKafelek[1]++
                    xy = xyKafelek.join("p")
                    kafelek.className = xy
                    kafelek.style.top = (rozmGry / ile) * xyKafelek[1] + "px"
                }
                else {
                    let strona = Math.floor(Math.random() * 2)
                    if (strona == 0) {
                        xyPusty[1]--
                        let xy = xyPusty.join("p")
                        let kafelek = document.getElementsByClassName(xy)[0]
                        pusty.className = xy
                        pusty.style.top = (rozmGry / ile) * xyPusty[1] + "px"

                        let xyKafelek = kafelek.className.split("p")
                        xyKafelek[1]++
                        xy = xyKafelek.join("p")
                        kafelek.className = xy
                        kafelek.style.top = (rozmGry / ile) * xyKafelek[1] + "px"
                    }
                    else {
                        xyPusty[1]++
                        let xy = xyPusty.join("p")
                        let kafelek = document.getElementsByClassName(xy)[0]
                        pusty.className = xy
                        pusty.style.top = (rozmGry / ile) * xyPusty[1] + "px"

                        let xyKafelek = kafelek.className.split("p")
                        xyKafelek[1]--
                        xy = xyKafelek.join("p")
                        kafelek.className = xy
                        kafelek.style.top = (rozmGry / ile) * xyKafelek[1] + "px"
                    }
                }
            }
        }, 10)
    },
    returnImg: function () {
        let slider = document.getElementById("slider")
        slider.style.width = (rozmGry / 4) + "px"
        let sliderX = document.createElement("div")
        sliderX.style.display = "flex"
        slider.appendChild(sliderX)
        for (let i = 0; i < paczek.imgsrc.length + 1; i++) {
            if (i < paczek.imgsrc.length) {
                let img = document.createElement("img")
                img.src = paczek.imgsrc[i]
                img.style.width = (rozmGry / 4) + "px"
                img.style.height = (rozmGry / 4) + "px"
                sliderX.appendChild(img)
            }
            else {
                let img = document.createElement("img")
                img.src = paczek.imgsrc[0]
                img.style.width = (rozmGry / 4) + "px"
                img.style.height = (rozmGry / 4) + "px"
                sliderX.appendChild(img)
            }
        }

        let rArr = document.getElementById("rightArrow")
        rArr.innerText = ">"
        rArr.addEventListener("click", function () {
            if (slider.scrollLeft == paczek.imgsrc.length * (rozmGry / 4)) {
                slider.scrollLeft = 0
            }
            let i = 0
            let startPoz = slider.scrollLeft
            let sliderSlide = setInterval(function () {
                i++
                if (i == 25) {
                    clearInterval(sliderSlide)
                    slider.scrollLeft = startPoz + (rozmGry / 4)
                    if (slider.scrollLeft == paczek.imgsrc.length * (rozmGry / 4)) {
                        actualSrc = paczek.imgsrc[0]
                    }
                    else {
                        actualSrc = paczek.imgsrc[slider.scrollLeft / (rozmGry / 4)]
                        console.log(actualSrc);
                    }
                }
                else {
                    slider.scrollLeft += Math.ceil((rozmGry / 4) / 30)
                }
            }, 1)
        })

        let lArr = document.getElementById("leftArrow")
        lArr.innerText = "<"
        lArr.addEventListener("click", function () {
            if (slider.scrollLeft == 0) {
                slider.scrollLeft = paczek.imgsrc.length * (rozmGry / 4)
            }
            let i = 0
            let startPoz = slider.scrollLeft
            let sliderSlide = setInterval(function () {
                i++
                if (i == 25) {
                    clearInterval(sliderSlide)
                    slider.scrollLeft = startPoz - (rozmGry / 4)
                    if (slider.scrollLeft == paczek.imgsrc.length * (rozmGry / 4)) {
                        actualSrc = paczek.imgsrc[0]
                    }
                    else {
                        actualSrc = paczek.imgsrc[slider.scrollLeft / (rozmGry / 4)]
                        console.log(actualSrc);
                    }
                }
                else {
                    slider.scrollLeft -= Math.ceil((rozmGry / 4) / 30)
                }

            }, 1)
        })
    }
}

let actualSrc = paczek.imgsrc[0]
function returnButtons() {
    let buttons = document.getElementById("buttons")
    for (let i = 0; i < buttonsTab.length; i++) {
        let button = document.createElement("button")
        button.innerText = buttonsTab[i] + " x " + buttonsTab[i]
        button.style.margin = "5px"
        button.addEventListener("click", function () {
            paczek.returnKafelki(buttonsTab[i])
        })
        buttons.appendChild(button)
    }
}

let cookieTab = []
for (let i = 0; i < buttonsTab.length; i++) {
    cookieTab.push([])
}

function cookieAdd(nick, czas, ms, ile) {
    let i = buttonsTab.indexOf(ile)
    cookieTab[i].push({ nick: nick, czas: czas, ms: ms, ile: ile })
    cookieTab[i].sort(function (a, b) {
        return parseFloat(a.ms) - parseFloat(b.ms);
    })
    if (cookieTab[i].length > 10) cookieTab[i].pop()
    console.log(cookieTab);
    let czasCiastka = new Date()
    czasCiastka.setTime(czasCiastka.getTime() + 1000 * 60 * 60 * 24 * 365 * 10)
    for (let j = 0; j < cookieTab[i].length; j++) {
        document.cookie = i + "|" + j + "=" + encodeURIComponent(cookieTab[i][j].nick + "|" + cookieTab[i][j].czas + "|" + cookieTab[i][j].ms) + ";expires=" + czasCiastka.toUTCString()
    }
}

function downloadCookie() {
    if (document.cookie != "") {
        for (let c = 0; c < decodeURIComponent(document.cookie).split("; ").length; c++) {
            let i = decodeURIComponent(document.cookie).split("; ")[c].split("=")[0].split("|")[0]
            let ile = buttonsTab[i]
            let nick = decodeURIComponent(document.cookie).split("; ")[c].split("=")[1].split("|")[0]
            let czas = decodeURIComponent(document.cookie).split("; ")[c].split("=")[1].split("|")[1]
            let ms = decodeURIComponent(document.cookie).split("; ")[c].split("=")[1].split("|")[2]
            cookieTab[i].push({ nick: nick, czas: czas, ms: ms, ile: ile })
            cookieTab[i].sort(function (a, b) {
                return parseFloat(a.ms) - parseFloat(b.ms);
            })
            if (cookieTab[i].length > 10) cookieTab[i].pop()
        }
    }


    let div = document.getElementById("topScores")
    div.addEventListener("click", function () {
        let xD = document.createElement("div")
        xD.className = "overlay"
        xD.style.display = "flex"
        let topScores = document.createElement("div")
        topScores.className = "overlayOkno"

        let exit = document.createElement("div")
        exit.id = "exit"
        exit.innerText = "✖"
        exit.style.cursor = "pointer"
        exit.addEventListener("click", function () {
            xD.remove()
        })
        topScores.appendChild(exit)

        let tekst = document.createElement("div")
        tekst.id = "tekst"
        tekst.innerText = "Top Scores"
        topScores.appendChild(tekst)

        let buttons = document.createElement("div")
        for (let i = 0; i < buttonsTab.length; i++) {
            let button = document.createElement("button")
            button.innerText = buttonsTab[i] + " x " + buttonsTab[i]
            button.style.margin = "5px"
            button.addEventListener("click", function () {
                let ileUsunac = document.getElementsByClassName("row").length - 1
                for (let j = ileUsunac; j >= 0; j--) {
                    document.getElementsByClassName("row")[j].remove()
                }
                for (let j = 0; j < cookieTab[i].length; j++) {
                    let row = document.createElement("div")
                    row.className = "row"

                    let rowItem1 = document.createElement("div")
                    rowItem1.innerText = cookieTab[i][j].nick
                    row.appendChild(rowItem1)

                    let rowItem2 = document.createElement("div")
                    rowItem2.innerText = cookieTab[i][j].czas
                    row.appendChild(rowItem2)

                    topScores.appendChild(row)
                }
            })
            buttons.appendChild(button)
        }
        buttons.className = "overlayItems"
        topScores.appendChild(buttons)

        xD.appendChild(topScores)
        document.body.appendChild(xD)
        console.log("x");
    })
}


downloadCookie()
paczek.returnImg()
returnButtons()



