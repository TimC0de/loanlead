export function textInputEventHandler(eventType) {
    return (e) => {
        const target = e.target;
        const label = target.previousElementSibling;
        const labelSpan = label.children[0];

        target.setAttribute('placeholder', eventType === 'focus' ? '' : target.getAttribute('data-placeholder'));
        target.style.fontSize = eventType === 'focus' ? '18px' : '16px';

        Object.assign(label.style, {
            top: eventType === 'focus' ? '8px' : '0',
            left: eventType === 'focus' ? '30px' : '0',
            fontSize: eventType === 'focus' ? '14px' : '16px',
            color: eventType === 'focus' ? '#666666' : 'black'
        });

        if (labelSpan) {
            labelSpan.style.opacity = eventType === 'focus' ? 0 : 1;
        }
    };
}

export function textSelectEventHandler(eventType) {
    return (e) => {
        const target = e.target;
        const autocompleteInput = target.nextElementSibling;
        const label = target.previousElementSibling;
        const labelSpan = label.children[0];

        target.classList[eventType === 'focus' ? 'add' : 'remove']('focused');
        autocompleteInput.classList[eventType === 'focus' ? 'add' : 'remove']('focused');

        target.setAttribute('placeholder', eventType === 'focus' ? '' : target.getAttribute('data-placeholder'));
        target.style.fontSize = eventType === 'focus' ? '18px' : '16px';
        Object.assign(autocompleteInput.style, {
            fontSize: target.style.fontSize,
            boxShadow: 'none',
        });

        Object.assign(label.style, {
            top: eventType === 'focus' ? '8px' : '0',
            left: eventType === 'focus' ? '30px' : '0',
            fontSize: eventType === 'focus' ? '14px' : '16px',
            color: eventType === 'focus' ? '#666666' : 'black'
        });

        if (labelSpan) {
            labelSpan.style.opacity = eventType === 'focus' ? 0 : 1;
        }
    };
}

export function setInputDefaults(textInput) {
    const label = textInput.previousElementSibling;
    const labelSpan = label.children[0];

    Object.assign(label.style, {
        top: 0,
        left: 0,
        color: 'black'
    });

    if (labelSpan) {
        labelSpan.style.opacity = 1;
    }
}
