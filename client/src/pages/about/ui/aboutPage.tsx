"use client"
import styles from './about.module.css'
import React from "react";
import Image from "next/image";
import Footer from '@/shared/ui/Footer/Footer'
import {useRouter} from "next/navigation";


export function AboutPage() {
    const router = useRouter();
    return (<div>
        <div className={styles.about}>

            ABOUT US
        </div>
        <div className={styles.text_description}> Bearscribes is a Project for searching, saving
            and <br/> exchanging books between its participants.
        </div>
        <button onClick={() => router.push('/')} className={styles.return}> return </button>
        <div className={styles.participants}> Project was created <br/> by 5 enthusiasts <ul>
            <li className={styles.li}> Eldar Mametov</li>
            <li className={styles.li}> Artur Mukhutdinov</li>
            <li className={styles.li}>Timur Zheksimbaev</li>
            <li className={styles.li}> Vladislav Kishkovskiy</li>
            <li className={styles.li}> Matvey Platonov</li>
        </ul></div>

        <div className={styles.final}> Want to know more? Visit our resources!</div>

        <button className={styles.button_git}> Github</button>
        <button className={styles.button_tg}> Telegram</button>
        <button className={styles.button_vk}> VK</button>
        <div className={styles.lamp}>
            <Image src='/lamp.png' alt={'lamp'} layout='fill'/>
        </div>
        <div className={styles.footer_wrapper}>
            <Footer />
        </div>

        <div className={styles.image1}>
            <Image src='/proverb.png' alt={"Image"} layout='fill'/></div>
        <div className={styles.image2}>
            <Image src='/book.png' alt={"Book"} layout='fill'/></div>
    </div>)
}

