import React, { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter, NextRouter } from 'next/router'

//libs
import { V, Input, Option, Select, Button, AvatarUploader, LoadingLayer } from '@/_ui'

//utils
import { regEx } from '@/libs/utils/regEx'

//components
import CheckBoxs from './CheckBoxs'
import CheckModals from './CheckModals'

//
interface isValuesProps {
    profileImg: string
    name: string
    tel: string
    email: string
    gender: string
    price: string
    date: Date | string
    context: string
    check1: boolean
    check2: boolean
    check3: boolean
}

//
export default function Fields() {
    const router: NextRouter = useRouter()
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isValues, setIsValues] = useState<isValuesProps>({
        profileImg: '',
        name: '',
        tel: '',
        email: '',
        gender: '',
        price: '',
        date: new Date(),
        context: '',
        check1: false,
        check2: false,
        check3: false,
    })

    //
    /// 인풋 핸들러
    const handleCheckOnChange = (type: 'check1' | 'check2' | 'check3') => {
        if (type === 'check1') setIsValues({ ...isValues, check1: !isValues.check1 })
        if (type === 'check2') setIsValues({ ...isValues, check2: !isValues.check2 })
        if (type === 'check3') setIsValues({ ...isValues, check3: false })
    }

    //
    /// 제출하기
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push({ query: { results: true } })
        }, 1500)
    }

    return (
        <>
            {isLoading && <LoadingLayer />}

            <V.Column gap={30}>
                <V.Form gap={22} onSubmit={handleOnSubmit} align="center">
                    {/* ----- 프로필 사진 업로드 : ProfileUploadBox ----- */}
                    <AvatarUploader
                        size={120}
                        source={isValues.profileImg}
                        onUpload={(result: any) => setIsValues({ ...isValues, profileImg: result })}
                        onCancel={() => setIsValues({ ...isValues, profileImg: '' })}
                    />

                    {/* ----- 텍스트 타입 인풋 : TextField ----- */}
                    <Input label="이름" important="(필수)">
                        <Input.TextField
                            placeholder="이름을 입력하세요"
                            type="text"
                            name="name"
                            value={isValues.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setIsValues({ ...isValues, name: e.target.value })
                            }
                            themes={{ default: { edgeColor: '#111' } }}
                        />
                    </Input>

                    <Input label="이메일" important="(필수)">
                        <Input.TextField
                            placeholder="이메일을 입력하세요"
                            type="eamil"
                            name="name"
                            value={isValues.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setIsValues({ ...isValues, email: e.target.value })
                            }
                            error={!!isValues.email && !regEx.email.test(isValues.email)}
                            errorMessage="이메일 형식으로 입력하세요"
                        />
                    </Input>

                    {/* ----- Select 타입 인풋 : Select ----- */}
                    <Select
                        label="성별"
                        options={[{ value: '남성' }, { value: '여성' }]}
                        renderItem={(item) => <Option value={item.value}>{item.value}</Option>}
                    />

                    {/* ----- 연락처 타입 인풋 : PhoneNumberField ----- */}
                    <Input label="연락처" important="(필수)">
                        <Input.PhoneNumberField
                            placeholder="연락처를 입력하세요"
                            value={isValues.tel}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setIsValues({ ...isValues, tel: e.target.value })
                            }
                        />
                    </Input>

                    {/* ----- 가격 넘버릭 타입 인풋 : NumericField ----- */}
                    <Input label="자본금">
                        <Input.NumbericField
                            placeholder="가격을 입력하세요"
                            name="price"
                            value={isValues.price}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setIsValues({ ...isValues, price: e.target.value })
                            }
                            edge="원"
                        />
                    </Input>

                    {/* ----- 에디터 타입 인풋 : Textarea ----- */}
                    <Input label="내용" important="(필수)">
                        <Input.Textarea
                            rows={3}
                            placeholder="내용을 입력하세요"
                            // autoRaise
                            name="context"
                            value={isValues.context}
                            ref={textRef}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setIsValues({ ...isValues, context: e.target.value })
                            }
                            tolTip="문의 내용을 자유룝게 작성해주세요"
                        />
                    </Input>

                    {/* ----- 체크박스 ----- */}
                    <CheckBoxs isValues={isValues} handleCheckOnChange={handleCheckOnChange} />

                    <Button
                        width="100%"
                        maxWidth={520}
                        type="submit"
                        disabled={
                            !(
                                isValues.name &&
                                isValues.email &&
                                isValues.tel &&
                                isValues.context &&
                                isValues.check1 &&
                                isValues.check2
                            )
                        }
                    >
                        제출
                    </Button>
                </V.Form>
            </V.Column>

            {/* ----- 체크박스 모달 ----- */}
            <CheckModals dialogOnChange={() => setIsValues({ ...isValues, check3: true })} />
        </>
    )
}
