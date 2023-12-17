document.getElementById("submit-btn").addEventListener("click", function () {
  sendToChatGPT();
});

// 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

function sendToChatGPT() {
  let value = document.getElementById("word-input").value;

  let body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: value }],
    tempreture: "1",
  };

  let headers = {
      Authorization: "Bearer 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",
  };

  axios
    .post("https://api.openai.com/v1/chat/completions", body, {
      headers: headers,
    })
    .then((response) => {
      let reply = response.data.choices[0].message.content;
      document.getElementById("reply-content").textContent = reply;
    });
}
