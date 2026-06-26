import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";

function NavigationBar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };
    return (
        <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold fs-3 d-flex align-items-center"
                >
                    <FaPenNib style={{
                        color: "#ff8c42",
                        marginRight: "10px"
                    }}
                    />
                    BlogSphere
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Nav.Link as={Link} to="/" className="fw-semibold text-dark">
                            Home
                        </Nav.Link>

                        {isLoggedIn ? (
                            <>

                                <Nav.Link as={Link} to="/create" className="fw-semibold text-dark">
                                    Create Post
                                </Nav.Link>

                                <Nav.Link
                                    as="button"
                                    onClick={handleLogout}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        color: "#0d6efd",
                                        fontWeight: "600",
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>

                                <Nav.Link as={Link} to="/login" className="fw-semibold text-dark">
                                    Login
                                </Nav.Link>

                                <Nav.Link as={Link} to="/register" className="fw-semibold text-dark">
                                    Register
                                </Nav.Link>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavigationBar;