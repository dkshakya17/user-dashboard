'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import { messages } from '@/config/messages';
import { PhoneNumber } from '@/components/ui/phone-input';
import Select from '@/components/ui/select';
import { Tooltip } from 'rizzui';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Title, Text } from '@/components/ui/text';
import { PinCode } from '@/components/ui/pin-code';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { PiPencilSimpleBold, PiCheckCircleFill } from 'react-icons/pi';
import { formDataAtom } from '@/app/shared/multi-step/steps';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { MdVerified } from 'react-icons/md';
import toast from 'react-hot-toast';
import { send } from 'process';
import { useCookies } from 'react-cookie';
import { useAtom } from 'jotai';
import { API_URL } from '@/config/constants';
import mixpanel from 'mixpanel-browser';
interface SendOtpResponse {
  message: string;
  ss_id: string;
}
interface FailOtpResponse {
  title: string;
  detail: string;
}
interface VerifyOtpResponse {
  message: string;
}
interface OtpVerifyProps {
  onVerificationStatus: (status: boolean) => void;
}

const hearaboutusOptions = [
  {
    value: 'through-a-friend',
    name: 'Through a friend',
  },
  {
    value: 'college',
    name: 'College',
  },
  {
    value: 'whatsApp',
    name: 'WhatsApp',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
  },
  {
    value: 'naukri/internshala',
    name: 'Naukri/internshala/Other job board',
  },
  {
    value: 'other',
    name: 'Other',
  },
];

export const otpverifyschema = z.object({
  phone: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(12, { message: 'Enter the correct number' }),
  consent: z.boolean({ required_error: 'Please accept the consent.' }),
  referalSource: z.string(),
  codeUrl: z.string().optional(),
});

