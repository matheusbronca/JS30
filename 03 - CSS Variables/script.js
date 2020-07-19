const sliders = document.querySelectorAll(".controls input")

const updateHandle = function() {
    const suffix = this.dataset.sizing || '';

    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix) 





}

sliders.forEach(slider => {
    slider.onchange = updateHandle;
    slider.onmousemove = updateHandle;
});
