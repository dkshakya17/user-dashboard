'use client ';
import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Textarea } from '@/components/ui/textarea';
import { useCookies } from 'react-cookie';
import mixpanel from 'mixpanel-browser';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
interface subQnaProps {
  className?: string;
}

export const subjectiveSchema = z.object({
  qna1: z.string().min(1, { message: 'This answer is required' }),
  qna2: z.string().min(1, { message: 'This answer is required' }),
});

// export const SubjectiveQnaValues = {
//   qna1: '',
//   qna2: '',
// };

export default function SubjectiveQna({ className }: subQnaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [cookies, setCookie] = useCookies(['token', 'userStatus', 'source']);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  return (
    <div className={cn('grid gap-x-5 gap-y-1 md:gap-y-1', className)}>
      <Textarea
        variant="active"
        size="xl"
        maxLength={1000}
        label={
          <p>
            What is your favourite subject and why?{' '}
            <span className="text-red">*</span>
          </p>
        }
        placeholder="Share your thoughts (at least 30 words)"
        className="w-full resize-none pb-2"
        // renderCharacterCount={({ characterCount, maxLength }) => (
        //   <div className="text-right text-sm opacity-70 rtl:text-left">
        //     {characterCount}/{maxLength}
        //   </div>
        // )}
        onClick={() => {
          mixpanel.track('favourite_subject', {
            soul_id: UserDetail.soul_id,
            subcategory: 'step-3',
            category: 'application_form',
            type: 'click',
          });
        }}
        {...register('qna1')}
        textareaClassName="resize-none py-3 px-3 text-sm h-[190px]"
        error={errors?.qna1?.message as string}
        // disabled={cookies.source === 'ADMIN' ? true : false}
      />
      <Textarea
        variant="active"
        size="xl"
        maxLength={1000}
        label={
          <p>
            Please write about any past internships, projects or experiments in
            your core field of study. Please share details / links / samples
            here if you have any writing experience (e.g. journalism / blogging
            / authoring / campus newsletters){' '}
            <span className="text-red">*</span>
          </p>
        }
        onClick={() => {
          mixpanel.track('past_experience', {
            soul_id: UserDetail.soul_id,
            subcategory: 'step-3',
            category: 'application_form',
            type: 'click',
          });
        }}
        placeholder="Share your thoughts (at least 30 words)"
        className="w-full resize-none py-4"
        // renderCharacterCount={({ characterCount, maxLength }) => (
        //   <div className="text-right text-sm opacity-70 rtl:text-left">
        //     {characterCount}/{maxLength}
        //   </div>
        // )}
        {...register('qna2')}
        textareaClassName="resize-none py-3 px-3 text-sm h-[190px]"
        error={errors?.qna2?.message as string}
        // disabled={cookies.source === 'ADMIN' ? true : false}
      />
    </div>
  );
}
