import { GeneralContainer } from "@/components/general-container";
import { useParams, useHistory } from "react-router";
import Sehat from "../../public/assets/help.png";
import { Button } from "@/components/button/Button";
import Penyakit from "../../public/assets/terjangkit.svg";

const Hasil: React.FC = () => {
  const history = useHistory();
  const { diagnosa } = useParams<{ diagnosa: string }>();

  const sehat: boolean = diagnosa === "sehat"; 

  const goHome = () => {
    history.push("/main");
  };

  return (
    <GeneralContainer>
      <div className="h-screen w-screen flex flex-col bg-white justify-center items-center gap-4">
        <p className="text-black font-semibold text-lg w-4/5 text-center">
          Hasil Diagnosa menunjukkan bahwa
        </p>
        <img src={sehat ? Sehat : Penyakit} width={250} height={250} />
        <p className="text-md text-center font-semibold mt-10 mb-3">
          {sehat ? "Sistem Kami belum bisa mendeteksi penyakit yang dialami anda disarankan untuk menghubungi layanan kesehatan" : `Anda  terjangkit Penyakit ${diagnosa}`}
        </p>
        <Button text="Berikutnya" variant="primary" onClick={goHome} size="4/5" />
      </div>
    </GeneralContainer>
  );
};

export default Hasil;
