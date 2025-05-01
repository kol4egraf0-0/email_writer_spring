console.log("Загрузочка произошла!!!")

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
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