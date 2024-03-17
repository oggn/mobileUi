import { NextRouter, useRouter } from 'next/router'

//libs
import { Button, V, Spacing, Txt, useJenga } from '@/_ui'
import { colors } from '@/libs/themes'

//
export default function Comp5() {
    const router: NextRouter = useRouter()

    const { addToast } = useJenga()

    return (
        <>
            <V.Container>
                <Txt as="h2" size={18}>
                    {'Form 기능을\n빠르게 만들고 싶을땐?'}
                </Txt>

                <Spacing size={8} />

                <Txt color={colors.grey200}>{'Form 기능을 만들때\n필요한 인풋들을 다양하게 준비해뒀어요'}</Txt>

                <Spacing size={18} />

                <V.Row gap={10}>
                    <Button
                        as="m"
                        onClick={() => router.push('/form-fields')}
                        txtColor="#fff"
                        buttonColor={colors.keyColor}
                    >
                        지금 확인하기
                    </Button>

                    <Button
                        variant="stroke"
                        as="m"
                        onClick={() =>
                            addToast({
                                status: 'success',
                                title: 'Jenga UI Toast',
                                description: 'useToast를 통해 사용해보세요',
                            })
                        }
                    >
                        Jenga Toast
                    </Button>
                </V.Row>
            </V.Container>
        </>
    )
}
