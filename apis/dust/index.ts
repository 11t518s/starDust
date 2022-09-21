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
} from "@firebase/firestore";
import { CatchProgress, DustPositionType, catchProgress, Catch } from "./types";

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

  async startMyCatchProgress(uid: string) {
    await setDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      startedAt: Timestamp.now(),
      catchStatus: CatchProgress.InProgress,
    });
    return CatchProgress.InProgress;
  }

  async finishMyCatchProgress(uid: string) {
    const finishedAt = Timestamp.now();
    const startedAt = (await this.getMyCatchDoc(uid)).get("startedAt");

    return updateDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      finishedAt,
      spent: finishedAt.seconds - startedAt.seconds,
    });
  }

  async getMyCatchDoc(uid: string): Promise<DocumentSnapshot> {
    return await getDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid));
  }

  async changeMyCatchProgress(uid: string, catchProgress: catchProgress) {
    await setDoc(doc(this.db, this.DUST, this.SSU, this.CATCH, uid), {
      catchProgress,
    });
  }
}

export const dustApi = new Dust();
