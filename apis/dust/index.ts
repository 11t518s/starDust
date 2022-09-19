import { FirebaseConfig } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { dustColors, DustPositionType } from "./types";

class Dust extends FirebaseConfig {
  private DUST = "dust";
  private SSU = "ssu";
  private DUST_ITEM = "dustItem";
  private CATCH = "catch";
  private CATCH_TEST_ID = "A6AMvmioNg85elu8XTJf";

  private BLACK = "black";
  private BLUE = "blue";
  private PURPLE = "purple";
  private RED = "red";
  private YELLOW = "yellow";

  async updateDustPosition() {
    const dust = await addDoc(collection(this.db, this.DUST, this.SSU), {});
  }

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

  async getDustInfo(uid: number): Promise<any[]> {
    const dustInfo = await getDocs(
      collection(this.db, this.DUST, this.SSU, this.CATCH)
    );
    return dustInfo.docs.map((data) => data.data());
  }

  async ADMIN_updateDustInfo(
    color: dustColors,
    lat: DustPositionType["lat"],
    lng: DustPositionType["lng"]
  ) {
    await updateDoc(doc(this.db, this.DUST, this.SSU, this.DUST_ITEM, color), {
      lat,
      lng,
    });
  }

  async catchDustStart(uid: number) {
    await addDoc(doc(this.db, this.DUST, this.SSU), {});
  }
  async catchDust() {}
  async catchDustFinish() {}
}

export const dustApi = new Dust();
