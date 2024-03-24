'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { atomWithStorage } from 'jotai/utils';
import { Tooltip, Button } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormPart from '@/app/shared/multi-step/form-part';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import { Text } from '@/components/ui/text';
import OtpVerify, { otpverifyschema } from '@/app/shared/multi-step/otp-verify';
import { SaveDataResponse } from './index';
import Footer from '@/app/signup/footer';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { useState, useEffect } from 'react';
import { MIXPANEL_ID } from '@/config/constants';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import mixpanel from 'mixpanel-browser';
// const formStoreAtom = atomWithStorage(
//   'multiStepFormOneStore',
//   SubjectiveQnaValues
// );

const FormSchema = otpverifyschema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function StepFour() {
  const { gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const [verificationStatus, setVerificationStatus] = useState<boolean>(false);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consent: formData.consent,
      referalSource: formData.referalSource,
      phone: formData.phone,
    },
  });
  useEffect(() => {
    mixpanel.track_pageview({
      subcategory: 'step-4',
      category: 'application_form',
      soul_id: UserDetail.soul_id,
      type: 'page_view',
    });
  }, []);
  const handleVerificationStatus = (booleanData: boolean) => {
    setVerificationStatus(booleanData);
  };

  const resetForm = useResetAtom(formDataAtom);

  const submitStep4Data = async (payload: any) => {
    try {
      const response = await fetch(`${API_URL}/v1/onboarding/form/save`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.status == 200) {
        const rsp = (await response.json()) as SaveDataResponse;
      } else {
      }
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    // setFormData((prev) => ({
    //   ...prev,
    //   qna1: data.qna1,
    // }));
    // console.log(formData, '3rd step');
    // handleReset();
    if (data.consent && verificationStatus) {
      const payload = {
        action: 'SUBMIT',
        consent: data.consent,
        phone: data.phone,
        referral: {
          source: data.referalSource,
        },
        coding_url: [data.codeUrl],
      };
      submitStep4Data(payload);
      gotoNextStep();
      resetForm();
      setCookie('userStatus', 'IN_REVIEW', { path: '/' });
    } else {
      toast.error(<Text>Please accept the consent & Verify the Phone.</Text>);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OtpVerify onVerificationStatus={handleVerificationStatus} />
        <Footer />
      </form>
    </FormProvider>
  );
}
