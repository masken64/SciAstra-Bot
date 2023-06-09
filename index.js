document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;
let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")

  if (compare(prompts, replies, text)) { 
    
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(competitive|prepare|exam|IAT|NEST|ISI|CMI|IACS|CUET)/gi)) {
    // If no match, check if message contains `exam` or other keywords.
    product = a[Math.floor(Math.random() * a.length)];
  } else if (text.match(/(location|located|head office)/gi)) {
    // If no match, check if message contains `location`or ther keywords.
    product = b[Math.floor(Math.random() * b.length)];
  }else if (text.match(/(fees|courses|purchase|pricing)/gi)) {
    // If no match, check if message contains `fees` or other keywords.
    product = c[Math.floor(Math.random() * c.length)];
  }else if (text.match(/(ios|android|application|mobile|app)/gi)) {
    // If no match, check if message contains `contact`
    product = d[Math.floor(Math.random() * d.length)];
  }else if (text.match(/(email|contact|number|phone)/gi)) {
    // If no match, check if message contains `contact`
    product = e[Math.floor(Math.random() * d.length)];
  }
  
  
  else {
    
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        
        break;
      }
    }
    if (replyFound) {
      
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )

}
//Made by Kartik Sharma