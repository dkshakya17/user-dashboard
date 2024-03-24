'use client ';
import { z } from 'zod';
import Select from '@/components/ui/select';
import AutoSelect, { StylesConfig } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import { FieldError } from '@/components/ui/field-error';
import { useAtom } from 'jotai';
import { useCookies } from 'react-cookie';
import { Tooltip } from 'rizzui';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { UNIVERSITY } from '@/config/constants';
import { SKILLS } from '@/config/constants';
import { MAJOROPTIONS } from '@/config/constants';
import { EDULEVEL } from '@/config/constants';
import mixpanel from 'mixpanel-browser';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
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
const customNoOptionsMessage = () => {
  return (
    <div>
      <p>
        Select <b className="text-primary">'Other'</b> in options you can enter
        your university name{' '}
      </p>
    </div>
  );
  // Alternatively, you can return a JSX element for more complex customizations:
  // return <div>No custom options available</div>;
};
const customNoOptionsMessageMajor = () => {
  return (
    <div>
      <p>
        Select <b className="text-primary">'Other'</b> in options you can enter
        your Major{' '}
      </p>
    </div>
  );
  // Alternatively, you can return a JSX element for more complex customizations:
  // return <div>No custom options available</div>;
};
interface EducationInfoProps {
  className?: string;
}
interface EducationInfoProps {
  className?: string;
}

export const EducationAndExperienceSchema = z.object({
  educationlevel: z.object({ label: z.string(), value: z.string() }).required(),
  universityName: z.object({ label: z.string(), value: z.string() }).required(),
  otheruniversityName: z.string().optional(),
  major: z.object({ label: z.string(), value: z.string() }).required(),
  otherMajor: z.string().optional(),
  prefferedworkfield: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  cgpa: z.string().min(1, { message: 'CGPA is required' }),
});

