import React, { useState } from "react";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { editMoment, addEvent } from "../../entities/timeline";
import { useAppDispatch, useCurrentMomentRedux } from "../../app/hooks";
import { EnterArrow } from "../graphics/EnterArrow";
import { FeatInput } from "../FeatInput";
import { Moment } from "../../entities/data";

const Header = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  border-bottom: 2px solid #333;
  border-top-left-radius: 33px;
  border-top-right-radius: 33px;
`;

const ChapterTitle = styled.input`
  font-family: "Gloria Hallelujah", cursive;
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
  border: none;
  margin: 0;
`;

const CloseButton = styled(Link)`
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: inherit;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='inherit'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 25px;
  opacity: 1;
`;

const EventItem = styled.div`
  flex: 1 1 100%;
  font-family: "Gloria Hallelujah", cursive;
`;

const EventInput = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  resize: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 25px 25px 55px 5px/5px 55px 25px 25px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  font-family: "Gloria Hallelujah", cursive;
  flex: 1 1 auto;
  border: none;
`;

const Submit = styled.button`
  font-family: "Gloria Hallelujah", cursive;
  flex: 0 0 80px;
  border: 0 0 0 2px;
  border-radius: 25px 25px 55px 5px/5px 55px 25px 25px;
  background-color: white;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Toolbar = styled.ul`
  border-bottom: 2px solid #333;
  display: flex;
  padding: 10px 0px;
  margin: 0;
`;

const Tool = styled("li")<{ active: boolean }>`
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  font-family: "Gloria Hallelujah", cursive;
  list-style: none;
  flex: 0 1 auto;
  margin: 0 10px 0 0;
  border: 1px solid black;
  padding: 8px;
  cursor: pointer;
  ${(props) => `
      background-color: ${props.active ? "#2b2b2b" : "white"};
      color: ${props.active ? "white" : "black"};
      `}
`;

const GenericInput: React.FC = () => {
  const moment = useCurrentMomentRedux();
  const [text, setText] = useState("");
  const saveChanges = ({ newText }: { newText: string }) => {
    if (text !== newText) {
      setText(newText);
    }
  };
  const dispatch = useAppDispatch();
  return (
    <>
      <TextArea
        onChange={(e) =>
          saveChanges({
            newText: e.target.value,
          })
        }
      />
      <Submit
        type="submit"
        onClick={() =>
          text && dispatch(addEvent({ momentId: moment.id, text }))
        }
      >
        <EnterArrow x={0} y={0} size={30} />
      </Submit>
    </>
  );
};

interface Props {
  useCurrentMoment?: () => Moment;
}

const Container = styled.div`
  margin: 0 32px;
`;

export const ChapterView: React.FC<Props> = ({
  useCurrentMoment = useCurrentMomentRedux,
}) => {
  const [inputType, setInputType] = useState("text");
  const moment = useCurrentMoment();

  const dispatch = useAppDispatch();
  const saveChanges = ({ title }: { title: string }) => {
    if (moment.title !== title) {
      dispatch(editMoment({ momentId: moment.id, title }));
    }
  };
  return (
    <Container>
      <Flex>
        <Header>
          <ChapterTitle
            value={moment.title}
            onChange={(e) =>
              saveChanges({
                title: e.target.value,
              })
            }
          />
          <CloseButton to="/">
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CloseButton>
        </Header>
        <Toolbar>
          <Tool
            active={inputType == "text"}
            onClick={() => {
              setInputType("text");
            }}
          >
            Add Event
          </Tool>
          <Tool
            active={inputType == "feat"}
            onClick={() => {
              setInputType("feat");
            }}
          >
            Perform Feat
          </Tool>
          <Tool active={false}>Create Savepoint</Tool>
        </Toolbar>
        <>
          {moment.events.map((m) => {
            return <EventItem>{m}</EventItem>;
          })}
        </>
        {inputType == "text" && (
          <EventInput>
            <GenericInput />
          </EventInput>
        )}
        {inputType == "feat" && <FeatInput />}
      </Flex>
    </Container>
  );
};
