const assign = (obj, src) => {
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            obj[prop] = src[prop];
        }
    }

    return obj;
};

$(function () {
    document
        .querySelectorAll('.text-input-control input')
        .forEach((textInput) => {
            textInput
                .addEventListener(
                    'focus',
                    (e) => {
                        const target = e.target;
                        const label = target.previousElementSibling;
                        const labelSpan = label.children[0];
                        const newStyles = {
                            'top': '10px',
                            'left': '30px',
                            'font-size': '14px',
                            'color': '#666666'
                        };

                        target.setAttribute("placeholder", '');
                        target.style.fontSize = '18px';

                        assign(label.style, newStyles);

                        if (labelSpan) {
                            labelSpan.style.opacity = 0;
                        }
                    }
                );

            textInput
                .addEventListener(
                    'blur',
                    (e) => {
                        const target = e.target;
                        const label = target.previousElementSibling;
                        const labelSpan = label.children[0];
                        const newStyles = {
                            'top': '0',
                            'left': '0',
                            'font-size': '16px',
                            'color': 'black'
                        };

                        target
                            .setAttribute("placeholder", label.textContent.trim());
                        target.style.fontSize = '16px';

                        assign(label.style, newStyles);

                        if (labelSpan) {
                            labelSpan.style.opacity = 1;
                        }
                    }
                );

            const label = textInput.previousElementSibling;
            const labelSpan = label.children[0];
            const newStyles = {
                'top': '0',
                'left': '0',
                'color': 'black'
            };

            assign(label.style, newStyles);

            if (labelSpan) {
                labelSpan.style.opacity = 1;
            }
        })
});
