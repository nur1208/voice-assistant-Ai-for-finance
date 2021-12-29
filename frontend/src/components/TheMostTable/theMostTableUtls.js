import { IbBox } from "./TheMostTableSC";

export const renderIbBox = () => {
  const ibBoxs = [
    { title: "Results List", isActive: true },
    { title: "Heatmap View", isActive: false },
  ];

  return ibBoxs.map(({ title, isActive }) => (
    <IbBox className="IbBox" isActive={isActive}>
      <a href="#top">
        <span>{title}</span>
      </a>
    </IbBox>
  ));
};
