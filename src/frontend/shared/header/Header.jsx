import React from 'react'
import MainMenu from './MainMenu'

const Header = () => {
  return (
    <>
        <section className="header-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header-content text-center">
                            <h4 className="mb-0 py-4">Paste App</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <MainMenu/>
    </>
  )
}

export default Header
