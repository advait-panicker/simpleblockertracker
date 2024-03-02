const block_count_elem = document.getElementById('block-count');
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(["block_history"], ({block_history}) => {
        block_count_elem.innerText = block_history.length;
    });
});