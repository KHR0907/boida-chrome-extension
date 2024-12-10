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


// window.addEventListener('load', () => {
//     const menuContainer = document.getElementById('secondary');
//
//     // menuContainer가 존재하는지 확인
//     if (menuContainer && !document.getElementById('changeBackgroundButton')) {
//         // 버튼 생성
//         const button = document.createElement('button');
//         button.id = 'changeBackgroundButton';
//         button.innerText = 'Change Background';
//
//         // 버튼 스타일 설정
//         button.style.padding = '10px';
//         button.style.backgroundColor = '#ff0000';
//         button.style.color = '#ffffff';
//         button.style.border = 'none';
//         button.style.cursor = 'pointer';
//
//         // 버튼 클릭 이벤트
//         button.addEventListener('click', () => {
//             document.body.style.backgroundColor = 'blue';
//         });
//
//         // menuContainer에 버튼 추가
//         menuContainer.appendChild(button);
//     }
// });


window.addEventListener('load', () => {
// Select the target element by ID
    const secondaryDiv = document.getElementById("secondary");

// Create a new element to add
    const newElement = document.createElement("div");
    newElement.textContent = "This is a new element";
    newElement.style.color = "blue"; // Customize styles as needed

// Append the new element to the target element
    secondaryDiv.appendChild(newElement);

});
