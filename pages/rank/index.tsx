import { useEffect, useState } from "react";
import { dustApi } from "../../apis/dust";
import { CatchInfo } from "../../apis/dust/types";
import { changeSecondToTime } from "../../utils/timeUtils";
import styled from "@emotion/styled";

const Rank = () => {
  const [rankList, setRankList] = useState<CatchInfo[]>([]);

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      <div>여기에 랭킹 나와야함</div>
      <ul>
        {rankList.map((rank, index) => {
          return (
            <RankItemContainer key={index}>
              <Ranking>{rank.rank}</Ranking>
              <SpentTime>{changeSecondToTime(rank.spent)}</SpentTime>
              <Nickname>{rank.nickname}</Nickname>
            </RankItemContainer>
          );
        })}
      </ul>
    </>
  );

  async function getRank() {
    const fetchedRank = await dustApi.getRank();
    setRankList(fetchedRank);
  }
};

export default Rank;

const RankItemContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-around;
`;

const Ranking = styled.div``;

const SpentTime = styled.div``;

const Nickname = styled.div``;
