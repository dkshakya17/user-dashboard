'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';

const genderOptions = [
  {
    name: 'Male',
    value: 'male',
  },
  {
    name: 'Female',
    value: 'female',
  },
  {
    name: 'Other',
    value: 'Other',
  },
];

const orientationOptions = [
  {
    name: 'Male',
    value: 'male',
  },
  {
    name: 'Female',
    value: 'female',
  },
  {
    name: 'Other',
    value: 'Other',
  },
];
const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function PersonalDiversity() {
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <FormGroup title="" description="" className=" @3xl:grid-cols-12" />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Gender"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <SelectBox
                      placeholder="Select Gender"
                      options={genderOptions}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        genderOptions?.find((r) => r.value === selected)
                          ?.name ?? ''
                      }
                      error={errors?.name?.message as string}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Sexual Orientation"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      placeholder="Select Orientation"
                      options={orientationOptions}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        orientationOptions?.find(
                          (con) => con.value === selected
                        )?.name ?? ''
                      }
                      error={errors?.name?.message as string}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Do you consider yourself an individual with a disabilty ?"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Checkbox
                  label=""
                  className="grid-col-1 mt-3"
                  labelClassName="pl-3"
                />
              </FormGroup>
              <FormGroup
                title="Are you a Veteran ?"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Checkbox label="" className="mt-3" labelClassName="pl-3" />
              </FormGroup>
            </div>
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
