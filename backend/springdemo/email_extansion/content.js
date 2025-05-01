console.log("Загрузочка произошла!!!")

const observer = new MutationObserver((mutations)=>{ //изменения в браузере
    for(const mutations of mutations){
        const addedNodes = Array.from(mutations.addedNodes);
        const hasComposeElements = addedNodes.some(node=>
            node.nodeType === Node.ELEMENT_NODE
        )
    }
});