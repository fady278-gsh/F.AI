document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.getElementById("submit-btn");

    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            sendToChatGPT();
        });
    } else {
        console.error("Element with id 'submit-btn' not found.");
    }
});

function sendToChatGPT() {
    // يتم البحث عن عناصر الإدخال والإخراج في الصفحة
    var wordInput = document.getElementById("word-input");
    var replyContent = document.getElementById("reply-content");

    if (!wordInput || !replyContent) {
        console.error("Required elements not found.");
        return;
    }

    // القيمة المدخلة من المستخدم
    var value = wordInput.value;

    // تكوين الجسم الذي سيتم إرساله كجزء من الطلب إلى API
    var body = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: value }
        ],
        max_tokens: 150,
    };

    // api
    var headers = {
        Authorization: "Bearer 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",
    };

    // إجراء طلب POST باستخدام Axios
    axios
        .post("https://api.openai.com/v1/engines/gpt-3.5-turbo/completions", body, {
            headers: headers,
        })
        .then((response) => {
            // عند نجاح الطلب، يتم عرض الرد على المستخدم
            var reply = response.data.choices[0].message.content;
            replyContent.textContent = reply;
        })
        .catch((error) => {
            // في حالة وجود خطأ، يتم عرضه في وحدة التحكم (console)
            console.error("Error fetching response from OpenAI:", error);
        });
}
