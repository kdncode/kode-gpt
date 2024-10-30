import { useEffect, useRef, useState } from "react";
import "./new-prompt.css";
import { Upload } from "../upload/upload";
import { IKImage } from "imagekitio-react";
import model from "../../../lib/gemini";
import Markdown from "react-markdown";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { set } from "mongoose";
// import { set } from "mongoose";

export const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, how are you?" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi there?" }],
      }
    //   /* production */
    //   data?.history?.map(({ role, parts }) => ({
    //     role,
    //     parts: [{ text: parts[0].text }],
    //   })),
    ],
    
    /* Prod 2 */
    // history:
    //   data?.history?.length > 0
    //     ? data.history.map(({ role, parts }) => ({
    //         role,
    //         parts:
    //           parts?.length > 0 && parts[0]?.text
    //             ? [{ text: parts[0].text }]
    //             : [],
    //       }))
    //     : [],
    generationConfig: {
      // maxTurns: 5,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let strText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        strText += chunkText;
        setAnswer(strText);
      }
      mutation.mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false /* isInitial */);
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) return;
    if (data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true /* isInitial */);
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div className="loading">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_END_POINT}
          path={img.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="new-prompt" ref={endRef}>
        <form className="new-form" onSubmit={handleSubmit} ref={formRef}>
          <Upload setImg={setImg} />
          <input id="file" type="file" multiple={false} hidden />
          <input id="text" name="text" placeholder="Message Kode GPT" />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};
