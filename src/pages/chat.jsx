import React from "react";
import RtmClient from "../rtm-client"

const Chat = () => {

  let appId = process.env.REACT_APP_AGORA_APP_ID
  let uid = String(Math.floor(Math.random()*232))
  let token = null 
  let channelName = 'GoFast Streaming Web App'

  let initiateRTM = async () =>{
    let client = await RtmClient.createInstance(appId)
    await client.login({uid,token})

    const channel = await client.createChannel(channelName)
    await channel.join()

    let form = document.getElementById('form')
    form.addEventListener('submit', async (e)=>{
      e.preventDefault()
      let message = e.message.value
      await channel.sendMessage({text:message, type:'text'})
      form.reset()
      handleMessage({text:message})
    })

    channel.on('ChannelMessage', (message, peerId) =>{
      console.log("Message", message)
      handleMessage(message)
    })

    let handleMessage = async (message) =>{
      let messages = document.getElementById('messages')
      let messageElement = `<p>${message.text}</p>`
      messages.insertAdjacentHTML('beforeend', messageElement)
    }
  }

  return (
    <div>
      <form>
        <input type="text" name="message" />
      </form>

      <div id="messages"></div>
    </div>
  );
};

export default Chat;
