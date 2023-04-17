import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(0);
  const [working, setWorking] = useState([
    {
      id: 0,
      title: "리액트 공부하기",
      content: "리액트 기초를 공부해봅시다.",
      isDone: false,
    },
  ]);

  return (
    <div className="app-container">
      <Header />
      <InputField
        working={working}
        setWorking={setWorking}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        id={id}
        setId={setId}
      />
      <TodoContents
        working={working}
        setWorking={setWorking}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        id={id}
        setId={setId}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div>My Todo List</div>
      <div>React</div>
    </div>
  );
}

function InputField({
  working,
  setWorking,
  title,
  setTitle,
  content,
  setContent,
  id,
  setId,
}) {
  const onChangeHandler = (event) => {
    if (event.target.id === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  const onSubmitHandler = () => {
    let result = 0;
    for (let i = 0; i < working.length; i++) {
      if (title === working[i].title) {
        result += 1;
      }
    }
    if (result === 0 && title !== "" && content !== "") {
      setWorking([
        ...working,
        {
          title: title,
          content: content,
          isDone: false,
          id: id + 1,
        },
      ]);
      setId(id + 1);
    }
    setTitle("");
    setContent("");
    console.log(working[working.length - 1]);
    console.log(working);
  };
  return (
    <div>
      <div className="input-pair-container">
        <div>
          <span className="input-text">제목</span>
          <input
            className="input-blank"
            onChange={onChangeHandler}
            id="title"
            value={title}
          ></input>
          <span className="input-text">내용</span>
          <input
            className="input-blank"
            onChange={onChangeHandler}
            id="content"
            value={content}
          ></input>
        </div>
        <div>
          <button onClick={onSubmitHandler} className="input-button">
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}

function TodoContents({
  working,
  setWorking,
  title,
  setTitle,
  content,
  setContent,
  id,
  setI,
}) {
  return (
    <div className="todocontents">
      <div>
        <p>Working..🔥</p>
        <WorkingLists
          working={working}
          setWorking={setWorking}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        ></WorkingLists>
      </div>
      <p>Done...!🎉</p>
      <div className="done-field">
        <div>
          <DoneLists
            working={working}
            setWorking={setWorking}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          ></DoneLists>
        </div>
      </div>
    </div>
  );
}

function WorkingLists({ working, setWorking }) {
  return (
    <div className="working-field">
      {working
        .filter((item) => {
          return item.isDone === false;
        })
        .map((item) => {
          return (
            <TodoItem
              working={working}
              setWorking={setWorking}
              id={item.id}
              title={item.title}
              content={item.content}
              isDone={item.isDone}
              key={item.id}
            />
          );
        })}
    </div>
  );
}
function DoneLists({ working, setWorking }) {
  return (
    <div className="done-field">
      {working
        .filter((item) => {
          return item.isDone === true;
        })
        .map((item) => {
          return (
            <TodoItem
              working={working}
              setWorking={setWorking}
              id={item.id}
              title={item.title}
              content={item.content}
              key={item.id}
            />
          );
        })}
    </div>
  );
}

function TodoItem({ working, setWorking, id, title, content, isDone }) {
  return (
    <div className="working-item-container">
      <p className="working-item-title">{title}</p>
      <p className="working-item-content">{content}</p>
      <div className="button-pair">
        <button
          onClick={() =>
            setWorking(
              working.filter((item) => {
                return item.title !== title;
              })
            )
          }
          className="delete-button"
        >
          삭제하기
        </button>
        <button
          title={title}
          onClick={() => {
            const doneWork = {
              ...working.filter((item) => {
                return item.title === title;
              })[0],
            };
            doneWork.isDone = !doneWork.isDone;
            const newWorking = [...working];
            newWorking.splice(id, 1, doneWork);
            setWorking(newWorking);
          }}
          className="complete-button"
        >
          {isDone === false ? `완료` : `취소`}
        </button>
      </div>
    </div>
  );
}

export default App;
