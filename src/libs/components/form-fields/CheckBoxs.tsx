import { useRouter, NextRouter } from 'next/router'

//libs
import { colors } from '@/libs/themes'
import { Checkbox, V } from '@/_ui'

//
interface isValuesProps {
    check1: boolean
    check2: boolean
    check3: boolean
}

//
export default function CheckBoxs({
    isValues,
    handleCheckOnChange,
}: {
    isValues: isValuesProps
    handleCheckOnChange: (type: 'check1' | 'check2' | 'check3') => void
}) {
    const router: NextRouter = useRouter()

    //
    /// 약관 체크 : 쿼리 모달
    const modalQueryRouter = (val: string) =>
        router.push(
            {
                query: {
                    modal: val,
                },
            },
            undefined,
            { scroll: false },
        )

    return (
        <V.Container
            padding={{ horizontal: 12, vertical: 16 }}
            margin={{ top: 10 }}
            gap={14}
            backgroundColor={colors.teal100}
            borderRadius={16}
        >
            {/* ----- 이용약관 ----- */}
            <Checkbox
                id="이용약관"
                checked={isValues.check1}
                onChange={() => handleCheckOnChange('check1')}
                label={{
                    title: '이용약관 (필수)',
                    txt: '서비스 이용약관에 동의합니다. (자세히 보기📎)',
                    txtOnClick: () => modalQueryRouter('이용약관'),
                }}
                themes={{ label: { titleSize: 14, titleWeight: 'medium' } }}
            />

            {/* ----- 개인정보 처리방침 ----- */}
            <Checkbox
                id="개인정보 처리방침"
                checked={isValues.check2}
                onChange={() => handleCheckOnChange('check2')}
                label={{
                    title: '개인정보 처리방침 (필수)',
                    txt: '개인정보 처리방침에 동의합니다. (자세히 보기📎)',
                    txtOnClick: () => modalQueryRouter('이용약관'),
                }}
                themes={{ label: { titleSize: 14, titleWeight: 'medium' } }}
            />

            {/* ----- 마케팅 수신동의 ----- */}
            <Checkbox
                id="3"
                checked={isValues.check3}
                onChange={() => {
                    if (isValues.check3) handleCheckOnChange('check3')
                }}
                onClick={() => {
                    if (!isValues.check3) modalQueryRouter('마케팅수신동의')
                }}
                label={{
                    title: '마케팅 수신동의',
                    txt: '이벤트 및 마케팅 소식을 알려드릴게요',
                }}
                themes={{ label: { titleSize: 14, titleWeight: 'medium' } }}
            />
        </V.Container>
    )
}
