import { FirebaseConfig } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  DocumentSnapshot,
  updateDoc,
  Timestamp,
  addDoc,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";
import {
  CatchProgress,
  DustPositionType,
  catchProgress,
  Catch,
  dustColors,
  CatchInfo,
} from "./types";

class Dust extends FirebaseConfig {
  private DUST = "dust";
  private SSU = "ssu";
  private DUST_ITEM = "dustItem";
  private CATCH = "catch";
  private STARTED_AT = "startedAt";

  private BLACK = "black";
  private BLUE = "blue";
  private PURPLE = "purple";
  private RED = "red";
  private YELLOW = "yellow";

  private START_DUST_ITEM = 0;
  private FINISH_DUST_ITEM = 5;

  async getDustPosition(): Promise<DustPositionType[]> {
    const dustPositions = await getDocs(
      collection(this.db, this.DUST, this.SSU, this.DUST_ITEM)
    );

    return dustPositions.docs.map((item) => {
      const { lat, lng, imagePath } = item.data() as Omit<
        DustPositionType,
        "id"
      >;

      return { lat, lng, imagePath, id: item.id } as DustPositionType;
    });
  }

  async getMyCatches(uid: string): Promise<Catch[]> {
    const myCacheProgress = await getDocs(
      collection(this.db, this.DUST, this.SSU, this.CATCH, uid, this.DUST_ITEM)
    );
    return myCacheProgress.docs.map((data) => data.data() as Catch);
  }

  async getMyCacheProgress(uid: string): Promise<catchProgress> {
    const status = (await this.getMyCatchDoc(uid)).get("catchProgress");
    if (status) {
      return status;
    } else {
      return CatchProgress.BeforeStart;
    }
  }

  async setInitialCatchInfo(
    uid: string,
    phoneNumber: number | string,
    nickname: string
  ) {
    await setDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      phoneNumber,
      nickname,
    });
  }

  async startMyCatchProgress(uid: string) {
    await updateDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      startedAt: Timestamp.now(),
      catchProgress: CatchProgress.InProgress,
    });
    return CatchProgress.InProgress;
  }

  async finishMyCatchProgress(uid: string) {
    const finishedAt = Timestamp.now();
    const myCatchDoc = await this.getMyCatchDoc(uid);
    const startedAt = myCatchDoc.get("startedAt");
    const myProgress = myCatchDoc.get("catchProgress");
    if (myProgress === CatchProgress.Finish) {
      return;
    }
    await updateDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      finishedAt,
      spent: finishedAt.seconds - startedAt.seconds,
      catchProgress: CatchProgress.Finish,
    });
  }

  async getMyCatchDoc(uid: string): Promise<DocumentSnapshot> {
    return await getDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid));
  }

  async catchDust(uid: string, dust: dustColors) {
    const catchProgress = await this.getMyCatches(uid);

    if (catchProgress.some((item) => item.itemId === dust)) {
      alert("이미 잡은 먼지입니다!");
      return;
    }

    await addDoc(
      collection(this.db, this.DUST, this.SSU, this.CATCH, uid, this.DUST_ITEM),
      { itemId: dust, caughtAt: Timestamp.now() }
    );
  }

  async getRank(): Promise<CatchInfo[]> {
    const fetchedRank = (
      await getDocs(
        query(
          collection(this.db, this.DUST, this.SSU, this.CATCH),
          orderBy("spent", "desc"),
          limit(50)
        )
      )
    ).docs.map((item) => item.data() as CatchInfo);

    let rank = 0;

    return fetchedRank.map((item, index) => {
      if (index === 0) {
        rank = rank + 1;
        return { ...item, rank: index + 1 };
      } else if (item.spent === Number(fetchedRank[index - 1].spent)) {
        return { ...item, rank };
      } else {
        rank = rank + 1;
        return { ...item, rank: index + 1 };
      }
    });
  }
}

export const dustApi = new Dust();
