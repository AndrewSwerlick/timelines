import React from "react";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";
import styled from "styled-components";
import { useIdleCallback } from "react-timing-hooks";
import { Moment } from "../../entities/data";
import { editMoment } from "../../entities/timeline";
import { useAppDispatch } from "../../app/hooks";

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

const CloseButton = styled.button`
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

const TextArea = styled.textarea`
  font-family: "Gloria Hallelujah", cursive;
  border: none;
  width: 100%;
  flex: 1;
  resize: none;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ChapterView: React.FC<{
  close: () => void;
  moment: Moment;
}> = ({ moment, close }) => {
  const dispatch = useAppDispatch();
  const saveChanges = useIdleCallback(
    ({ title, narrative }: { title: string; narrative: string }) => {
      if (moment.narrative !== narrative || moment.title !== title) {
        dispatch(editMoment({ momentId: moment.id, narrative, title }));
      }
    }
  );
  return (
    <>
      <Flex>
        <Header>
          <ChapterTitle
            value={moment.title}
            onChange={(e) =>
              saveChanges({
                title: e.target.value,
                narrative: moment.narrative || "",
              })
            }
          />
          <CloseButton onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CloseButton>
        </Header>
        <TextArea
          value={moment.narrative}
          onChange={(e) =>
            saveChanges({
              title: moment.title || "",
              narrative: e.target.value,
            })
          }
        />
      </Flex>
    </>
  );
};
