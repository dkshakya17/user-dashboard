'use client';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import { IoIosArrowDown } from 'react-icons/io';
import { UserData, UserDetails } from '@/app/shared/auth-layout/auth-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SaveDataResponse } from './index';
import FormPart from '@/app/shared/multi-step/form-part';
import BasicInfo, { BasicInfoSchema } from '@/app/shared/multi-step/basic-info';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import Footer from '@/app/signup/footer';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';

const JdData = [
  {
    title: 'Our Opportunities',
    content: (
      <>
        <p className="pb-2 leading-5">
          We are hiring for exceptional talent with subject matter expertise in
          various fields who will help improve AI models (no prior AI experience
          needed).{' '}
        </p>
        <p className="pb-2 leading-5">The fields we are hiring in:</p>
        <ul className="pb-2 leading-5">
          <li>
            <p className="pb-2 leading-5">
              {' '}
              1. <strong>Engineering</strong> (Civil, Mechanical, Chemical,
              Industrial/production, Electrical, Computer Science, etc.)
            </p>
          </li>
          <li>
            <p className="pb-2 leading-5">
              {' '}
              2. <strong>Sciences</strong> (Maths, Physics, Chemistry, Biology,
              etc.)
            </p>
          </li>
          <li>
            <p className="pb-2 leading-5">
              {' '}
              3. <strong>Humanities</strong> (Psychology, History, Literature,
              etc.)
            </p>
          </li>
          <li>
            <p className="pb-2 leading-5">
              {' '}
              4. <strong>Other</strong> (Doctors, Lawyers, CAs, Experts in
              Finance, Economics, etc.) Full list of the fields is in the form
              below
            </p>
          </li>
        </ul>
        <p className="pb-2 leading-5">
          There are lots of positions in each of the fields but we need to move
          fast, so APPLY NOW! Learn the skills of the future.
        </p>
      </>
    ),
  },
];
const FormSchema = BasicInfoSchema.merge(BasicInfoSchema);

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function StepOne() {
  const { gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const [resumeName, setResumeName] = useState('');
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      legalName: formData.name_as_per_aadhaar,
      phoneNumber: formData.phone,
      preferredName: formData.name,
      // resumeName: formData.resume,
      linkedinUrl: formData.linkedinUrl,
    },
  });

  const saveStep1Data = async (payload: any) => {
    if (!cookies.token) return;
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

        methods.setValue('legalName', userDetails.name_as_per_aadhaar || '');
        methods.setValue('phoneNumber', userDetails?.phone);
        setResumeName(userDetails.resume.name);
        methods.setValue('linkedinUrl', userDetails.linkedin_url || '');
      }
    } catch (error) {}
  };
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const userDetails = (await response.json()) as UserDetails;
        methods.setValue('preferredName', userDetails.name);
        methods.setValue('email', userDetails.email);
      }
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data, 'formdata');

    setFormData((prev) => ({
      ...prev,
      name_as_per_aadhaar: data.legalName,
      name: data.preferredName,
      phone: data.phoneNumber,
      //resume: data.resumeName,
      linkedinUrl: data.linkedinUrl,
    }));

    const payload = {
      action: 'SAVE',
      name: data.preferredName,
      phone: data.phoneNumber,
      name_as_per_aadhaar: data.legalName,
      linkedin_url: data.linkedinUrl,
    };
    saveStep1Data(payload);
    gotoNextStep();
    setCookie('userStatus', 'PENDING_FORM', { path: '/' });
  };

  useEffect(() => {
    mixpanel.track_pageview({
      subcategory: 'step-1',
      category: 'application_form',
      soul_id: UserDetail.soul_id,
      type: 'page_view',
    });
    mixpanel.identify(UserDetail.soul_id);
    fetchUserDetails();
    if (cookies.userStatus === 'PENDING_FORM') {
      fetchExistingUserData();
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-2 pb-4 md:gap-3">
          {JdData.map((item) => (
            <Collapse
              key={item.title}
              className="mb-5 border-b border-t"
              panelClassName="mb-7"
              header={({ open, toggle }) => (
                <button
                  type="button"
                  onClick={() => {
                    mixpanel.track('our_opportunities', {
                      soul_id: UserDetail.soul_id,
                      subcategory: 'step-1',
                      category: 'application_form',
                      type: 'click',
                    });
                    toggle();
                  }}
                  className="flex w-full cursor-pointer items-center justify-between py-5 text-lg font-semibold text-gray-900 md:text-2xl"
                >
                  {item.title}
                  <IoIosArrowDown
                    className={cn(
                      'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                      open && '-rotate-0'
                    )}
                  />
                </button>
              )}
            >
              <div className="mt-1 text-xs leading-5 text-gray-500 md:mt-2 md:text-sm">
                {item.content}
              </div>
            </Collapse>
          ))}
          <FormPart
            title="Personal Information"
            description="You only need to provide this information once, during  registration."
          >
            <BasicInfo resume={resumeName} />
          </FormPart>
        </div>
        <Footer />
      </form>
    </FormProvider>
  );
}
