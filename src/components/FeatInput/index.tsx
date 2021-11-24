import React, { ChangeEvent, useState } from "react";
import "@reach/dialog/styles.css";
import styled from "@emotion/styled";
import { Select, Text, Flex, Input } from "theme-ui";
import { useAppDispatch, useCurrentMomentRedux } from "../../app/hooks";
import { Feat, Moment } from "../../entities/data";
import { completeFeat, FeatDetails } from "../../entities/feats";

const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
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

const FeatType: React.FC<{
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ onChange }) => {
  return (
    <Select onChange={onChange} mr={2} variant="sketchySelect" required>
      <>
        <option value="" disabled selected hidden>
          Feat Type
        </option>
        {["knowledge", "cunning", "stealth", "strength"].map((option) => (
          <option>{option}</option>
        ))}
      </>
    </Select>
  );
};

const CharacterType: React.FC<{
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ onChange }) => {
  return (
    <Select onChange={onChange} mx={4} variant="sketchySelect" required>
      <>
        <option value="" disabled selected hidden>
          Character
        </option>
        {["solider", "scholar", "snake", "shadow"].map((option) => (
          <option>{option}</option>
        ))}
      </>
    </Select>
  );
};

interface Props {
  useCurrentMoment?: () => Moment;
}

function isFeatDetails(
  inputs: Partial<FeatDetails> | FeatDetails
): inputs is FeatDetails {
  return inputs.featType !== undefined;
}
export const FeatInput: React.FC<Props> = ({
  useCurrentMoment = useCurrentMomentRedux,
}) => {
  const moment = useCurrentMoment();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<Partial<FeatDetails> | FeatDetails>({
    momentId: moment.id,
  });

  return (
    <Flex
      sx={{
        width: "100%",
        flex: "1",
        display: "flex",
        flexWrap: "wrap",
        resize: "none",
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "25px 25px 55px 5px/5px 55px 25px 25px",
        boxSizing: "border-box",
        padding: "8px 32px 8px 8px",
      }}
    >
      <Inputs>
        <FeatType
          onChange={(e) =>
            setInputs({
              ...inputs,
              featType: e.currentTarget.value as FeatDetails["featType"],
            })
          }
        />
        <CharacterType
          onChange={(e) =>
            setInputs({
              ...inputs,
              characterRole: e.currentTarget
                .value as FeatDetails["characterRole"],
            })
          }
        />
        <Flex sx={{ flex: "0 0 100px", alignItems: "center" }}>
          <Text>Roll</Text>
          <Input
            sx={{ flex: "0 0 40px", margin: 2, variant: "sketchyInput" }}
            onChange={(e) =>
              setInputs({
                ...inputs,
                roll: parseInt(e.currentTarget.value),
              })
            }
          />
        </Flex>
        <DescriptionInput
          onChange={(e) =>
            setInputs({
              ...inputs,
              description: e.currentTarget.value,
            })
          }
        />
      </Inputs>
      <SubmitButtons>
        <Fail
          onClick={() => {
            const details: FeatDetails | Partial<FeatDetails> = {
              ...inputs,
              result: "failure",
            };
            debugger;
            if (isFeatDetails(details)) {
              dispatch(completeFeat(details));
            }
          }}
        >
          Fail
        </Fail>
        <Succeed>Succeed</Succeed>
      </SubmitButtons>
    </Flex>
  );
};
