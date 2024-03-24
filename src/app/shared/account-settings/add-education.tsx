'use client';

import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useFieldArray, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionIcon } from '@/components/ui/action-icon';
import { calculateTotalPrice } from '@/utils/calculate-total-price';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { FileInput } from 'rizzui';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { Tooltip } from 'rizzui';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { UNIVERSITY } from '@/config/constants';
import { MAJOROPTIONS } from '@/config/constants';
import { EDULEVEL } from '@/config/constants';
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
// quantity component for invoice
function QuantityInput({
  name,
  error,
  onChange,
  defaultValue,
}: {
  name?: string;
  error?: string;
  onChange?: (value: number) => void;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue ?? 1);

  function handleIncrement() {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleDecrement() {
    let newValue = value > 1 ? value - 1 : 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleOnChange(inputValue: number) {
    setValue(Number(inputValue));
    onChange && onChange(inputValue);
  }

  useEffect(() => {
    setValue(defaultValue ?? 1);
    onChange && onChange(defaultValue ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      label="Quantity"
      type="number"
      min={1}
      name={name}
      value={value}
      placeholder="1"
      onChange={(e) => handleOnChange(Number(e.target.value))}
      suffix={
        <>
          <ActionIcon
            title="Decrement"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleDecrement()}
          >
            <PiMinusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
          <ActionIcon
            title="Increment"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleIncrement()}
          >
            <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
        </>
      }
      suffixClassName="flex gap-1 items-center -me-2"
      error={error}
    />
  );
}

function FormBlockWrapper({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>) {
  return (
    <section className={cn('@5xl:grid @5xl:grid-cols-6', className)}>
      <header className="col-span-2 mb-6 @5xl:mb-0">
        <Title as="h5" className="font-semibold">
          {title}
        </Title>
        {description ? (
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        ) : null}
      </header>
      <div className="col-span-4 grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
        {children}
      </div>
    </section>
  );
}

// multiple invoice items generate component
export function AddEducation({ watch, register, control, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const [isLoading, setLoading] = useState(false);
  const [uploadMarksheet, setUploadMarksheet] = useState<any>(null);
  const [selectedMarksheet, setSelectedMarksheet] = useState<any>('');
  const [marksheetName, setMarksheetName] = useState('');
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  const [cookies, setCookie] = useCookies(['token']);

  const shippingCost = watch('shipping') as number;
  const discount = watch('discount') as number;
  const taxes = watch('taxes') as number;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setUploadMarksheet(file);
    setSelectedMarksheet(event.target.value);
  };
  const handleUpload = async () => {
    // Perform additional actions, such as uploading the file to a server.
    // Here, we are logging the selected file to the console.
    console.log('Selected File:', uploadMarksheet);
    setLoading(true);
    const formData = new FormData();

    formData.append('doc', uploadMarksheet);
    formData.append('name', uploadMarksheet?.name);
    formData.append('type', 'MARKSHEET');
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
        setMarksheetName(uploadMarksheet.name);
        setLoading(false);
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
  const major = watch('major');
  const universityNameWatch = watch('universityName');
  return (
    // <FormBlockWrapper
    //   title={'Education Details:'}
    //   description={'Add one or multiple Education'}
    //   className="pt-7 @2xl:pt-9 @3xl:pt-11"
    // >

    // </FormBlockWrapper>
    <>
      <div className="@5xl:grid @5xl:grid-cols-6">
        <header className="col-span-2 my-6 @5xl:mb-0">
          <Title as="h5" className="font-semibold">
            Education Info:
          </Title>
          <Text className="mt-1 text-sm text-gray-500">
            Add or remove more than one education here.
          </Text>
        </header>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex w-full flex-col items-end justify-end @4xl:flex-row @4xl:py-6">
          <Button
            onClick={() =>
              append({ item: '', description: '', quantity: 1, price: '' })
            }
            color="primary"
            className="my-5 @4xl:mb-0 @4xl:mt-0 @4xl:w-auto"
          >
            <PiPlusBold className="me-1.5 h-4 w-4" /> Add Education
          </Button>
        </div>
        <div className="col-span-2 @container">
          {fields.map((field: any, index) => {
            const priceValue = watch(
              `items.${index}.price`,
              field.price ?? 0
            ) as number;

            const quantityValue = watch(
              `items.${index}.quantity`,
              field.quantity ?? 1
            ) as number;

            return (
              <div
                key={field.id}
                className="mb-8 grid grid-cols-1 items-start rounded-lg border border-gray-200 p-4 shadow @md:p-5 @xl:p-6"
              >
                <div className="grid w-full grid-cols-1  items-start  gap-3 @md:grid-cols-3 @lg:grid-cols-2 @lg:gap-4  @xl:grid-cols-2 @2xl:gap-5 @4xl:grid-cols-2">
                  <div className="grid gap-4">
                    <label className="dark:text-white-mb-3  -mb-3 text-sm font-medium text-gray-900 md:-mb-4">
                      <div className="flex items-center justify-start gap-2 pb-2">
                        <p>
                          Education Level <span className="text-red">*</span>
                        </p>
                        <Tooltip
                          content={() => (
                            <p className="text-xs">
                              Please select the option that fits your education
                              the closest.
                              <br />
                              CAs please select Masters pursuing/completed as
                              the case may be
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
                          isSearchable={false}
                          styles={colourStyles}
                        />
                      )}
                    />
                  </div>
                  <div className="grid gap-4">
                    <label className="dark:text-white-mb-3  -mb-2 text-sm font-medium text-gray-900 md:-mb-2">
                      <div className="flex items-center justify-start gap-2">
                        <p>
                          University Name <span className="text-red">*</span>
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
                  </div>
                  {universityNameWatch?.value === 'other' && (
                    <div className="grid gap-4">
                      <Input
                        type="text"
                        label={
                          <p>
                            Enter your university name{' '}
                            <span className="text-red">*</span>
                          </p>
                        }
                        placeholder="Enter your university name"
                        className="col-span-full"
                        {...register('otheruniversityName')}
                        // @ts-ignore
                        error={errors?.otheruniversityName?.message as string}
                        required
                      />
                    </div>
                  )}
                  <div className="grid gap-4">
                    <label className="dark:text-white-mb-3  -mb-2 text-sm font-medium text-gray-900 md:-mb-2">
                      <div className="flex items-center justify-start gap-2">
                        <p>
                          Core field of study ?{' '}
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
                          isSearchable={true}
                          styles={colourStyles}
                        />
                      )}
                    />
                  </div>
                  {major?.value === 'Others' && (
                    <div className="grid gap-4">
                      <Input
                        type="text"
                        label={
                          <p>
                            Enter your major <span className="text-red">*</span>
                          </p>
                        }
                        placeholder="Enter here"
                        className="col-span-full"
                        {...register('otherMajor')}
                        // @ts-ignore
                        error={errors?.otherMajor?.message as string}
                        required
                      />
                    </div>
                  )}
                  <div className="grid gap-4">
                    <div className="col-span-full @xl:col-span-full @2xl:col-span-full">
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
                                  Cumulative GPA{' '}
                                  <span className="text-red">*</span>
                                </p>
                                <Tooltip
                                  content={() => (
                                    <p className="text-xs">
                                      Please consider the cumulative GPA till
                                      date - adjust to a
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
                  </div>
                </div>
                <div className="w-full py-4">
                  <div className="items-end justify-start gap-2 rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow  @xs:grid @sm:grid @md:flex @lg:flex @5xl:px-7">
                    <FileInput
                      value={selectedMarksheet}
                      color="primary"
                      label={
                        <p>
                          Upload Your Degree/Marksheet (Max file size &#60; 5Mb)
                        </p>
                      }
                      onChange={handleFileChange}
                      clearable={!!selectedMarksheet}
                      className="col-span-2"
                      onClear={() => {
                        setSelectedMarksheet('');
                        setUploadMarksheet(null);
                      }}
                      accept=".pdf,.png,.jpg"
                      disabled={
                        UserDetail.marksheetStatus?.length > 0 ? true : false
                      }
                    />
                    <Button
                      className={`${
                        UserDetail.marksheetStatus?.length > 0
                          ? 'col-span-2 ml-2 w-full gap-2 sm:w-auto'
                          : 'souai-button col-span-2 ml-2 w-full gap-2 sm:w-auto'
                      }`}
                      isLoading={isLoading}
                      onClick={() => {
                        handleUpload();
                      }}
                      disabled={
                        UserDetail.marksheetStatus?.length > 0 ? true : false
                      }
                    >
                      <PiUploadSimpleBold /> Upload
                    </Button>
                  </div>
                  {marksheetName.length > 0 ? (
                    <p className="pt-2 text-xs">{`Uploaded Marksheet - ${marksheetName} `}</p>
                  ) : (
                    ''
                  )}
                  {UserDetail.marksheetStatus?.length > 0 ? (
                    <p className="pt-3 text-xs">
                      Your Marksheet is already uploaded and its under Review.
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => remove(index)}
                  className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
                >
                  <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
