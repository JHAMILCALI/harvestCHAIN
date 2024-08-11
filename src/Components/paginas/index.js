import React from 'react';
import img1 from '../../assets/img/blo1.png';
import img2 from '../../assets/img/blo2.jpg';
import img3 from '../../assets/img/blo3.jpg';


const App = () => {
    return (
        <div className="container">
            <header className="text-center my-5">
                <h1 className="display-4">Bienvenido a harvestCHAIN</h1>
                <p className="lead">Plataforma de Comercio Justo Basada en Blockchain</p>
            </header>

            <section className="intro my-5">
                <h2 className="text-center">¿Qué es harvestCHAIN?</h2>
                <p className="text-center mx-auto" style={{ maxWidth: '800px' }}>
                    harvestCHAIN es una plataforma de comercio justo basada en tecnología blockchain,
                    diseñada para conectar pequeños productores con compradores de manera transparente y segura.
                    Utilizando la red Ethereum, garantizamos que todas las transacciones sean verificables e inmutables.
                </p>
            </section>

            <section className="how-it-works my-5">
                <h2 className="text-center mb-4">¿Cómo Funciona?</h2>
                <div className="row">
                    {['Registro', 'Publicación de Ofertas', 'Búsqueda y Selección', 'Transacción', 'Pago Automático', 'Trazabilidad'].map((step, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">{index + 1}. {step}</h3>
                                    <p className="card-text">
                                        {/* Aquí puedes agregar descripciones más detalladas para cada paso */}
                                        Este es un paso importante en el proceso de la plataforma.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="benefits my-5">
                <h2 className="text-center mb-4">Beneficios de Blockchain</h2>
                <div className="row">
                    {[
                        { img: img1, title: 'Transparencia', text: 'La tecnología blockchain garantiza que todas las transacciones sean transparentes y verificables.' },
                        { img: img2, title: 'Seguridad', text: 'La información en la blockchain está protegida por criptografía, lo que previene fraudes y alteraciones.' },
                        { img: img3, title: 'Automatización', text: 'Los contratos inteligentes permiten automatizar pagos y acuerdos, reduciendo la necesidad de intermediarios.' }
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
                <p>&copy; 2024 harvestCHAIN. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default App;
