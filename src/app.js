import { generatePalette, isHexColor, hexToCSSHSL } from "./modules/utils";
import { Color } from "./modules/Color";
import convert from "color-convert";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const containerElement = document.querySelector("main");
containerElement.innerHTML = "";

const displayColors = (input, palette) => {
    document.querySelector("header").classList.add("minimized");
    const gradientColors = [0, Math.round(palette.length / 2), palette.length - 1].map(
        (index) => `#${convert.hsl.hex(palette[index])}`
    );
    document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(",")}`;
    document.body.style.backgroundSize = `400% 400%`;

    document.documentElement.style.setProperty("--shadow-color", hexToCSSHSL(input));

    palette.map((c) => new Color(c).display(containerElement));
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.querySelector("input").value;
    try {
        if (!isHexColor(inputValue)) {
            throw new Error(`${inputValue} is not a valid Hexadecimal color`);
        }
        const palette = generatePalette(inputValue);
        displayColors(inputValue, palette);
        console.log(inputValue, palette);
    } catch (error) {
        console.error(error)
        notyf.error(error.message);
    }
})

containerElement.addEventListener("click", async (e) => {
    const color = e.target.closest(".color").dataset.color;
    await navigator.clipboard.writeText(color);
    notyf.success(`copied ${color} to clipboard`)
})