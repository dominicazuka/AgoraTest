import React from "react";
import RtmClient from "../rtm-client"

const chat = () => {
  //   //send messages
  // sendbtn.addEventListener("click", ()=>{
  //   channel.sendMessage({ text: msg.value }).then(() => {
  //     /* Your code for handling events, such as a channel message-send success. */
  //     chatbox.innerHTML += "<div class='message_holder'><span class='chat user1'>"+ msg.value + "</span></div>";
  //     console.log("Successfully sent message!");
  //   }).catch(error => {
  //     /* Your code for handling events, such as a channel message-send failure. */
  //     console.log("Error sending message!");
  //     });
  // })

  // if(flag == true){
  // //receive channel messages
  // channel.on('ChannelMessage', ({ text }, senderId) => { // text: text of the received channel message; senderId: user ID of the sender.
  //   /* Your code for handling events, such as receiving a channel message. */
  //   chatbox.innerHTML +="<div class='message_holder'><span class='chat user2'>"+ text + "</span></div>";
  //   msg.value="";
  // });
  // }

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

export default chat;
