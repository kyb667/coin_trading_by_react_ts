import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const ShowDescriptionActions = {
  updateDescriptionValue: actionCreator<string>(
    "ACTION_UPDATE_Description_VALUE",
  ),
};
