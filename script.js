const form = document.getElementById('quizForm');
const resultBox = document.getElementById('resultBox');
const submitBtn = document.getElementById('submitBtn');
const loader = document.getElementById('loader');

// Replace with your actual Supabase URL
const WEBHOOK_URL = 'https://nfewpfkzlinuiaucxube.supabase.co/functions/v1/super-endpoint';

form.onsubmit = async (e) => {
    e.preventDefault();

    // UI Feedback
    submitBtn.disabled = true;
    submitBtn.innerText = "Analyzing your personality...";
    loader.style.display = "block";
    resultBox.style.display = "none";

    const formData = new FormData(form);

    const payload = {
        email: document.getElementById('email').value,
        answers: Object.fromEntries(formData)
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Analysis failed');

        const data = await response.json();

        // Display results
        resultBox.style.display = "block";
        resultBox.innerHTML = `
            <h2 style="color: #6366f1;">Your Type: ${data.mbti}</h2>
            <p>${data.description}</p>
            <p style="color: green; font-weight: bold;">✓ Check your email for the detailed report!</p>
        `;
        resultBox.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Get AI Results Now";
        loader.style.display = "none";
    }
};