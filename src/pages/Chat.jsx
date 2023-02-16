import { Flex } from '@chakra-ui/react';
import axios from 'axios';
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
    organization: 'Your org',
    apiKey: 'Your apikey',
    header: 'Content-Type: application/json',
  });
  // const openai_api_key = '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';
  // console.log(process.env.REACT_APP_OPENAI_API_KEY);
  const openai = new OpenAIApi(configuration);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: 'me', text: data }]);
    setInputMessage('');
    // let params = {
    //   model: 'text-davinci-003',
    //   prompt: 'Say this is a test',
    //   max_tokens: 7,
    //   temperature: 0,
    //   top_p: 1,
    //   n: 1,
    //   stream: false,
    //   logprobs: null,
    //   stop: '\n',
    // };
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + String(openai_api_key),
    //   },
    //   body: JSON.stringify(params),
    // };
    // const result = await fetch(
    //   'https://api.openai.com/v1/completions',
    //   requestOptions
    // );
    // const test = await result.json();
    // const re_data = test.choices[0].text;

    // console.log('test~~~~~~~~~~~~', re_data);
    // setMessages((old) => [...old, { from: 'me', text: re_data }]);

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

        response = result.data.choices[0].text;
        // setApiResponse(result.data.choices[0].text);
      } catch (e) {
        //console.log(e);
        // setApiResponse('Something is going wrong, Please try again.');
        response = 'Something is going wrong, Please try again.';
      }
      setMessages((old) => [...old, { from: 'computer', text: response }]);

      // setTimeout(() => {
      //   setMessages((old) => [...old, { from: 'computer', text: response }]);
      // }, 1000);
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
