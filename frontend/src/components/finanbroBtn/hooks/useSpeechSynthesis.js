import { useEffect, useState } from "react";
import { useReduxActions } from "../../../hooks/useReduxActions";

const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const { updateSpeaking } = useReduxActions();
  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    updateSpeaking(false);

    onEnd();
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.speechSynthesis
    ) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const {
      voice = null,
      text = "",
      rate = 1,
      pitch = 1,
      volume = 1,
    } = args;

    if (!supported) return;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    utterance.onstart = () => updateSpeaking(true);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    window.speechSynthesis.speak(utterance);
  };

  const speakAsync = (args = {}) =>
    new Promise((resolve, reject) => {
      const {
        voice = null,
        text = "",
        rate = 1,
        pitch = 1,
        volume = 1,
      } = args;
      // updateSpeaking(true);
      if (!supported) reject();
      // setSpeaking(true);
      // Firefox won't repeat an utterance that has been
      // spoken, so we need to create a new instance each time
      const utterance = new window.SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = voice;
      utterance.onend = () => resolve();
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      window.speechSynthesis.speak(utterance);
    });

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
    speakAsync,
  };
};

export default useSpeechSynthesis;
