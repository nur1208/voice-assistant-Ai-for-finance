import { InfoModal } from "../InfoModal";
import InputModal from "../InputModal/InputModal";
import { ProgressModal } from "../ProgressModal/ProgressModal";
import { TextWithIconModal } from "../TextWithIconModal";
export const MODAL_TYPE_OPTIONS = {
  PROGRESS: "PROGRESS",
  INPUT: "INPUT",
  TEXT_WITH_ICON: "TEXT_WITH_ICON",
};

export const renderModal = (
  type,
  props,
  { isProgress, isInput }
) => {
  if (isProgress || type === MODAL_TYPE_OPTIONS.PROGRESS)
    return <ProgressModal {...props} />;
  else if (isInput || type === MODAL_TYPE_OPTIONS.INPUT)
    return <InputModal {...props} />;
  else if (type === MODAL_TYPE_OPTIONS.TEXT_WITH_ICON)
    return <TextWithIconModal />;
  else return <InfoModal {...props} />;
};
