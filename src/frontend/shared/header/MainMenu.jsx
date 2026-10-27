import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
    return (
        <>
            <section className="main-menu-area">
                <div className="container">
                    <Nav
                        activeKey="/home"
                        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                    >
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/" end className="custom-nav-link">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/all-pastes" className="custom-nav-link">
                                All Pastes
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

            </section>
        </>
    )
}

export default MainMenu
