import React, { useEffect, useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";


import api from "../../services/api";

import { 
    BoxMessages, 
    Logo, 
    ErrMsg, 
    EmptyMsg,
    Container, 
    InputArea, 
    InputChat, 
    InputBtn,
    MessageUser,
    MessageAssistant
} from "./styles";

const logoImg = require('../../assets/imgs/logo.png');

type MessageItemProps = {
    role: String,
    content: String
};

const Home: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const boxMessagesRef = useRef<HTMLDivElement>(null);

    const [connErr, setConnErr] = useState<boolean>(false);
    const [messages, setMessages] = useState<any>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        (async function loadMessages() {
            try{
                setConnErr(false);
                const messages = await api.get('/chat/663ac8f1d4cc42fda4399001');
                //console.log(messages.data);
                
                setMessages(messages.data.messages);
            }catch(err){
                //console.log(err);
                setConnErr(true);
            }
        })()
    }, []);

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 600);
    }, [messages]);

    useEffect(() => {
        if (boxMessagesRef.current) {
          boxMessagesRef.current.scrollTo(0, boxMessagesRef.current.scrollHeight);
        }
      }, [boxMessagesRef.current]);

    async function sendMessage() {
        try{
            setInputMessage('');

            const format: Object = {
                role: 'user',
                content: inputMessage
            };

            setMessages([...messages, format, {role: 'assistant', content: 'Typing...'}]);
            scrollToBottom();
            
            setTimeout(async () => {
                let newMessagesArr: Array<Object> = messages;
                newMessagesArr.push(format);
                //console.log(newMessagesArr);

                const newArray: any = newMessagesArr.map((obj: any) => {
                    // Cria uma cópia do objeto excluindo os campos _id e sentAt
                    const newObj = { ...obj };
                    delete newObj._id;
                    delete newObj.sentAt;
                    return newObj;
                });         
                //console.log(newArray);
        
                const response = await api.put('/chat/663ac8f1d4cc42fda4399001', newArray);
                //console.log(response);

                setMessages(response.data.messages);
            }, 600);

            
            
        }catch(err){
            console.log(err);
            alert('Error');
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Impede a quebra de linha ao pressionar Enter
            sendMessage();
        }
    };

    return(
        <Container>
            <Logo src={logoImg} />
            <BoxMessages ref={boxMessagesRef}>
                {connErr && <ErrMsg>An unexpected error occurred</ErrMsg>}
                {messages.length === 0 && <EmptyMsg>Chat empty</EmptyMsg>}
                {messages.length > 0 && messages.map((item: MessageItemProps, ind: number) => (
                    <div key={ind}>
                    {item.role === 'user' && (
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <MessageUser>{item.content}</MessageUser>
                            <FaCaretRight size={30} color="#4ba6c1" style={{marginLeft: -14}} />
                        </div>
                    )}
                    {item.role === 'assistant' && (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <FaCaretLeft size={30} color="#fcebd1" style={{marginRight: -14}} />
                            <MessageAssistant>{item.content}</MessageAssistant>
                        </div>
                    )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </BoxMessages>
            <InputArea>
                <InputChat
                    placeholder="Message ChatClone"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputBtn onClick={sendMessage}>
                    <BiSend size={23} />
                </InputBtn>
            </InputArea>
        </Container> 
    );
}

export default Home;