export default function EducationAndExperience({
  className,
}: EducationInfoProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [cookies, setCookie] = useCookies(['token', 'userStatus', 'source']);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  useEffect(() => {
    if (errors.universityName) {
      toast.error(errors.universityName.message as string);
    }
    if (errors.prefferedworkfield) {
      toast.error(errors.prefferedworkfield.message as string);
    }
    if (errors.major) {
      toast.error(errors.major.message as string);
    }
  }, [errors]);
  const major = watch('major');
  const universityNameWatch = watch('universityName');
  // console.log(universityName, 'universityNameuniversityName');
  // get value of type
  return (
    <div className={cn('mb-5 grid gap-x-5 gap-y-5 md:gap-y-7', className)}>
      <label className="dark:text-white-mb-3  -mb-3 text-sm font-medium text-gray-900 md:-mb-4">
        <div className="flex items-center justify-start gap-2">
          <p>
            Your highest level of study ( If MBA, fill undergraduate details){' '}
            <span className="text-red">*</span>
          </p>
          <Tooltip
            content={() => (
              <p className="text-xs">
                Please select the option that fits your education the closest.
                <br />
                CAs please select Masters pursuing/completed as the case may be
              </p>
            )}
            placement="top"
          >
            <span>
              <BsFillInfoCircleFill color="#A47BC3" />
            </span>
          </Tooltip>
        </div>
      </label>
      <Controller
        control={control}
        name="educationlevel"
        render={({ field }) => (
          <AutoSelect
            // isDisabled={cookies.source === 'ADMIN' ? true : false}
            options={EDULEVEL}
            placeholder="Select"
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
            onFocus={() => {
              mixpanel.track('highest_level_of_study', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-2',
                category: 'application_form',
                type: 'click',
              });
            }}
            isSearchable={false}
            styles={colourStyles}
          />
        )}
      />

      <div className="grid gap-4">
        <label className="dark:text-white-mb-3  -mb-2 text-sm font-medium text-gray-900 md:-mb-2">
          <div className="flex items-center justify-start gap-2">
            <p>
              University of your highest level of study?{' '}
              <span className="text-red">*</span>
            </p>
          </div>
        </label>

        <Controller
          control={control}
          name="universityName"
          render={({ field }) => (
            <AutoSelect
              // isDisabled={cookies.source === 'ADMIN' ? true : false}
              options={UNIVERSITY}
              placeholder="Select"
              noOptionsMessage={customNoOptionsMessage}
              {...field}
              onFocus={() => {
                mixpanel.track('university_of_highest_level_of_study', {
                  soul_id: UserDetail.soul_id,
                  subcategory: 'step-2',
                  category: 'application_form',
                  type: 'click',
                });
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: '#f1f1f1',
                  primary: 'black',
                },
              })}
              styles={colourStyles}
              isClearable={true}
            />
          )}
        />
        {/* {errors.universityName && (
          <FieldError error={errors.universityName.message as string} />
        )} */}
        {universityNameWatch?.value === 'other' && (
          <Input
            type="text"
            label={
              <p>
                Enter your university name <span className="text-red">*</span>
              </p>
            }
            onClick={() => {
              mixpanel.track('university_of_highest_level_of_study2', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-2',
                category: 'application_form',
                type: 'click',
              });
            }}
            placeholder="Enter your university name"
            className="col-span-full"
            {...register('otheruniversityName')}
            // @ts-ignore
            error={errors?.otheruniversityName?.message as string}
            required
          />
        )}
      </div>
      <div className="grid gap-4">
        <label className="dark:text-white-mb-3  -mb-2 text-sm font-medium text-gray-900 md:-mb-2">
          <div className="flex items-center justify-start gap-2">
            <p>
              Your core field of study (Major)?{' '}
              <span className="text-red">*</span>
            </p>
          </div>
        </label>
        <Controller
          control={control}
          name="major"
          render={({ field }) => (
            <AutoSelect
              options={MAJOROPTIONS}
              placeholder="Select"
              noOptionsMessage={customNoOptionsMessageMajor}
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
              onFocus={() => {
                mixpanel.track('core_field_of_study', {
                  soul_id: UserDetail.soul_id,
                  subcategory: 'step-2',
                  category: 'application_form',
                  type: 'click',
                });
              }}
              isSearchable={true}
              styles={colourStyles}
            />
          )}
        />

        {major?.value === 'Others' && (
          <Input
            type="text"
            label={
              <p>
                Enter your major <span className="text-red">*</span>
              </p>
            }
            placeholder="Enter here"
            className="col-span-full"
            onClick={() => {
              mixpanel.track('core_field_of_study2', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-2',
                category: 'application_form',
                type: 'click',
              });
            }}
            {...register('otherMajor')}
            // @ts-ignore
            error={errors?.otherMajor?.message as string}
            required
          />
        )}
      </div>

      <label className="dark:text-white-mb-3  -mb-3 text-sm font-medium text-gray-900 md:-mb-4">
        <div className="flex items-center justify-start gap-2">
          <p>Any other preferred area(s) of work? </p>
          <Tooltip
            content={() => (
              <p className="text-xs">
                You may need to provide supporting proofs such as <br />
                certificates, marksheets showing the relevant coursework, etc.
              </p>
            )}
            placement="top"
          >
            <span>
              <BsFillInfoCircleFill color="#A47BC3" />
            </span>
          </Tooltip>
        </div>
      </label>

      <Controller
        control={control}
        name="prefferedworkfield"
        render={({ field }) => (
          <AutoSelect
            className="col-span-full md:col-span-1"
            placeholder="Select"
            options={SKILLS}
            isClearable={true}
            isMulti={true}
            {...field}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              outline: 'none',
              colors: {
                ...theme.colors,
                primary25: '#f1f1f1',
                primary: 'black',
              },
            })}
            onFocus={() => {
              mixpanel.track('preferred_area_of_work', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-2',
                category: 'application_form',
                type: 'click',
              });
            }}
            styles={colourStyles}
          />
        )}
      />
      <Controller
        control={control}
        name="cgpa"
        render={({ field }) => (
          <Input
            type="number"
            inputClassName="[&_input::placeholder]:text-gray-400"
            label={
              <div className="flex items-center justify-start gap-2">
                <p>
                  Cumulative GPA <span className="text-red">*</span>
                </p>
                <Tooltip
                  content={() => (
                    <p className="text-xs">
                      Please consider the cumulative GPA till date - adjust to a
                      <br />
                      scale of 10 if needed
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
            onClick={() => {
              mixpanel.track('cumulative_gpa', {
                soul_id: UserDetail.soul_id,
                subcategory: 'step-2',
                category: 'application_form',
                type: 'click',
              });
            }}
            placeholder="0.00"
            max="10"
            min="1"
            step="0.01"
            className="col-span-full"
            // @ts-ignore
            {...field}
            error={errors?.cgpa?.message as string}
            // disabled={cookies.source === 'ADMIN' ? true : false}
          />
        )}
      />
    </div>
  );
}
