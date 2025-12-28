import { h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import ProgressBar from 'src/components/ui/progressbar';
import getTagAttributes from 'src/utils/get-tag-attributes';
import { useAtrament } from 'src/atrament/hooks';

const ChoiceTimer = ({ options, choices, selectChoice }) => {
  const { throwAtramentError } = useAtrament();
  const params = getTagAttributes(`${options} `); // handle empty tag properly
  const timeout = (params.delay || 0) * 1000;
  const timerStep = timeout / 100;
  const [timeLeft, setTimeLeft] = useState(timeout);

  const makeChoice = useCallback(() => {
    let selected;
    if (params.choice) {
      // find choice by text
      selected = choices.filter((item) => item.choice === params.choice);
    } else {
      // select random choice
      selected = [choices[Math.floor(Math.random() * choices.length)]];
    }
    if (!Array.isArray(selected) || !selected[0]) {
      throwAtramentError(`Choice not found: ${JSON.stringify(params.choice)}`);
      return;
    }
    selectChoice(selected[0].id);
  }, [ choices, selectChoice, params, throwAtramentError ]);

  // animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((v) => {
        const newTime = v - timerStep;
        if (newTime <= 0) {
          clearInterval(timer);
          makeChoice();
        }
        return v - timerStep;
      });
    }, timerStep);
    return () => clearInterval(timer);
  }, []);

  return <ProgressBar options={{ display: 'thin', border: false, min: 0, max: timeout, value: timeLeft }} />;
};

export default ChoiceTimer;
