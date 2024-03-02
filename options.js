const blocked_site_list = document.getElementById("blocked-site-list");
const block_site_input = document.getElementById("block-site-input");
const block_site_add_button = document.getElementById("block-site-add");

function removeBlockedURL(index) {
    chrome.storage.sync.get(['blocked_urls'], ({blocked_urls}) => {
        if (!blocked_urls || index > blocked_urls.length) {
            return;
        }
        blocked_urls.splice(index, 1);
        chrome.storage.sync.set({'blocked_urls': blocked_urls});
        updateURLDisplay(blocked_urls);
    });
}
function updateURLDisplay(blocked_urls) {
    blocked_site_list.innerHTML = "";
    blocked_urls.forEach((domain, index) => {
        const list_element = document.createElement('li');
        const remove_button = document.createElement('button');
        remove_button.onclick = () => removeBlockedURL(index);
        remove_button.innerText = "Remove";
        const domain_label = document.createElement('p');
        domain_label.innerText = domain;
        list_element.appendChild(remove_button);
        list_element.appendChild(domain_label);
        blocked_site_list.append(list_element);
    });
}

block_site_add_button.addEventListener('click', () => {
    const url = block_site_input.value;
    if (url == '') {
        return;
    }
    chrome.storage.sync.get(['blocked_urls'], ({blocked_urls}) => {
        if (!blocked_urls) {
            blocked_urls = [];
        }
        if (blocked_urls.includes(url)) {
            return;
        }
        chrome.storage.sync.set({'blocked_urls': [...blocked_urls, url]});
        updateURLDisplay([...blocked_urls, url]);
    });
    block_site_input.value = "";
});

chrome.storage.sync.get(['blocked_urls'], ({blocked_urls}) => {
    if (!blocked_urls) {
        blocked_urls = [];
    }
    updateURLDisplay(blocked_urls);
});