import React, { useState } from 'react'
import styled from 'styled-components';
import Button from "./button";
import TextInput from './TextInput'
import {useNavigate} from 'react-router-dom'
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import {GenerateAIImage,CreatePost} from '../api/index.js'

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  setcreatePostLoading
}) => {
  const[error,setError]=useState("");
  const navigate=useNavigate();

  const generateImageFun=async()=>{
    setGenerateImageLoading(true);
    await GenerateAIImage({prompt:post.prompt}).then((res)=>{
      setPost({...post,photo:`data:image/jpge;base64,${res?.data?.photo}`})
      setGenerateImageLoading(false)
    }).catch((err)=>{
      setError(err?.response?.data?.message);
      console.log(err);
    })
  }
  const createPostFun=async()=>{
    setcreatePostLoading(true);
     await CreatePost(post).then(()=>{
      setGenerateImageLoading(false)
      navigate("/");
    }).catch((err)=>{
      setError(err?.response?.data?.message);
      console.log(err);
    })
  }
  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name.."
          name="name"
          value={post.name}
          handelChange={(e)=>setPost({...post,name:e.target.value})}  
          />
        <TextInput
          label="Image Prompt"
          placeholder="Enter prompt"
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{color:"red"}}>{error}</div>}
      </Body>
      <Actions>
        <Button
        text="Generate Image" 
        leftIcon={<AutoAwesome />}
        isLoading={generateImageLoading}
        isDisabled={post.prompt===""}
        onClick={()=>generateImageFun()}
        ></Button>
        <Button
        text="Post Image"
        type="secondary" 
        leftIcon={<CreateRounded />}
        isLoading={createPostLoading} 
        isDisabled={post.name==="" || post.prompt==="" || post.photo===""}
        onClick={()=>createPostFun()}
        ></Button>
      </Actions>
    </Form>
  )
}

export default GenerateImageForm