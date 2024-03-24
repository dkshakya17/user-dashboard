'use client';

import uniqueId from 'lodash/uniqueId';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { ActionIcon, Button, Input, Text, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import toast from 'react-hot-toast';
import SelectBox from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import cn from '@/utils/class-names';
import { CalendarEvent } from '@/types';
import useEventCalendar from '@/hooks/use-event-calendar';
import {
  EventFormInput,
  eventFormSchema,
} from '@/utils/validators/create-event.schema';

interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
}

const jobtype = [
  {
    name: 'Full Time',
    value: 'full-time',
  },
  {
    name: 'Contract',
    value: 'contract',
  },
  {
    name: 'Freelance',
    value: 'freelance',
  },
  {
    name: 'Internship',
    value: 'intership',
  },
];
export default function EventForm({
  startDate,
  endDate,
  event,
}: CreateEventProps) {
  const { closeModal } = useModal();
  const { createEvent, updateEvent } = useEventCalendar();

  const isUpdateEvent = event !== undefined;

  const onSubmit: SubmitHandler<EventFormInput> = (data) => {
    const isNewEvent = data.id === '' || data.id === undefined;

    console.log('event_data', data);

    toast.success(
      <Text as="b">
        Experience {isNewEvent ? 'Created' : 'Updated'} Successfully
      </Text>
    );

    if (isNewEvent) {
      createEvent({
        id: uniqueId(),
        start: data.startDate ?? startDate,
        end: data.endDate ?? endDate,
        title: data.title,
        description: data.description,
        location: data.location,
      });
    } else {
      updateEvent({
        ...data,
        start: data.startDate,
        end: data.endDate,
      });
    }
    closeModal();
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isUpdateEvent ? 'Update Experience' : 'Create a new Experience'}
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

      <Form<EventFormInput>
        validationSchema={eventFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            title: event?.title ?? '',
            description: event?.description ?? '',
            location: event?.location ?? '',
            startDate: startDate ?? event?.start,
            endDate: endDate ?? event?.end,
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({ register, control, watch, formState: { errors } }) => {
          const startDate = watch('startDate');
          const endDate = watch('endDate');
          return (
            <>
              <input type="hidden" {...register('id')} value={event?.id} />
              <Input
                label="Role"
                placeholder="Enter Your Role"
                {...register('title')}
                className="col-span-full"
                error={errors.title?.message}
              />

              <Input
                label="Company Name"
                placeholder="Enter The Company Name"
                {...register('title')}
                className="col-span-full"
                error={errors.title?.message}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectBox
                    value={value}
                    label="Job Type"
                    labelClassName="text-sm font-medium text-gray-900"
                    // @ts-ignore
                    placeholder="Select Your Job Type"
                    options={jobtype}
                    className="col-span-full"
                    onChange={onChange}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected) =>
                      jobtype?.find((con) => con.value === selected)?.name ?? ''
                    }
                  />
                )}
              />

              {/* <Input
                label="Location"
                placeholder="Enter location"
                {...register('location')}
                error={errors.location?.message}
                className="col-span-full"
              /> */}

              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    selectsStart
                    startDate={value}
                    endDate={endDate}
                    // showYearPicker
                    // minDate={new Date()}
                    // showTimeSelect
                    placeholderText="Start Date"
                    dateFormat="MMMM d, yyyy"
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    selectsEnd
                    minDate={startDate}
                    startDate={startDate}
                    endDate={value}
                    placeholderText="End Date"
                    // label="hjgj"
                    // showTimeSelect
                    dateFormat="MMMM d, yyyy"
                  />
                )}
              />
              <Textarea
                label="Description"
                placeholder="Enter Job Description"
                {...register('description')}
                error={errors.description?.message}
                textareaClassName="h-20"
                className="col-span-full"
              />
              <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="hover:gray-700 w-full hover:bg-gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white dark:hover:bg-gray-300 dark:active:enabled:bg-gray-300"
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
}
