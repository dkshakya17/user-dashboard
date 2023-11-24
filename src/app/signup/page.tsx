import MultiStepForm from '@/app/shared/multi-step/steps';
import AuthWrapperSignUp from '@/app/shared/auth-layout/auth-wappper-signup';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function SignUpPage() {
  return (
    <AuthWrapperSignUp title="Join us today!" isSocialLoginActive={true}>
      <MultiStepForm />
    </AuthWrapperSignUp>
  );
}
