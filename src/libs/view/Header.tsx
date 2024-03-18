/** @jsxImportSource @emotion/react */
import Link from 'next/link'

//components
import { DrawerMenus } from './Drawer'

//libs
import { AppBar, IconTab, V } from '@/_ui'
import { MQ } from '@/libs/themes'
import FlatList from 'react-flatlist-ui'

//assets
import { ToastIcon } from '../assets/icon-stroke'

//atoms
import { useRecoilState } from 'recoil'
import { appDrawerAtom } from '../atoms/app-atom'

//
export default function Header() {
    const [isDrawer, setIsDrawer] = useRecoilState<boolean>(appDrawerAtom)

    return (
        <>
            <AppBar width={1200} serviceName="서비스명">
                <V.Row
                    align="center"
                    height="100%"
                    crossAlign="space-between"
                    padding={{ horizontal: 20 }}
                    css={{ transition: '0s' }}
                >
                    <Link href="/">
                        <Logo />
                    </Link>

                    <div css={{ [MQ[1]]: { display: 'none' } }}>
                        <FlatList
                            size={{ maxWidth: 300 }}
                            direction="horizontal"
                            itemGap={30}
                            data={[
                                { name: '메뉴1', path: '/404' },
                                { name: '메뉴2', path: '/404' },
                                { name: '메뉴3', path: '/404' },
                                { name: '메뉴4', path: '/404' },
                            ]}
                            itemHorizontalCount={{ desktop: 4, tablet: 4, mobile: 4 }}
                            keyExtractor={(i) => i}
                            renderItem={(item) => (
                                <Link
                                    href={item.path}
                                    css={{
                                        padding: 8,
                                        fontSize: 15,
                                        '&:hover': { backgroundColor: '#f7f7f7', borderRadius: 12 },
                                    }}
                                >
                                    {item.name}
                                </Link>
                            )}
                        />
                    </div>

                    <IconTab
                        onClick={() => setIsDrawer(!isDrawer)}
                        css={{ display: 'none', [MQ[1]]: { display: 'flex' } }}
                    >
                        <ToastIcon fill="#666666" width="24px" height="24px" />
                    </IconTab>
                </V.Row>
            </AppBar>

            {/* 드로어 메뉴 */}
            <DrawerMenus />
        </>
    )
}

const Logo = () => {
    return (
        <svg
            viewBox="0 0 371 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={{
                width: '34px',
                height: 'auto',

                [MQ[1]]: {
                    width: '28px',
                },
            }}
        >
            <path
                d="M120 0H50C22.3858 0 0 22.3858 0 50V80C0 107.614 22.3858 130 50 130H120C147.614 130 170 107.614 170 80V50C170 22.3858 147.614 0 120 0Z"
                fill="#9FC5FF"
            />
            <path
                d="M115 140H55C24.6243 140 0 164.624 0 195V315C0 345.376 24.6243 370 55 370H115C145.376 370 170 345.376 170 315V195C170 164.624 145.376 140 115 140Z"
                fill="#BAD4FF"
            />
            <path
                d="M316 0H246C215.624 0 191 24.6243 191 55V125C191 155.376 215.624 180 246 180H316C346.376 180 371 155.376 371 125V55C371 24.6243 346.376 0 316 0Z"
                fill="#BAD4FF"
            />
            <path
                d="M316 190H246C215.624 190 191 214.624 191 245V315C191 345.376 215.624 370 246 370H316C346.376 370 371 345.376 371 315V245C371 214.624 346.376 190 316 190Z"
                fill="#4788F4"
            />
        </svg>
    )
}
