import { ChartInfo } from "../../models/ChartInfo";

type Props = {
  updateChartInfo: Function;
};

export const getDate = (t: Date) => {
  let year = t.getFullYear();
  let month = t.getMonth() + 1;
  let date = t.getDate();
  let hour = t.getHours();
  let minutes = t.getMinutes();

  return `${year}/${month}/${date} ${hour}:${minutes}`;
};

const MakeData = (props: Props) => {
  console.log("MakeData");

  let data: ChartInfo = {
    name: getDate(new Date()),
    btc: Math.floor(Math.random() * 10),
    etc: Math.floor(Math.random() * 10),
    eth: Math.floor(Math.random() * 10),
    xrp: Math.floor(Math.random() * 10),
    sol: Math.floor(Math.random() * 10)
  };

  console.log(data);

  props.updateChartInfo(data);
};

export const AutoData = (props: Props) => {
  console.log("AutoData");

  for (let i = 10; i >= 0; i--) {
    let t = new Date();
    t.setMinutes(t.getMinutes() - i);

    let data: ChartInfo = {
      name: getDate(t),
      btc: Math.floor(Math.random() * 10),
      etc: Math.floor(Math.random() * 10),
      eth: Math.floor(Math.random() * 10),
      xrp: Math.floor(Math.random() * 10),
      sol: Math.floor(Math.random() * 10)
    };

    console.log(data);

    props.updateChartInfo(data);
  }

  setInterval(() => MakeData(props), 1000 * 60);
};
