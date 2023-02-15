import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Divider from '../components/Divider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Messages from '../components/Messages';
const { Configuration, OpenAIApi } = require('openai');

const Chat = () => {
  const [messages, setMessages] = useState([
    // { from: 'computer', text: 'Hi, My Name is HoneyChat' },
    // { from: 'me', text: 'Hey there' },
    // { from: 'me', text: 'Myself Ferin Patel' },
    // {
    //   from: 'computer',
    //   text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    // },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState('false');
  // const [apiResponse, setApiResponse] = useState('');

  const configuration = new Configuration({
    apiKey: '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',
  });
  // console.log(process.env.REACT_APP_OPENAI_API_KEY);
  const openai = new OpenAIApi(configuration);

  const handleSendMessage = async () => {
    console.log('sending');
    console.log(inputMessage);
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: 'me', text: data }]);
    setInputMessage('');

    setIsLoading(true);
    let response = '';
    if (isLoading) {
      try {
        const result = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: data,
          temperature: 0.5,
          max_tokens: 4000,
        });
        console.log(data);
        console.log('response', result.data.choices[0].text);
        response = result.data.choices[0].text;
        // setApiResponse(result.data.choices[0].text);
      } catch (e) {
        //console.log(e);
        // setApiResponse('Something is going wrong, Please try again.');
        response = 'Something is going wrong, Please try again.';
      }

      setTimeout(() => {
        setMessages((old) => [...old, { from: 'computer', text: response }]);
      }, 1000);
      setIsLoading(false);
    }
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w="40%" h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
