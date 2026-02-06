import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';

import s4 from '../IMAGES/h1.jpg';
import web1 from '../IMAGES/f1.jpg';
import web2 from '../IMAGES/f2.jpg';

const Web3Service = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="font-inter bg-gradient-to-b from-white to-[#f8faff] text-gray-800">
            <Navbar />

            {/* HERO SECTION */}
            <section className="flex flex-wrap items-center justify-between px-10 py-20 max-w-6xl mx-auto gap-10">
                <motion.div
                    className="flex-1 max-w-lg"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
                        Empowering the Future with Web3 Innovation
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Unlock decentralized possibilities with secure, scalable, and efficient blockchain solutions. 
                        From smart contracts to NFTs, we build the digital backbone of the new internet.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-[#2D4DE8] hover:bg-[#1b34b8] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1"
                    >
                        Get in Touch
                    </Link>
                </motion.div>

                <motion.div
                    className="flex-1 flex justify-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <img src={s4} alt="Web3 Development" className="w-full max-w-md rounded-xl shadow-lg object-cover" />
                </motion.div>
            </section>

            {/* FEATURES */}
            <section className="py-20 bg-white text-center">
                <motion.h2
                    className="text-3xl font-bold text-gray-900 mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    Our Web3 Expertise
                </motion.h2>
                <motion.p
                    className="text-gray-600 max-w-2xl mx-auto mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    We deliver custom Web3 products that combine innovation and reliability, built with blockchain-native technologies.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                    {[
                        { icon: '🌐', title: 'Decentralized Apps', desc: 'Transparent and secure dApps that redefine user ownership.' },
                        { icon: '🔗', title: 'Smart Contracts', desc: 'Audited and optimized contracts built on Solidity & Rust.' },
                        { icon: '🎨', title: 'NFT Platforms', desc: 'Seamless NFT minting, trading, and integration solutions.' },
                        { icon: '💎', title: 'Tokenomics', desc: 'Designing and launching custom ERC, BEP, and Solana tokens.' },
                        { icon: '⚙️', title: 'DAO Systems', desc: 'Community-driven decentralized governance made simple.' },
                        { icon: '🧠', title: 'AI + Web3', desc: 'Leverage decentralized AI for smarter blockchain ecosystems.' },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-[#f8f9ff] p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* STRATEGY SECTION */}
            <section className="flex flex-wrap items-center justify-between max-w-6xl mx-auto py-20 px-10 gap-10">
                <motion.div
                    className="flex-1 min-w-[320px]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    <img src={web1} alt="Web3 Strategy" className="w-full rounded-xl shadow-lg" />
                </motion.div>

                <motion.div
                    className="flex-1"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    <h3 className="text-2xl font-bold mb-4">Streamlined Blockchain Development</h3>
                    <p className="text-gray-600 mb-6">
                        Our agile Web3 strategies accelerate development cycles while maintaining security and transparency.
                        From token creation to DeFi app integration — we handle it all with precision.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['Smart Contract Audits', 'Gas Optimization', 'Cross-chain Support', 'Decentralized Storage'].map((t, i) => (
                            <span key={i} className="bg-[#e9edff] text-[#2D4DE8] px-4 py-2 rounded-full text-sm font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* BUSINESS GROWTH */}
            <section className="flex flex-wrap items-center justify-between max-w-6xl mx-auto py-20 px-10 gap-10">
                <motion.div
                    className="flex-1"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    <h3 className="text-2xl font-bold mb-4">Empowering Businesses with Blockchain Insights</h3>
                    <p className="text-gray-600 mb-6">
                        We empower organizations to make smarter, verifiable decisions through decentralized ledgers.
                        Blockchain’s transparency builds trust and enhances efficiency across operations.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['DeFi Solutions', 'NFT Marketplaces', 'DAO Governance', 'Private Blockchains'].map((t, i) => (
                            <span key={i} className="bg-[#e9edff] text-[#2D4DE8] px-4 py-2 rounded-full text-sm font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="flex-1 min-w-[320px]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    <img src={web2} alt="Blockchain Growth" className="w-full rounded-xl shadow-lg" />
                </motion.div>
            </section>

            {/* CTA */}
            <section className="bg-[#2D4DE8] text-white text-center py-16 px-6">
                <motion.h2
                    className="text-3xl font-bold mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    Ready to Build Your Web3 Vision?
                </motion.h2>
                <motion.p
                    className="max-w-2xl mx-auto mb-8 text-gray-200"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    Partner with us to create secure, scalable, and future-ready blockchain products that stand out.
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
                    <Link
                        to="/contact"
                        className="bg-white text-[#2D4DE8] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Let’s Collaborate
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Web3Service;
