import Header from '@/app/signup/header';
import Footer from '@/app/signup/footer';
export default function MultiStepLayoutOne({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
