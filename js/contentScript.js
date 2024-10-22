// 메시지를 수신하여 iframe을 토글하는 함수
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggle_pip") {
        // 현재 iframe이 있는지 확인
        const existingIframe = document.getElementById('pip_iframe');

        if (existingIframe) {
            // iframe이 있으면 제거
            existingIframe.remove();
        } else {
            // iframe이 없으면 새로 생성
            const iframe = document.createElement('iframe');
            iframe.id = 'pip_iframe';
            iframe.src = 'http://127.0.0.1/';
            iframe.style.position = 'fixed';
            iframe.style.bottom = '10px';
            iframe.style.right = '10px';
            iframe.style.width = '300px';
            iframe.style.height = '200px';
            iframe.style.zIndex = '9999';
            iframe.style.border = '1px solid #ccc';
            iframe.style.backgroundColor = 'white';

            document.body.appendChild(iframe);
        }
    }
});
