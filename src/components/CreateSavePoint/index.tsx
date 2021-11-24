/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Button } from "theme-ui";
import { useAppDispatch, useCurrentMomentRedux } from "../../app/hooks";
import { Moment } from "../../entities/data";
import { Progress } from "../Shared";

interface Props {
  useCurrentMoment?: () => Moment;
}

export const CreateSavePoint: React.FC<Props> = ({
  useCurrentMoment = useCurrentMomentRedux,
}) => {
  const moment = useCurrentMoment();
  const dispatch = useAppDispatch();

  return (
    <Flex
      px={2}
      pt={2}
      sx={{
        variant: "styles.borders.sketchy",
        flex: "1",
      }}
    >
      <Flex mr={5} sx={{ flexDirection: "column" }}>
        <div> Remaining save points: 5</div>
        <Button variant="primary">Create Save Point</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column", justifyContent: "center" }}>
        <div>Temporal Gateway Instability </div>
        <Progress color="pass" progress={30} />
      </Flex>
    </Flex>
  );
};
