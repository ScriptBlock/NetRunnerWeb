const Header = (props) => {
    return (
        <header>
            Welcome to the Cyberdeck Interface, {props.user}      
        </header>
    )
}

Header.defaultProps = {
    'user': 'Nobody'
}

export default Header
