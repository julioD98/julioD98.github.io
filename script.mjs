const E = (id)=>{return document.getElementById(id)}

const leaders = document.getElementsByClassName("name-leader");
const share = E("share");
const picker = E("pick");

const rnd = ()=>Math.floor(Math.random() * leaders.length)

const getFrontAndBack = ()=> {
    let front
    let back
    while (front === back) {
        front = rnd();
        back = rnd();
    }
    return {front,back}
}

const resetPicked = ()=>{
    for (let i = 0; i < leaders.length; i++) {
       leaders[i].classList.remove("front")
       leaders[i].classList.remove("back")
    }
}

picker.addEventListener("click",()=>{
    const {front, back} = getFrontAndBack();
    resetPicked();
    leaders[front].classList.add("front");
    leaders[back].classList.add("back");
});

share.addEventListener("click",()=>{
    pickedLeaders();
});

const pickedLeaders = async () => {
    const pointer = E("leaders");
    const img = await htmlToImage.toPng(pointer);
    const link = document.createElement("a");
    link.download = nameFile();
    link.href = img;
    link.click();
}

const nameFile = () => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const time = date.getTime()
    return `${time}-${day + 1}-${month + 1}-${year}-pick`;
}