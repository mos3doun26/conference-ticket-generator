const dragzoneHolder = document.getElementById('drag-zone-holder')
const dragzone = document.getElementById('drag-zone')
const avatarInput = document.getElementById('avatar')
const gererateTicketBtn = document.getElementById('generate-ticket-btn')


let showImage = false
// Event listeners
// gives the avatar drag zone holder the foucus effect
document.addEventListener('click', (e) => {
    e.target.id === 'avatar' ? dragzoneHolder.classList.add('focus-avatar') : dragzoneHolder.classList.remove('focus-avatar')
})

// html of the drag zone accordin to status of the file input
// if it holds a data will get the image and preview it and preview some buttons

gererateTicketBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const file = avatarInput.files[0]
    if (file) {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            console.log(reader.result)
            dragzone.innerHTML = `<div class='image-holder'>
                                    <img class='user-image' src='${reader.result}'>
                                </div>
                                <div class='options'>
                                    <button class='remove-image'>Remove image</button>
                                    <button class='change-image'>Change Image</button>
                                </div>`
            // to keep it more user friendly it remove the hover effect after loading the image of user
            dragzone.style.backgroundColor = '#ffffff1a'
        })
        reader.readAsDataURL(file)

    } else {
        console.log("there is no image")
    }
})