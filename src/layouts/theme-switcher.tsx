'use client';

import { useTheme } from 'next-themes';
import {
  PiAlignLeft,
  PiAlignRight,
  PiMoon,
  PiSun,
  PiXBold,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { ActionIcon } from '@/components/ui/action-icon';
import { updateThemeColor } from '@/utils/update-theme-color';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { presetDark, presetLight, usePresets } from '@/config/color-presets';
import { useEffect } from 'react';
import { Switch } from 'rizzui';
import { useColorPresetName, useColorPresets } from '@/hooks/use-theme-color';

function DrawerBlock({
  title,
  children,
  className,
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <div className={cn('mb-10 px-0.5', className)}>
      <Title
        as="h6"
        className={cn('mb-3 text-sm font-medium tracking-wide text-gray-500')}
      >
        {title}
      </Title>
      {children}
    </div>
  );
}
export default function ThemeSwitcher({}: any) {
  const { theme, setTheme } = useTheme();
  const { colorPresetName } = useColorPresetName();

  useEffect(() => {
    if (theme === 'light' && colorPresetName === 'black') {
      updateThemeColor(
        presetLight.lighter,
        presetLight.light,
        presetLight.default,
        presetLight.dark
      );
    }
    if (theme === 'dark' && colorPresetName === 'black') {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark
      );
    }
  }, [theme, colorPresetName]);

  return (
    <Switch
      offIcon={<PiSun className="h-[22px] w-[22px]" />}
      onIcon={<PiMoon className="h-[22px] w-[22px]" />}
      variant="active"
      onClick={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    />
  );
}
