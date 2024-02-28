//libs
import { colors } from '@/libs/themes/colors'
import { Spacing, Txt, TxtSpan, V } from '@/_ui'

//
export default function Comp2() {
    return (
        <V.Container
            padding={{ vertical: 20, horizontal: 16 }}
            shadow={{ x: 0, y: 2, blur: 20, color: 'rgba(0,0,0,0.1)' }}
            borderRadius={16}
        >
            <Txt as="h1" size={18}>
                오직 위젯들로만 <br />
                템플릿 UI를 만들었어요
            </Txt>

            <Spacing size={10} />

            <Txt color="#797979" size={14}>
                {'위젯을 조합하여 빠르게 UI를 만들어보세요\nCSS없이 빠르게 UI를 만들 수 있어요😄'}
            </Txt>

            <Spacing size={20} />

            <V.Items direction="horizontal" align="start" wrap="wrap" gap={4} crossGap={6}>
                {[
                    '높은 코드 가독성',
                    'CSS 불필요',
                    '빠른 레이아웃 구현',
                    'UI 제작 및 작업 생산성 UP',
                    '반응형 UI 위젯',
                    '다양한 인풋 제공',
                    '네이티브 모달 제공',
                    '네이티브 앱의 UI 제공',
                    '빠른 렌더링',
                    '성능 최적화된 위젯',
                    '이미지 최적화',
                ].map((item, i) => (
                    <V.Item
                        key={i}
                        width="auto"
                        padding={{ vertical: 6, horizontal: 8 }}
                        border={{ solid: 1, position: 'all', color: colors.chiffon400 }}
                        borderRadius={100}
                        txtColor="#555"
                        txtSize={14}
                    >
                        {item}
                    </V.Item>
                ))}
            </V.Items>
        </V.Container>
    )
}
