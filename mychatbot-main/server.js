// const PORT = 8000
// const express = require("express");
// const cors = require('cors')

// const app = express();
// app.use(express.json())
// app.use(cors())

// const API_key = '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'

// app.post('/completions',async(req,res) => {
//     const options = {
//         method : "POST",
//         headers : {
//            // Authorization: Bearer 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,
//               "Autorization" : `Bearer${API_key}`,
//              //"Authorization ": Bearer {API_key},
//             "Content-Type" : "application/json"
//         },
//         body :JSON.stringify({
//             "model": "gpt-3.5-turbo",
//             "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}],
//             max_tokens : 100,
//           })
//     }
//     try{
//        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
//        const data = await response.json()
//        res.send(data)
//     }catch(error){
//         console.error(error)
//     }
// })
// app.listen(PORT,()=> console.log('server is runnig on port ' + PORT))
//  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

const PORT = 8000;
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());

const API_key = process.env.API_KEY

app.post('/completions', async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        // { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: req.body.message }
      ],
      max_tokens: 100
    })
  };

  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
