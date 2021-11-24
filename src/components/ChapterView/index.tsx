/** @jsxImportSource theme-ui */

import React, { useState } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { editMoment, addEvent } from "../../entities/timeline";
import { Flex, Input, Container, Textarea, Button } from "theme-ui";
import { useAppDispatch, useCurrentMomentRedux } from "../../app/hooks";
import { EnterArrow } from "../graphics/EnterArrow";
import { FeatInput } from "../FeatInput";
import { Moment } from "../../entities/data";
import { CreateSavePoint } from "../CreateSavePoint";

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

const Tool: React.FC<{
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}> = ({ active, children, onClick }) => (
  <Button
    as="li"
    role="button"
    sx={{
      variant: "styles.borders.sketchSquare",
      padding: 2,
      backgroundColor: active ? "highlight" : "background",
      color: active ? "background" : "text",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

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
      <Textarea
        variant="nakedInput"
        onChange={(e) =>
          saveChanges({
            newText: e.target.value,
          })
        }
      />
      <Button
        variant="primary"
        sx={{
          flex: "0 0 80px",
          borderRadius: "25px 25px 55px 5px/5px 55px 25px 25px",
          margin: 0,
        }}
        type="submit"
        onClick={() =>
          text && dispatch(addEvent({ momentId: moment.id, text }))
        }
      >
        <EnterArrow x={0} y={0} size={30} />
      </Button>
    </>
  );
};

interface Props {
  useCurrentMoment?: () => Moment;
}

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
    <Container px={4} my={4}>
      <Flex sx={{ flexDirection: "column", flex: 1 }}>
        <Flex
          sx={{
            justifyContent: "space-between",
            p: 2,
            borderBottom: "2px solid #333",
          }}
        >
          <Input
            variant="forms.nakedInput"
            sx={{
              fontSize: 3,
              width: "100%",
              margin: "0",
            }}
            value={moment.title}
            onChange={(e) =>
              saveChanges({
                title: e.target.value,
              })
            }
          />
          <CloseButton to="/">
            <VisuallyHidden>Close</VisuallyHidden>
          </CloseButton>
        </Flex>
        <Flex sx={{ borderBottom: "2px solid #333" }}>
          <Tool
            active={inputType == "text"}
            onClick={() => setInputType("text")}
          >
            Add Event
          </Tool>
          <Tool
            onClick={() => setInputType("feat")}
            active={inputType == "feat"}
          >
            Perform Feat
          </Tool>
          <Tool
            onClick={() => setInputType("savepoint")}
            active={inputType == "savepoint"}
          >
            Create Savepoint
          </Tool>
        </Flex>
        <>
          {moment.events.map((m) => {
            return <Container sx={{ flex: "1 1 100%" }}>{m}</Container>;
          })}
        </>
        {inputType == "text" && (
          <Flex sx={{ variant: "styles.borders.sketchy" }}>
            <GenericInput />
          </Flex>
        )}
        {inputType == "feat" && <FeatInput />}
        {inputType == "savepoint" && <CreateSavePoint />}
      </Flex>
    </Container>
  );
};
