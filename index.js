const dragzoneHolder = document.getElementById('drag-zone-holder')
const dragzone = document.getElementById('drag-zone')
const avatarInput = document.getElementById('avatar')
const gererateTicketBtn = document.getElementById('generate-ticket-btn')

let allFormValues

// Event listeners

document.addEventListener('click', (e) => {
    // give the dragzone the focus effect
    e.target.id === 'avatar' ? dragzoneHolder.classList.add('focus-avatar') : dragzoneHolder.classList.remove('focus-avatar')

    // remove the preview of user image
    if (e.target.id === 'remove-image') {
        e.preventDefault()
        document.querySelector('.preview-image-module').remove()
        dragzone.classList.remove('hidden')
        avatarInput.value = ''
        document.getElementById('avatar-error').classList.remove('hide-message')
        document.getElementById('avatar-error').querySelector('.message-text').textContent = 'Upload you image (max size: 500KB)'
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
            dragzoneHolder.classList.remove('focus-avatar') // remove focus effect when image loaded
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

// validation of inputs
class FormValidator {
    constructor(form) {
        this.form = form
        this.fields = form.querySelectorAll('input')
        this.hasErrros = []
    }

    init() {
        this.validateOnEntry()
        this.validateOnSubmit()
    }

    validateOnSubmit() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()

            this.fields.forEach(field => {
                this.validateFeilds(field)
                const messageEl = document.getElementById(`${field.id}-error`)
                if (messageEl.classList.contains('error')) {
                    this.hasErrros.push(`Error in ${field.id} input`)
                }
            })

            if (this.hasErrros.length === 0) {
                // get data from the form
                const formData = new FormData(e.target)
                allFormValues = Object.fromEntries(formData.entries())
                console.log(allFormValues)
                // render ticket here
                renderTicket()
            }
        })
    }

    validateOnEntry() {
        this.fields.forEach(field => {
            field.addEventListener('input', () => {
                this.validateFeilds(field)
            })
        })
    }

    validateFeilds(field) {
        if (field.value.trim() === '') {
            this.setStatus({ field: field, message: `${field.name.replace('-', ' ')} can't be blank`, status: 'error' })
        } else {
            this.setStatus({ field: field, message: '', status: 'success' })
        }

        // avatar validations
        if (field.id === 'avatar') {
            console.log(field.files[0])
            if (field.files.length === 0) {
                this.setStatus({ field: field, message: 'Should upload an image', status: 'error' })
            } else if (field.files[0].size < 512000) {
                this.setStatus({ field: field, message: 'Too large, upload image under 500KB', status: 'error' })
            }
        }

        // full name validations 
        if (field.id === 'full-name') {
            const reg = /[^a-z A-Z]+/
            if (reg.test(field.value)) {
                this.setStatus({ field: field, message: 'Name should be letters only', status: 'error' })
            } else if (field.value.length < 3) {
                this.setStatus({ field: field, message: 'Name should be more than 3 character', status: 'error' })
            }
        }

        // email validations
        if (field.id === 'email') {
            const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!reg.test(field.value)) {
                this.setStatus({ field: field, message: 'Enter a valid email', status: 'error' })
            }
        }

        // github username validations
        if (field.id === 'github-username') {
            const reg = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/
            if (!reg.test(field.value)) {
                this.setStatus({ field: field, message: 'Enter a valid github username', status: 'error' })
            }
        }
    }

    setStatus(validationObj) {
        const messageEl = document.getElementById(`${validationObj.field.id}-error`)
        const messageText = messageEl.querySelector('.message-text')
        if (validationObj.status === 'error') {
            messageText.textContent = validationObj.message
            messageEl.classList.add('error')
            messageEl.classList.remove('hide-message')
            validationObj.field.classList.add('error-input')
        } else if (validationObj.status === 'success') {
            messageText.textContent = validationObj.message
            messageEl.classList.remove('error')
            messageEl.classList.add('hide-message')
            validationObj.field.classList.remove('error-input')
        }
    }
}


// render ticket with the data from the form
function renderTicket() {

}

const fv = new FormValidator(document.getElementById('form'))

fv.init()