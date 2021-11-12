import React from "react";
import "@reach/dialog/styles.css";
import styled from "@emotion/styled";
import { useAppDispatch, useCurrentMomentRedux } from "../../app/hooks";
import { Moment } from "../../entities/data";

const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  resize: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 25px 25px 55px 5px/5px 55px 25px 25px;
  box-sizing: border-box;
  padding: 8px 32px 8px 8px;
`;

const SketchySelect = styled.select`
  font-family: "Gloria Hallelujah", cursive;
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 2px solid #333;
  border-radius: 55px 225px 15px 25px/25px 25px 35px 355px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
  &:invalid {
    color: gray;
  }
  flex: 0 0 150px;
  margin: 0 8px 0 0;
`;

const NumberInput = styled.input`
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  display: block;
  width: 50px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px solid #333;
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  flex: 0 0 40px;
  margin: 0 8px;
`;

const DescriptionInput = styled.input`
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px solid #333;
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-top: 8px;
`;

const SubmitButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 8px;
  flex: 0 1 128px;
`;

const Fail = styled.button`
  font-family: "Gloria Hallelujah", cursive;
  flex: 1 1 100%;
  background-color: #dc3545;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
`;

const Succeed = styled.button`
  font-family: "Gloria Hallelujah", cursive;
  flex: 1 1 100%;
  background-color: #28a745;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  margin-top: 8px;
`;

const FeatType: React.FC = () => {
  return (
    <SketchySelect required>
      <>
        <option value="" disabled selected hidden>
          Feat Type
        </option>
        {["knowledge", "cunning", "stealth", "strength"].map((option) => (
          <option>{option}</option>
        ))}
      </>
    </SketchySelect>
  );
};

interface Props {
  useCurrentMoment?: () => Moment;
}

export const FeatInput: React.FC<Props> = ({
  useCurrentMoment = useCurrentMomentRedux,
}) => {
  const moment = useCurrentMoment();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Inputs>
        <FeatType />
        <NumberInput />
        <NumberInput />
        <DescriptionInput />
      </Inputs>
      <SubmitButtons>
        <Fail>Fail</Fail>
        <Succeed>Succeed</Succeed>
      </SubmitButtons>
    </Container>
  );
};
