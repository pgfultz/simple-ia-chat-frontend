import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`;

export const Logo = styled.img`
    width: 80px;
    height: 80px;
    margin-top: 15px;
`;

export const ErrMsg = styled.p`
    width: 100%;
    margin: 12px;
    color: red;
`;

export const EmptyMsg = styled.p`
    width: 100%;
    text-align: center;
    margin-top: 30px;
    color: gray;
`;

export const BoxMessages = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #212121;
    border-radius: 10px;
    width: 90%;
    height: 90%;
    max-width: 800px;
    margin: 15px 0;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const MessageUser = styled.div`
    display: flex;
    max-width: 65%;
    padding: 13px;
    align-self: flex-end;
    background-color: #4ba6c1;
    margin: 5px 0;
    border-top-left-radius: 23px;
    border-bottom-left-radius: 23px;
`;

export const MessageAssistant = styled.div`
    display: flex;
    max-width: 65%;
    padding: 13px;
    background-color: #fcebd1;
    color: #171717;
    margin: 5px 0;
    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #212121;
    border-radius: 10px;
    width: 90%;
    max-width: 800px;
    margin-bottom: 15px;
`;

export const InputChat = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    margin: 10px;
    background-color: transparent;
    border: 1px solid #4ba6c1;
    outline: none;
    color: #fff;
    resize: vertical;

    &::placeholder {
        font-size: 14px;
    }
`;

export const InputBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #4ba6c1;
    outline: none;
    color: #fff;
    border: 0;
    cursor: pointer;

    &::hover {
        opacity: 0.5;
    }
`;