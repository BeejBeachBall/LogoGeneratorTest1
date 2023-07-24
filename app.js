const API_KEY = "API_KEY"

const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("input")
const imageSection = document.querySelector('.images-section')
const colorInputElement = document.querySelector("#color-input")
const themeInputElement = document.querySelector("#theme-input")

const getImages = async () => {
    const color = colorInputElement.value || 'default color';
    const theme = themeInputElement.value || 'default theme';
    const promptValue = `Generate a logo for a Vietnamese restaurant called "PhoExpress" with ${color} color and a ${theme} theme.`
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify ({
            prompt: promptValue,
            n: 1,
            size: "1024x1024"
        })
    }

    try {
        const response= await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement('div')
            imageContainer.classList.add('image-container')
            const imageElement = document.createElement('img')
            imageElement.setAttribute('src', imageObject.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)
        })
    } catch (error) {
        console.error(error)
    }
}

submitIcon.addEventListener('click', getImages)
