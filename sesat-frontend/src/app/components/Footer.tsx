const Footer = () => {

    return (

        <div style={{ display: "flex", paddingTop: "23px" }}>

            <div className="h-[225px] bg-[#F7F8FA] text-container" style={{ width: "100vw", display: "flex", alignItems: "center" }}>

                <div className="text-left" style={{ flex: 1, paddingLeft: "23px" }}>

                    <p className="text-sm" style={{ fontSize: "18px" }}>

                        <p><b>UASLP</b></p>

                        <p>Universidad Autónoma de San Luis Potosí</p>

                        <p> Álvaro Obregón #64,</p>

                        <p>Col. Centro, C.P. 78000</p>

                        <p>San Luis Potosí, S.L.P.,México</p>

                        <p>Tel. +52 (444) 826 23 00</p>

                        <p>www.uaslp.mx</p>

                    </p>

                </div>

                <a className="h-[80px]" style={{ marginLeft: "auto", paddingRight: "10px" }}>

                    <img src="/img/uaslp_sesat_logo-m.png" alt="UASLP-SESAT Logo" className="h-[80px] hover:animate-pulse object-contain" />

                </a>

            </div>

        </div>

    );

};




export default Footer;