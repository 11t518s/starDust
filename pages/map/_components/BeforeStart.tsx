import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { dustApi } from "../../../apis/dust";
import { catchProgress } from "../../../apis/dust/types";
import { LoadingOverlay } from "./Loading";

type Props = {
  setCatchStatus: Dispatch<SetStateAction<catchProgress>>;
  uid: string;
};

const BeforeStart: React.FC<Props> = ({ setCatchStatus, uid }) => {
  return (
    <LoadingOverlay>
      <CustomButton onClick={handleStartCatch}>게임 시작</CustomButton>
    </LoadingOverlay>
  );
  async function handleStartCatch() {
    const changedStatus = await dustApi.startMyCatchProgress(uid);
    setCatchStatus(changedStatus);
  }
};

export default BeforeStart;

const CustomButton = styled.button`
  background-color: transparent;
  border-width: 0;
  color: #f9e219;
  font-family: "NeoDunggeunmo";
  font-size: 1.6rem;
  margin-top: 30px;
  cursor: pointer;
`;
