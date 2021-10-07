String.prototype.camelSpace = function () {
    return this.replace(/([A-Z])/g, ' $1').trim()
}

const generateToken = (token) => {
    return `<span token="{ ${token} }" contenteditable="false">${token}</span>`
}

const generateButton = (e) => {
    return `<button class="button" name="textToken" value="${e}" style="display: none;">${e.camelSpace()}</button>`
}

const createHTMLNode = (token) => {
    let htmlNode = document.createElement('span');
    htmlNode.innerHTML = token
    htmlNode.setAttribute('token', `{ ${token} }`);
    htmlNode.setAttribute('contenteditable', 'false');
    return htmlNode;
}

const jumpToEnd = (e) => {
    e.focus();
    document.execCommand('selectAll', false, null);
    document.getSelection().collapseToEnd();
}

$('.editableContainer').each(function () {
    if (!$(this).attr('tokens')) return true;
    const tokens = $(this).attr('tokens').split(',')
    const field = $(this).find('[name="editableButtonContainer"]');
    tokens.forEach(e => { field.append(generateButton(e)) })
})

$('[name="editableButton"]').on('click', function () {
    const container = $(this).closest('.editableContainer')
    const editElement = container.find('[name="editBox"]')
    const value = editElement.attr('contenteditable') === 'true' ? true : false;
    editElement.attr('contenteditable', !value);
    $(this).text(value ? 'Edit' : 'Save').css('background', !value ? 'green' : '')
    container.find('[name="textToken"]').css('display', value ? 'none' : '')
    jumpToEnd(editElement);
    if (value) {
        $('#output').text(formatOutput(editElement.clone()));
        $('#input').text(formatOutput(editElement.clone()));

        //Send off message to DB
    }
})

$(document)
    .on('click', '[name="textToken"]', function () {
        const container = $(this).closest('.editableContainer')
        const editElement = container.find('[name="editBox"]')
        if (editElement.attr('contenteditable') !== 'true') return;

        const selection = window.getSelection();
        if (selection.anchorNode.parentNode.parentNode !== editElement[0] &&
            selection.anchorNode.parentNode !== editElement[0] &&
            selection.anchorNode !== editElement[0]
        ) jumpToEnd(editElement);
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(createHTMLNode($(this).val()));
        document.getSelection().collapseToEnd();
    })
    .on('paste', '[name="editBox"]', async function (event) {

        event.preventDefault();
        if ($(this).attr('contenteditable') !== 'true') return;

        let paste = await navigator.clipboard.readText()
            .then(res => res.replace(/<\/span[^>]*>|<span[^>]*>/g, ''))
            .then(res => res.replace(/[{}\[\]]/g, ''))


        const selection = window.getSelection();
        if (selection.anchorNode.parentNode.parentNode !== $(this)[0] &&
            selection.anchorNode.parentNode !== $(this)[0] &&
            selection.anchorNode !== $(this)[0]
        ) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        document.getSelection().collapseToEnd();
    })
    .on('keydown', '[name="editBox"]', function (event) {
        if (event.keyCode === 219 || event.keyCode === 221)
            event.preventDefault();
    })

    .on('click', '#parse', function () {
        $('#input').html(formatInput($('#input').text()))
    })


const formatOutput = (html) => {
    /*
    $(html).find('div').each(function () {
        //if ($(this).find('br').length === 0) { $(this).prepend('<br>') }
    });
    $(html).find('br').each(function () {
        $(this).replaceWith('[breakLine]')
    });
    */

    $(html).find('span').each(function () {
        $(this).replaceWith($(this).attr('token'))
    });
    return html.html();
}

const formatInput = (text) => {
    const tokens = [...new Set(text.match(/\{(.*?)\}/g))];

    if (tokens) {
        tokens.forEach(e => {
            const token = e.replace(/[{}]/g, '').trim()
            text = text.replaceAll(e, generateToken(token))
        });
    }
    /*
    text = text.replace(/\[breakLine\]/g, '<br>');
    */
    return text;
}