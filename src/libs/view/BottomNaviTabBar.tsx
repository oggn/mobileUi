import { NextRouter, useRouter } from 'next/router';

import { colors } from '@/libs/themes/colors';

import { CopyIcon, HomeIcon, MessageIcon, ProfileIcon, SettingIcon } from '@/libs/assets/icons';
import { BottomTabNavigator } from '@/_ui/navigation/BottomNavigationBar';

export default function BottomNaviTabBar() {
  const router: NextRouter = useRouter();

  return (
    <BottomTabNavigator maxWidth={600}>
      <BottomTabNavigator.Tab
        label="홈"
        href="/"
        css={{
          color: router.pathname === '/' ? colors.keyColor : colors.chiffon500,
        }}
      >
        <HomeIcon
          width="100%"
          fill={router.pathname === '/' ? colors.keyColor : colors.chiffon500}
        />
      </BottomTabNavigator.Tab>

      <BottomTabNavigator.Tab
        label="메시지"
        href=""
        css={{
          color: router.pathname === '/2' ? colors.keyColor : colors.chiffon500,
        }}
      >
        <MessageIcon
          width="100%"
          fill={router.pathname === '/2' ? colors.keyColor : colors.chiffon500}
        />
      </BottomTabNavigator.Tab>

      <BottomTabNavigator.Tab
        label="메모"
        href=""
        css={{
          color: router.pathname === '/3' ? colors.keyColor : colors.chiffon500,
        }}
      >
        <CopyIcon
          width="100%"
          fill={router.pathname === '/3' ? colors.keyColor : colors.chiffon500}
        />
      </BottomTabNavigator.Tab>

      <BottomTabNavigator.Tab
        label="프로필"
        href=""
        css={{
          color: router.pathname === '/4' ? colors.keyColor : colors.chiffon500,
        }}
      >
        <ProfileIcon
          width="100%"
          fill={router.pathname === '/4' ? colors.keyColor : colors.chiffon500}
        />
      </BottomTabNavigator.Tab>

      <BottomTabNavigator.Tab
        label="설정"
        href=""
        css={{
          color: router.pathname === '/5' ? colors.keyColor : colors.chiffon500,
        }}
      >
        <SettingIcon
          width="100%"
          fill={router.pathname === '/5' ? colors.keyColor : colors.chiffon500}
        />
      </BottomTabNavigator.Tab>
    </BottomTabNavigator>
  );
}
