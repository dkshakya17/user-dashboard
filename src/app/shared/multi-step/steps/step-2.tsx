'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormPart from '@/app/shared/multi-step/form-part';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { UserData, UserDetails } from '@/app/shared/auth-layout/auth-wrapper';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import EducationAndExperience, {
  EducationAndExperienceSchema,
} from '@/app/shared/multi-step/education-information';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import Footer from '@/app/signup/footer';
import { SaveDataResponse } from './index';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';

const FormSchema = EducationAndExperienceSchema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function StepTwo() {
  const { gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      universityName: formData.universityName,
      otheruniversityName: formData.otheruniversityName,
      educationlevel: formData.educationlevel,
      major: formData.major,
      prefferedworkfield: formData.prefferedworkfield,
      cgpa: formData.cgpa,
      otherMajor: formData.otherMajor,
    },
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
        methods.setValue('educationlevel', {
          label: userDetails.education.degree,
          value: userDetails.education.degree,
        });
        methods.setValue('universityName', {
          label: userDetails.education.university,
          value: userDetails.education.university,
        });
        methods.setValue('major', {
          label: userDetails.education.major,
          value: userDetails.education.major,
        });
        methods.setValue(
          'prefferedworkfield',
          userDetails.interests.roles?.map((item) => ({
            label: item,
            value: item,
          }))
        );
        methods.setValue('cgpa', userDetails.education.gpa.toString());
      }
    } catch (error) {}
  };

  const saveStep2Data = async (payload: any) => {
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
    console.log(data);
    setFormData((prev) => ({
      ...prev,
      universityName: data.universityName,
      educationlevel: data.educationlevel,
      major: data.major,
      prefferedworkfield: data.prefferedworkfield,
      cgpa: data.cgpa,
    }));

    let major: string | undefined = data.major.value;
    if (data.major.value === 'Others') {
      major = data.otherMajor;
    }
    let university: string | undefined = data.universityName.value;
    if (data.universityName.value === 'other') {
      university = data.otheruniversityName;
    }
    // let universityName: object | undefined = data.universityName;
    // if (data.universityName.value === 'other') {
    //   universityName = data.otheruniversityName;
    // }

    const payload = {
      action: 'SAVE',
      education: {
        major,
        degree: data.educationlevel.value,
        university,
        gpa: data.cgpa,
      },
      interests: {
        roles: data.prefferedworkfield?.map((item) => item.value),
      },
    };
    // handleReset();
    saveStep2Data(payload);
    gotoNextStep();
  };
  useEffect(() => {
    mixpanel.track_pageview({
      subcategory: 'step-2',
      category: 'application_form',
      soul_id: UserDetail.soul_id,
      type: 'page_view',
    });
    if (cookies.userStatus === 'PENDING_FORM') {
      fetchExistingUserData();
    }
  }, []);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-16 md:gap-20">
          <FormPart
            title="Educational Information"
            description="You only need to provide this information once, during registration."
          >
            <EducationAndExperience />
          </FormPart>
        </div>

        <Footer />
      </form>
    </FormProvider>
  );
}
