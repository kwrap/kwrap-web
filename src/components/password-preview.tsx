import * as otpauth from 'otpauth'
import {
    React,
    useState,
    useEffect,
    DEFAULT_NAME,
    utils,
    classNames,
    useRecoilState,
    CustomField
} from '../lib'
import { GLOBAL_STATE, PREVIEW_DATA } from '../state'
import { Tags } from './common/tags'
import { Hide } from './common/hiden'
import { Chunk, ChunkGroup } from './common/chunk'
import {
    IconEdit,
    IconArchive,
    IconPin,
    IconTime,
    IconNotes,
    IconUser,
    IconLock,
    IconLink,
    IconPhone,
    IconEmail,
    IconKey
} from './common/icons'
import { PasswordIcon } from './password-icon'
import { TotpCircle } from './common/totp-circle'
import { Button } from './common/button'

const { timeFromNow, isValid } = utils

interface Props {
    onClickIcon(): void
    onClickPin(): void
    onClickArchive(): void
    onClickEdit(): void
}

interface Totp {
    token: string
    period: number
    refresh: number
}

export const DetailPreview = ({ onClickIcon, onClickPin, onClickArchive, onClickEdit }: Props) => {
    const [globalState] = useRecoilState(GLOBAL_STATE)
    const [password] = useRecoilState(PREVIEW_DATA)
    const [showPassword, setShowPassword] = useState(false)
    const [totp, setTotp] = useState<Totp | null>(null)
    const [custom, setCustom] = useState<CustomField[]>([])
    const [updated, setUpdated] = useState('')
    const values = password.data

    useEffect(() => {
        setShowPassword(false)
        setCustom([...(values.custom || [])])
        setUpdated(timeFromNow(values.updated))
    }, [password])

    useEffect(() => {
        let timer: number
        if (values.otp != undefined) {
            const updateTotp = (totp: otpauth.TOTP) => {
                setTotp({
                    token: totp.generate(),
                    period: totp.period,
                    refresh: Math.floor(totp.period - ((Date.now() / 1000) % totp.period))
                })
            }
            try {
                // TODO: Hotp
                let totp = otpauth.URI.parse(values.otp) as otpauth.TOTP
                updateTotp(totp)
                timer = setInterval(() => updateTotp(totp), 1000)
            } catch (_) {
                setTotp(null)
            }
        } else {
            setTotp(null)
        }
        return () => {
            clearInterval(timer)
        }
    }, [password])

    const textClassNames = 'flex-1 w-0 text-font dark:text-gray-100 overflow-hidden text-ellipsis'

    return (
        <>
            <div className='flex items-center gap-4 mb-4'>
                <PasswordIcon
                    name={values.icon}
                    className={classNames({
                        'cursor-pointer transition-all active:scale-95 hover:opacity-90':
                            !globalState.readonly
                    })}
                    onClick={globalState.readonly ? undefined : onClickIcon}
                />

                <p className='flex-1 w-0 font-medium text-font text-lg overflow-hidden overflow-ellipsis dark:text-gray-100'>
                    {values.name || DEFAULT_NAME}
                </p>

                {!globalState.readonly && (
                    <>
                        <Button
                            className={classNames('h-6 w-12 border rounded border-yellow-500', {
                                'text-yellow-500': !values.pin,
                                'bg-yellow-500 text-white': values.pin
                            })}
                            onClick={onClickPin}
                        >
                            <IconPin className='w-5 h-5' />
                        </Button>

                        <Button
                            className={classNames('h-6 w-12 border rounded border-gray-500', {
                                'text-gray-500': !values.archive,
                                'bg-gray-500 text-white': values.archive
                            })}
                            onClick={onClickArchive}
                        >
                            <IconArchive className='w-5 h-5' />
                        </Button>

                        <Button
                            className={'h-6 w-12 border rounded border-blue-600 text-theme'}
                            onClick={onClickEdit}
                        >
                            <IconEdit className='w-5 h-5' />
                        </Button>
                    </>
                )}
            </div>

            <ChunkGroup>
                {isValid(values.user) && (
                    <Chunk
                        icon={IconUser}
                        centerChildren={<p className={textClassNames}>{values.user}</p>}
                        copyText={values.user}
                    />
                )}
                {isValid(values.email) && (
                    <Chunk
                        icon={IconEmail}
                        centerChildren={<p className={textClassNames}>{values.email}</p>}
                        copyText={values.email}
                    />
                )}
                {isValid(values.phone) && (
                    <Chunk
                        icon={IconPhone}
                        centerChildren={<p className={textClassNames}>{values.phone}</p>}
                        copyText={values.phone}
                    />
                )}
                {isValid(values.password) && (
                    <Chunk
                        icon={IconLock}
                        centerChildren={
                            <Hide hide={!showPassword} content={values.password || ''} />
                        }
                        copyText={values.password}
                        show={showPassword}
                        onChangeShow={(show) => setShowPassword(show)}
                    />
                )}
                {isValid(values.otp) && (
                    <Chunk
                        icon={IconKey}
                        centerChildren={[
                            <p key={0} className={textClassNames}>
                                {totp === null ? '------' : totp.token}
                            </p>,
                            totp !== null && (
                                <TotpCircle key={1} now={totp.refresh + 1} total={totp.period} />
                            )
                        ]}
                        copyText={totp?.token}
                    />
                )}
            </ChunkGroup>

            {isValid(values.links) && (
                <ChunkGroup>
                    {values.links?.map((link, i) => {
                        return (
                            <Chunk
                                key={i}
                                icon={IconLink}
                                centerChildren={<p className={textClassNames}>{link}</p>}
                                linkTo={link}
                                copyText={link}
                            />
                        )
                    })}
                </ChunkGroup>
            )}

            {isValid(values.notes) && (
                <ChunkGroup>
                    <Chunk
                        icon={IconNotes}
                        copyText={values.notes}
                        bottomChildren={
                            <p className='max-h-56 overflow-y-auto text-font dark:text-gray-100'>
                                {values.notes}
                            </p>
                        }
                    />
                </ChunkGroup>
            )}

            {custom.map((item, i) => {
                return (
                    <ChunkGroup key={i}>
                        <Chunk
                            text={item.name}
                            copyText={item.value}
                            show={!item.hidden}
                            onChangeShow={(show) => {
                                let item = { ...custom[i] }
                                item.hidden = !show
                                custom[i] = item
                                setCustom([...custom])
                            }}
                            bottomChildren={
                                <Hide hide={item.hidden} content={item.value} fullWidth />
                            }
                        />
                    </ChunkGroup>
                )
            })}

            {isValid(values.tags) && (
                <ChunkGroup>
                    <Tags tags={values.tags || []} />
                </ChunkGroup>
            )}

            <ChunkGroup>
                <Chunk
                    icon={IconTime}
                    centerChildren={
                        <p className='flex-1 text-[#B7B9BB] dark:text-gray-200'>{updated}</p>
                    }
                />
            </ChunkGroup>
        </>
    )
}
