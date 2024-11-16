import React from 'react';
import Image from 'next/image';

import { useTheme } from '../../../core/context/ThemeContext';

import closeIco from '../../../../public/closeIco.svg';
import fileIcoBlack from '../../../../public/fileIcoBlack.svg';
import fileIcoBlue from '../../../../public/fileIcoBlue.svg';
import { StatusBar } from '../statusBar/StatusBar';
import { useFileReader } from '../../../core/context/FileReadContext';


const MB = 1000_000_000;


export interface FileItemProps {
    isBlured: boolean;
    isDeletable: boolean;
    file: File;
    fileSize: number;
    deleteFile: any;
}

export const FileItem = ( { isBlured, isDeletable, file, fileSize, deleteFile }: FileItemProps ): React.ReactElement => {

    const theme = useTheme();
    const { progress } = useFileReader();

    const getFileSize = (): string => {

        if ( !file ) {
            return '';
        }

        const fs = `${ fileSize / ( 1024 * 1024 ) }`;

        const sizeParts = fs.split( '.' );

        if ( sizeParts.length > 1 && sizeParts[ 1 ].length > 3 ) {
            return Number( fs ).toFixed( 5 );
        } else {
            return Number( fs ).toFixed( 2 );
        }

    };

    return (
        <div className={`p-[18px] w-[95%] sm:w-[100%] rounded-[8px] bg-[#F3F3F3] flex items-center justify-between  flex-col box-border ${ isBlured && 'blur-sm pointer-events-none' }`}>

            <div className='w-full flex justify-between'>

                <div className="file flex">

                    <Image
                        src={theme.darkMode ? fileIcoBlack : fileIcoBlue}
                        className='mr-[10px] w-auto h-auto'
                        alt='file icon' />

                    <div className='flex flex-col h-[40px] justify-between'>
                        <div className='font-bold text-[14px] dark:text-black text-blue'>{file?.name}</div>
                        <div className='text-[14px] text-gray'>{getFileSize()} MB</div>
                    </div>

                </div>

                {
                    isDeletable
                    && <Image src={closeIco}
                        alt='close'
                        onClick={deleteFile}
                        className='cursor-pointer' />
                }

            </div>

            <div className='pt-[10px] w-full flex justify-center'>
                {!!progress && <StatusBar />}
            </div>

        </div>
    )
}