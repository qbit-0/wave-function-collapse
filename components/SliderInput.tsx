import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";

type Props = {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  isInt?: boolean;
};

const SliderInput: FC<Props> = ({ value, setValue, min, max, step, isInt }) => {
  const [tempValue, setTempValue] = useState(value.toString());

  const handleInputChange = (valueAsString: string) => {
    setTempValue(valueAsString);
    let valueAsNumber = Number.parseFloat(valueAsString);
    if (isInt) valueAsNumber = Math.floor(valueAsNumber);
    if (min <= valueAsNumber && valueAsNumber <= max) setValue(valueAsNumber);
  };

  const handleInputBlur = () => {
    let valueAsNumber = Number.parseFloat(tempValue);
    if (isInt) valueAsNumber = Math.floor(valueAsNumber);
    const clampedValue = Math.min(Math.max(min, valueAsNumber), max);
    setTempValue(clampedValue.toString());
    setValue(clampedValue);
  };

  const handleSliderChange = (value: number) => {
    setValue(value);
    setTempValue(value.toString());
  };

  return (
    <Flex flex="1">
      <NumberInput
        maxW="100px"
        mr="2rem"
        value={tempValue}
        min={min}
        max={max}
        step={step}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px">
          {value}
        </SliderThumb>
      </Slider>
    </Flex>
  );
};

export default SliderInput;
