const dragzoneHolder = document.getElementById('drag-zone-holder')
const dragzone = document.getElementById('drag-zone')
const avatarInput = document.getElementById('avatar')
const gererateTicketBtn = document.getElementById('generate-ticket-btn')


let showImage = false
// Event listeners
// gives the avatar drag zone holder the foucus effect
document.addEventListener('click', (e) => {
    // give the dragzone the focus effect
    e.target.id === 'avatar' ? dragzoneHolder.classList.add('focus-avatar') : dragzoneHolder.classList.remove('focus-avatar')

    // remove the preview of user image
    if (e.target.id === 'remove-image') {
        e.preventDefault()
        document.querySelector('.preview-image-module').remove()
        dragzone.classList.remove('hidden')
        avatarInput.value = ''
    }

    // change the user image and update the main file input
    if (e.target.id === 'new-avatar') {
        document.getElementById('new-avatar').addEventListener('change', (e) => {
            const file = e.target.files[0]
            updateUserimage(file)
            document.querySelector('.preview-image-module').remove()
            userImagePreview()
        })
    }

})

// show the preview of user image and some options when user upload an image
avatarInput.addEventListener('change', (e) => {
    e.preventDefault()
    userImagePreview()
})


// get the image of the input type file and render it.
function userImagePreview() {
    const file = avatarInput.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function () {

            const previewImageDiv = document.createElement('div')
            previewImageDiv.setAttribute('class', 'preview-image-module')
            previewImageDiv.innerHTML = `<div class='image-holder'>
                                    <img class='user-image' src='${reader.result}'>
                                </div>
                                <div class='options'>
                                    <button class='remove-image' id='remove-image'>Remove image</button>
                                    <div class='change-image'>
                                        Change Image
                                        <input type="file" id="new-avatar" class="new-avatar" accept="image/*" title=''>
                                    </div>
                                </div>`

            dragzoneHolder.appendChild(previewImageDiv)
            dragzone.classList.add('hidden')
            // to keep it more user friendly it remove the hover effect after loading the image of user
            dragzone.style.backgroundColor = '#ffffff1a'
        }
        reader.readAsDataURL(file)

    } else {
        console.log("there is no image")
    }
}

// update files of the main input type file.
function updateUserimage(file) {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    avatarInput.files = dataTransfer.files
}