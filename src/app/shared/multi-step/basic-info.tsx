'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { Controller, useFormContext } from 'react-hook-form';
import { PhoneNumber } from '@/components/ui/phone-input';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { messages } from '@/config/messages';
import { Tooltip } from 'rizzui';
import { FileInput } from 'rizzui';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { API_URL } from '@/config/constants';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';

export const BasicInfoSchema = z.object({
  legalName: z.string().min(1, { message: 'Legal Name is required' }),
  email: z.string().optional(),
  phoneNumber: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(12, { message: 'Enter the correct number' }),
  preferredName: z.string().min(1, { message: 'Preferred Name is required' }),
  linkedinUrl: z.string().optional(),
});

export default function BasicInfo(props: any) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const [cookies, setCookie] = useCookies(['token', 'userStatus', 'source']);
  const [uploadResume, setUploadResume] = useState<any>();
  const [resumeNameUpload, setResumeNameUpload] = useState('');
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    // track_pageview: true,
    // persistence: 'localStorage',
  });
  useEffect(() => {
    if (cookies.source === 'ADMIN') {
      setResumeNameUpload(props.resume);
    }
  }, [props]);

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

  return (
    <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 md:gap-y-7">
      <input type="hidden" {...register('action')} value="SAVE" />

      <Controller
        name="legalName"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            labelClassName="font-medium text-gray-900 dark:text-white"
            inputClassName="[&_input::placeholder]:text-gray-400"
            label={
              <div className="flex items-center justify-start gap-2">
                <p>
                  Legal name (as per Aadhaar){' '}
                  <span className="text-red">*</span>
                </p>
                <Tooltip
                  content={() => (
                    <p className="text-xs">
                      If you are selected, we will verify your identity <br />{' '}
                      using your legal name
                    </p>
                  )}
                  placement="top"
                >
                  <span>
                    <BsFillInfoCircleFill color="#A47BC3" />
                  </span>
                </Tooltip>
              </div>
            }
            placeholder="John Doe"
            //value={}
            className="col-span-full"
            onClick={() => {
              mixpanel.track('legal_name', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-1',
                category: 'application_form',
                type: 'click',
              });
            }}
            {...field}
            error={errors.legalName?.message as string}
          />
        )}
      />
      <Controller
        name="preferredName"
        control={control}
        render={({ field }) => (
          <Input
            label={<p>Preferred Name</p>}
            placeholder="John"
            inputClassName="[&_input::placeholder]:text-gray-400"
            className="col-span-full"
            {...field}
            onClick={() => {
              mixpanel.track('preferred_name', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-1',
                category: 'application_form',
                type: 'click',
              });
            }}
            // @ts-ignore
            error={errors?.preferredName?.message as string}
          />
        )}
      />
      <Input
        label="Email"
        type="email"
        placeholder="john.doe@gmail.com"
        inputClassName="[&_input::placeholder]:text-gray-400"
        {...register('email')}
        error={errors.email?.message as string}
        disabled
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { value, onChange } }) => (
          <PhoneNumber
            label={
              <div className="flex items-center justify-start gap-2">
                <p>
                  Phone Number <span className="text-red">*</span>
                </p>
                <Tooltip
                  content={() => (
                    <p className="text-xs">
                      Please enter a number active on WhatsApp.
                    </p>
                  )}
                  placement="top"
                >
                  <span>
                    <BsFillInfoCircleFill color="#A47BC3" />
                  </span>
                </Tooltip>
              </div>
            }
            country="in"
            value={value}
            onChange={onChange}
            onClick={() => {
              mixpanel.track('phone_number', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-1',
                category: 'application_form',
                type: 'click',
              });
            }}
            disableDropdown
            countryCodeEditable={false}
            // @ts-ignore
            error={errors.phoneNumber?.message as string}
          />
        )}
      />
      <FileInput
        value={uploadResume}
        label={
          <p>
            Upload Your Resume (Max file size &#60; 5Mb){' '}
            <span className="text-red">*</span>
          </p>
        }
        color="primary"
        onChange={(e) => {
          setUploadResume(e.target.value);
          uploadFile(e.target);
          mixpanel.track('upload_resume', {
            soul_id: UserDetail.soul_id,
            subcategory: 'step-1',
            category: 'application_form',
            type: 'api_call',
          });
        }}
        clearable={!!uploadResume}
        className="col-span-full"
        onClear={() => {
          setUploadResume('');
        }}
        accept=".pdf,.doc,.docx"
        required
      />
      {resumeNameUpload?.length > 0 && (
        <p className="col-span-full font-medium text-gray-900 dark:text-white">
          Uploaded File : {resumeNameUpload}
        </p>
      )}
      <Controller
        name="linkedinUrl"
        control={control}
        render={({ field }) => (
          <Input
            label="Linkedin URL"
            type="text"
            inputClassName="[&_input::placeholder]:text-gray-400"
            placeholder="https://www.linkedin.com/in/john-doe/"
            className="col-span-full"
            onClick={() => {
              mixpanel.track('linkedin_url', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-1',
                category: 'application_form',
                type: 'click',
              });
            }}
            {...field}
            // @ts-ignore
            error={errors?.linkedinUrl?.message as string}
          />
        )}
      />
    </div>
  );
}
