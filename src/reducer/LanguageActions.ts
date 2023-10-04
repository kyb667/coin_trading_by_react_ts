import { actionCreatorFactory } from "typescript-fsa";
import { Language } from "../models/Language";

const actionCreator = actionCreatorFactory();

export const LanguageActions = {
  updateLanguage: actionCreator<Language>("ACTION_UPDATE_LANGUAGE_INFO"),
};
