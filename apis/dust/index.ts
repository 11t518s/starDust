import { FirebaseConfig } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { DustPositionType } from "./types";

class Dust extends FirebaseConfig {
  private DUST = "dust";
  private SSU = "ssu";
  private DUST_ITEM = "dustItem";
  private CATCH = "catch";
  private CATCH_TEST_ID = "A6AMvmioNg85elu8XTJf";

  async updateDustPosition() {
    const dust = await addDoc(collection(this.db, this.DUST, this.SSU), {});
  }

  async getDustPosition(): Promise<DustPositionType[]> {
    const dustPositions = await getDocs(
      collection(this.db, this.DUST, this.SSU, this.DUST_ITEM)
    );
    return dustPositions.docs.map((item) => item.data()) as DustPositionType[];
  }

  async getDustInfo(): Promise<any> {
    const dustInfo = await getDocs(
      collection(this.db, this.DUST, this.SSU, this.CATCH, this.CATCH_TEST_ID)
    );
    return dustInfo.docs.map((item) => item.data());
  }
}

export const dustApi = new Dust();
