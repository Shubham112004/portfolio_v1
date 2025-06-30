import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Experience = () => {
    return (
        <div id='experience' className="relative w-full px-4 py-8 md:py-16 flex justify-center items-center">
            <div className="w-[85rem] bg-[#f1b23d] rounded-[30px] border-2 font-quicksand p-6 md:p-10 relative">

                {/* Opening Syntax */}
                <h2 className="text-xl md:text-4xl text-black font-sugar">
                    const <span className="text-white">Experience</span> = () =&gt; {'{'}
                </h2>

                {/* Company Logo */}
                <div className="w-full flex justify-center my-6">
                    <div className="bg-white p-3 rounded-lg max-w-xs w-full flex items-center justify-center">
                        <Image src="/boe.png" alt="BOE" width={260} height={100} />
                    </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-4 text-[16px] md:text-[18px] text-black leading-relaxed">
                    <li className="before:content-['#'] before:mr-2 text-justify">
                        Developed a Super Admin Module – Enabled user registration and access management.
                    </li>
                    <li className="before:content-['#'] before:mr-2 text-justify">
                        Built a Dynamic Menu Master – Automated menu creation with URL generation, icons, hierarchy, and VS Code file auto-generation.
                    </li>
                    <li className="before:content-['#'] before:mr-2 text-justify">
                        Implemented Role-Based Access Control – Designed a user authorization system with 3 access levels (Full, Read-only, None) for N menus.
                    </li>
                    <li className="before:content-['#'] before:mr-2 text-justify">
                        Applied MVC architecture to improve code maintainability and modularize features, allowing for smooth feature updates and troubleshooting.
                    </li>
                    <li className="before:content-['#'] before:mr-2 text-justify">
                        Integrated Node.js & SQL Server – Ensured smooth backend processing and data handling.
                    </li>
                </ul>

                {/* CTA Button */}
                {/* <div className="mt-8 flex justify-start">
                    <div className="inline-block text-[16px] group transition-transform duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]">
                        <Link
                            href="#contact"
                            className="inline-block transition-all duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] drop-shadow-[0px_6px_0px_#292929] group-hover:drop-shadow-[0px_2px_0px_#292929] group-hover:translate-y-[4px] bg-pink-400 text-black font-quicksand font-semibold px-4 py-2 rounded-full border border-black"
                        >
                            Let&#39;s Connect
                        </Link>
                    </div>
                </div> */}

                {/* Closing Syntax */}
                <h2 className="text-xl md:text-4xl font-sugar text-black mt-6">{'};'}</h2>
            </div>
        </div>
    )
}

export default Experience
