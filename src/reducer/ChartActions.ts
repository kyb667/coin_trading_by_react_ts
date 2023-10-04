import { actionCreatorFactory } from "typescript-fsa";
import { ChartInfo } from "../models/ChartInfo";

const actionCreator = actionCreatorFactory();

export const ChartActions = {
  updateChartInfo: actionCreator<ChartInfo>("ACTION_UPDATE_CHART_INFO"),
};
