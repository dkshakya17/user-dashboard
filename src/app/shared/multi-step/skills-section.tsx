'use client ';
import { z } from 'zod';
import Select from '@/components/ui/select';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Title, Text } from '@/components/ui/text';
import { toast } from 'react-hot-toast';
import { formDataAtom, useStepperTwo } from '@/app/shared/multi-step/steps';
import AutoSelect, { StylesConfig, components } from 'react-select';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from 'rizzui';
import mixpanel from 'mixpanel-browser';
import { LANGUAGES } from '@/config/constants';
import { CODELAGNGUAGES } from '@/config/constants';
import { atom, useAtom } from 'jotai';
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
    paddingTop: '6px',
    paddingBottom: '6px',
    ':hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  }),
};

interface skillsSectionProps {
  className?: string;
}

export const skillsSchema = z.object({
  codelanguages: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  indianlanguages: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
});

export const CodeProficiencyAtom = atom([]);
export const langProficiencyAtom = atom([]);

export default function SkillsSection({ className }: skillsSectionProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const [languages, setLanguages] = useState([]);
  const [codingLanguages, setCodingLanguages] = useState([]);
  const [codeProf, setCodeProf] = useState<any>([]);
  const [languagesProf, setLanguagesProf] = useState<any>([]);
  const [languagesProfAtom, setLanguagesProfAtom] =
    useAtom(langProficiencyAtom);
  const [codeProfAtom, setCodeProfAtom] = useAtom(CodeProficiencyAtom);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  useEffect(() => {
    setCodeProfAtom(codeProf);
    setLanguagesProfAtom(languagesProf);
  }, [languagesProf, codeProf]);

  const handleSkillsProf = (newObject: any) => {
    // Find the index of the object with the same name and value
    const index = codeProf.findIndex(
      (item: any) => item.name === newObject.name
    );

    if (index !== -1) {
      // If the object with the same name and value exists, replace it
      setCodeProf((prevData: any) => [
        ...prevData.slice(0, index),
        newObject,
        ...prevData.slice(index + 1),
      ]);
    } else {
      // If the object with the same name and value doesn't exist, add it
      setCodeProf((prevData: any) => [...prevData, newObject]);
    }
  };
  const handleLnagProf = (newObject: any) => {
    // Find the index of the object with the same name and value
    const index = languagesProf.findIndex(
      (item: any) => item.name === newObject.name
    );

    if (index !== -1) {
      // If the object with the same name and value exists, replace it
      setLanguagesProf((prevData: any) => [
        ...prevData.slice(0, index),
        newObject,
        ...prevData.slice(index + 1),
      ]);
    } else {
      // If the object with the same name and value doesn't exist, add it
      setLanguagesProf((prevData: any) => [...prevData, newObject]);
    }
  };
  const handleMultiCodingValue1 = (e: any, props: any) => {
    e.stopPropagation();
    e.preventDefault();

    let newSkillsProf = codeProf.filter(
      (item: any) => item.name !== props.data.value
    );
    setCodeProf(newSkillsProf);
  };
  const handleMultiCodingValue2 = (e: any, props: any) => {
    e.stopPropagation();
    e.preventDefault();

    let newLangProf = languagesProf.filter(
      (item: any) => item.name !== props.data.value
    );
    setLanguagesProf(newLangProf);
  };

  const CustomMultiValueRemove1 = (props: any) => {
    return (
      <div onClick={(e) => handleMultiCodingValue1(e, props)}>
        <components.MultiValueRemove {...props} />
      </div>
    );
  };

  const CustomMultiValueRemove2 = (props: any) => {
    return (
      <div onClick={(e) => handleMultiCodingValue2(e, props)}>
        <components.MultiValueRemove {...props} />
      </div>
    );
  };
  console.log(codeProf, 'skillset');

  // const areYouCoder = useWatch({
  //   control,
  //   name: 'areYouCoder',
  // });
  // console.log(languages, 'languages');

  return (
    <div className={cn('gap-x-5 gap-y-1 md:gap-y-1', className)}>
      <div className="mb-4 grid gap-4">
        <label className="dark:text-white-mb-3 text-sm font-medium text-gray-900">
          <div className="flex items-center justify-start gap-2">
            <p className="rizzui-textarea-label mb- block text-base">
              Please select if you are proficient in any programming languages
            </p>
          </div>
        </label>
        <Controller
          control={control}
          name="codelanguages"
          render={({ field }) => {
            setCodingLanguages(field.value);
            return (
              <AutoSelect
                className="col-span-full md:col-span-1"
                placeholder="Select"
                options={CODELAGNGUAGES}
                isClearable={false}
                isSearchable={false}
                isMulti={true}
                {...field}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 3,
                  outline: 'none',
                  colors: {
                    ...theme.colors,
                    primary25: '#f1f1f1',
                    primary: 'black',
                  },
                })}
                onFocus={() => {
                  mixpanel.track('programming_languages', {
                    soul_id: UserDetail.soul_id,
                    subcategory: 'step-3',
                    category: 'application_form',
                    type: 'click',
                  });
                }}
                styles={colourStyles}
                components={{ MultiValueRemove: CustomMultiValueRemove1 }}
              />
            );
          }}
        />
      </div>
      <div className="col-span-2 mb-8">
        {codingLanguages?.length > 0 ? (
          <label className="dark:text-white-mb-3 flex w-full border-b border-gray-300 text-sm font-medium text-gray-900">
            <div className="flex items-center justify-start gap-2">
              <p className="rizzui-textarea-label mb- text-small block py-4">
                Select your proficiency <span className="text-red">*</span>
              </p>
            </div>
          </label>
        ) : null}
        {codingLanguages?.map((opt: any, index) => {
          return (
            <div
              key={`generalopt-${index}`}
              className="flex items-center justify-between border-b border-gray-300 py-3 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.label}
              </Text>
              <ButtonGroup
                onChange={(option) => {
                  //const Skills: any = { name: opt.value, prof: option };
                  // console.log(Skills, 'Skills');
                  const skillProf = { name: opt.value, proficiency: option };
                  //setCodeProf((prev: any) => [...prev, skillProf]);
                  handleSkillsProf(skillProf);
                  console.log('skillProf');
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="grid gap-4">
        <label className="dark:text-white-mb-3 text-sm font-medium text-gray-900">
          <div className="flex items-center justify-start gap-2">
            <p className="rizzui-textarea-label mb- block text-base">
              Please select if you are proficient in any Indian languages
            </p>
          </div>
        </label>
        <Controller
          control={control}
          name="indianlanguages"
          render={({ field }) => {
            setLanguages(field.value);
            return (
              <AutoSelect
                className="col-span-full md:col-span-1"
                placeholder="Select"
                options={LANGUAGES}
                isClearable={false}
                isMulti={true}
                isSearchable={true}
                {...field}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 3,
                  outline: 'none',
                  colors: {
                    ...theme.colors,
                    primary25: '#f1f1f1',
                    primary: 'black',
                  },
                })}
                onFocus={() => {
                  mixpanel.track('indian_languages', {
                    soul_id: UserDetail.soul_id,
                    subcategory: 'step-3',
                    category: 'application_form',
                    type: 'click',
                  });
                }}
                styles={colourStyles}
                components={{ MultiValueRemove: CustomMultiValueRemove2 }}
              />
            );
          }}
        />
      </div>
      <div className="col-span-2 mb-8">
        {languages.length > 0 ? (
          <label className="dark:text-white-mb-3 flex w-full border-b border-gray-300 text-sm font-medium text-gray-900">
            <div className="flex items-center justify-start gap-2">
              <p className="rizzui-textarea-label mb- text-small block py-4">
                Choose your Language proficiency{' '}
                <span className="text-red">*</span>
              </p>
            </div>
          </label>
        ) : null}
        {languages?.map((opt: any, index) => (
          <div
            key={`generalopt-${index}`}
            className="flex items-center justify-between border-b border-gray-300 py-3 last:border-none last:pb-0"
          >
            <Text className="text-sm font-medium text-gray-900">
              {opt.label}
            </Text>
            <ButtonGroup
              onChange={(option) => {
                //const Skills: any = { name: opt.value, prof: option };
                // console.log(Skills, 'Skills');
                const languageProf = { name: opt.value, proficiency: option };
                //setCodeProf((prev: any) => [...prev, skillProf]);
                handleLnagProf(languageProf);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const options = ['Basic', 'Intermediate', 'Expert'];

function ButtonGroup({ onChange }: { onChange: (option: string) => void }) {
  const [selected, setSelected] = useState<string>();
  function handleOnClick(option: string) {
    setSelected(option);
    onChange && onChange(option);
  }

  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? 'solid' : 'outline'}
          onClick={() => handleOnClick(option)}
          size="sm"
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