export default function OtpVerify({ onVerificationStatus }: OtpVerifyProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const [changeNumber, setChangeNumber] = useState<boolean>(false);
  const [disableResendOtp, setDisableResendOtp] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);
  const [verifyingOtp, setVerifyingOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [sendOtpResponseDetails, setSendOtpResponseDetails] =
    useState<SendOtpResponse>({ message: '', ss_id: '' });
  const [cookies, setCookie] = useCookies(['token']);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [userDetails, setUserDetail] = useAtom(userDetailsAtom);

  const sendOtp = async () => {
    setDisableResendOtp(true);
    setTimeout(() => {
      setDisableResendOtp(false);
    }, 10000);
    setSendingOtp(true);
    const payload = {
      to: formData.phone,
    };
    try {
      const response = await fetch(`${API_URL}/v1/kyc/phone/otp/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(payload),
      });
      if (response.status == 200) {
        const rsp = (await response.json()) as SendOtpResponse;
        toast.success(<Text>OTP Sent</Text>);
        setSendOtpResponseDetails(rsp);
      } else {
        const errorOtp = (await response.json()) as FailOtpResponse;
        toast.error(<Text>{errorOtp.detail}</Text>);
      }
    } catch (error) {
      toast.error(
        <Text>There was an error in sending the OTP, please try again</Text>
      );
    }
    setSendingOtp(false);
  };

  const submitOtp = async () => {
    setVerifyingOtp(true);
    const payload = {
      ss_id: sendOtpResponseDetails.ss_id,
      to: formData.phone,
      otp,
    };
    try {
      const response = await fetch(`${API_URL}/v1/kyc/phone/otp/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.status == 200) {
        const rsp = (await response.json()) as VerifyOtpResponse;
        toast.success(<Text>Your Phone Number is Verified</Text>);
        setOtpVerified(true);
        onVerificationStatus(true);
        setUserDetail((prev) => {
          return { ...prev, phoneVerified: true };
        });
      } else {
        toast.error(
          <Text>There was an error in verifying the OTP, please try again</Text>
        );
      }
    } catch (error) {
      onVerificationStatus(false);
      toast.error(
        <Text>There was an error in verifying the OTP, please try again</Text>
      );
    }
    setVerifyingOtp(false);
  };

  const verifyOtpSection = (
    <>
      <div className="inline-flex w-full items-start items-center justify-start gap-2">
        <Text className=" pb-2 text-center text-[15px] text-gray-700 md:text-base md:!leading-loose lg:text-start ">
          Please verify your phone number
          {/* <span className=" text-red">*</span> */}
        </Text>
        <Tooltip
          content={() => (
            <p className="text-xs">
              In addition to email, we use Whatsapp / SMS to effectively
              <br />
              communicate to you when you have been shortlisted, actively
              <br />
              working, etc.
            </p>
          )}
          placement="top"
        >
          <span className="-mt-1">
            <BsFillInfoCircleFill color="#A47BC3" />
          </span>
        </Tooltip>
      </div>

      <PinCode
        variant="outline"
        className="-mt-4 justify-center"
        size="lg"
        type="number"
        color="info"
        setValue={(value) => {
          setOtp(String(value));
        }}
        // error={errors && 'OTP is wrong'}
      />

      <div className="">
        {changeNumber ? (
          <div className="grid items-end gap-4 md:grid-cols-2">
            <Controller
              name="phone"
              control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumber
                  label={
                    <div className="flex items-center justify-start gap-2">
                      <p>
                        Change Your Phone Number{' '}
                        <span className="text-red">*</span>
                      </p>
                      <Tooltip
                        content={() => (
                          <p className="text-xs">
                            Please input your active number
                            <br />
                            we will verify it now
                          </p>
                        )}
                        placement="top"
                        className="col-span-1"
                      >
                        <span>
                          <BsFillInfoCircleFill color="#A47BC3" />
                        </span>
                      </Tooltip>
                    </div>
                  }
                  country="in"
                  value={value}
                  onChange={(change) => {
                    setFormData((prev) => {
                      return { ...prev, phone: change };
                    });
                    return onChange(change);
                  }}
                  disableDropdown
                  countryCodeEditable={false}
                  // @ts-ignore
                  error={errors.phone?.message as string}
                />
              )}
            />
            <Button
              className="!w-[unset]"
              onClick={() => {
                setChangeNumber(false);
                sendOtp();
              }}
            >
              Send OTP
            </Button>
          </div>
        ) : (
          <Text className="pb-2 text-center  text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5 lg:text-start ">
            OTP has been sent to <span>+{formData.phone} </span>
            <PiPencilSimpleBold
              className="mb-1 inline cursor-pointer"
              onClick={() => {
                setOtp('');
                setChangeNumber(true);
              }}
            />
          </Text>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 pt-0 sm:grid-cols-2">
        {changeNumber === true ? null : (
          <>
            <Button
              variant="outline"
              className="!w-[unset]"
              onClick={() => {
                sendOtp();
                setOtp('');
                mixpanel.track('resend_otp', {
                  soul_id: userDetails.soul_id,
                  subcategory: 'step-4',
                  category: 'application_form',
                  type: 'api_call',
                });
              }}
              isLoading={sendingOtp}
              disabled={disableResendOtp}
            >
              Resend OTP
            </Button>
            <Button
              className="!w-[unset]"
              onClick={() => {
                submitOtp();
                mixpanel.track('verify_otp', {
                  soul_id: userDetails.soul_id,
                  subcategory: 'step-4',
                  category: 'application_form',
                  type: 'api_call',
                });
              }}
              isLoading={verifyingOtp}
              disabled={!sendingOtp && otp.length < 4}
            >
              Verify OTP
            </Button>
          </>
        )}
      </div>
    </>
  );

  const postOtpVerificationSection = (
    <div>
      <div className="inline-flex w-full items-start justify-center gap-2">
        <Text className="text-center text-[15px] text-gray-700 md:text-base md:!leading-loose lg:text-start ">
          <MdVerified
            className="mb-1 inline h-6 w-6 cursor-pointer"
            color="#61d345"
          />{' '}
          Your Phone Number is Already Verified
        </Text>
      </div>
    </div>
  );

  // useEffect(() => {
  //   setUserDetail((prev: any) => {
  //     return {
  //       ...prev,
  //       //  status: json.status,
  //       phoneVerified: otpVerified,
  //     };
  //   });
  // }, [otpVerified]);

  useEffect(() => {
    if (userDetails.phoneVerified) {
      setOtpVerified(true);
      onVerificationStatus(true);
    }
    if (!userDetails.phoneVerified) {
      sendOtp();
    }
  }, []);
  return (
    <>
      <div className="space-y-5 lg:space-y-7">
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 md:text-2xl"
        >
          Verification
        </Title>

        {otpVerified ? postOtpVerificationSection : verifyOtpSection}

        <Checkbox
          label={
            <div className="flex items-center justify-start gap-2 pt-3">
              <p>
                I agree to receive servicing communications from Deep Programmer
                AI in the form of emails and WhatsApp messages.{' '}
                <span className="text-red">*</span>
              </p>
              <Tooltip
                content={() => (
                  <p className="text-xs">
                    Dont worry we won't spam you! We just need this consent so
                    <br />
                    that we can effectively communicate with you in case you are
                    <br />
                    shortlisted etc.
                  </p>
                )}
                placement="bottom"
              >
                <span>
                  <BsFillInfoCircleFill color="#A47BC3" />
                </span>
              </Tooltip>
            </div>
          }
          // error={errors?.consent?.message as string}
          className="mt-3 pb-5 align-top"
          // label="Primary"
          color="primary"
          onClick={() => {
            mixpanel.track('consent', {
              soul_id: userDetails.soul_id,
              subcategory: 'step-4',
              category: 'application_form',
              type: 'click',
            });
          }}
          {...register('consent')}
        />
        <Controller
          control={control}
          name="referalSource"
          render={({ field: { value, onChange } }) => (
            <Select
              className="col-span-full pb-5 md:col-span-1"
              placeholder="select your option"
              label="Where did you hear about us?"
              labelClassName="font-medium text-gray-900 dark:text-white"
              dropdownClassName="p-2 gap-1 grid"
              onChange={onChange}
              value={value}
              onClick={() => {
                mixpanel.track('source', {
                  soul_id: userDetails.soul_id,
                  subcategory: 'step-4',
                  category: 'application_form',
                  type: 'click',
                });
              }}
              options={hearaboutusOptions}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                hearaboutusOptions?.find((p) => p.value === selected)?.name ??
                ''
              }
              // error={errors?.universityCat?.message as string}
            />
          )}
        />
        <Controller
          name="codeUrl"
          control={control}
          render={({ field }) => (
            <Input
              label="If you have a rank or score in one of these 5 coding websites (HackerRank, Codechef, Hackerearth, Topcoder, Codeforces), please share your profile URL below. This will improve your chances"
              type="url"
              inputClassName="[&_input::placeholder]:text-gray-400"
              placeholder="URL"
              className="col-span-full"
              onClick={() => {
                mixpanel.track('coding_website_url', {
                  soul_id: userDetails.soul_id,
                  subcategory: 'step-4',
                  category: 'application_form',
                  type: 'click',
                });
              }}
              {...field}
              // @ts-ignore
              error={errors?.codeUrl?.message as string}
            />
          )}
        />
      </div>
    </>
  );
}
