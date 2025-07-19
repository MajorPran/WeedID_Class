// Function to preview the selected image
function previewImage(event) {
    const thumbnail = document.getElementById('previewThumbnail');
    const label = document.getElementById('thumbnailLabel');
    const file = event.target.files[0];
    if (file) {
        thumbnail.src = URL.createObjectURL(file);
        thumbnail.style.display = 'block';
        label.style.display = 'block';
    }
}

// Function to handle image upload and detection
async function uploadImage() {
    const imageInput = document.getElementById('imageInput');
    const resultSection = document.getElementById('resultSection');
    const outputImage = document.getElementById('outputImage');

    if (imageInput.files.length === 0) {
        alert("Please select an image first.");
        return;
    }

    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', imageInput.files[0]);

        // Show loading state
        const button = document.querySelector('button');
        button.textContent = '🔄 Processing...';
        button.disabled = true;

        // Send request to backend
        const response = await fetch('http://localhost:5000/detect', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Detection failed');
        }

        const data = await response.json();

        // Update the output image
        outputImage.src = data.result_image + '?t=' + new Date().getTime(); // Cache busting
        resultSection.style.display = 'block';
        outputImage.style.display = 'block';

        // Reset button state
        button.textContent = '🔍 Detect';
        button.disabled = false;

    } catch (error) {
        alert('Error during detection: ' + error.message);
        button.textContent = '🔍 Detect';
        button.disabled = false;
    }
}
