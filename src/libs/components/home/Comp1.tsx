//libs
import { Avatar } from 'react-image-cached-resizer'
import { Absolute, Column, Container, Row, Txt, TxtSpan } from '@/_ui'
import { colors } from '@/libs/themes'

//
export default function Comp2() {
    return (
        <Container padding={{ all: 14 }} shadow={{ x: 0, y: 2, blur: 20, color: 'rgba(0,0,0,0.1)' }} borderRadius={16}>
            <Row gap={12} align="center">
                <Avatar
                    source="https://imagedelivery.net/vJSpkH6oHM7zquolzolo7A/77550435-1cc9-4b42-4519-3cd83f149b00/public"
                    alt="템플릿"
                    size={40}
                />
                <Column gap={3}>
                    <Txt as="strong" size={17}>
                        위젯 템플릿
                    </Txt>
                    <Txt size={13} color={colors.grey200}>
                        위젯으로 빠른 개발을 경험해봐요 🥰
                    </Txt>
                </Column>
            </Row>
        </Container>
    )
}
