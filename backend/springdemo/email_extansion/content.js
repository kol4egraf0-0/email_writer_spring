function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3'; //J-J5-Ji btA не эта тк оболочка
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Сгенерировать ИИ Ответ');
    return button;
}

function getEmailContent() { //для отправки запроса берем текст!!!
    const selectors =[ //перебераем div классы
        '.h7',
        '.a3s.aiL',
        'gmail_quote',
        '[role=presentation]'
    ]
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content)
        {
            return content.innerText.trim(); //берем текст
        }
    }
    return null;
}


function findComposeToolBar() {
    const selectors =[ //перебераем div классы
        '.btC',
        '.aDh',
        '[role=toolbar]',
        '.gU.Up'
    ]
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar)
        {
            return toolbar;
        }
    }
    return null;
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button'); //внедрени кнопки в toolbar gmail'а
    if(existingButton) existingButton.remove();

    const toolbar = findComposeToolBar();
    if(!toolbar){
        console.log("Тулбар не нашлась")
        return;
    }

    console.log("Тул нашлась, cоздаем кнопку");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('Click', async ()=>{
        try {
            button.innerHTML='Generating';
            button.disabled = 'true';

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent:emailContent,
                    "tone":"friendly"
                })
            });

            if(!response.ok){
                throw new Error('API Запрос провален!');
            }

            const generateReply = await response.text();
            const composeBox = document.querySelector('[role=textbox][g_editable="true"]');
            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generateReply); //ввод текста сгенерированного
            }
            else {
                console.error('composeBox не найден');
            }
        } catch (error) {
            console.error(error);
            alert('ошибка генерации ответа')
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations)=>{ //изменения в браузере(api)
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node=>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') 
            || node.querySelector('.aDh, .btC, [role="dialog"]')) //элементы на странице гугла
        );
        if(hasComposeElements){
            console.log("Окно для Отправки письма найдено")
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})