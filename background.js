
chrome.runtime.onInstalled.addListener(async () => {
    await reloadYoutubeTab()
});

chrome.runtime.onStartup.addListener(async () => {
    await reloadYoutubeTab()
});

chrome.windows.onCreated.addListener(async () => {
    await reloadYoutubeTab()
});

async function reloadYoutubeTab() {
    let youtubeTabs = await getYoutubeTab();
    if (youtubeTabs.length != null && youtubeTabs.length > 0) {
        youtubeTabs.forEach(currYoutubeTab => {
            chrome.tabs.reload(
                currYoutubeTab.id,
                { "bypassCache": true },
                (() => {

                    //console.log("Fin de l'update du tab " + currYoutubeTab.title + "/" + currYoutubeTab.id)
                    // DONT WORK ! Try to make it all async, with a for ...in instead of a foreach ?
                    chrome.tabs.sendMessage(currYoutubeTab.id, { trigger: 'pauseVideo' });
                    //console.log("message sent ")
                })
            )
        });
    }
}

async function getYoutubeTab() {
    let allTabs = await chrome.tabs.query({});

    youtubeTab = allTabs.filter(function (tab) {
        return tab.url.startsWith('https://www.youtube.com/watch');
    })

    return youtubeTab;
}

