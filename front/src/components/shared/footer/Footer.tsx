import Image from 'next/image';

import infoIcon from '../../../../public/info.svg';
import ukrIcon from '../../../../public/ukr.svg';
import { useState } from 'react';
import { AboutUs } from '../../aboutUs/aboutUs';
import Modal from 'react-modal';


const customStyles = {
    overlay: {
        backgroundColor: '#070707B2',
        width: '100%'

    },
    content: {
        backgroundColor: 'transparent',
        border: 'none',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0'

    }
};

export const Footer = () => {

    const [ openedDialog, setOpenedDialog ] = useState<boolean>( false );

    const showInfo = () => {
        setOpenedDialog( !openedDialog );
    }

    const closeDialog = () => {
        setOpenedDialog( false );
    }



    return (

        <footer
            className='pl-[64px] sm:pt-[15px] sm:pb-[15px] pr-[64px] h-[40px] sm:h-[auto] sm:flex sm:flex-wrap sm:justify-center gap-5 bg-blue dark:bg-black
             text-white flex items-center justify-between'>

            <Modal
                style={customStyles}
                isOpen={openedDialog}

            >
                <AboutUs closeClick={closeDialog} />
            </Modal>


            <div className="cursor-pointer about flex items-center justify-between w-[160px]"
                onClick={showInfo}>
                About SafeSender <Image src={infoIcon} alt='info' />
            </div>

            <div className="team sm:order-2">
                Created by <span className='underline'>HoverlaDev</span>
            </div>

            <div className="w-[150px] ">
                <a
                    className='w-full flex items-center justify-between'
                    href="https://prytulafoundation.org/"
                    target='_blanc'>
                    <Image src={ukrIcon} alt='ukraine' />Support Ukraine
                </a>
            </div>

        </footer>
    )
}