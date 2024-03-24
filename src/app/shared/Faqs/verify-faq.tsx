'use client';

import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function VerifyFaq() {
  const { closeModal } = useModal();

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="px-3 text-lg">
          PAN Verification FAQs
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
            <b>1.⁠ Why do I need to verify my PAN?</b> We need your PAN since we
            may need to deduct TDS (tax deducted at source) depending on your
            earnings. Also PAN will be used to verify your identity so that we
            avoid issues such as identity theft, duplicate accounts, fraudulent
            actors, etc.
          </li>
          <li>
            <b>2.⁠ ⁠How safe is my data?</b> Your data will be used ONLY for ID
            verification and administrative purposes. We are fully compliant
            with Indian, European, and US privacy laws. Please review the Terms
            of Service and Privacy Policy hosted on our site.
          </li>
          <li>
            <b>
              3.⁠ Can I do PAN verification AFTER I have started work on a
              project?
            </b>{' '}
            Doing PAN verification before you start working on a project will
            streamline the process of Getting shortlisted {'>'} Being allocated
            to a Project {'>'} Getting paid.
          </li>
          <li>
            <b>
              4.⁠ I recall you were asking for Aadhaar as well earlier - why?
            </b>{' '}
            We keep updating our ID verification processes based on fraud risk
            and other considerations. If we see any spike in fraud, we may
            reintroduce Aadhaar and other forms of ID verification.
          </li>
          <li>
            <b> 5. Can you share any information about Deep Programmer AI?</b>{' '}
            We are a Delaware (USA) incorporated company operating under the
            full legal name Deep Programmer Deep Programmer, Inc. Identity
            verifications are being done by our Indian subsidiary Deep
            Programmer Technologies India Pvt Ltd. Our India entity has it's
            office in Financial District, Gachibowli, Hyderabad. We are a 2023
            incorporated startup with IIT-IIM founding team. Check out our
            website at{' '}
            <a
              href="https://www.deepprogrammer.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://www.deepprogrammer.in
            </a>
            .
          </li>
          <li>
            <b>
              6. Do I need to verify my identity at{' '}
              <a
                href="app.deepprogrammer.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                app.deepprogrammer.in
              </a>{' '}
              or at the tasking platform?
            </b>{' '}
            You need to verify your identity at both the places. At{' '}
            <a
              href="app.deepprogrammer.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              app.deepprogrammer.in
            </a>{' '}
            you are verifying your PAN; at the tasking platform you typically
            need to submit a photo ID which can be any government issued ID.
          </li>
        </ul>
      </div>
    </div>
  );
}
