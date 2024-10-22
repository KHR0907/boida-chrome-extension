/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/

document.getElementById('toggle-pip').addEventListener('click', async () => {
    let [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true }); // 활성화된 탭을 찾아냄

    if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, { action: "toggle_pip" }); // 메시지를 탭으로 보냄

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: engineApiRequest, //  engineApiRequest 함수 실행
        });
    }
});

function engineApiRequest() {
    //URL
    const engineUrl = "https://boida.bubblecell.win/api/boida";
    const currentUrl = window.location.href;

    let targeturl = engineUrl + "?vidURL=" + currentUrl; // 요청을 보낼 엔진 URL
    console.log("start");
    fetch(targeturl,
        {method: 'POST', mode: 'no-cors'})
        // 요청할 URL
        .then(response => {
            if (!response.ok) {  // 응답이 성공적인지 확인
                throw new Error('Network response was not ok');
            }
            console.log("success")
            return response.json();  // JSON 형식으로 변환
        })
        .then(data => {
            console.log(data);  // 응답 데이터를 처리
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    console.log("end");
}


