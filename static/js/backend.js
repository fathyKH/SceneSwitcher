const colorPicker = document.getElementById("favcolor-1");
const colorPickerSub = document.getElementById("favcolor-2");
const colorDisplay = document.getElementById("color-value-1");
const colorDisplaySub = document.getElementById("color-value-2");
const subtitleText = document.getElementById("subtitle-text");
const processBtn = document.getElementById("processButton")

// Color Picker Event Handlers
colorPicker.addEventListener("input", function () {
  colorDisplay.value = colorPicker.value;
  subtitleText.style.color = colorPicker.value;
});

colorPickerSub.addEventListener("input", function () {
  colorDisplaySub.value = colorPickerSub.value;
  subtitleText.style.backgroundColor = colorPickerSub.value;
});

colorDisplay.addEventListener("input", function () {
  colorPicker.value = colorDisplay.value;
});

colorDisplaySub.addEventListener("input", function () {
  colorPickerSub.value = colorDisplaySub.value;
});

// Slider for font size
const rangeSlider = document.getElementById("myRange");
const sliderValue = document.getElementById("slider-val");

rangeSlider.addEventListener("input", function () {
  const value = rangeSlider.value;
  sliderValue.textContent = value;
  subtitleText.style.fontSize = `${value}px`;
});

// Processing the form
processBtn.addEventListener('click', () => {
  const videoInput = document.getElementById("Video");
  const mp3Input = document.getElementById("mp3");
  const transcribedInput = document.getElementById("Video-txt");
  const fontSizeInput = document.getElementById("myRange");
  const fontColorInput = document.getElementById("favcolor-1");
  const subtitlesBackgroundInput = document.getElementById("favcolor-2");
  
  // Optional: Font input (if needed)
  const fontInput = document.getElementById("font"); // Add this input in your HTML if you're uploading a font file

  // Form validation for file inputs
  if (!videoInput.files[0] || !mp3Input.files[0] || !transcribedInput.files[0]) {
    alert("Please select all required files.");
    return;
  }

  const formData = new FormData();
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  formData.append('csrfmiddlewaretoken', csrfToken);
  formData.append('video_file', videoInput.files[0]);
  formData.append('mp3_file', mp3Input.files[0]);
  formData.append('text_file', transcribedInput.files[0]);
  formData.append('font_file', fontInput.files[0]);
  
  formData.append('font_size', fontSizeInput.value);
  formData.append('font_color', fontColorInput.value);
  formData.append('bg_color', subtitlesBackgroundInput.value);

  fetch('/process', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        window.location.href = data.redirect;
      } else {
        alert("Failed to process video.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
