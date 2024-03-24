'use client';

import StepOne from './step-1';
import StepTwo from './step-2';
import StepThree from './step-3';
import StepFour from './step-4';
import StepCounter from '@/app/shared/multi-step/step-counter';
import { Button } from '@/components/ui/button';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import { atom, useAtom } from 'jotai';
import Congratulations from '@/app/shared/multi-step/congratulations';
import { useEffect } from 'react';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { useResetAtom } from 'jotai/utils';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';

type FormDataType = {
  action: string;
  name_as_per_aadhaar: string;
  name: string;
  email: string;
  phone: string | undefined;
  linkedinUrl: string | undefined;
  universityName: object | undefined;
  otheruniversityName: string;
  educationlevel: object | undefined;
  major: object | undefined;
  otherMajor: string;
  prefferedworkfield: object[] | undefined;
  codelanguages: object[] | undefined;
  indianlanguages: object[] | undefined;
  cgpa: string;
  qna1: string;
  qna2: string;
  consent: boolean;
  referalSource: string;
};

export const initialFormData = {
  action: '',
  name_as_per_aadhaar: '',
  name: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  universityName: { label: '', value: '' },
  otheruniversityName: '',
  educationlevel: { label: '', value: '' },
  major: { label: '', value: '' },
  otherMajor: '',
  prefferedworkfield: [],
  cgpa: '',
  qna1: '',
  qna2: '',
  codelanguages: [],
  indianlanguages: [],
  consent: false,
  referalSource: '',
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'multiStepForm',
  initialFormData
);

export interface SaveDataResponse {
  messages: string;
}

enum Step {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
}
const firstStep = Step.StepOne;
export const userData = atomWithReset<Step>(firstStep);

export function useStepperTwo() {
  const [step, setStep] = useAtom(userData);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    // track_pageview: true,
    // persistence: 'localStorage',
  });
  // function gotoStep(step: Step) {
  //   setStep(step);
  // }
  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);

    if (step === 1) {
      mixpanel.track('back', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-1',
        category: 'application_form',
        type: 'btn_click',
      });
    } else if (step === 2) {
      mixpanel.track('back', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-2',
        category: 'application_form',
        type: 'btn_click',
      });
    } else if (step === 3) {
      mixpanel.track('back', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-3',
        category: 'application_form',
        type: 'btn_click',
      });
    } else if (step === 4) {
      mixpanel.track('save_and_next', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-4',
        category: 'application_form',
        type: 'btn_click',
      });
    }
  }
  function resetStepper() {
    setStep(1);
  }
  return {
    step,
    setStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: StepOne,
  [Step.StepTwo]: StepTwo,
  [Step.StepThree]: StepThree,
  [Step.StepFour]: StepFour,
  [Step.StepFive]: Congratulations,
};

export const stepTwoTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

export default function MultiStepForm() {
  const [step] = useAtom(userData);
  const Component = MAP_STEP_TO_COMPONENT[step];
  const resetForm = useResetAtom(formDataAtom);

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className="flex min-h-full justify-center py-8 md:items-start">
      <div className="mt-1 w-full max-w-2xl  px-4 md:mt-0 lg:px-6">
        <Component />
      </div>
    </div>
  );
}
