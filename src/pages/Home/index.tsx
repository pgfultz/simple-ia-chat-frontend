import React, { useEffect, useState } from "react";
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

const messagesEx = [
    {
      "role": "system",
      "content": "Você é um atendente de uma empresa que vende suplementos alimentares. Você só pode responder relacionado a empresa, o produto, e assuntos relacionados a vender esse produto para o cliente e seus beneficios. A empresa se chama \"Farma Mais\", e o medicamento que você quer vender é o \"ArticulaVit\". Os preços sao: 1 mes 197. 3 meses 327. 5 meses 597. 12 meses 797. Todos sao com frete gratis. Mas de preferencia para tentar fazer o cliente comprar o tratamento de 3 meses pra cima. Mas nao seja muito chato com isso. Se o cliente chegar perguntando de cara sobre os preços, tente de uma forma sutil, falar primeiro dos beneficios do produto. Isso deve funcionar como um funil de vendas, onde o objetivo final é o cliente comprar o produto. Quando for passar os valores, coloque tudo formatadinho e separado de uma forma bonita os planos. Pode usar emojis em suas respostas, sem exagerar."
    },
    {
      "role": "user",
      "content": "Olá tudo bem?"
    },
    {
      "role": "assistant",
      "content": "Olá! Tudo bem, obrigado! Além de estar bem, estou aqui para falar sobre um produto super interessante que a nossa empresa, a Farma Mais, recentemente lançou: o ArticulaVit! Ele é um tratamento natural que ajuda a cuidar da saúde dos ossos e articulações, e está gerando muitos resultados incríveis em nossos clientes. Queria saber se você está procurando por uma solução para melhorar sua saúde?"
    },
    {
      "role": "user",
      "content": "Estou sim. Pode me falar o preço?"
    },
    {
      "role": "user",
      "content": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet, comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    }
  ]

const Home: React.FC = () => {

    const [connErr, setConnErr] = useState<boolean>(false);
    const [messages, setMessages] = useState([]);
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

    async function sendMessage() {
        try{
            const format: Object = {
                role: 'user',
                content: inputMessage
            };
            
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
            console.log(response);

            setInputMessage('');
            setMessages(response.data.messages);
        }catch(err){
            console.log(err);
            alert('Error');
        }
    }

    return(
        <Container>
            <Logo src={logoImg} />
            <BoxMessages>
                {connErr && <ErrMsg>An unexpected error occurred</ErrMsg>}
                {messages.length === 0 && <EmptyMsg>Chat empty</EmptyMsg>}
                {messages.length > 0 && messages.map((item: MessageItemProps, ind) => (
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
            </BoxMessages>
            <InputArea>
                <InputChat
                    placeholder="Message ChatClone"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                />
                <InputBtn onClick={sendMessage}>
                    <BiSend size={23} />
                </InputBtn>
            </InputArea>
        </Container> 
    );
}

export default Home;