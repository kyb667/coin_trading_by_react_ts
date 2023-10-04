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
  // console.debug("AutoData-MakeData");

  let data: ChartInfo = {
    name: getDate(new Date()),
    btc: (1 + Math.floor(Math.random() * 10)).toString(),
    etc: (1 + Math.floor(Math.random() * 10)).toString(),
    eth: (1 + Math.floor(Math.random() * 10)).toString(),
    xrp: (1 + Math.floor(Math.random() * 10)).toString(),
    sol: (1 + Math.floor(Math.random() * 10)).toString(),
  };

  props.updateChartInfo(data);
};

export const AutoData = (props: Props) => {
  // console.debug("AutoData");

  for (let i = 10; i >= 0; i--) {
    let t = new Date();
    t.setMinutes(t.getMinutes() - i);

    let data: ChartInfo = {
      name: getDate(t),
      btc: (1 + Math.floor(Math.random() * 10)).toString(),
      etc: (1 + Math.floor(Math.random() * 10)).toString(),
      eth: (1 + Math.floor(Math.random() * 10)).toString(),
      xrp: (1 + Math.floor(Math.random() * 10)).toString(),
      sol: (1 + Math.floor(Math.random() * 10)).toString(),
    };

    props.updateChartInfo(data);
  }

  setInterval(() => MakeData(props), 1000 * 60);
};
