
const ypos = 50
const track = document.getElementById('Track');

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2; 

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    for (const image of track.getElementsByClassName('image')) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% ${ypos}%`
        }, {duration: 1200, fill: "forwards"})
    }
    
    track.animate({
        transform: `translate(${nextPercentage}%, -${ypos}%)`
    }, {duration: 1200, fill: "forwards" });
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
    
    // track.animate({
    //     transform: `translate(${track.dataset.percentage}%, -50%)`
    // }, {duration: 400, fill: "forwards" });
}

// Animate on scroll:
window.addEventListener('scroll', () => {

    const deltaX_unRestricted = window.scrollY;

    console.log(deltaX_unRestricted)

    // const deltaX = Math.max(Math.min(deltaX_unRestricted, 0), -100);

    // for (const image of track.getElementsByClassName('image')) {
    //     image.animate({
    //         objectPosition: `${100 + deltaX}% ${ypos}%`
    //     }, {duration: 1200, fill: "forwards"})
    // }
    
    // track.animate({
    //     transform: `translate(${deltaX}%, -${ypos}%)`
    // }, {duration: 1200, fill: "forwards" });
});