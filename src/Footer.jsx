import './Footer.css';


const Footer = ({ blok }) => {
    console.log("Footer blok:", blok);

    return (
        <footer>
            <div className="top-nav-bar-first-row" style={{ marginTop: '15px' }}>
                <span className="stanford-logo-text-tag">
                    {blok.logo}
                </span>
                <div className="top-nav-bar-first-row-line"></div>
                <span className="nav-bar-navigate-second-text">
                    {blok.app_title}
                </span>
            </div>
            <div className="firstHeading">
                <div>
                    <h4 className='studnet-service'>
                        {blok.firstCol}
                    </h4>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {blok.firstColItems?.map((item) => (
                            <li key={item._uid}>
                                <a className='firstCol'
                                    href={item.url?.url}
                                    target={item.external ? "_blank" : "_self"}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                    {item.label}
                                    {item.icon?.filename && (
                                        <img
                                            src={item.icon.filename}
                                            alt=""
                                            style={{ height: "11px", marginLeft: "6px" }}
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>

                    <h4 className='studnet-service'>
                        {blok.secondCol}
                    </h4>
                    <ul style={{ listStyle: "none", paddingLeft: 0, display: 'grid', gap: '10px' }} >
                        {blok.secondColItem?.map((item) => (
                            <li key={item._uid}>
                                <a className='admin-resource'
                                    href={item.url?.url}
                                    target={item.external ? "_blank" : "_self"}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>

                    <h4 className='studnet-service'>
                        {blok.thirdCol}
                    </h4>
                    <ul style={{ listStyle: "none", paddingLeft: 0, display: 'grid', gap: '10px' }} >
                        {blok.thirdColItem?.map((item) => (
                            <li key={item._uid}>
                                <a className='admin-resource'
                                    href={item.url?.url}
                                    target={item.external ? "_blank" : "_self"}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="secondFooter">
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {
                        blok.secondfooterFirstcol?.map((item) => (
                            <span className='secondFooterFirstText'>
                                {item.logo}
                            </span>
                        ))

                    }
                    {
                        blok.secondfooterFirstcol?.map((item) => (
                            <span style={{ fontSize: '1.42rem', color: 'white' }}>
                                {item.university}
                            </span>
                        ))

                    }
                </div>
            </div>

        </footer>
    );
};

export default Footer;
