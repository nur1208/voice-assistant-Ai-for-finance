import styled from "styled-components";
import { CircleMicSvg } from "../../svg/CircleMicSvg";
import { GiSpeaker } from "react-icons/gi";

export const FinanbroBtnRoot = styled.div`
  z-index: 5;
  position: fixed;
  right: 20px;
  bottom: 40px;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  height: 64px;
  max-height: 64px;

  * {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    user-select: none;
  }
`;

export const RecognizedTextHolder = styled.div`
  text-align: right;
  right: 94px;
  bottom: 72px;
  z-index: 4;

  position: fixed;
  transform: translateY(50%);
  max-width: 236px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 18px;
  min-height: 40px;
  color: #000;
  font-weight: normal;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 1px 14px rgb(0 0 0 / 35%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

export const RecognizedTextContent = styled.div``;

export const FinanbroBtnSC = styled.div`
  @keyframes alan-mic-pulsating {
    0% {
      transform: scale(0.91);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.91);
    }
  }
  color: rgb(255, 255, 255);
  position: absolute;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  height: 64px;
  max-height: 64px;
  bottom: 0px;
  right: 0px;
  border-radius: 50%;
  text-align: center;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  z-index: 5;
  cursor: pointer;

  /* transform: scale(1);
  animation: 1.4s ease-in-out 0s infinite normal none running
    alan-mic-pulsating; */

  &:hover {
    transform: scale(1.11111);
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    #BgDefault {
      background-image: linear-gradient(
        122deg,
        rgba(0, 70, 255, 0.95),
        rgba(0, 156, 255, 0.95)
      );
    }
  }
`;
// 1.4s ease-in-out 0s infinite normal none running alan-mic-pulsating;

export const Div1 = styled.div`
  height: 32px;
  max-height: 32px;
  min-height: 32px;
  min-width: 64px;
  width: 64px;
  max-width: 64px;
  top: calc(50% - 16px);
  filter: blur(6.4px);
  left: 0px;
  z-index: 2;
  position: absolute;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  opacity: 0;
  border-radius: 100px;
  transform: rotate(-315deg);
`;

export const Div2 = styled.div`
  height: 32px;
  max-height: 32px;
  min-height: 32px;
  min-width: 64px;
  width: 64px;
  max-width: 64px;
  top: calc(50% - 16px);
  filter: blur(6.4px);
  left: 0px;
  z-index: 2;
  position: absolute;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  opacity: 0;
  border-radius: 100px;
  transform: rotate(-45deg);
`;

export const BgDefault = styled.div`
  transition: opacity 300ms ease-in-out 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  background-position: 0px 0px;
  opacity: 1;
  animation: 3s ease-in-out 0s infinite normal none running
    alan-gradient;

  background-image: linear-gradient(
    122deg,
    rgb(34, 203, 255),
    rgb(25, 149, 255)
  );

  ${FinanbroBtnSC}:hover {
    background-image: linear-gradient(
      122deg,
      rgba(0, 70, 255, 0.95),
      rgba(0, 156, 255, 0.95)
    );
  }
`;

export const BgListening = styled.div`
  transition: opacity 300ms ease-in-out 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  background-position: 0px 0px;
  opacity: 0;
  animation: 3s ease-in-out 0s infinite normal none running
    alan-gradient;

  background-image: linear-gradient(
    122deg,
    rgba(0, 70, 255, 0.95),
    rgba(0, 156, 255, 0.95)
  );
`;

export const BgSpeaking = styled.div`
  transition: opacity 300ms ease-in-out 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  background-position: 0px 0px;
  opacity: 0;
  animation: 3s ease-in-out 0s infinite normal none running
    alan-gradient;

  background-image: linear-gradient(
    122deg,
    rgba(122, 40, 255, 0.95),
    rgba(61, 122, 255, 0.95)
  );
`;

export const BgIntermediate = styled.div`
  transition: opacity 300ms ease-in-out 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  background-position: 0px 0px;
  opacity: 0;
  animation: 3s ease-in-out 0s infinite normal none running
    alan-gradient;

  background-image: linear-gradient(
    122deg,
    rgba(0, 255, 205, 0.95),
    rgba(0, 115, 255, 0.95)
  );
`;

export const BgUnderstood = styled.div`
  transition: opacity 300ms ease-in-out 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  background-position: 0px 0px;
  opacity: 1;
  animation: 3s ease-in-out 0s infinite normal none running
    alan-gradient;

  background-image: linear-gradient(
    122deg,
    rgba(0, 255, 205, 0.95),
    rgba(0, 115, 255, 0.95)
  );
`;

export const CircleMicIconBg = styled.svg`
  min-height: 100%;
  height: 100%;
  max-height: 100%;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  top: 0%;
  left: 0%;
  z-index: 3;
  position: absolute;
  opacity: 0;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  overflow: hidden;
  border-radius: 50%;
  background-size: 0% 0%;
  background-position: center center;
  background-repeat: no-repeat;

  pointer-events: none;
`;

export const DisconnectedMicIcon = styled.img`
  @keyframes disconnected-loader-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  min-height: 70%;
  height: 70%;
  max-height: 70%;
  top: 15%;
  left: 15%;
  z-index: 3;
  position: absolute;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  opacity: 0;
  animation: 2s linear 0s infinite normal none running
    disconnected-loader-animation;
  pointer-events: none;
`;

export const LowVolumeIcon = styled.img`
  min-height: 100%;
  height: 100%;
  max-height: 100%;
  top: 0%;
  left: 0%;
  z-index: 3;
  position: absolute;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  opacity: 0;
  pointer-events: none;
`;

export const IconWrapper = styled.div`
  min-height: 100%;
  height: 100%;
  max-height: 100%;
  top: 0%;
  left: 0%;
  z-index: 3;
  position: relative;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  opacity: 1;
`;

export const GiSpeakerIcon = styled(GiSpeaker)`
  min-height: 74%;
  height: 77%;
  max-height: 100%;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  top: 11%;
  left: 0%;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  opacity: 1;
  font-size: 10px;
`;

export const Icon = styled.img`
  min-height: 100%;
  height: 100%;
  max-height: 100%;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  top: 0%;
  left: 0%;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  opacity: 1;
`;

export const TriangleMicIconBg = styled.div`
  @keyframes alan-triangle-mic-pulsating {
    0% {
      transform: scale(0.94);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.94);
    }
  }

  min-height: 100%;
  height: 100%;
  max-height: 100%;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  top: 0%;
  left: 0%;
  z-index: 99998;
  position: absolute;
  opacity: 0;
  transition: transform 0.4s ease-in-out 0s,
    opacity 0.4s ease-in-out 0s;
  overflow: hidden;
  border-radius: 50%;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  animation: 1.2s ease-in-out 0s infinite normal none running
    alan-triangle-mic-pulsating;
`;
//     animation: 1.2s ease-in-out 0s infinite normal none running alan-triangle-mic-pulsating;
