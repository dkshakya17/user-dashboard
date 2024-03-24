'use client';

import { Button, Title, Text } from 'rizzui';
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'rizzui';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { API_URL } from '@/config/constants';
import { useCookies } from 'react-cookie';

export default function TncPopup() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [modalState, setModalState] = useState(true);
  const [cookies, setCookie] = useCookies(['token', 'userStatus']);

  // Reference for the scrollable content
  const contentRef = useRef<any>(null);
  const scrollToBottom = () => {
    if (contentRef.current) {
      const scrollableElement = contentRef.current;
      const lastChild = scrollableElement.lastElementChild;

      if (lastChild) {
        lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }
  };

  const handleScroll = () => {
    const position = contentRef.current.scrollTop;
    setScrollPosition(position);
    const lastElement = contentRef.current.lastElementChild;
    const isAtBottom =
      // contentRef.current.scrollHeight - position ===
      // contentRef.current.clientHeight;

      // another logic to match scroll

      // position + contentRef.current.clientHeight ===
      // contentRef.current.scrollHeight;

      lastElement.getBoundingClientRect().bottom <=
      contentRef.current.getBoundingClientRect().bottom;

    if (isAtBottom) {
      setHasReadTerms(true);
    }
  };
  useEffect(() => {
    contentRef.current.removeEventListener('scroll', handleScroll);
  }, []);
  const saveTncAcceptance = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/tnc`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        // body: JSON.stringify(projectPayload),
      });
      if (response.status == 200) {
        toast.success(
          <Text as="b">You have accepted our terms of service</Text>
        );
        setModalState(false);
      } else {
      }
    } catch (error) {}
  };

  const tncAccept = () => {
    saveTncAcceptance();
  };

  return (
    <Modal isOpen={modalState} onClose={() => null} customSize="720px">
      <div className="relative">
        <div
          className="m-auto max-h-[calc(100vh-30vh)] overflow-y-scroll  p-4  px-0 "
          ref={contentRef}
          onScroll={handleScroll}
        >
          <div className="mb-6 flex flex-col items-center justify-center">
            <Title as="h3" className="px-3 text-center text-lg">
              Terms of Service
            </Title>
          </div>
          <div className="w-full px-5 xs:pb-[100px] sm:pb-[50px] lg:pb-[50px]">
            <div className="footer-2-copy">
              <div className="container-5">
                <div className="text-center">
                  <strong className="bold-text">
                    Deep Programmer Deep Programmer, INC.
                  </strong>
                </div>
                <div className="pb-2 text-center">
                  <strong className="bold-text">
                    FREELANCER TERMS OF SERVICE.
                  </strong>
                </div>
                <p className="pb-6 text-center text-sm">
                  Last Updated: February 20, 2024
                </p>
                <div>
                  <p className="paragraph">
                    WE WILL POST ANY CHANGES TO THESE TERMS OF SERVICE IN A
                    NOTICE OF THE CHANGE AT THE BOTTOM OF OUR WEB PAGE WITH A
                    HYPERLINK THERETO. PLEASE REGULARLY REVIEW THESE TERMS OF
                    SERVICE. NOTWITHSTANDING, IF YOU CONTINUE TO USE OUR
                    SERVICES, YOU ARE BOUND BY ANY CHANGES THAT WE MAKE TO THESE
                    TERMS OF SERVICE.
                    <br />
                    <br />
                    <br />
                    These Freelancer Terms of Service (“
                    <span className="underline">Agreement</span>” or “
                    <span className="underline">Terms of Service</span>”) are a
                    legally binding agreement between you (the “
                    <span>Freelancer</span>,” “
                    <span className="underline">you</span>,” or “
                    <span className="underline">your</span>”)and Deep Programmer
                    Deep Programmer, Inc. and its subsidiaries, assigns, and
                    affiliates, including but not limited to Deep Programmer
                    Technologies Private Limited (“
                    <span>Deep Programmer AI</span>,” “
                    <span className="underline">we</span>
                    ,” “<span className="underline">us,</span>” “
                    <span className="underline">our</span>”). You acknowledge
                    and agree that your use of the Deep Programmer AI website at
                    www.deepprogrammer.in and/or our affiliated website{' '}
                    <a
                      href="https://app.deepprogrammer.in"
                      target="_blank"
                      className="text-primary"
                    >
                      app.deepprogrammer.in
                    </a>
                    , and your use of the Deep Programmer AI Services (the “
                    <span className="underline">Services</span>”) will be
                    governed by this Agreement, our{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <span className="bluespan">
                        <strong className="bluespan">Privacy Policy</strong>
                      </span>
                    </a>
                    , and any related terms.
                    <br />
                    <br />
                    If you are unsure as to the terms of this Agreement, please
                    do not proceed further and contact us at{' '}
                    <a
                      href="mailto:privacy@deepprogrammer.in"
                      className="nolinkcolor"
                    >
                      <span className="nolinkcolor">
                        privacy@deepprogrammer.in
                      </span>
                    </a>{' '}
                    .&nbsp;
                    <br />
                    <br />
                    Your use of our Services shall constitute your acceptance of
                    this Agreement and to all of the terms and conditions stated
                    under this Agreement and our
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      {' '}
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>
                    <strong className="bluespan"> </strong>referenced
                    herein.&nbsp;
                    <br />
                    <br />
                    PLEASE READ THE TERMS CONTAINED IN THIS AGREEMENT CAREFULLY
                    TO ENSURE THAT YOU UNDERSTAND EACH PROVISION. PLEASE NOTE
                    THAT THESE TERMS CONTAIN A BINDING AND MANDATORY ARBITRATION
                    PROVISION AND CLASS ACTION/JURY TRIAL WAIVER PROVISION THAT
                    REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL&nbsp;BASIS
                    TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS
                    ACTIONS AND LIMITS REMEDIES AVAILABLE TO YOU IN THE EVENT OF
                    CERTAIN DISPUTES.&nbsp;
                    <br />
                    <br />
                    BY ACCEPTING THIS AGREEMENT, EITHER BY CLICKING A BOX
                    INDICATING YOUR ACCEPTANCE OR BY USING OUR SERVICES, YOU
                    AGREE THAT
                  </p>
                  <p className="paragraph-4">
                    <br />
                    (A) YOU&nbsp;HAVE&nbsp;READ AND&nbsp;UNDERSTOOD
                    THE&nbsp;AGREEMENT;
                    <br />
                    ‍<br />
                    (B) YOU REPRESENT THAT YOU ARE AT LEAST 18 YEARS OLD; <br />
                    ‍<br />
                    (C) YOU CAN FORM A BINDING CONTRACT; <br />
                    ‍<br />
                    (D) YOU ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY
                    BOUND BY ITS TERMS AS WELL AS OUR{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">PRIVACY POLICY</strong>
                    </a>
                    <strong className="bluespan"> </strong>REFERENCED HERE IN.
                    IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A
                    COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE
                    THE AUTHORITY TO BIND SUCH ENTITY AND ITS AFFILIATES TO
                    THESE TERMS AND CONDITIONS,IN WHICH CASE THE TERMS “YOU” OR
                    “YOUR” SHALL REFER TO SUCH ENTITY AND ITS AFFILIATES. IF YOU
                    DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT AGREE WITH THIS
                    AGREEMENT, YOU MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT
                    USE OUR SERVICES.&nbsp;
                  </p>
                </div>
              </div>
              <div className="container-5">
                <div>
                  <p className="py-2">
                    Capitalized terms not defined herein shall have the same
                    meaning ascribed to them under our{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>
                    .
                  </p>
                  <p className="paragraph pt-3">
                    <strong>
                      1. INTRODUCTION &nbsp;TO Deep Programmer AI AND OUR
                      SERVICES
                    </strong>
                    <br />
                    <br />
                    Deep Programmer AI is a premier platform for Enterprise AI
                    solutions, working closely with our partners as need be to
                    build and enhance AI models (the “
                    <span className="underline">Partners</span>”). We're
                    dedicated to unleashing artificial intelligence's potential,
                    empowering organizations to elevate customer experiences,
                    streamline operations, and boost efficiency. We operate a
                    platform for consultants to engage with and improve our, or
                    our Partners’ AI models.
                    <br />‍
                  </p>
                  <p className="paragraph">
                    <strong>2. PRIVACY POLICY</strong>
                    <br />
                    <br />
                    Our{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>{' '}
                    describes how we handle the personal and business
                    information you provide to us when you register for our
                    Services. You understand that through your use of our
                    Services, you consent to the collection and use (as set
                    forth in the{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>
                    ) of this information, including the transfer of this
                    information to the US, and/or other countries for storage,
                    processing and use by Deep Programmer AI and our affiliates.
                    <br />‍
                  </p>
                  <p className="paragraph">
                    <strong>3. ELIGIBILITY &amp; ACCESS RESTRICTIONS</strong>
                    <br />
                    <br />
                    To be eligible to use our Services, you must meet the
                    following criteria and represent and warrant that you:{' '}
                    <br />
                  </p>
                  <p className="paragraph-4">
                    (a) are 18 years of age or older;
                    <br />
                    ‍<br />
                    (b) are not currently restricted from accessing our Services
                    or not otherwise prohibited from having an account, <br />
                    ‍<br />
                    (c) are not our competitor, or are not using our Services
                    for reasons that are in competition with us; <br />
                    ‍<br />
                    (d) will only maintain one registered account at any given
                    time; <br />
                    ‍<br />
                    (e) have full power and authority to enter into this
                    Agreement and doing so will not violate any other agreement
                    to which you are a party; <br />
                    ‍<br />
                    (f) will not violate any of our rights, including
                    intellectual property rights such as patent, copyright, and
                    trademark rights; and <br />
                    ‍<br />
                    (g) agree to provide at your cost all equipment, browser
                    software, and internet access necessary to use our Services.
                    <br />‍
                  </p>
                  <p className="paragraph  pb-3">
                    <strong>
                      4.YOUR REPRESENTATIONS AND WARRANTIES
                      (FOR&nbsp;FREELANCERS&nbsp;ONLY)
                    </strong>
                    <br />
                  </p>
                </div>
                <p className="paragraph-4">
                  • You confirm that you are an Indian resident, and have the
                  legal right to work in India.
                  <br />
                  ‍<br />
                  • You agree to allow our Indian subsidiary to verify your
                  identity (e.g. Aadhaar and PAN), including via third-party
                  providers to allow us to (a) verify you on behalf of our US
                  entity /partners and (b) attempt to withhold TDS (Tax Deducted
                  at Source) on a best effort basis.
                  <br />
                  ‍<br />
                  • You agree and acknowledge that this Agreement is not a
                  guarantee of work. We are not obligated to provide project
                  opportunities to you. <br />
                  ‍<br />
                  • You agree to also follow the Terms of Service and/or Privacy
                  Policies of our Partners. You agree that your failure to
                  comply with the Terms of Service and/or Privacy Policies of
                  our Partners may result in your termination from the Services.
                  &nbsp;
                  <br />
                  ‍<br />• You agree that you are not subject to any
                  non-competes that would restrict your ability to use the
                  Services. You agree that you are not violation of any
                  employment agreements or restrictions on your employment or
                  use of the Services.
                </p>
              </div>
              <div className="container-5"></div>
              <div className="container-5">
                <div>
                  <p className="paragraph">
                    You agree that our Services, including but not limited to
                    our Website, graphics, trademarks, and editorial content,
                    contains proprietary content, information, and material,
                    which are owned by Deep Programmer AI and/or our licensors,
                    including our customers, brands and agencies, and are
                    protected by applicable intellectual property and other
                    laws, including but not limited to copyright. You agree that
                    you will not use such proprietary content, information or
                    materials other than for your permitted use of our Services
                    or in any manner that is inconsistent with the terms
                    contained in this Agreement.&nbsp;
                    <br />
                    <br />
                    You agree not to modify, rent, lease, loan, sell,
                    distribute, or create derivative works based on our
                    Services, in any manner, and you will not exploit our
                    Services in any unauthorized way what so ever, including but
                    not limited to, using our Services to transmit any computer
                    viruses, worms, Trojan horses or other malware, or by
                    trespassing or burdening network capacity. You further agree
                    not to use our Services in any manner to harass, abuse,
                    stalk, threaten, defame or otherwise infringe or violate the
                    rights of any other party, and that we are not in any way
                    responsible for any such use by you, nor for any harassing,
                    threatening, defamatory, offensive, infringing or illegal
                    messages or transmissions that you may receive as a result
                    of using our Services.&nbsp;
                    <br />
                    <br />
                    You agree that at all times while you are providing services
                    for us or our Partners, your work product is work for hire
                    and the revenues, products, results, materials, programs,
                    processes, information, and systems, etc. developed or
                    produced by you whether during office hours or non-office
                    hours shall remain the sole property of Us or our Partner,
                    and constitute work for hire. You shall have no other rights
                    in said property other than to be paid fees by Us or our
                    Partners /their affiliates. You agree that upon request to
                    return all said property and all copies of information or
                    writings related to said property shall be returned to Us /
                    our Partners.
                  </p>
                  <p className="paragraph  pt-3">
                    <strong>5. RESERVATION &nbsp;OF RIGHTS</strong>
                    <br />
                    <br />
                    You acknowledge and agree that our Services are provided for
                    your use. Except to the extent necessary to access and use
                    our Services, nothing in this Agreement grants any title or
                    ownership interest in or to any copyrights, patents,
                    trademarks, trade secrets or other proprietary rights in or
                    relating to our Services, whether expressly, by implication,
                    estoppel, or otherwise. Deep Programmer AI and its licensors
                    and service providers reserve and will retain their entire
                    right, title, and interest in and to our Services, including
                    all copyrights, trademarks, and other intellectual property
                    rights therein or relating there to, except as expressly
                    granted to you in this Agreement.
                  </p>
                  <p className="paragraph  pt-3">
                    <strong>6. ACCESS RIGHTS</strong>
                    <br />
                    <br />
                    You can access and use our Website at{' '}
                    <a
                      href="https://deepprogrammer.in/"
                      className="nolinkcolor"
                    >
                      https://deepprogrammer.in/
                    </a>
                    . When using our Services, you are required to provide us
                    with registration information including personal
                    information. You agree that we have the right to disable
                    your access and use rights, at any time if, in our opinion,
                    you have violated any provision of this Agreement and/or our
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>
                    . &nbsp;You agree to cooperate with us if the security of
                    our Services is compromised by you or another person through
                    the use of our Services. &nbsp;We will not be liable for any
                    loss or damage arising from your failure to comply with this
                    Section.&nbsp;
                    <br />
                    <br />
                    We collect personal and business information (as set forth
                    in our{' '}
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <strong className="bluespan">Privacy Policy</strong>
                    </a>
                    ), which we need, from you when you register to use our
                    Services. This information is necessary for us to provide
                    our Services to you and is stored on our servers to enable
                    us to continue to provide our Services to you. Upon your
                    written request, we will provide you with a list of all of
                    the Personal Information that we store on you within sixty
                    (60) days of receiving your request. Also, upon your prior
                    written request, we will delete any such information within
                    sixty (60) days of receiving your request. Not with
                    standing, please note that, if you ask us to delete all such
                    information, we will not be able to continue to provide our
                    Services to you. Please send your requests to us at{' '}
                    <a
                      href="mailto:privacy@deepprogrammer.in"
                      className="underline"
                    >
                      privacy@deepprogrammer.in
                    </a>
                    .<br />
                  </p>
                  <p className="paragraph  pt-3">
                    <strong>
                      7. &nbsp;REQUIRED CONDUCT AND PROHIBITED CONDUCT
                    </strong>
                    <br />
                    <br />
                    As a condition to access our Services, you agree to this
                    Agreement and to strictly observe the following:&nbsp;{' '}
                    <br />
                  </p>
                  <p className="paragraph-4 ">
                    <br />
                    <b>a.</b> Required Conduct
                    <br />
                    ‍<br />
                    <div className="pl-3">
                      <span>
                        {' '}
                        i. Comply with all applicable laws, including, without
                        limitation, tax laws, export control laws and regulatory
                        requirements;
                      </span>
                      <br />
                      ‍<br />
                      <span>
                        {' '}
                        ii.&nbsp;Provide accurate information to Deep Programmer
                        AI and update from time to time as may be necessary;
                      </span>
                      <br />
                      ‍<br />
                      <span>
                        {' '}
                        iii.&nbsp;Review our{' '}
                        <a
                          href="https://www.deepprogrammer.in/privacy-policy"
                          target="_blank"
                        >
                          <span className="text-span-26">Privacy Policy</span>
                        </a>
                      </span>
                      ;<br />
                      ‍<br />
                      <span>
                        iv.&nbsp;Review and comply with notices sent by Deep
                        Programmer AI, if any, concerning our Services.
                      </span>
                    </div>
                  </p>
                </div>
                <p className="paragraph-4">
                  <br />
                  <b>b.</b>&nbsp;Prohibited Conduct
                  <br />
                  <br />
                  <div className="pl-3">
                    i. Duplicate, license, sublicense, publish, broadcast,
                    transmit, distribute, perform, display, sell, rebrand,
                    otherwise transfer or commercially exploit our Services
                    (excluding any user content);
                    <br />
                    ‍<br />
                    ii. Reverse engineer, decompile, disassemble, decipher,
                    capture screen shots, or otherwise attempt to derive the
                    source code for any underlying intellectual property used to
                    provide our Services, or any part thereof;
                    <br />
                    ‍<br />
                    iii. Utilize information, content or any data you view on
                    and/or obtain from our Services to provide any service that
                    is competitive with us;
                    <br />
                    ‍<br />
                    iv. Imply or state, directly or indirectly, that you are
                    affiliated with or endorsed by Deep Programmer AI unless you
                    have entered into a written agreement with us;
                    <br />
                    ‍<br />
                    v. Adapt, modify, or create derivative works based on our
                    Services or technology underlying our Services, or other
                    users’ content, in whole or in part;
                    <br />
                    ‍<br />
                    vi. Use manual or automated software, devices, scripts
                    robots, other means or processes to “scrape”, “crawl” or
                    “spider” any web pages contained in our Website;
                    <br />
                    ‍<br />
                    vii. Engage in “framing”, “mirroring”, or otherwise
                    simulating the appearance or function of our Website;
                    <br />
                    ‍<br />
                    viii. Attempt to or actually access our Website by any means
                    other than through the interface provided by Deep Programmer
                    AI;
                    <br />
                    ‍<br />
                    ix.&nbsp;Attempt to or actually override any security
                    component included in or underlying our Website;
                    <br />
                    ‍<br />
                    x. Engage in any action that interferes with the proper
                    working of or places an unreasonable load on our
                    infrastructure, including but not limited to unsolicited
                    communications, attempts to gain unauthorized access, or
                    transmission or activation of computer viruses;
                    <br />
                    ‍<br />
                    xi. Remove any copyright, trademark, or other proprietary
                    rights notices contained in or on our Website, including
                    those of both Deep Programmer AI or any of our licensors;{' '}
                    <br />
                    ‍<br />
                    xii. Use any information obtained from our Website to
                    harass, abuse, or harm another user; or
                    <br />
                    ‍<br />
                    xiii. Engage in any action or promote any content that is
                    harmful, offensive, illegal, unlawful, discriminatory,
                    dangerous, profane, or abusive.
                  </div>
                </p>
                <p className="paragraph  pt-3">
                  <strong>8. Deep Programmer AI&nbsp;COMMUNICATIONS</strong>
                  <br />
                  <br />
                  You understand and agree that you may receive information and
                  push notifications from Deep Programmer AI via email, text
                  message on your mobile device, messages via WhatsApp, or calls
                  to your mobile number. You hereby consent to receive
                  communications via email, text message on your mobile device,
                  WhatsApp messages, or calls to your mobile number. You
                  acknowledge that you may incur additional charges or fees from
                  your wireless provider for these communications, including
                  text message charges and data usage fees, and you acknowledge
                  and agree that you are solely responsible for any such charges
                  and fees and not Deep Programmer AI.
                  <br />
                  <br />
                  Email Contact. &nbsp;We may send promotional messages about us
                  and our products and services related to our Services to your
                  email. &nbsp;When you send us a query email at{' '}
                  <a href="mailto:deeproinfo@gmail.com" className="nolinkcolor">
                    deeproinfo@gmail.com
                  </a>
                  , you are providing us with consent to send emails to you for
                  replying to your queries at your provided email address. By
                  providing your email address, you agree with these Terms of
                  Service and our{' '}
                  <a
                    href="https://www.deepprogrammer.in/privacy-policy"
                    className="linkblue"
                    target="_blank"
                  >
                    <strong className="bluespan">Privacy Policy</strong>
                  </a>
                  . <br />
                </p>
              </div>
              <div className="container-5">
                <div>
                  <p className="paragraph  pt-3">
                    <strong>9. &nbsp;INDEMNIFICATION</strong>
                    <br />
                    <br />
                    You agree to indemnify, defend, and hold Deep Programmer AI
                    and our officers, employees, managers, directors, customers,
                    and agents (the “
                    <span className="underline">Indemnitees</span>
                    ”) harmless from and against any and all costs, liabilities,
                    losses and expenses (including but not limited to reasonable
                    attorneys’ fees) resulting from any claim, suit, action,
                    demand or proceeding brought by any third party against NEW
                    GEN AI and our Indemnities arising from any of the
                    following: <br />
                  </p>
                  <p className="paragraph-4 pt-3">
                    (i) a breach of this Agreement; <br />
                    ‍<br />
                    (ii) the negligence, fraud, or willful misconduct of you or
                    your employees, agents, or contractors; <br />
                    ‍<br />
                    (iii) incorrect information provided by you in your account
                    or elsewhere;
                    <br />
                    ‍<br />
                    (iv) a failure by you or your employees, agents, contractors
                    or invitees to comply with applicable laws and regulations.
                    <br />
                  </p>
                  <p className="paragraph  pt-3">
                    <strong>10. &nbsp;DISCLAIMERS</strong>
                    <br />
                    <br />
                    Your access to and use of our Services or any content are at
                    your own risk. You understand and agree that our Services
                    are provided to you on an “AS IS” and “AS AVAILABLE” basis.
                    Without limiting the foregoing, to the maximum extent
                    permitted under applicable law, WE DISCLAIM ALL WARRANTIES
                    AND CONDITIONS, WHETHER EXPRESS OR IMPLIED, OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                    NON-INFRINGEMENT. We make no warranty or representation and
                    disclaim all responsibility and liability for: <br />
                  </p>
                  <p className="paragraph-4 pt-3">
                    (i) the completeness, accuracy, availability, timeliness,
                    security or reliability of our Services or any content;{' '}
                    <br />
                    <br />
                    (ii) any harm to your computer system, loss of data, or
                    other harm that results from your access to or use of our
                    Services or any content; <br />
                    <br />
                    (iii) the deletion of, or the failure to store or to
                    transmit, any content and other communications maintained by
                    our Services; <br />
                    ‍<br />
                    (iv) whether our Services will meet your requirements or be
                    available on an uninterrupted, secure, or error-free basis.
                    No advice or information, whether oral or written, obtained
                    from us or through our Services, will create any warranty or
                    representation not expressly made herein.
                    <br />
                  </p>
                  <p className="paragraph  pt-3">
                    <strong>11. &nbsp;LIMITATION OF LIABILITY</strong>
                    <br />
                    <br />
                    You acknowledge and agree that, in no event will Deep
                    Programmer AI be liable to you or any third party for any
                    indirect, punitive, exemplary, incidental, special, or
                    consequential damages whether in contract, tort (including
                    negligence), or otherwise arising out of this Agreement, or
                    the use of, or the inability to use, our Website, or
                    Services, including, without limitation, any information
                    made available through our Website pursuant to this
                    Agreement. In the event the foregoing limitation of
                    liability is determined by a court of competent jurisdiction
                    to be un enforceable, then the maximum liability for all
                    claims of every kind will not exceed one times (1x) the
                    aggregate of payments received under this Agreement. The
                    foregoing limitation of liability will cover, without
                    limitation, any technical malfunction, computer error or
                    loss of data, and any other injury arising from the use of
                    our Services. Some jurisdictions do not allow the exclusion
                    of certain warranties or the limitation or exclusion of
                    liability for incidental or consequential damages. To the
                    extent that Deep Programmer AI may not disclaim any implied
                    warranty or limit its liabilities, the scope and duration of
                    such warranty and the extent of Deep Programmer AI’s
                    liability will be the minimum permitted under applicable
                    law.
                    <br />
                  </p>
                  <p className="paragraph pt-3">
                    <strong>12. &nbsp; TERMINATION</strong>
                    <br />
                    <br />
                    You may terminate this binding legal Agreement with Deep
                    Programmer AI by providing thirty (30) days prior written
                    notice, with a possible termination charge. &nbsp;&nbsp;We
                    reserve the right to suspend or terminate your account or
                    cease providing you with access to all or part of our
                    Services at any time for any or no reason, including, but
                    not limited to, if we reasonably believe:
                    <br />‍
                  </p>
                  <p className="paragraph-4">
                    <span>(i) you have violated this Agreement or our </span>
                    <a
                      href="https://www.deepprogrammer.in/privacy-policy"
                      className="linkblue"
                      target="_blank"
                    >
                      <span>
                        <strong className="bluespan">Privacy Policy</strong>
                      </span>
                    </a>
                    <span className="text-span-27">
                      , <br />
                      ‍<br />
                      (ii) you create risk or possible legal exposure for Soul
                      AI;
                      <br />
                      ‍<br />
                      (iii) our provision of our Services to you is no longer
                      commercially viable. We will make reasonable efforts to
                      notify you of such termination by the email address
                      associated with your account or the next time you attempt
                      to access your account, depending on the circumstances. In
                      all such cases, this Agreement shall terminate, including,
                      without limitation, your license to use our Services.
                      <br />‍
                    </span>
                  </p>
                  <p className="paragraph">
                    All sections, which by their nature and context are intended
                    to survive the termination of this Agreement, will survive.
                    <br />
                  </p>
                  <p className="paragraph pt-3">
                    <strong>
                      13. &nbsp;COPYRIGHT INFRINGEMENT/DMCA NOTICE
                    </strong>
                    <br />
                    <br />
                    If you believe that any content from our Services violates
                    your copyright, and you wish to have the allegedly
                    infringing material removed, the following information in
                    the form of a written notification (pursuant to the Digital
                    Millennium Copyright Act&nbsp;of 1998 (“
                    <span className="underline">DMCA Takedown Notice</span>”)
                    must be provided to our designated Copyright Agent.{' '}
                    <span>&nbsp;</span>
                    <br />
                  </p>
                  <p className="paragraph-4 pt-3">
                    <span>
                      a. Your physical or electronic signature; <br />
                      ‍<br />
                      b. Identification of the copyrighted work(s) that you
                      claim to have been infringed; <br />
                      ‍<br />
                      c. Identification of the material that you claim is
                      infringing and that you request us to remove; <br />
                      ‍<br />
                      d. Sufficient information to permit us to locate such
                      material; <br />
                      ‍<br />
                      e. Your address, telephone number, and email address;
                      <br />
                      ‍<br />
                      f. A statement that you have a good faith belief that use
                      of the objectionable material is not authorized by the
                      copyright owner, its agent, or under the law;
                      <br />
                      ‍<br />
                      g. A statement that the information in the notification is
                      accurate, and under penalty of perjury, that you are
                      either the owner of the copyright that has allegedly been
                      infringed or that you are authorized to act on behalf of
                      the copyright owner. All sections, which by their nature
                      and context are intended to survive the termination of
                      this Agreement, will survive.
                      <br />‍
                    </span>
                  </p>
                  <p className="paragraph">
                    <span>
                      Deep Programmer AI’s Copyright Agent to receive DMCA
                      Takedown Notices is Rukesh Reddy,{' '}
                    </span>
                    <a href="mailto:contact@deepprogrammer.in">
                      <span className="nolinkcolor">
                        contact@deepprogrammer.in
                      </span>
                    </a>
                    <span>
                      , at Deep Programmer AI, Attn: DMCA Notice, 24a Trolley
                      Square Unit 4215, Wilmington, DE 19806. You acknowledge
                      that for us to be authorized to take down any content,
                      your DMCA Takedown Notice must comply with all the
                      requirements of this Section. Please note that, pursuant
                      to 17 U.S.C. § 512(f),any misrepresentation of material
                      fact (falsities) in a written notification automatically
                      subjects the complaining party to liability for any
                      damages, costs and attorney’s fees incurred by Deep
                      Programmer AI in connection with the written notification
                      and allegation of copyright infringement.
                      <br />‍
                    </span>
                  </p>
                  <p className="paragraph">
                    <strong>14. &nbsp; ASSIGNMENT</strong>
                    <br />
                    <br />
                    This Agreement is only for your benefit. You shall have no
                    right to assign this Agreement or any benefits or obligation
                    hereunder to any other party or legal entity. Any attempted
                    assignment shall be void.
                    <br />
                    ‍<br />
                  </p>
                  <p className="paragraph">
                    <strong>
                      15. &nbsp; ANTI-BRIBERY AND EXPORT COMPLIANCE
                    </strong>
                    <br />
                    <br />
                    You agree not to promote, approach, use, distribute,
                    transfer, provide, sub-license, share with, or otherwise
                    offer our Services in violation of any laws or this
                    Agreement, including, without limitation, the United States
                    Foreign Corrupt Practices Act, the UK Bribery Act and
                    similar anti-corruption statutes in all jurisdictions.
                    Without limiting the foregoing, you will not knowingly
                    directly or indirectly export, re-export, transfer, make
                    available or release (collectively, “
                    <span className="underline">Export</span>”) our Services to
                    any destination, person, entity or end-use prohibited or
                    restricted under the US law with out prior US government
                    authorization to the extent required by the applicable
                    export control regulations, including without limitation, to
                    any parties listed on any of the denied parties lists or
                    specially designated nationals lists maintained under the
                    Export Administration Regulations or the Security, and the
                    Foreign Asset Control Regulations (31 CFR 500 et seq.)
                    administered by the US Department of Treasury, Office of
                    Foreign Assets Control without appropriate US government
                    authorization to the extent required by the applicable
                    regulations.
                    <br />
                    ‍<br />
                  </p>
                  <p className="paragraph">
                    <strong>16. &nbsp; MODIFICATIONS</strong>
                    <br />
                    <br />
                    We will post any changes to these Terms of Service in a
                    notice of the change at the bottom o four web page with a
                    hyperlink thereto. We will also send you an email describing
                    such changes. Please regularly review these terms of
                    service. Not with standing if you continue to use our
                    services, you are bound by any changes that we make to these
                    Terms of Service.
                    <br />
                    ‍<br />
                  </p>
                  <p className="paragraph">
                    <strong>17. &nbsp; RELATIONSHIP OF PARTIES</strong>
                    <br />
                    <br />
                    The parties hereto are independent contractors, and nothing
                    contained herein shall be interpreted as creating any
                    relationship other than that of independent contracting
                    parties. The parties shall not be construed as being
                    partners, joint ventures, shareholders, employer/employee,
                    or agent/ servant. The User has no power or authority to
                    bind Deep Programmer AI to any obligation, agreement, debt
                    or liability. The User shall not hold itself out as an agent
                    or representative of Deep Programmer AI.
                    <br />
                    ‍<br />
                  </p>
                  <p className="paragraph">
                    <strong>18. &nbsp; GOVERNING&nbsp;LAW</strong>
                    <br />
                    <br />
                    This Agreement shall be governed by the law of the State of
                    Delaware, without respect to its conflicts of laws
                    principles. &nbsp;Each of the parties to this Agreement
                    consents to the exclusive jurisdiction and venue of the
                    state and federal courts located in Santa Clara County,
                    California for any actions not subject to Dispute Resolution
                    and Arbitration provisions as set forth in{' '}
                    <span className="underline">Section 19</span>.<br />
                    ‍<br />
                  </p>
                  <p className="paragraph">
                    <strong>
                      19. &nbsp; DISPUTE RESOLUTION AND ARBITRATION
                    </strong>
                    <br />
                    <br />
                    PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT
                    REQUIRES YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS
                    WITH&nbsp;Deep Programmer AI&nbsp;AND LIMITS THE MANNER IN
                    WHICH YOU CAN SEEK RELIEF FROM US.
                    <br />
                    <br />
                    a. &nbsp;Binding Arbitration
                    <br />
                    <br />
                    Except for any disputes, claims, suits, actions, causes of
                    action, demands or proceedings (collectively, “
                    <span className="underline">Disputes</span>”) in which
                    either party seeks to bring an individual action in small
                    claims court or seeks injunctive or other equitable relief
                    for the alleged unlawful use of intellectual property,
                    including, without limitation, copyrights, trademarks, trade
                    names, logos, trade secrets or patents, you and Deep
                    Programmer AI agree (a) to waive your and Deep Programmer
                    AI’s respective rights to have any and all Disputes arising
                    from or related to this Agreement, use of our Services,
                    resolved in a court, and (b) to waive your and Deep
                    Programmer AI’s respective rights to a jury
                    trial.&nbsp;Instead, you and Deep Programmer AI agree to
                    arbitrate Disputes through binding arbitration&nbsp;(which
                    is the referral of a Dispute to one or more persons charged
                    with reviewing the Dispute and making a final and binding
                    determination to resolve it instead of having the Dispute
                    decided by a judge or a jury in court).
                    <br />
                    <br />
                    b. &nbsp;No Class Arbitrations, Class &nbsp;Actions or
                    Representative Actions
                    <br />
                    <br />
                    You and Deep Programmer AI agree that any Dispute arising
                    out of or related to these Terms of Service or use or access
                    of our Services is personal to you and Deep Programmer AI
                    and that such Dispute will be resolved solely through
                    individual arbitration and will not be brought as a class
                    arbitration, class action or any other type of
                    representative proceeding. You and Deep Programmer AI agree
                    that there will be no class arbitration or arbitration in
                    which an individual attempts to resolve a Dispute as a
                    representative of another individual or group of
                    individuals. Further, you and Deep Programmer AI agree that
                    a Dispute cannot be brought as a class or other type of
                    representative action, whether within or outside of
                    arbitration, or on behalf of any other individual or group
                    of individuals.
                    <br />
                    <br />
                    c. &nbsp;Federal Arbitration Act
                    <br />
                    <br />
                    You and Deep Programmer AI agree that these Terms of Service
                    affect inter state commerce and that the enforceability of
                    this Section shall be both substantively and procedurally
                    governed by and construed and enforced in accordance with
                    the Federal Arbitration Act, 9 U.S.C. § 1 et seq. (the “
                    <span className="underline">FAA</span>
                    ”),to the maximum extent permitted by applicable law.
                    <br />
                    <br />
                    d. Notice; Informal Dispute &nbsp;Resolution
                    <br />
                    <br />
                    You and Deep Programmer AI agree that each party will notify
                    the other party in writing of any arbitral or small claims
                    Dispute within thirty (30) days of the date it arises, so
                    that the parties can attempt in good faith to resolve the
                    Dispute informally. Notice to Deep Programmer AI shall be
                    sent by certified mail or courier to Deep Programmer AI,
                    Attention: Rukesh Reddy, Deep Programmer Deep Programmer,
                    Inc., 24a Trolley Square Unit 4215, Wilmington, DE USA
                    19806. Your notice must include
                    <br />
                    <br />
                    (a) your name, postal address, telephone number, the email
                    address you use or used for your&nbsp;Deep Programmer AI
                    account and, if different, an email address at which you can
                    be contacted, <br />
                    <br />
                    (b) a description in reasonable detail of the nature or
                    basis of the Dispute,
                    <br />
                    <br />
                    (c) the specific relief that you are seeking. Our notice to
                    you will be sent electronically in accordance with this
                    Agreement and will include (x) our name ,postal address,
                    telephone number and an email address at which we can be
                    contacted with respect to the Dispute, (y) a description in
                    reasonable detail of the nature or basis of the Dispute, and
                    (z) the specific relief that we are seeking. If you and Soul
                    AI cannot agree how to resolve the Dispute within thirty
                    (30) days after the date notice is received by the
                    applicable party, then either you or Deep Programmer AI may,
                    as appropriate and in accordance with this Section, commence
                    an arbitration proceeding.
                    <br />
                    <br />
                    e. Process
                    <br />
                    ‍<br />
                    EXCEPT FOR DISPUTES IN WHICH EITHER PARTY SEEKS TO BRING AN
                    INDIVIDUAL ACTION IN SMALL CLAIMS COURT OR SEEKS INJUNCTIVE
                    OR OTHER EQUITABLE RELIEF FOR THE ALLEGED UNLAWFUL USE OF
                    INTELLECTUAL PROPERTY, INCLUDING, WITHOUT LIMITATION,
                    COPYRIGHTS, TRADEMARKS, TRADE NAMES, LOGOS, TRADE SECRETS OR
                    PATENTS, YOU AND Deep Programmer AI AGREE THAT ANY DISPUTE
                    MUST BE COMMENCED OR FILED BY YOU OR Deep Programmer AI
                    WITHIN (1) YEAR OF THE DATE THE DISPUTE AROSE, OTHERWISE THE
                    UNDERLYING CLAIM IS PERMANENTLY BARRED (WHICH MEANS THAT YOU
                    AND Deep Programmer AI WILL NO LONGER HAVE THE RIGHT TO
                    ASSERT SUCH CLAIM REGARDING THE DISPUTE). <br />
                    <br />
                    You and Deep Programmer AI agree that &nbsp;
                    <br />
                    <br />
                    (a) any arbitration will occur in New Castle County,
                    Delaware,
                    <br />
                    <br />
                    (b) arbitration will be conducted confidentially by a single
                    arbitrator in accordance with&nbsp;the Commercial
                    Arbitration Rules and the Supplementary Procedures for
                    Consumer Related Disputes (the “
                    <span className="underline">AAA Rules</span>”) then in
                    effect, except as modified by this “Dispute Resolution”
                    section, <br />
                    <br />
                    (c) that the state or federal courts of the State of
                    Delaware, have exclusive jurisdiction over any appeals and
                    the enforcement of an arbitration award. You may also
                    litigate a Dispute in the small claims court located in the
                    county of your billing address if the Dispute meets the
                    requirements to be heard in small claims court.
                    <br />
                    <br />
                    f. &nbsp;Authority of Arbitrator <br />
                    <br />
                    As limited by the FAA, these Terms of Service and the
                    applicable AAA Rules, the arbitrator will have <br />
                    (a) the exclusive authority and jurisdiction to make all
                    procedural and substantive decisions regarding a Dispute,
                    including the determination of whether a Dispute is
                    arbitral,
                    <br />
                    ‍<br />
                    (b) the authority to grant any remedy that would otherwise
                    be available in court; provided, however, that the
                    arbitrator does not have the authority to conduct a class
                    arbitration or a representative action, which is prohibited
                    by these Terms of Service. The arbitrator may only conduct
                    an individual arbitration and may not consolidate more than
                    one individual’s claims, preside over any type of class or
                    representative proceeding, or preside over any proceeding
                    involving more than one individual. Notwithstanding anything
                    to the contrary herein or the applicable AAA Rules,
                    discovery in the arbitration shall be limited to one set of
                    interrogatories, one set of requests for admissions, and one
                    set of requests for production of documents.&nbsp;
                    <br />
                    <br />
                    The arbitrator’s award of damages must be consistent with
                    the terms of the “Limitation of Liability” section above as
                    to the types and amounts of damages for which a party may be
                    held liable. The arbitrator may award declaratory or
                    injunctive relief only in favor of the claimant and only to
                    the extent necessary to provide relief warranted by the
                    claimant’s individual claim. You agree that the party that
                    prevails in arbitration will been titled to an award of
                    attorneys’ fees and expenses, to the extent provided under
                    applicable law. <br />
                    <br />
                    g. Rules of AAA
                    <br />
                    <br />
                    The AAA Rules are available at&nbsp;
                    <a
                      href="https://www.adr.org/Rules"
                      target="_blank"
                      className="nolinkcolor"
                    >
                      https://www.adr.org/Rules
                    </a>
                    &nbsp;or by calling the AAA at 1-800-778-7879. By agreeing
                    to be bound by these Terms of Service, you either (a)
                    acknowledge and agree that you have read and understand the
                    rules of AAA, or (b) waive your opportunity to read the
                    rules of AAA and any claim that the rules of AAA are unfair
                    or should not apply for any reason.
                    <br />
                    <br />
                    h. Severability <br />
                    <br />
                    If any term, clause or provision of this Section is held
                    invalid or unenforceable, it will be so held to the minimum
                    extent required by law, and all other terms, clauses and
                    provisions of this Section will remain valid and
                    enforceable. Further, the waivers set forth herein are
                    severable from the other provisions of this Agreement and
                    will remain valid and enforceable, except as prohibited by
                    applicable law.&nbsp;
                    <br />
                    <br />
                    i. &nbsp;Opt-Out Right
                    <br />
                    ‍<br />
                    YOU HAVE THE RIGHT TO OPT OUT OF BINDING ARBITRATION WITHIN
                    THIRTY(30) DAYS OF THE DATE YOU FIRST ACCEPTED THE TERMS OF
                    THIS SECTION BY WRITING TO: Deep Programmer AI, RE: OPT-OUT,
                    24a Trolley Square Unit 4215, Wilmington, DE uSa 19806. IN
                    ORDER TO BE EFFECTIVE,THE OPT OUT NOTICE MUST INCLUDE YOUR
                    FULL NAME AND CLEARLY INDICATE YOUR INTENT TO OPT OUT OF
                    BINDING ARBITRATION. BY OPTING OUT OF BINDING ARBITRATION,
                    YOU ARE AGREEING TO RESOLVE DISPUTES IN ACCORDANCE WITH{' '}
                    <span className="underline">SECTION 19</span>.&nbsp;&nbsp;
                    <br />‍
                  </p>
                </div>
                <p className="paragraph">
                  <strong>20. &nbsp; MISCELLANEOUS</strong>
                  <br />
                  <br />
                  This Agreement along with our{' '}
                  <a
                    href="https://www.deepprogrammer.in/privacy-policy"
                    className="linkblue"
                    target="_blank"
                  >
                    <strong className="bluespan underline">
                      Privacy Policy
                    </strong>
                  </a>{' '}
                  constitutes the entire agreement between you and Deep
                  Programmer AI and supersedes any prior agreements between you
                  and Deep Programmer AI with respect to the subject matter
                  herein. Our failure to exercise or enforce any right or
                  provision of this Agreement will not constitute a waiver of
                  such right or provision. If any provision of this Agreement is
                  found by a court of competent jurisdiction to be invalid, we
                  both nevertheless agree that the court should endeavour to
                  give effect to our intentions as reflected in this provision,
                  and the other provisions of this Agreement to remain in full
                  force and effect. You agree that regardless of any statute or
                  law to the contrary, any claim or cause of action arising out
                  of or related to use of our Services or this Agreement must be
                  filed within one (1) year after such claim or cause of action
                  arose or be forever barred.&nbsp;A party’s failure to act with
                  respect to a breach by the other party does not constitute a
                  waiver of the party’s right to act with respect to subsequent
                  or similar breaches.&nbsp;All the sections intended to survive
                  the termination of this Agreement shall survive. The section
                  titles in this Agreement are for convenience only and have no
                  legal or contractual effect.&nbsp;Any notices to you shall be
                  given to you via the email address or physical address you
                  provide to Deep Programmer AI during the registration process.
                  <br />
                  ‍<br />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-10 border-t-gray  absolute bottom-0 left-0 right-0 flex w-full items-center justify-between gap-2 border bg-white px-6 py-4 xs:flex-col sm:flex-row lg:flex-row">
          <div className="flex items-center">
            <BsArrowDownCircleFill
              className="h-8 w-8 cursor-pointer text-primary"
              onClick={scrollToBottom}
            />
            <p className="px-4 text-xs">
              Scroll down till the bottom to read and accept the terms of
              service{' '}
            </p>
          </div>
          <Button
            color="primary"
            className="col-span-2 ml-2 w-full gap-2 sm:w-auto"
            onClick={tncAccept}
            disabled={!hasReadTerms}
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
}
