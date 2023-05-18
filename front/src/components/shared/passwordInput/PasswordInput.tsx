import Image from 'next/image';
import React, { useRef, useState } from 'react';

import eyeClose from '../../../../public/eye-close.svg';
import eyeOpen from '../../../../public/eye-open.svg';

import { SimpleToggle } from '../simpleToggle/SimpleToggle';

import { passwordRegex } from '../../../core/configs/regexp';


function getRandomPassword( length: number ): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$!%*?&';

    let password = '';

    const generatePassword = () => {
        password = '';

        for ( let i = 0; i < length; i++ ) {
            const randomIndex = Math.floor( Math.random() * chars.length );
            password += chars[ randomIndex ];
        }
    }

    do {
        generatePassword();
        console.log( 'generatePassword' );
    } while ( !passwordRegex.test( password ) );

    return password;
}

export interface PasswordInputProps {
    hasGenerateToggle: boolean;
    password: string;
    setPassword: ( password: string ) => void;
}

export const PasswordInput = ( { hasGenerateToggle, setPassword }: PasswordInputProps ): React.ReactElement => {

    const [ isGeneratePassActive, setIsGeneratePassActive ] = useState<boolean>( false );
    const [ isHidePass, setIsHidePass ] = useState<boolean>( true );
    const [ passwordError, setPasswordError ] = useState<boolean>( false );
    const [ inpValue, setInpValue ] = useState<string>( '' );

    const inpRef = useRef<any>();

    const generatePassToggleClicked = ( isActive: boolean ): void => {
        setIsGeneratePassActive( isActive );

        if ( isActive ) {
            const generatedPassword = getRandomPassword( 32 );
            setInpValue( generatedPassword );
            setPassword( generatedPassword );
        }
    };

    const eyeClicked = (): void => {

        !isHidePass
            ? inpRef.current.type = 'password'
            : inpRef.current.type = 'text'

        setIsHidePass( !isHidePass );
    };

    const inputChangesHandler = ( { target }: any ): void => {

        setInpValue( target.value );

        if ( inpRef.current.value && !passwordRegex.test( inpRef.current.value ) ) {
            setPasswordError( true );
            setPassword( '' );
        } else {
            setPasswordError( false );
            setPassword( inpRef.current.value );
        }
    }


    return (
        <div>

            {
                hasGenerateToggle && <div className="relative left-[-10px] w-[225px] 
                    flex items-center justify-between toggle-box pt-[10px] pb-[8px] box-border">

                    <SimpleToggle state={isGeneratePassActive} clickHandler={generatePassToggleClicked} />
                    <div className='text-gray text-[18px]'>Generate a password</div>
                </div>
            }

            <div>

                <label className='text-[16px] font-bold flex flex-col relative'>
                    <span className={`pb-[5px] ${ passwordError && 'text-error' }`}>Password</span>

                    <input
                        ref={inpRef}
                        value={inpValue}
                        type="password"
                        placeholder='Enter password'
                        onChange={inputChangesHandler}
                        className={`border-[1px] 
                                    text-[18px]
                                    font-normal
                                    rounded-[8px]
                                    border-gray 
                                    p-[20px] 
                                    box-border1
                                    ${ passwordError && 'border-error focus:outline-error' }`} />

                    <Image
                        className='absolute right-[6%] top-[55%] opacity-50 cursor-pointer'
                        src={isHidePass ? eyeClose : eyeOpen}
                        onClick={eyeClicked}
                        alt='eye' />

                </label>

                <div className={`
                pt-[4px] pb-[15px] pl-[2px] text-[14px] font-normal text-gray ${ passwordError && ' text-error' }`}>
                    Enter a password that includes at least one uppercase letter, one number, and one symbol (such as !@#$%^&*)
                </div>

            </div>
        </div>
    )
}