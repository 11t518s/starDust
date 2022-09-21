import { FirebaseConfig } from "../firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { dustColors, DustPositionType } from "../dust/types";

class Admin extends FirebaseConfig {
  private DUST = "dust";
  private SSU = "ssu";
  private DUST_ITEM = "dustItem";

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

  async updateDustInfo(
    color: dustColors,
    lat: DustPositionType["lat"],
    lng: DustPositionType["lng"]
  ) {
    await updateDoc(doc(this.db, this.DUST, this.SSU, this.DUST_ITEM, color), {
      lat,
      lng,
    });
  }
}

export const adminApi = new Admin();
