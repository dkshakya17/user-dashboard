'use client';

import uniqueId from 'lodash/uniqueId';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { ActionIcon, Button, Input, Text, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import toast from 'react-hot-toast';
import { FileInput } from 'rizzui';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config/constants';
import { useCookies } from 'react-cookie';
import cn from '@/utils/class-names';
import { PiUploadSimpleBold, PiPlusBold } from 'react-icons/pi';
import mixpanel from 'mixpanel-browser';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { useAtom } from 'jotai';

import {
  expressInterestSchema,
  ExpressInterestFormInput,
} from '@/utils/validators/express-interest.schema';

interface SaveDataResponse {
  messages: string;
}

interface showInterest {
  onShowInterest: (status: boolean) => void;
}

interface FailOtpResponse {
  title: string;
  detail: string;
}

interface YourComponentProps extends showInterest {
  projectName?: string;
  skillId?: string;
  description?: string;
  soulId?: string;
  projectId?: string;
  skills?: string;
  // You can include other interfaces as needed
}
const ExpressInterestModal: React.FC<YourComponentProps> = ({
  projectName,
  skillId,
  description,
  soulId,
  projectId,
  skills,
  onShowInterest,
}) => {
  const { closeModal } = useModal();
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);
  const [selectedSkillDoc, setSelectedSkillDoc] = useState<any>('');
  const [uploadSkillDoc, setUploadSkillDoc] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [marksheetName, setSkillDocName] = useState('');
  const [skillIdState, setSkillIdState] = useState<any>(skillId);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  console.log(skillIdState, 'skillIdStatedeep');

  const saveProjectInterest = async () => {
    try {
      const response = await fetch(
        `${API_URL}/v1/projects/${projectId}/interested`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(projectPayload),
        }
      );
      if (response.status == 200) {
        const rsp = (await response.json()) as SaveDataResponse;
        onShowInterest(true);
        toast.success(
          <Text as="b">
            Success! Your {skills} skill has been added to your profile and
            we've captured your interest in {projectName}.
          </Text>
        );
        closeModal();
      } else {
      }
    } catch (error) {}
  };
  const saveSkill = async (skillPayload: any) => {
    try {
      const response = await fetch(`${API_URL}/v1/user/profile/skill`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillPayload),
      });
      if (response.status == 200) {
        const rsp = (await response.json()) as SaveDataResponse;
      } else {
        const errorOtp = (await response.json()) as FailOtpResponse;
      }
    } catch (error) {}
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append('doc', uploadSkillDoc);
    formData.append('name', uploadSkillDoc?.name);
    // formData.append('skill_id', skillIdState);
    try {
      const response = await fetch(
        `${API_URL}/v1/user/profile/skill/${skillId}/proof/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            //'Content-Type': 'multipart/form-data',
            //'ngrok-skip-browser-warning': '69420',
          },
          body: formData,
        }
      );
      console.log('formData', formData);

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success(<Text>File uploaded successfully </Text>);
        setSkillDocName(uploadSkillDoc.name);
        setLoading(false);
        mixpanel.track('upload', {
          soul_id: UserDetail.soul_id,
          subcategory: 'express_interest',
          category: 'post_login_home',
          project_id: projectId,
          project_name: projectName,
          skill_id: skillId,
          skill_name: skills,
          type: 'api_call',
        });
      } else {
        toast.error(
          <Text>There was an error in uploading file, please try again</Text>
        );
        setLoading(false);
      }
    } catch (err) {
      toast.error(
        <Text>There was an error in uploading file, please try again</Text>
      );
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<ExpressInterestFormInput> = (data) => {
    const skillPayload = {
      skill_id: skillId,
      explanation: data.description,
    };
    saveProjectInterest();
    saveSkill(skillPayload);
    mixpanel.track('save', {
      soul_id: UserDetail.soul_id,
      subcategory: 'express_interest',
      category: 'post_login_home',
      project_id: projectId,
      project_name: projectName,
      skill_id: skillId,
      skill_name: skills,
      type: 'api_call',
    });
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setUploadSkillDoc(file);
    setSelectedSkillDoc(event.target.value);
  };
  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Skilled in {skills}? Tell us more
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <Form<ExpressInterestFormInput>
        validationSchema={expressInterestSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            description: '',
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium "
      >
        {({ register, control, watch, formState: { errors } }) => {
          return (
            <>
              {/* <input   {...register('skillId')} type="text" hidden value={props.skillId} /> */}
              <Textarea
                label="Please explain why we should consider you for this skill, detailing relevant degrees, experiences, coursework, or interest."
                placeholder="Type Here"
                {...register('description')}
                error={errors.description?.message}
                textareaClassName="h-30 text-sm px-2"
                className="col-span-full"
                size="lg"
              />
              <div className="col-span-full pb-0">
                <p>
                  Please upload relevant supporting documents, such as
                  internship certificates, coursework proofs, or work experience
                  evidence,{' '}
                  <b>
                    to improve your shortlisting chances. You can't edit the
                    details once your interest has been captured.
                  </b>{' '}
                  <br />
                  (Max file size &#60; 5Mb)
                </p>
              </div>

              <div className="col-span-full flex items-end gap-2 xs:flex-col sm:flex-row">
                <FileInput
                  value={selectedSkillDoc}
                  color="primary"
                  label={''}
                  onChange={handleFileChange}
                  clearable={!!selectedSkillDoc}
                  className="sm:w-2/2 xs:w-full lg:w-3/4 lg:w-3/4 "
                  labelClassName="text-left"
                  onClear={() => {
                    setSelectedSkillDoc('');
                    setUploadSkillDoc(null);
                  }}
                  accept=".pdf,.png,.jpg"
                  // disabled={
                  //   kycStatus?.marksheet === 'IN_REVIEW' ||
                  //   kycStatus?.marksheet === 'VERIFIED'
                  //     ? true
                  //     : false
                  // }
                />
                <Button
                  className="souai-button sm:w-2/2 gap-2 xs:w-full lg:w-1/4"
                  isLoading={isLoading}
                  onClick={() => {
                    handleUpload();
                    // mixpanel.track('upload_marksheet', {
                    //   soul_id: UserDetail.soul_id,
                    //   sub_category: 'onboarding',
                    //   category: 'post_login',
                    //   type: 'api_call',
                    // });
                  }}
                >
                  Upload <PiUploadSimpleBold />
                </Button>
              </div>
              {/* <p className="w-full text-xs font-normal">{marksheetName}</p> */}
              <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-auto @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => {
                    closeModal();
                    mixpanel.track('cancel', {
                      soul_id: UserDetail.soul_id,
                      subcategory: 'express_interest',
                      category: 'post_login_home',
                      project_id: projectId,
                      project_name: projectName,
                      skill_id: skillId,
                      skill_name: skills,
                      type: 'api_call',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="hover:gray-700 w-auto hover:bg-gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white dark:hover:bg-gray-300 dark:active:enabled:bg-gray-300"
                >
                  Save
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
export default ExpressInterestModal;
