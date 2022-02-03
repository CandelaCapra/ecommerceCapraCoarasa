const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
            <div className='container-fluid'>
                <h3 className='text-white'>The BookStore</h3>
                <div className='d-grid gap-2 d-md-flex mx-auto'>
                    <button className='btn btn-outline-info border-0'>Novelas gráficas</button>
                    <button className='btn btn-outline-info border-0'>Cómics</button>
                    <button className='btn btn-outline-info border-0'>Mangas</button>
                </div>
            </div>
        </nav>
    )
}

export {Navbar};