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
import { useModal } from '@/app/shared/modal-views/use-modal';
import { GoOrganization } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { PiPlusBold, PiFolderBold, PiXBold } from 'react-icons/pi';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';

// export default function PersonalExperience() {
//   const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
//     toast.success(<Text as="b">Successfully added!</Text>);
//     console.log('Profile settings data ->', {
//       ...data,
//     });
//   };

const CreateExperience = dynamic(
  () => import('@/app/shared/account-settings/experience-modal'),
  {
    ssr: false,
  }
);

export default function ShortListed() {
  const { openModal } = useModal();
  return (
    <>
      <div className="flex w-full items-end justify-end pt-5">
        {' '}
        <Button
          className="text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm"
          onClick={() =>
            openModal({
              view: <CreateExperience />,
              customSize: '720px',
            })
          }
          color="primary"
        >
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Add Experience
        </Button>
      </div>
      <div className="grid gap-7 @2xl:gap-9 @3xl:gap-11">
        <FormGroup title="" description="" className="@3xl:grid-cols-12" />
        <div className="w-full">
          <div className="experience_card">
            <div className="">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
                <div className="flex w-full items-start">
                  <div className="shrink-0">
                    <span
                      className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                      style={{ backgroundColor: '#A47BC3 ' }}
                    >
                      <GoOrganization className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row ps-4">
                      <h5
                        // as="strong"
                        className="font-lexend text-gray-700"
                      >
                        UI/Frontend Engineer - 3
                      </h5>
                    </div>
                    <div className="flex flex-row ps-4">
                      <Text as="span" className="font-lexend text-gray-500">
                        Cashfree Payments · Full-time
                      </Text>
                    </div>
                    <div className="flex flex-row ps-4 pt-2">
                      <Text
                        as="span"
                        className="font-lexend text-xs text-gray-600"
                      >
                        December 2014 - January 2016
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="w-0/4 flex cursor-pointer gap-4 text-end hover:text-primary">
                  <Button color="primary">
                    {' '}
                    <FaPencil className="h-4 w-4" />
                  </Button>
                  <Button color="primary">
                    {' '}
                    <FaTrashAlt className=" h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="experience_card">
            <div className="">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7">
                <div className="flex w-full items-start">
                  <div className="shrink-0">
                    <span
                      className="flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                      style={{ backgroundColor: '#A47BC3 ' }}
                    >
                      <GoOrganization className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row ps-4">
                      <h5
                        // as="strong"
                        className="font-lexend text-gray-700"
                      >
                        UI/Frontend Engineer - 3
                      </h5>
                    </div>
                    <div className="flex flex-row ps-4">
                      <Text as="span" className="font-lexend text-gray-500">
                        Cashfree Payments · Full-time
                      </Text>
                    </div>
                    <div className="flex flex-row ps-4 pt-2">
                      <Text
                        as="span"
                        className="font-lexend text-xs text-gray-600"
                      >
                        December 2014 - January 2016
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="w-0/4 flex cursor-pointer gap-4 text-end hover:text-primary">
                  <Button color="primary">
                    {' '}
                    <FaPencil className="me-1.5 h-4 w-4" />
                  </Button>
                  <Button color="primary">
                    {' '}
                    <FaTrashAlt className="me-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
