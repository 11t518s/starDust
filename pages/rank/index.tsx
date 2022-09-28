import { useEffect, useState } from "react";
import { dustApi } from "../../apis/dust";
import { CatchInfo } from "../../apis/dust/types";
import { changeSecondToTime } from "../../utils/timeUtils";
import styled from "@emotion/styled";
import Background from "../../components/Background";

const Rank = () => {
  const [rankList, setRankList] = useState<CatchInfo[]>([]);

  useEffect(() => {
    getRank();
  }, []);

  return (
    <Background>
      <Header>
        <YellowText>SSU</YellowText> 최강우주전사
      </Header>
      <RankContainer>
        {rankList.length === 0 ? (
          <RankItemContainer>
            일등이 될 수 있는 절호의 기회 놓치지 마세요!
          </RankItemContainer>
        ) : (
          rankList.map((rank, index) => {
            return (
              <RankItemContainer key={index}>
                <Ranking>{rank.rank}</Ranking>
                <Nickname>{rank.nickname}</Nickname>
                <SpentTime>{changeSecondToTime(rank.spent)}</SpentTime>
              </RankItemContainer>
            );
          })
        )}
      </RankContainer>
    </Background>
  );

  async function getRank() {
    const fetchedRank = await dustApi.getRank();
    setRankList(fetchedRank);
  }
};

export default Rank;
const RankContainer = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RankItemContainer = styled.div`
  margin-top: 10px;
  text-align: center;
  display: flex;
`;

const Ranking = styled.div`
  width: 40px;
`;

const Nickname = styled.div`
  width: 100px;
`;

const SpentTime = styled.div`
  width: 100px;
`;

const Header = styled.header`
  margin-top: 50px;
  font-size: 1.75rem;
  text-align: center;
`;

const YellowText = styled.span`
  color: #f9e219;
`;
