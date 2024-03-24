'use client';
import { useEffect, useState } from 'react';
import { Text } from '@/components/ui/text';
import { useCookies } from 'react-cookie';
import { FileInput } from 'rizzui';
import { useAtom } from 'jotai';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { Badge } from 'rizzui';
import { AiFillProject } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { API_URL } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { MdDangerous } from 'react-icons/md';
import { PiUploadSimpleBold, PiPlusBold } from 'react-icons/pi';
import { IoIosWarning } from 'react-icons/io';
import Link from 'next/link';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import mixpanel from 'mixpanel-browser';
import { MIXPANEL_ID } from '@/config/constants';
import { SiTestcafe } from 'react-icons/si';
import { FaCheckCircle } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import TestFaq from '@/app/shared/Faqs/test-faq';
import VerifyFaq from '@/app/shared/Faqs/verify-faq';
import Projects from '@/app/shared/projects/projects-data';

export default function ShortListed() {
  const [cookies, setCookie] = useCookies(['token']);
  const [isLoading, setLoading] = useState(false);
  const [uploadMarksheet, setUploadMarksheet] = useState<any>(null);
  const [selectedMarksheet, setSelectedMarksheet] = useState<any>('');
  const [marksheetName, setMarksheetName] = useState('');
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  const [kycStatus, setKycStatus] = useState<any>();
  const [kycURl, setKycURl] = useState('');
  const { openModal } = useModal();

  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    // track_pageview: true,
    // persistence: 'localStorage',
  });

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

  useEffect(() => {
    if (cookies.token) {
      getKycURL();
      getKycStatus();
      console.log('kycStatus', kycStatus);
      mixpanel.track_pageview({
        subcategory: 'home',
        soul_id: UserDetail.soul_id,
        category: 'post_login_home',
        type: 'page_view',
      });
    }
  }, [cookies.token]);

  const getKycStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/kyc/status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      const json: any = await response.json();
      setKycStatus(json);
    } catch (error) {
      console.log('error', error);
      toast.error(<Text>There was an error</Text>);
    }
  };

  const getKycURL = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/kyc/link`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.status == 200) {
        const json: any = await response.json();
        setKycURl(json.link);
      } else {
        toast.error(
          <Text>
            There was an error in processing your KYC request. Please try again
            later .{' '}
          </Text>
        );
      }
    } catch (error) {
      console.log('error', error);
      toast.error(
        <Text>
          There was an error in processing your KYC request. Please try again
          later .{' '}
        </Text>
      );
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setUploadMarksheet(file);
    setSelectedMarksheet(event.target.value);
  };

  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1080px]">
        <div className="w-full">
          <h3 className="font-lexend text-left text-gray-700 xs:text-sm md:text-lg lg:text-lg">
            Welcome{' '}
            <span className="text-primary">
              {UserDetail.name ? UserDetail.name : 'User'}!
            </span>
          </h3>
          <div className="py-4">
            {/* <div className="flex flex-col items-center justify-start rounded-lg border border-gray-100 px-5 py-5 text-left font-medium shadow-sm transition-shadow @5xl:px-7"></div> */}
            <div className="flex flex-col items-center justify-between rounded-lg border border-gray-100 px-5 py-3 font-medium shadow-sm transition-shadow @5xl:px-7">
              <div className="border-bottom flex w-full items-center justify-between border-gray-200 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
                <div className="flex items-center justify-start gap-2 xs:w-full sm:w-full  ">
                  <div className="shrink-0">
                    <span
                      className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                      style={{ backgroundColor: '#A47BC3 ' }}
                    >
                      <AiFillProject className="h-auto w-[30px]" />
                    </span>
                  </div>
                  <Text
                    as="span"
                    className="font-lexend flex items-center  gap-1 text-left text-gray-700"
                  >
                    <span className="pr-2">
                      Your Current Project:
                      <Badge size="sm" color="warning" className="ml-2">
                        Functionality coming soon
                      </Badge>
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 pb-0">
            <div className="border-bottom flex w-full items-center justify-between border-b-2 border-dashed border-gray-200 pb-3">
              <h3 className="font-lexend text-left text-gray-700 xs:text-sm md:text-lg lg:text-lg">
                Live Projects
              </h3>
            </div>
          </div>
          <div className="py-4">
            <Projects className="mb-6 @5xl:mb-8 @7xl:mb-11" />
          </div>
          <div className="border-bottom flex w-full items-center justify-between border-b-2 border-dashed border-gray-200 pb-3">
            <h3 className="font-lexend text-left text-gray-700 xs:text-sm md:text-lg lg:text-lg">
              Here's your to-do list. Complete these tasks quickly to get
              started with your projects.
            </h3>
          </div>

          <div className="py-4">
            {/* <div className="flex flex-col items-center justify-start rounded-lg border border-gray-100 px-5 py-5 text-left font-medium shadow-sm transition-shadow @5xl:px-7"></div> */}
            <div className="flex flex-col items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
              <div className="border-bottom flex w-full items-center justify-between border-b-2 border-dashed border-gray-200 pb-3 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
                <div className="flex items-center justify-start gap-2 xs:w-full sm:w-full  ">
                  <div className="shrink-0">
                    <span
                      className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                      style={{ backgroundColor: '#A47BC3 ' }}
                    >
                      <SiTestcafe className="h-auto w-[30px]" />
                    </span>
                  </div>
                  <Text
                    as="span"
                    className="font-lexend flex items-center  gap-1 text-left text-gray-700"
                  >
                    <span className="pr-2">
                      Attempt the English Proficiency test to become eligible
                      for the projects.{' '}
                    </span>
                    <FaInfoCircle
                      className="min-h-[18px] min-w-[18px]  cursor-pointer text-amber-500"
                      onClick={() =>
                        openModal({
                          view: <TestFaq />,
                          customSize: '720px',
                        })
                      }
                    />
                  </Text>
                </div>
                <div className="cursor-pointer text-end hover:text-primary xs:w-full xs:pt-3 sm:pt-0 md:pt-0 lg:pt-0">
                  <Button
                    className="souai-button l col-span-2 ml-2 w-full gap-2 sm:w-auto"
                    onClick={() => {
                      mixpanel.track('start_test', {
                        soul_id: UserDetail.soul_id,
                        subcategory: 'english_test',
                        category: 'post_login_home',
                        type: 'redirect',
                      });
                    }}
                  >
                    <Link
                      href="https://app.testgorilla.com/s/346gw75f"
                      target="_new"
                    >
                      Start Here
                    </Link>{' '}
                    <MdArrowOutward />
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-start">
                <Text
                  as="strong"
                  className="font-lexend mt-2 w-full py-2 pb-0 text-left text-xs text-gray-600"
                >
                  Instructions:
                </Text>
                <ul className="font-lexend text-left text-xs text-gray-600">
                  <li className="font-lexend pb-1 text-gray-700">
                    •⁠ The test is to be taken in{' '}
                    <strong>full-screen mode only</strong>. Any attempt made to
                    exit the full-screen mode will be recorded and the
                    submission will be flagged.
                  </li>
                  <li className="font-lexend pb-1 text-gray-700">
                    •⁠ ⁠To take the test use the <strong>same email</strong>{' '}
                    that you have used on our platform.
                  </li>
                  <li className="font-lexend text-gray-700">
                    •⁠ Once you have completed your test, no need to take the
                    test again, <strong>your result has been captured.</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="flex flex-row items-end justify-between gap-2 rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7 xs:flex-col xs:justify-center sm:flex-row sm:justify-center md:flex-row md:justify-between">
              <FileInput
                value={selectedMarksheet}
                color="primary"
                label={
                  <div>
                    <p>
                      Upload supporting proof for your highest level of
                      education (degree certificate/marksheet) (Max file size
                      &#60; 5MB)
                    </p>
                    <p className="mb-4 mt-1 text-xs text-gray-500">
                      Please ensure that your name, university and department
                      are clearly visible.
                    </p>
                  </div>
                }
                onChange={handleFileChange}
                clearable={!!selectedMarksheet}
                className="col-span-2 xs:w-full sm:w-auto"
                labelClassName="text-left"
                inputClassName={
                  kycStatus?.marksheet === 'IN_REVIEW' ||
                  kycStatus?.marksheet === 'VERIFIED'
                    ? '[&>input::file-selector-button]:bg-[#929292] [&>input::file-selector-button]:text-[#222] bg-[#E3E3E3] text-[#929292]'
                    : ''
                }
                onClear={() => {
                  setSelectedMarksheet('');
                  setUploadMarksheet(null);
                }}
                accept=".pdf,.png,.jpg"
                disabled={
                  kycStatus?.marksheet === 'IN_REVIEW' ||
                  kycStatus?.marksheet === 'VERIFIED'
                    ? true
                    : false
                }
                onClick={() => {
                  mixpanel.track('upload_here', {
                    soul_id: UserDetail.soul_id,
                    subcategory: 'verify_education',
                    category: 'post_login_home',
                    type: 'api_call',
                  });
                }}
              />
              <Button
                className={`${
                  kycStatus?.marksheet === 'IN_REVIEW' ||
                  kycStatus?.marksheet === 'VERIFIED'
                    ? 'col-span-2 ml-2 w-full gap-2 sm:w-auto'
                    : 'souai-button col-span-2 ml-2 w-full gap-2 sm:w-auto'
                }`}
                isLoading={isLoading}
                onClick={() => {
                  handleUpload();
                  mixpanel.track('upload_marksheet', {
                    soul_id: UserDetail.soul_id,
                    subcategory: 'onboarding',
                    category: 'post_login',
                    type: 'api_call',
                  });
                }}
                disabled={
                  kycStatus?.marksheet === 'IN_REVIEW' ||
                  kycStatus?.marksheet === 'VERIFIED'
                    ? true
                    : false
                }
              >
                Upload Here <PiUploadSimpleBold />
              </Button>
            </div>
            <div className="-z-2 relative -mt-2 flex items-center justify-between rounded-lg border border-t-0 border-dashed border-gray-200 px-5 py-1 pt-5 font-medium @5xl:px-7">
              <div className="flex gap-2 ">
                {marksheetName.length > 0 ? (
                  <Text
                    as="span"
                    className="font-lexend flex gap-2 pb-2 text-xs"
                  >
                    <strong>Uploaded Marksheet :</strong>

                    {`Uploaded Marksheet - ${marksheetName} `}
                  </Text>
                ) : (
                  ''
                )}
                {/* {UserDetail.marksheetStatus?.length > 0 ? (
                  <p className="pt-3 text-xs">
                    <Text
                      as="span"
                      className="font-lexend flex gap-2 pb-2 text-xs"
                    >
                      <strong>Status :</strong>
                      <FaCheckCircle className="h-4 w-4 text-green" />
                      {`${marksheetName} `}
                    </Text>{' '}
                  </p>
                ) : (
                  ''
                )} */}
                <Text as="span" className="font-lexend flex gap-1 pb-2 text-xs">
                  <strong>Education proof status:</strong>
                  {kycStatus?.marksheet === 'VERIFIED' ? (
                    <>
                      <FaCheckCircle className="h-4 w-4 text-green" />
                      Verified
                    </>
                  ) : kycStatus?.marksheet === 'PARTIALLY_VERIFIED' ||
                    kycStatus?.marksheet === 'REJECTED' ? (
                    <>
                      <MdDangerous className="h-4 w-4 text-red" />
                      Verification failed
                    </>
                  ) : kycStatus?.marksheet === 'IN_REVIEW' ? (
                    <>
                      <MdAccessTimeFilled className="h-4 w-4 text-primary" />
                      Submitted
                    </>
                  ) : (
                    <>
                      <PiUploadSimpleBold className="h-4 w-4 text-red" />
                      Upload Pending
                    </>
                  )}
                </Text>{' '}
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="items-normal flex justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
              <div className="flex w-3/4 items-center xs:w-full ">
                <div className="shrink-0">
                  <span
                    className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                    style={{ backgroundColor: '#A47BC3 ' }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 256 256"
                      className="h-auto w-[30px]"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z"></path>
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col ps-4">
                  <Text
                    as="span"
                    className="font-lexend flex gap-2 text-gray-700"
                  >
                    Verify your PAN
                    <FaInfoCircle
                      className="min-h-[18px] min-w-[18px] cursor-pointer text-amber-500"
                      onClick={() =>
                        openModal({
                          view: <VerifyFaq />,
                          customSize: '720px',
                        })
                      }
                    />
                  </Text>
                </div>
              </div>

              <div className="w-1/4 cursor-pointer text-end hover:text-primary xs:w-full xs:pt-3 sm:pt-0 md:pt-0 lg:pt-0">
                {kycStatus?.pan === 'SUCCESS' &&
                // kycStatus?.aadhaar === 'SUCCESS' &&
                kycStatus?.bank_account === 'SUCCESS' ? (
                  ''
                ) : (
                  <Button
                    className="souai-button col-span-2 ml-2 w-full sm:w-auto"
                    onClick={
                      kycURl.length > 0
                        ? () => {}
                        : () => {
                            toast.error(
                              <Text>
                                There was an error in processing your KYC
                                request. Please try again later .{' '}
                              </Text>
                            );
                          }
                    }
                    onFocus={() => {
                      mixpanel.track('click_here', {
                        soul_id: UserDetail.soul_id,
                        subcategory: 'verify_pan',
                        category: 'post_login_home',
                        type: 'redirect',
                      });
                    }}
                  >
                    <Link
                      href={kycURl}
                      target={kycURl.length > 0 ? '_blank' : ''}
                    >
                      Click Here
                    </Link>
                    <MdArrowOutward />
                  </Button>
                )}
              </div>
            </div>
            <div className="-z-2 relative -mt-2 flex flex-wrap items-start justify-start gap-2 rounded-lg border border-t-0 border-dashed border-gray-200 px-5 py-1 pt-5 text-left font-medium @5xl:px-7  md:flex-row">
              <Text as="span" className="font-lexend flex gap-1 pb-2 text-xs">
                <strong>PAN:</strong>
                {kycStatus?.pan === 'SUCCESS' ? (
                  <FaCheckCircle className="h-4 w-4 text-green" />
                ) : kycStatus?.pan === 'FAILURE' ? (
                  <MdDangerous className="h-4 w-4 text-red" />
                ) : kycStatus?.pan === 'RECEIVED' ? (
                  <IoIosWarning className="h-4 w-4 text-amber-500" />
                ) : (
                  <MdAccessTimeFilled className="h-4 w-4 text-primary" />
                )}
                {kycStatus?.pan === 'SUCCESS'
                  ? 'SUBMITTED'
                  : kycStatus?.pan === 'FAILURE'
                  ? 'SUBMITTED'
                  : kycStatus?.pan === 'RECEIVED'
                  ? 'SUBMISSION PENDING'
                  : 'SUBMISSION PENDING'}{' '}
              </Text>
              {/* <Text as="span" className="font-lexend flex gap-1 pb-2 text-xs">
                <strong>Aadhaar :</strong>
                {kycStatus?.aadhaar === 'SUCCESS' ? (
                  <FaCheckCircle className="h-4 w-4 text-green" />
                ) : kycStatus?.aadhaar === 'FAILURE' ? (
                  <MdDangerous className="h-4 w-4 text-red" />
                ) : kycStatus?.aadhaar === 'RECEIVED' ? (
                  <IoIosWarning className="h-4 w-4 text-amber-500" />
                ) : (
                  <MdAccessTimeFilled className="h-4 w-4 text-primary" />
                )}
                {kycStatus?.aadhaar === 'SUCCESS'
                  ? 'SUBMITTED'
                  : kycStatus?.aadhaar === 'FAILURE'
                  ? 'SUBMITTED'
                  : kycStatus?.aadhaar === 'RECEIVED'
                  ? 'SUBMISSION PENDING'
                  : 'SUBMISSION PENDING'}
              </Text> */}
              {/* <Text as="span" className="font-lexend flex gap-1 pb-2 text-xs">
                <strong> Bank Account :</strong>
                {kycStatus?.bank_account === 'SUCCESS' ? (
                  <FaCheckCircle className="h-4 w-4 text-green" />
                ) : kycStatus?.bank_account === 'FAILURE' ? (
                  <MdDangerous className="h-4 w-4 text-red" />
                ) : kycStatus?.bank_account === 'RECEIVED' ? (
                  <IoIosWarning className="h-4 w-4 text-amber-500" />
                ) : (
                  <MdAccessTimeFilled className="h-4 w-4 text-primary" />
                )}
                {kycStatus?.bank_account === 'RECEIVED'
                  ? 'SUBMISSION PENDING'
                  : `${kycStatus?.bank_account}`}
              </Text> */}
            </div>
            {/* <div className="flex w-full items-center pt-5 text-center">
              <IoIosWarning className="h-6 w-6 text-primary" />
              <p className="text-xs">
                verification link will expire in 2 days.
              </p>
            </div> */}
          </div>

          {/* <div className="py-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
              <div className="flex w-3/4 items-center">
                <div className="shrink-0">
                  <span
                    className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                    style={{ backgroundColor: '#A47BC3 ' }}
                  >
                    <FaFileSignature className="h-auto w-[30px]" />
                  </span>
                </div>
                <div className="flex flex-row ps-4">
                  <Text as="span" className="font-lexend text-gray-700">
                    Sign Contract
                  </Text>
                </div>
              </div>

              <div className="w-1/4 cursor-pointer text-end hover:text-primary">
                Click here
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
