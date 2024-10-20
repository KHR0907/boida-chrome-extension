/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/

// changeColor ID element 를 취득
let changeColor = document.getElementById("changeColor");

// 배경색 버튼을 클릭하였을 경우 이벤트 등록
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: engineApiRequest,
    });
});

function engineApiRequest () {
    //URL
    const engineUrl = "https://boida.bubblecell.win/api/boida";
    const currentUrl = window.location.href;

    let targeturl = engineUrl + "?vidURL=" + currentUrl; // 요청을 보낼 엔진 URL
    console.log("start");

    fetch(targeturl,
        {method: 'POST', mode:'no-cors'})
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
}
