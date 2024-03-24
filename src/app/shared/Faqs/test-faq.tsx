'use client';

import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function TestFaq() {
  const { closeModal } = useModal();

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="px-3 text-lg">
          Test FAQs
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
      <div className="p-0">
        <ul className="flex flex-col gap-3 p-3 pt-0 text-left text-sm">
          <li>
            <b>1. Is this a compulsory test?</b> What happens if I didn't do
            well on the test? This is a basic English test, taking which is a
            prerequisite for all our projects, and will be a key factor in many
            of our English-heavy projects. But we have other projects as well
            where your performance on this test may be less relevant (e.g.
            coding/vernacular language work). To recap, everyone needs to take
            this English test but don't worry if you didn't do that well on it.
          </li>
          <li>
            <b>2. Is there any behavior that will disqualify me? </b> This is a
            timed test so take it at a time when you won't have any
            distractions. You CANNOT pause the test once it starts. Do NOT exit
            full screen mode in the test window, do NOT turn off your webcam, do
            NOT move your mouse out of the window, and do NOT take it while
            connected to multiple screens. Any of these will invalidate your
            test (and yes, you get only ONE attempt).
          </li>
          <li>
            <b>3. How long is the test and what format? </b> It will be 20-25
            mins long, and a mix of objective and subjective English questions.
            Some questions may be audio-based; please ensure that your sound
            system is functioning properly.
          </li>
          <li>
            <b>4. What device should I use? </b> We strongly recommend on a PC
            since there will be typing tasks for which you may run out of time
            on a mobile device.
          </li>
          <li>
            <b>5. What happens after I have taken the test? </b> If there is a
            match with your results and skills/profile, we may assign you to a
            live project immediately. But even if you have done well, there is a
            chance we might invite you to a live project AFTER a few weeks
            depending on supply-demand.
          </li>
          <li>
            <b>
              6. I took the test but the link to take the test is still live on
              the Deep Programmer AI portal - did you capture my result?
            </b>{' '}
            Yes your result has been captured, no need to take the test again.
          </li>
          <li>
            <b>7. Are there more tests coming?</b>⁠ Yes! We plan to roll out
            coding tests shortly.
          </li>
        </ul>
      </div>
    </div>
  );
}
