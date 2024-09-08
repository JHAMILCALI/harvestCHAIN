import React from 'react';
import img1 from '../../assets/img/blo1.png';
import img2 from '../../assets/img/blo2.jpg';
import img3 from '../../assets/img/blo3.jpg';

const App = () => {
    return ( 
        <div>
            <div className='fondoPrin'>
            <header className="text-center in-h1">
                <h1 className="display-4">Welcome to harvestCHAIN</h1>
                <p className="lead">Fair Trade Platform Based on Blockchain</p>
            </header>
            </div>
            
            <div className="container">
            <section className="intro my-5 section-background">
                <h2 className="text-center">What is harvestCHAIN?</h2>
                <p className="text-center mx-auto" style={{ maxWidth: '800px' }}>
                    harvestCHAIN is a fair trade platform based on blockchain technology,
                    designed to connect small producers with buyers in a transparent and secure manner.
                    Using the Ethereum network, we ensure that all transactions are verifiable and immutable.
                </p>
            </section >
            

            <section className="how-it-works my-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <div className="row">
                    {['Registration', 'Offer Posting', 'Search and Selection', 'Transaction', 'Automatic Payment', 'Traceability'].map((step, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">{index + 1}. {step}</h3>
                                    <p className="card-text">
                                        {/* Here you can add more detailed descriptions for each step */}
                                        This is an important step in the platform’s process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="benefits my-5">
                <h2 className="text-center mb-4">Blockchain Benefits</h2>
                <div className="row">
                    {[
                        { img: img1, title: 'Transparency', text: 'Blockchain technology ensures that all transactions are transparent and verifiable.' },
                        { img: img2, title: 'Security', text: 'Information on the blockchain is protected by cryptography, preventing fraud and tampering.' },
                        { img: img3, title: 'Automation', text: 'Smart contracts allow for automated payments and agreements, reducing the need for intermediaries.' }
                    ].map((benefit, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <img src={benefit.img} className="card-img-top" alt={benefit.title} />
                                <div className="card-body text-center">
                                    <h3 className="card-title">{benefit.title}</h3>
                                    <p className="card-text">{benefit.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="text-center mt-5 mb-3">
                <p>&copy; 2024 harvestCHAIN. All rights reserved.</p>
            </footer>
            </div>
        </div>
    );
};

export default App;
