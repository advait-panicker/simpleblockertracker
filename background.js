chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.sync.get(["blocked_urls"], ({blocked_urls}) => {
        if (!blocked_urls) {
            blocked_urls = [];
        }
        if (changeInfo.status == 'loading' && blocked_urls.includes(tab.url)) {
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
            chrome.storage.sync.get(["block_history"], ({block_history}) => {
                console.log(block_history);
                if (!block_history) {
                    block_history = [];
                }
                const new_block_history = [...block_history, {'url': tab.url, 'time': new Date()}];
                console.log(new_block_history);
                chrome.storage.sync.set({"block_history": new_block_history});
            });
        }
    });
});