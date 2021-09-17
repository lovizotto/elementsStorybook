function init (sectionDomId) {
    const contactForm = $(`#${sectionDomId} .contact-form`)
    const field = contactForm.find('.contact-form__field')
    const input = field.find('input, textarea')
    input.on('focus', function() {
        const label = $(this).parent().find('label');
        label.addClass('field--focused')
    })
    input.on('blur', function() {
        const label = $(this).parent().find('label');
        if (!$(this).val()) {
            label.removeClass('field--focused')
        }
    })
}

init()