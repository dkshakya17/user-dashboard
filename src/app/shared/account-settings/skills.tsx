'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared/form-group';
import { MAJOROPTIONS } from '@/config/constants';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import AutoSelect, { StylesConfig } from 'react-select';
const colourStyles: StylesConfig = {
  input: (provided) => ({
    ...provided,
    '>input:focus': {
      boxShadow: 'none',
    },
  }),

  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#A47BC3',
      borderRadius: '3px',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  }),
};
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

export default function PersonalSKills() {
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
            <FormGroup title="" description="" className="@3xl:grid-cols-2 " />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Your Skills"
                className=" @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <AutoSelect
                      options={MAJOROPTIONS}
                      placeholder="Select"
                      // noOptionsMessage={}
                      {...field}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                          ...theme.colors,
                          primary25: '#f1f1f1',
                          primary: 'black',
                        },
                      })}
                      isSearchable={true}
                      styles={colourStyles}
                      isMulti={true}
                      className="col-span-full"
                    />
                  )}
                />
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
