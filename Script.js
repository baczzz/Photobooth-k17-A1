const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnStart = document.getElementById('btnStart');
const btnCapture = document.getElementById('btnCapture');
const btnDownload = document.getElementById('btnDownload');
const gallery = document.getElementById('gallery');

let stream = null;
let currentPhoto = null;

// Ưu tiên camera trước (facingMode: "user")
async function startCamera() {
    try {
        // Dừng stream cũ nếu có
        if (stream) stream.getTracks().forEach(track => track.stop());

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",   // ← Đây là dòng quan trọng: camera trước
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        video.srcObject = stream;
        btnCapture.disabled = false;
        btnStart.textContent = "✅ Camera đang chạy (trước)";
    } catch (err) {
        alert("Không mở được camera. Hãy cho phép quyền camera và thử lại nhé! 😊");
        console.error(err);
    }
}

// Chụp ảnh
btnCapture.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Lật ngang để selfie đẹp hơn (giống gương)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    currentPhoto = canvas.toDataURL('image/png');
    
    // Tạo ảnh nhỏ trong gallery
    const img = document.createElement('img');
    img.src = currentPhoto;
    gallery.appendChild(img);

    btnDownload.disabled = false;
});

// Tải ảnh về máy
btnDownload.addEventListener('click', () => {
    if (!currentPhoto) return;
    const link = document.createElement('a');
    link.download = 'photobooth-bac-' + Date.now() + '.png';
    link.href = currentPhoto;
    link.click();
});

// Bắt đầu
btnStart.addEventListener('click', startCamera);

// Tự động thử mở camera khi load trang (nếu trình duyệt cho phép)
window.onload = () => {
    // Nhiều trình duyệt chặn tự động, nên vẫn có nút bấm
};
