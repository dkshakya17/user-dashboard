'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  SubmitHandler,
  useFormContext,
  Controller,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { PhoneNumber } from '@/components/ui/phone-input';
import FormGroup from '@/app/shared/form-group';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdVerified } from 'react-icons/md';
import {
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { z } from 'zod';
import mixpanel from 'mixpanel-browser';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { useAtom } from 'jotai';

export interface UserDetails {
  email: string;
  maskedEmail: string;
  maskedPhone: string;
  name: string;
  phoneVerified: boolean;
  picture: string;
  soul_id: string;
  source: string;
  status: string;
  marksheetStatus: string; // NEW , SHORTLISTED
}
type resumeObject = {
  link: string | undefined;
  file: object | undefined;
  name: string;
  size: number;
};
type education = {
  major: string;
  degree: string;
  preferred_subject: string;
  university: string;
  university_category: string;
  gpa: string;
  marksheet: string;
};
type qualitative = {
  why_soul: string;
  experience: string;
};
type interestes = {
  roles: string[];
};
type skill = {
  name: string;
  proficiency: string;
};
export interface UserData {
  name_as_per_aadhaar: string;
  phone: string;
  education: education;
  qualitative: qualitative;
  interests: interestes;
  referral: object | undefined;
  consent: boolean;
  skills: skill[];
  languages: skill[];
  resume: resumeObject;
  marksheet: string;
  shortlisting: string;
  updated_at: string;
  linkedin_url: string;
  coding_url: string[];
  campus: string;
}

export type FormSchemaType = z.infer<typeof personalInfoFormSchema>;

export default function PersonalInfoView(props: any) {
  const [uploadResume, setUploadResume] = useState<any>();
  const [resumeNameUpload, setResumeNameUpload] = useState('');
  const [userInfo, setuserInfo] = useState<UserData>();
  const [userCoreinfo, setuserCoreinfo] = useState<UserDetails>();
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus', 'source']);
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      legalName: '',
      phoneNumber: '',
      name: '',
      email: '',
    },
  });
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };
  const uploadFile = async (data: any) => {
    const formData = new FormData();
    setResumeNameUpload(data.files[0]?.name);
    formData.append('doc', data.files[0]);
    formData.append('name', data.files[0]?.name);
    formData.append('type', 'RESUME');
    try {
      const response = await fetch(`${API_URL}/v1/onboarding/form/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          //'Content-Type': 'multipart/form-data',
          //'ngrok-skip-browser-warning': '69420',
        },
        body: formData,
      });
      console.log('formData', formData);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success(<Text>File uploaded successfully </Text>);
      } else {
        toast.error(
          <Text>There was an error in uploading file, please try again</Text>
        );
      }
    } catch (err) {
      toast.error(
        <Text>There was an error in uploading file, please try again</Text>
      );
    }
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
        const profiledetails = (await response.json()) as UserData;
        console.log(profiledetails, 'profiledetails');
        // methods.setValue('legalName', profiledetails.name_as_per_aadhaar);
        // methods.setValue('name', profiledetails.name);
        // methods.setValue('email', profiledetails.email);
        setuserInfo(profiledetails);
        console.log(profiledetails.name_as_per_aadhaar, 'legalName');
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
        setuserCoreinfo(userDetails);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchExistingUserData();
    fetchUserDetails();
    mixpanel.track_pageview({
      subcategory: 'home',
      soul_id: UserDetail.soul_id,
      category: 'post_login_home',
      type: 'page_view',
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormGroup title="" description="" className="@3xl:grid-cols-12" />

        <div className="xs:grid-cols-full mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11 sm:grid-cols-2 lg:grid-cols-2">
          <FormGroup
            title="Legal Name"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              placeholder="Legal Name"
              value={userInfo?.name_as_per_aadhaar}
              className="col-span-full flex-grow"
              disabled
            />
          </FormGroup>
          <FormGroup
            title="Preferred Name"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              placeholder="Name"
              value={userCoreinfo?.name}
              className="col-span-full flex-grow"
              disabled
            />
          </FormGroup>

          <FormGroup
            title="Email Address"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              className="col-span-full"
              value={userCoreinfo?.email}
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
              type="email"
              placeholder="john.doe@gmail.com"
              disabled
            />
          </FormGroup>
          <FormGroup
            title={
              <p className="flex items-center gap-2">
                Phone{' '}
                {userCoreinfo?.phoneVerified ? (
                  <span className="flex gap-1 text-xs">
                    <MdVerified className="h-4 w-4 text-green" />
                    Verified
                  </span>
                ) : (
                  ''
                )}
              </p>
            }
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Controller
              name="phoneNumber"
              // control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumber
                  country="in"
                  value={userInfo?.phone}
                  disableDropdown
                  countryCodeEditable={false}
                  className="col-span-full"
                  disabled
                />
              )}
            />
          </FormGroup>
          <FormGroup
            title="Your Resume"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              placeholder="Uploaded Resume"
              value={userInfo?.resume.name}
              className="col-span-full flex-grow"
              disabled
            />
          </FormGroup>

          {/* <FormGroup
                title="About"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup> */}

          {/* <FormGroup
                title="Portfolio Projects"
                description="Share a few snippets of your work"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="mb-5 @3xl:col-span-2">
                  <UploadZone
                    name="portfolios"
                    getValues={getValues}
                    setValue={setValue}
                    error={errors?.portfolios?.message as string}
                  />
                </div>
              </FormGroup> */}
        </div>
        {/* <FormFooter
              isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            /> */}
      </form>
    </FormProvider>
  );
}
