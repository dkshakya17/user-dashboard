import React from 'react';

const TallyForm: React.FC = () => {
  const tallySoEmbedCode = `
    <!-- Replace this with your actual Tally.so embed code -->
   <iframe data-tally-src="https://tally.so/embed/w2K6Dj?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="1041" frameborder="0" marginheight="0" marginwidth="0" title="Welcome to Deep Programmer AI"></iframe>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: tallySoEmbedCode }} />
    </>
  );
};

export default TallyForm;
