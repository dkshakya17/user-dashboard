import { Poppins } from 'next/font/google';

// export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100','300','400', '700'],
  style: ['normal', 'italic'],
});

// export const lexendDeca = Lexend_Deca({
//   subsets: ['latin'],
//   variable: '--font-poppins',
// });
