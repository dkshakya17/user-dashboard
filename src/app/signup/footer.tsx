'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import {
  useStepperTwo,
  stepTwoTotalSteps,
} from '@/app/shared/multi-step/steps';
import StepCounter from '@/app/shared/multi-step/step-counter';
interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { step } = useStepperTwo();
  const { gotoPrevStep } = useStepperTwo();
  return (
    <footer
      className={cn(
        'fixed bottom-0  left-0 z-40 flex w-full items-center justify-end gap-3 bg-gray-0/10 px-4 py-5 backdrop-blur md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
        className
      )}
    >
      <StepCounter currentStep={step + 1} totalSteps={stepTwoTotalSteps} />
      <Button onClick={gotoPrevStep} variant="outline" className="!w-[unset]">
        Back
      </Button>
      <Button className="!w-[unset]" type="submit">
        Next
      </Button>
    </footer>
  );
}
