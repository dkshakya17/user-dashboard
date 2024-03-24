'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormPart from '@/app/shared/multi-step/form-part';
import { UserData, UserDetails } from '@/app/shared/auth-layout/auth-wrapper';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';

import { useEffect } from 'react';
import {
  CodeProficiencyAtom,
  langProficiencyAtom,
} from '@/app/shared/multi-step/skills-section';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import toast from 'react-hot-toast';
import { Text } from '@/components/ui/text';
import { SaveDataResponse } from './index';
import SubjectiveQna, {
  subjectiveSchema,
} from '@/app/shared/multi-step/subjective-qna';
import { useCookies } from 'react-cookie';
import Footer from '@/app/signup/footer';
import { API_URL } from '@/config/constants';
import SkillsSection, { skillsSchema } from '../skills-section';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';
// const formStoreAtom = atomWithStorage(
//   'multiStepFormOneStore',
//   SubjectiveQnaValues
// );
const FormSchema = subjectiveSchema.merge(skillsSchema);

type FormSchemaType = z.infer<typeof FormSchema>;

export default function StepThree() {
  const { gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const [languagesProfAtom, setLanguagesProfAtom] =
    useAtom(langProficiencyAtom);
  const [codeProfAtom, setCodeProfAtom] = useAtom(CodeProficiencyAtom);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  const fetchExistingUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/onboarding/form/data`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const userDetails = (await response.json()) as UserData;
        console.log(userDetails, 'userDetails');
        methods.setValue('qna1', userDetails.qualitative.why_soul);
        methods.setValue('qna2', userDetails.qualitative.experience);
        methods.setValue(
          'codelanguages',
          userDetails.skills?.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
        methods.setValue(
          'indianlanguages',
          userDetails.languages?.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    mixpanel.track_pageview({
      subcategory: 'step-3',
      category: 'application_form',
      soul_id: UserDetail.soul_id,
      type: 'page_view',
    });
    if (cookies.userStatus === 'PENDING_FORM') {
      fetchExistingUserData();
    }
  }, []);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      qna1: formData.qna1,
      qna2: formData.qna2,
      codelanguages: formData.codelanguages,
      indianlanguages: formData.indianlanguages,
    },
  });

  const saveStep3Data = async (payload: any) => {
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
    setFormData((prev) => ({
      ...prev,
      qna1: data.qna1,
      qna2: data.qna2,
      codelanguages: data.codelanguages,
      indianlanguages: data.indianlanguages,
    }));
    const payload = {
      action: 'SAVE',
      qualitative: {
        why_soul: data.qna1,
        experience: data.qna2,
      },
      skills: codeProfAtom,
      languages: languagesProfAtom,
    };
    if (
      data.indianlanguages?.length === 0 &&
      data.codelanguages?.length === 0
    ) {
      saveStep3Data(payload);
      gotoNextStep();
      console.log('payload1ST condition');
    } else if (data.codelanguages?.length !== codeProfAtom.length) {
      console.log('2nd condition');
      toast.error(
        <Text>Please Select All Selected Programming Language Proficiency</Text>
      );
    } else if (data.indianlanguages?.length !== languagesProfAtom.length) {
      console.log('3rd condition');
      toast.error(<Text>Please Select All Selected Language Proficiency</Text>);
    } else {
      saveStep3Data(payload);
      gotoNextStep();
      console.log('last condition');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormPart title="Interest & Skills" description="">
          <SubjectiveQna />
        </FormPart>
        <div className="mt-8"></div>
        <FormPart title="" description="">
          <SkillsSection />
        </FormPart>

        <Footer />
      </form>
    </FormProvider>
  );
}
