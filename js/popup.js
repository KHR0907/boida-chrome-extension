/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/

document.getElementById('subtitle-btn').addEventListener('click', function () {
    const subtitleBtn = this;
    if (subtitleBtn.classList.contains('on')) {
        subtitleBtn.textContent = '자막 on';
        subtitleBtn.classList.remove('on');
    } else {
        subtitleBtn.textContent = '자막 off';
        subtitleBtn.classList.add('on');
    }
});

const helpBox = document.getElementById('help-box');
const explain = document.getElementById('explain');
let isToastVisible = false; // 플래그 변수
helpBox.addEventListener('click', function () {

    if (isToastVisible) return; // 이미 토스트가 표시 중이라면 실행하지 않음

    isToastVisible = true; // 플래그 설정
    explain.style.display = 'flex';
    explain.classList.add('toast-animation');

    setTimeout(() => {
        explain.classList.remove('toast-animation');
        isToastVisible = false;
    }, 4000);
});



// 버튼 클릭 이벤트 핸들러
document.getElementById('subtitle-btn').addEventListener('click', async () => {
    console.log("subString start");

    let [activeTab] = await chrome.tabs.query({active: true, currentWindow: true}); // 활성화된 탭을 찾아냄

    if (activeTab) {
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            function: subStringOnOff, //  engineApiRequest 함수 실행
        });
    }
});



function subStringOnOff() {
    // 상태를 관리하는 변수
    let subtitleState = 0;
    // URL
    const targetUrl = "http://127.0.0.1/api/video-data/receiver";

    // 상태를 전환
    subtitleState = subtitleState === 0 ? 1 : 0;
    console.log("subString start : "+subtitleState);

    // 요청 본문 데이터
    let requestData = {
        subString: ""+subtitleState+""  // subString 값을 포함
    };

    fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'  // JSON 데이터임을 명시
        },
        body: JSON.stringify(
            {
                'subString' : ""+subtitleState+""
            }
        )  // 데이터를 JSON 형식으로 변환
    })
        .then(response => {
            if (!response.ok) {  // 응답이 성공적인지 확인
                throw new Error('Network response was not ok');
            }
            console.log("success");
            return response.text();  // JSON 형식으로 변환
        })
        .then(data => {
            console.log(data);  // 응답 데이터를 처리
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

}


document.getElementById('convert-btn').addEventListener('click', async () => {
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
